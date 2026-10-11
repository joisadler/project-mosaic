import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const projectRoot = process.cwd();
const contentDirectory = path.join(projectRoot, "src/content");
const contentFilePattern = /^(fe-\d+\.\d+)-(info|quiz|flip)-cards\.ts$/;
const contentFiles = fs.readdirSync(contentDirectory)
  .filter((fileName) => contentFilePattern.test(fileName))
  .sort()
  .map((fileName) => path.join("src/content", fileName));

const limits = {
  info: {
    pageCharacters: 410,
    pageLines: 16,
  },
  quiz: {
    questionCharacters: 260,
    questionLines: 13,
    optionCharacters: 50,
    explanationCharacters: 130,
    layoutUnits: 22,
  },
  flip: {
    questionCharacters: 80,
    answerCharacters: 310,
  },
  codeLineCharacters: 52,
};

function getString(node) {
  return node && (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node))
    ? node.text
    : null;
}

function getProperty(object, name) {
  const property = object.properties.find((candidate) => {
    if (!ts.isPropertyAssignment(candidate)) {
      return false;
    }

    return (
      (ts.isIdentifier(candidate.name) && candidate.name.text === name)
      || (ts.isStringLiteral(candidate.name) && candidate.name.text === name)
    );
  });

  return property && ts.isPropertyAssignment(property) ? property.initializer : null;
}

function getArray(node) {
  return node && ts.isArrayLiteralExpression(node) ? [...node.elements] : null;
}

