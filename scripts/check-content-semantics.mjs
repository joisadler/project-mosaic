import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import vm from "node:vm";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import ts from "typescript";

const packageId = process.argv[2] ?? path.basename(process.argv[1]).match(/^check-(fe-\d+\.\d+)-semantics\.mjs$/)?.[1];
assert.match(packageId ?? "", /^fe-\d+\.\d+$/, "Pass a canonical package ID, such as fe-1.4");
const exportPrefix = "feSection" + packageId.slice(3).replace(".", "_");
const root = process.cwd();
const manifest = JSON.parse(fs.readFileSync(path.join(root, `scripts/${packageId}-semantic-expectations.json`), "utf8"));

function readLiteral(file, name, context = {}) {
  const source = ts.createSourceFile(file, fs.readFileSync(file, "utf8"), ts.ScriptTarget.Latest, true);
  let expression;
  function visit(node) {
    if (ts.isVariableDeclaration(node) && node.name.getText(source) === name) {
      expression = node.initializer;
      while (ts.isAsExpression(expression) || ts.isSatisfiesExpression(expression)) expression = expression.expression;
    }
    ts.forEachChild(node, visit);
  }
  visit(source);
  assert.ok(expression, `Missing export ${name}`);
  return JSON.parse(JSON.stringify(vm.runInNewContext(`(${expression.getText(source)})`, context, { timeout: 1000 })));
}

const urls = readLiteral(path.join(root, `src/content/${packageId}-source-urls.ts`), `${exportPrefix}ReadMoreUrls`);
const cards = ["Info", "Quiz", "Flip"].flatMap(type => readLiteral(
  path.join(root, `src/content/${packageId}-${type.toLowerCase()}-cards.ts`),
  `${exportPrefix}${type}Cards`, { [`${exportPrefix}ReadMoreUrls`]: urls },
));

// Preserve values at log time, including undefined, NaN, negative zero and array entries.
function encode(value) {
  if (value === undefined) return { $type: "undefined" };
  if (typeof value === "number" && Number.isNaN(value)) return { $type: "NaN" };
  if (Object.is(value, -0)) return { $type: "-0" };
  if (typeof value === "bigint") return { $type: "bigint", value: String(value) };
  if (Array.isArray(value)) return Array.from(value, encode);
  if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, encode(item)]));
  return value;
}

function format(value) {
  if (value?.$type) return value.$type === "bigint" ? `${value.value}n` : value.$type;
  if (Array.isArray(value)) return `[${value.map(format).join(", ")}]`;
  return JSON.stringify(value);
}

function execute(code, expected) {
  // Native host APIs must run in a real Node realm, not a VM with injected globals.
  if (expected.environment === "node-process") {
    const source = `
      const vm = require("node:vm");
      const encode = ${encode.toString()};
      const logs = [];
      console.log = (...args) => logs.push(args.map(encode));
      let error;
      try { vm.runInThisContext(${JSON.stringify(`${expected.sloppy ? "" : '"use strict";\n'}${code}`)}, { timeout: 1000 }); }
      catch (caught) { error = caught.name; }
      process.stdout.write(JSON.stringify({ logs, error }));
    `;
    const child = spawnSync(process.execPath, ["--input-type=commonjs", "-e", source], {
      encoding: "utf8", timeout: 3000, maxBuffer: 1024 * 1024,
    });
    assert.ifError(child.error);
    assert.equal(child.status, 0, child.stderr);
    const result = JSON.parse(child.stdout);
    assert.equal(result.error, expected.error, `Exception mismatch for:\n${code}`);
    assert.deepEqual(result.logs, expected.logs, `Value/type mismatch for:\n${code}`);
    return result;
  }
  const logs = [];
  let error;
  const context = vm.createContext({ console: { log: (...args) => logs.push(args.map(encode)) } });
  try {
    vm.runInContext(`${expected.sloppy ? "" : '"use strict";\n'}${code}`, context, { timeout: 1000 });
  } catch (caught) {
    error = caught.name;
  }
  assert.equal(error, expected.error, `Exception mismatch for:\n${code}`);
  assert.deepEqual(logs, expected.logs, `Value/type mismatch for:\n${code}`);
  return { logs, error };
}

