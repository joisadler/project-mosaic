// Run with an existing Playwright Page supplied by a Node host.
// Example in a Node Playwright host: audit(page,
//   { root: '/absolute/repo', section: 'fe-1.6', output: '/private/tmp/mosaic16/audit' })
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { createHash } from 'node:crypto';
import ts from 'typescript';
const hash = value => createHash('sha256').update(value).digest('hex');
function readCards(root, section) {
  const context = {};
  const urlsFile = path.join(root, `src/content/${section}-source-urls.ts`);
  if (fs.existsSync(urlsFile)) {
    const source = ts.createSourceFile(urlsFile, fs.readFileSync(urlsFile, 'utf8'), ts.ScriptTarget.Latest, true);
    function visit(node) {
      if (ts.isVariableDeclaration(node) && node.name.getText(source).endsWith('ReadMoreUrls')) {
        let expression = node.initializer;
        while (ts.isAsExpression(expression) || ts.isSatisfiesExpression(expression))
          expression = expression.expression;
        context[node.name.getText(source)] = vm.runInNewContext(`(${expression.getText(source)})`, {}, { timeout: 1000 });
      }
      ts.forEachChild(node, visit);
    }
    visit(source);
  }
  return ['Info', 'Quiz', 'Flip'].flatMap(type => {
    const file = path.join(root, `src/content/${section}-${type.toLowerCase()}-cards.ts`);
    const source = ts.createSourceFile(file, fs.readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true);
    let expression;
    function visit(node) {
      if (ts.isVariableDeclaration(node) && node.name.getText(source).endsWith(`${type}Cards`))
        expression = node.initializer;
      ts.forEachChild(node, visit);
    }
    visit(source);
    return vm.runInNewContext(`(${expression.getText(source)})`, context, { timeout: 1000 });
  });
}
export default async function audit(page, options) {
  const { root, section, output, ids, viewports = [[320, 568], [375, 667]], batchSize = 6, reuse = true, base = 'http://localhost:3000', limitBatches = Infinity } = options;
  fs.mkdirSync(output, { recursive: true });
  const allCards = readCards(root, section);
  if (ids) {
    const unknown = ids.filter(id => !allCards.some(card => card.id === id));
    if (unknown.length)
      throw new Error(`Unknown audit card IDs: ${unknown.join(", ")}`);
  }
  const cards = allCards.filter(card => !ids || ids.includes(card.id));
  const renderFiles = ['scripts/content-audit-fixture.tsx', 'src/app/layout.tsx', 'src/app/globals.scss', ...fs.readdirSync(path.join(root, 'src/components/learning-feed')).filter(f => /\.(tsx|scss|ts)$/.test(f)).map(f => 'src/components/learning-feed/' + f)];
  const rendering = hash(renderFiles.map(f => f + fs.readFileSync(path.join(root, f), 'utf8')).join('\n'));
  const manifestPath = path.join(output, 'manifest.json');
  const prior = fs.existsSync(manifestPath) ? JSON.parse(fs.readFileSync(manifestPath, 'utf8')) : [];
  const retained = [];
  const pending = [];
  const requestedKeys = new Set();
  for (const [width, height] of viewports)
    for (const card of cards) {
      const states = card.type === 'info' ? card.pages.map((_, i) => ({ page: i })) : card.type === 'quiz' ? [{}, ...card.options.map(o => ({ option: o.id }))] : [{ side: 0 }, { side: 1 }];
      for (const state of states) {
        const key = JSON.stringify([card.id, width, height, state]);
        requestedKeys.add(key);
        const content = hash(JSON.stringify(card));
        const previous = prior.find(x => x.key === key && x.content === content && x.rendering === rendering && fs.existsSync(x.evidence));
        if (reuse && previous?.measurementVersion === 2)
          retained.push(previous);
        else
          pending.push({ key, content, rendering, cardId: card.id, type: card.type, width, height, state, hasSwiper: card.type === 'flip' || (card.type === 'info' && card.pages.length > 1) });
      }
    }
  const results = [...retained];
  let batches = 0;
  for (let offset = 0; offset < pending.length && batches < limitBatches; offset += batchSize) {
    const batch = pending.slice(offset, offset + batchSize);
    const columns = Math.min(4, batch.length);
    // A batch may cross a viewport boundary; each iframe keeps its exact dimensions.
    await page.setViewportSize({ width: Math.max(...batch.map(s => s.width)) * columns + columns * 8, height: Math.max(...batch.map(s => s.height)) * Math.ceil(batch.length / columns) + 72 });
    await page.setContent('<html><meta charset="utf-8"><body style="margin:0;background:#151824;color:white;font:11px Arial"><div style="display:grid;grid-template-columns:repeat(' + columns + ',max-content);gap:8px">' + batch.map((s, i) => `<div><div style="height:25px;max-width:${s.width}px;overflow-wrap:anywhere">${s.cardId.replace(section + '-', '')} ${JSON.stringify(s.state)}</div><iframe id="tile-${i}" width="${s.width}" height="${s.height}" style="border:0;display:block" src="${base}/content-audit-temp?${new URLSearchParams({ card: s.cardId, ...s.state })}"></iframe></div>`).join('') + '</div></body></html>');
    const observed = await Promise.all(batch.map(async (s, i) => {
      const frame = await (await page.locator('#tile-' + i).elementHandle()).contentFrame();
      await frame.waitForSelector('[data-audit-card]');
      if (s.hasSwiper)
        await frame.waitForFunction(() => document.querySelector('.swiper')?.swiper?.initialized, null, { timeout: 20000 });
      await frame.evaluate(() => document.fonts.ready);
      await frame.waitForTimeout(100);
      return frame.evaluate(({ expected, state, type, hasSwiper }) => {
        const host = document.querySelector('[data-audit-card]');
        const errors = [];
        if (host.dataset.auditCard !== expected)
          errors.push('wrong card');
        if (type === 'info' && (hasSwiper ? document.querySelector('.swiper').swiper.activeIndex : Number(host.dataset.auditPage)) !== state.page)
          errors.push('wrong page');
        if (type === 'flip' && document.querySelector('.swiper').swiper.activeIndex !== state.side)
          errors.push('wrong side');
        if (type === 'quiz' && (host.dataset.auditOption !== (state.option ?? 'none')))
          errors.push('wrong option');
        const visible = el => { const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0 && r.right > 0 && r.left < innerWidth && r.bottom > 0 && r.top < innerHeight && !el.closest('[aria-hidden="true"]'); };
        const candidates = [...host.querySelectorAll('pre,[class*="markdown"],[class*="quizContent"],[class*="quizResult"],[class*="optionText"],[class*="flipSideScroller"],[class*="compactQuizPanel"]')].filter(visible);
        const overflows = candidates.filter(el => el.scrollHeight > el.clientHeight + 1 || el.scrollWidth > el.clientWidth + 1).map(el => ({ class: el.className, client: [el.clientWidth, el.clientHeight], scroll: [el.scrollWidth, el.scrollHeight] }));
        const onePixelExcess = candidates.filter(el => (el.scrollWidth > el.clientWidth || el.scrollHeight > el.clientHeight) && el.scrollWidth <= el.clientWidth + 1 && el.scrollHeight <= el.clientHeight + 1).map(el => ({class: el.className, client:[el.clientWidth,el.clientHeight], scroll:[el.scrollWidth,el.scrollHeight]}));
        const outside = candidates.filter(el => { const r = el.getBoundingClientRect(); return r.bottom > innerHeight + 1 || r.right > innerWidth + 1 || r.left < -1 || r.top < -1; }).map(el => el.className);
        const text = [...host.querySelectorAll('p,li,h2,pre,button,[class*="optionText"]')].filter(visible);
        const floors = text.filter(el => { const n = parseFloat(getComputedStyle(el).fontSize); return n < (el.matches('pre') ? 12 : el.matches('h2') ? 14 : 14) - .1; }).map(el => ({ tag: el.tagName, size: getComputedStyle(el).fontSize, text: el.textContent.slice(0, 35) }));
        const contentBottom = Math.max(0, ...candidates.map(el => el.getBoundingClientRect().bottom));
        if (!candidates.length)
          errors.push('missing visible content measurement targets');
        const baselineCompact = innerWidth <= 320 && innerHeight > 320 && innerHeight <= 568;
        const typographyExceptions = floors.filter(item => baselineCompact && parseFloat(item.size) >= (item.tag === 'PRE' ? 10.88 : 12.48) - .1);
        const belowBaseline = floors.filter(item => !typographyExceptions.includes(item));
        const targets = [...document.querySelectorAll('[role="radio"],button,a')].filter(visible).map(el => ({ label: el.getAttribute('aria-label') ?? el.textContent.slice(0, 30), width: el.getBoundingClientRect().width, height: el.getBoundingClientRect().height }));
        const decoration = [...document.querySelectorAll('[data-motif]')].filter(visible).map(el => ({ motif: el.dataset.motif, hidden: el.getAttribute('aria-hidden'), pointerEvents: getComputedStyle(el).pointerEvents }));
        return { measurementVersion: 2, observed: { card: host.dataset.auditCard, page: host.dataset.auditPage, side: host.dataset.auditSide, option: host.dataset.auditOption }, errors, overflows, onePixelExcess, outside, floors: belowBaseline, standardTypographyExceptions: typographyExceptions, targets, decoration, quizBottomGap: type === 'quiz' ? Math.round(innerHeight - contentBottom) : null };
      }, { expected: s.cardId, state: s.state, type: s.type, hasSwiper: s.hasSwiper });
    }));
    const evidence = path.join(output, `sheet-${Date.now()}-${batches}.png`);
    await page.screenshot({ path: evidence, fullPage: true, scale: 'css' });
    batch.forEach((state, i) => results.push({ ...state, ...observed[i], evidence, tile: i }));
    const preserved = ids ? prior.filter(item => !requestedKeys.has(item.key)) : [];
    fs.writeFileSync(manifestPath, JSON.stringify([...preserved, ...results], null, 2));
    batches++;
  }
  const failures = results.filter(x => x.errors.length || x.overflows.length || x.outside.length || x.floors.length || (x.quizBottomGap !== null && x.quizBottomGap < 32));
  fs.writeFileSync(path.join(output, 'failures.json'), JSON.stringify(failures, null, 2));
  return { section, covered: results.length, retained: retained.length, executed: results.length - retained.length, pending: pending.length - (results.length - retained.length), batches, failures: failures.map(x => ({ card: x.cardId, state: x.state, viewport: [x.width, x.height], overflows: x.overflows, outside: x.outside, floors: x.floors, gap: x.quizBottomGap })), manifest: manifestPath };
}