function getCardObjects(sourceFile) {
  const cards = [];

  function visit(node) {
    if (ts.isObjectLiteralExpression(node)) {
      const id = getString(getProperty(node, "id"));
      const type = getString(getProperty(node, "type"));

      if (id && ["info", "quiz", "flip"].includes(type)) {
        cards.push({ id, type, node });
      }
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return cards;
}

function findCodeLines(markdown) {
  const codeLines = [];
  let insideFence = false;

  for (const line of markdown.split("\n")) {
    if (/^\s*(?:~~~|```)/.test(line)) {
      insideFence = !insideFence;
      continue;
    }

    if (insideFence) {
      codeLines.push(line);
    }
  }

  return codeLines;
}

function checkLength(errors, cardId, field, value, maximum) {
  if (value.length > maximum) {
    errors.push(`${cardId}: ${field} has ${value.length} characters; maximum is ${maximum}.`);
  }
}

function checkLines(errors, cardId, field, value, maximum) {
  const lineCount = value.split("\n").length;

  if (lineCount > maximum) {
    errors.push(`${cardId}: ${field} has ${lineCount} lines; maximum is ${maximum}.`);
  }
}

function checkCodeLines(errors, cardId, field, markdown) {
  for (const [index, line] of findCodeLines(markdown).entries()) {
    if (line.length > limits.codeLineCharacters) {
      errors.push(
        `${cardId}: ${field} code line ${index + 1} has ${line.length} characters; maximum is ${limits.codeLineCharacters}.`,
      );
    }
  }
}

function estimateWrappedLines(value, charactersPerLine) {
  return value.split("\n").reduce((total, line) => {
    const characterCount = [...line.trim()].length;

    return total + (characterCount === 0 ? 0.5 : Math.max(1, Math.ceil(characterCount / charactersPerLine)));
  }, 0);
}

const errors = [];
const cardIds = new Set();
const cardIdsByPackage = new Map();
let cardCount = 0;

for (const relativePath of contentFiles) {
  const absolutePath = path.join(projectRoot, relativePath);
  const fileMatch = path.basename(relativePath).match(contentFilePattern);
  const [, packageId, expectedCardType] = fileMatch;
  const sourceText = fs.readFileSync(absolutePath, "utf8");
  const sourceFile = ts.createSourceFile(
    absolutePath,
    sourceText,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS,
  );

  for (const card of getCardObjects(sourceFile)) {
    cardCount += 1;
    const packageCardIds = cardIdsByPackage.get(packageId) ?? new Set();
    packageCardIds.add(card.id);
    cardIdsByPackage.set(packageId, packageCardIds);

    if (card.type !== expectedCardType) {
      errors.push(`${card.id}: ${card.type} card is stored in a ${expectedCardType} card file.`);
    }

    if (!card.id.startsWith(`${packageId}-${card.type}-`)) {
      errors.push(
        `${card.id}: card ID must start with ${packageId}-${card.type}- to match its package.`,
      );
    }

    if (cardIds.has(card.id)) {
      errors.push(`${card.id}: duplicate card ID.`);
    }

    cardIds.add(card.id);

    if (card.type === "info") {
      const pages = getArray(getProperty(card.node, "pages"));

      if (!pages?.length) {
        errors.push(`${card.id}: InfoCard must contain at least one page.`);
        continue;
      }

      for (const [index, pageNode] of pages.entries()) {
        const page = getString(pageNode);

        if (page === null) {
          errors.push(`${card.id}: page ${index + 1} must be a static string.`);
          continue;
        }

        const field = `page ${index + 1}`;
        checkLength(errors, card.id, field, page, limits.info.pageCharacters);
        checkLines(errors, card.id, field, page, limits.info.pageLines);
        checkCodeLines(errors, card.id, field, page);
      }

      continue;
    }

    if (card.type === "quiz") {
      const question = getString(getProperty(card.node, "question"));
      const options = getArray(getProperty(card.node, "options"));
      const correctOptionId = getString(getProperty(card.node, "correctOptionId"));
      let optionLayoutUnits = 0;
      let explanationLayoutUnits = 0;

      if (question === null) {
        errors.push(`${card.id}: question must be a static string.`);
      } else {
        checkLength(errors, card.id, "question", question, limits.quiz.questionCharacters);
        checkLines(errors, card.id, "question", question, limits.quiz.questionLines);
        checkCodeLines(errors, card.id, "question", question);
      }

      if (options?.length !== 4) {
        errors.push(`${card.id}: QuizCard must contain exactly four options.`);
        continue;
      }

      const optionIds = new Set();

      for (const [index, optionNode] of options.entries()) {
        if (!ts.isObjectLiteralExpression(optionNode)) {
          errors.push(`${card.id}: option ${index + 1} must be an object literal.`);
          continue;
        }

        const optionId = getString(getProperty(optionNode, "id"));
        const text = getString(getProperty(optionNode, "text"));
        const explanation = getString(getProperty(optionNode, "explanation"));

        if (!optionId) {
          errors.push(`${card.id}: option ${index + 1} must have a static ID.`);
        } else if (optionIds.has(optionId)) {
          errors.push(`${card.id}: duplicate option ID ${optionId}.`);
        } else {
          optionIds.add(optionId);
        }

        if (text === null) {
          errors.push(`${card.id}: option ${index + 1} text must be a static string.`);
        } else {
          checkLength(
            errors,
            card.id,
            `option ${index + 1} text`,
            text,
            limits.quiz.optionCharacters,
          );
          optionLayoutUnits += estimateWrappedLines(text, 30);
        }

        if (explanation === null) {
          errors.push(`${card.id}: option ${index + 1} explanation must be a static string.`);
        } else {
          checkLength(
            errors,
            card.id,
            `option ${index + 1} explanation`,
            explanation,
            limits.quiz.explanationCharacters,
          );
          explanationLayoutUnits = Math.max(
            explanationLayoutUnits,
            estimateWrappedLines(explanation, 38),
          );
        }
      }

      if (question !== null) {
        const layoutUnits = estimateWrappedLines(question, 36)
          + optionLayoutUnits
          + explanationLayoutUnits;

        if (layoutUnits > limits.quiz.layoutUnits) {
          errors.push(
            `${card.id}: estimated quiz layout uses ${layoutUnits} units; maximum is ${limits.quiz.layoutUnits}.`,
          );
        }
      }

      if (!correctOptionId || !optionIds.has(correctOptionId)) {
        errors.push(`${card.id}: correctOptionId must reference one of the four options.`);
      }

      continue;
    }

    const question = getString(getProperty(card.node, "question"));
    const answer = getString(getProperty(card.node, "answer"));

    if (question === null) {
      errors.push(`${card.id}: FlipCard question must be a static string.`);
    } else {
      checkLength(errors, card.id, "question", question, limits.flip.questionCharacters);
    }

    if (answer === null) {
      errors.push(`${card.id}: FlipCard answer must be a static string.`);
    } else {
      checkLength(errors, card.id, "answer", answer, limits.flip.answerCharacters);
      checkCodeLines(errors, card.id, "answer", answer);
    }
  }
}

for (const [packageId, packageCardIds] of cardIdsByPackage) {
  const coveragePath = path.join(projectRoot, "docs/content", packageId, "COVERAGE.md");

  if (!fs.existsSync(coveragePath)) {
    errors.push(`${packageId}: missing coverage file at docs/content/${packageId}/COVERAGE.md.`);
    continue;
  }

  const coverageText = fs.readFileSync(coveragePath, "utf8");
  const documentedCardIds = new Set(
    [...coverageText.matchAll(/fe-\d+\.\d+-(?:info|quiz|flip)-[a-z0-9-]+/g)]
      .map(([match]) => match),
  );

  for (const cardId of packageCardIds) {
    if (!documentedCardIds.has(cardId)) {
      errors.push(`${cardId}: missing from ${packageId}/COVERAGE.md.`);
    }
  }

  for (const cardId of documentedCardIds) {
    if (!packageCardIds.has(cardId)) {
      errors.push(`${cardId}: documented in ${packageId}/COVERAGE.md but missing from content.`);
    }
  }
}

if (errors.length > 0) {
  console.error(`Content validation failed with ${errors.length} issue(s):\n`);

  for (const error of errors) {
    console.error(`- ${error}`);
  }

  process.exitCode = 1;
} else {
  console.log(`Validated ${cardCount} cards against the mobile content budgets.`);
}