const browserCases = [];
const uses = [];
const usedHashes = new Set();
const verifiedCards = new Set();
const decisionCards = [];
let nodeExecutions = 0;
for (const card of cards) {
  assert.ok(Object.values(urls).includes(card.readMoreUrl), `${card.id}: unknown source URL`);
  const fields = card.type === "info" ? card.pages.map((text, i) => [`page-${i + 1}`, text])
    : card.type === "quiz" ? [["question", card.question]] : [["question", card.question], ["answer", card.answer]];
  const ownCases = [];
  for (const [field, markdown] of fields) {
    const fences = [...markdown.matchAll(/~~~js\n([\s\S]*?)\n~~~/g)];
    for (const [index, match] of fences.entries()) {
      const code = match[1];
      const hash = createHash("sha256").update(code).digest("hex");
      const expected = manifest.examples[hash];
      assert.ok(expected, `${card.id} ${field}: executable fence has no expectation`);
      usedHashes.add(hash);
      const item = { cardId: card.id, field, fence: index, hash, code, ...expected };
      ownCases.push(item);
      uses.push({ cardId: card.id, field, fence: index, hash, environment: expected.environment });
      if (expected.environment === "browser") browserCases.push(item);
      else { execute(code, expected); nodeExecutions++; verifiedCards.add(card.id); }
    }
  }
  if (card.type === "quiz") {
    const check = manifest.quizChecks[card.id];
    assert.ok(check, `${card.id}: missing quiz review`);
    assert.equal(check.correctOptionId, card.correctOptionId);
    const reviews = check.distractorReview ?? check.alternatives?.map(item => ({
      optionId: item.id, reason: item.rationale,
    }));
    assert.deepEqual(reviews?.map(item => item.optionId), card.options.map(option => option.id), `${card.id}: review must cover each option in order`);
    assert.ok(reviews.every(item => item.reason?.trim()), `${card.id}: missing editorial rationale`);
    if (check.mode === "scenario") {
      assert.ok(manifest.supplemental.some(item => item.cardId === card.id), `${card.id}: combined scenario needs a supplementary check`);
    }
    const correct = card.options.find(option => option.id === card.correctOptionId);
    assert.ok(correct);
    assert.equal(new Set(card.options.map(option => option.text)).size, 4, `${card.id}: duplicate choices`);
    assert.ok(card.options.every(option => option.explanation.trim().length > 0));
    if (check.mode === "output") {
      assert.equal(ownCases.length, 1, `${card.id}: output quiz needs exactly one executable example`);
      const expected = ownCases[0];
      const output = expected.error ?? expected.logs.flatMap(args => args.map(format)).join(" / ");
      assert.equal(correct.text, output, `${card.id}: correct option differs from actual typed output`);
      assert.equal(card.options.filter(option => option.text === output).length, 1);
    } else {
      if (ownCases[0]?.error && check.mode !== "scenario") assert.equal(correct.text, ownCases[0].error);
      decisionCards.push(card.id);
    }
  }
}
assert.equal(usedHashes.size, Object.keys(manifest.examples).length, "Stale expectations must be removed");
assert.equal(cards.filter(card => card.type === "quiz").length, Object.keys(manifest.quizChecks).length);
for (const example of manifest.supplemental) {
  assert.ok(cards.some(card => card.id === example.cardId));
  execute(example.code, example);
  verifiedCards.add(example.cardId);
  nodeExecutions++;
}

const outputDirectory = path.join(os.tmpdir(), `mosaic-${packageId}-verification`);
fs.mkdirSync(outputDirectory, { recursive: true });
fs.writeFileSync(path.join(outputDirectory, "browser-cases.json"), JSON.stringify(browserCases, null, 2) + "\n");
fs.writeFileSync(path.join(outputDirectory, "semantic-report.json"), JSON.stringify({
  node: process.version, cards: cards.length, uniqueFences: usedHashes.size, nodeExecutions,
  browserExecutionsPending: browserCases.length, executedCardIds: [...verifiedCards],
  decisionCardsRequiringEditorialReview: decisionCards, uses,
}, null, 2) + "\n");

// Standalone browser harness: open in ordinary Chrome; no profile or app data is used.
const browserScript = `const cases = ${JSON.stringify(browserCases)};
const encode = ${encode.toString()};
(async () => {
  const results = [];
  for (const item of cases) {
    const frame = document.createElement('iframe');
    frame.hidden = true;
    document.body.append(frame);
    const logs = [];
    let error;
    try {
      frame.contentWindow.Function('console', '"use strict";' + String.fromCharCode(10) + item.code)({log: (...args) => logs.push(args.map(encode))});
    } catch (caught) { error = caught.name; }
    finally { frame.remove(); }
    const pass = error === item.error && JSON.stringify(logs) === JSON.stringify(item.logs);
    results.push({cardId:item.cardId, field:item.field, pass, logs, error});
  }
  document.querySelector('pre').textContent = JSON.stringify({passed:results.filter(r=>r.pass).length,total:results.length,results},null,2);
  document.title = results.every(r=>r.pass) ? 'PASS: ${packageId} browser semantics' : 'FAIL: ${packageId} browser semantics';
})();`;
const browserHtml = `<!doctype html><html lang="en"><meta charset="utf-8"><title>${packageId} browser semantics</title><h1>${packageId} browser semantics</h1><pre>Running…</pre><script>${browserScript.replaceAll("</script", "<\\/script")}<\/script></html>`;
fs.writeFileSync(path.join(outputDirectory, "browser-semantics.html"), browserHtml);
console.log(`Passed ${nodeExecutions} Node executions from authored content and practice scenarios; ${browserCases.length} real-browser executions pending.`);
console.log(`All ${cards.filter(card => card.type === "quiz").length} quizzes have distinct choices and answer identity checks. Decision distractors additionally require editorial review.`);
console.log(`Reports and standalone Chrome harness: ${outputDirectory}`);
