import type { FlipCardData } from "./card-types";

// JOI-38: handbook section 1.2; authored 2026-10-13.
// Source links use verified GitHub heading anchors.
// Integrated and browser-validated on 2026-10-13.
// 30 flip cards.
export const feSection1_2FlipCards: FlipCardData[] = [
  // Chapter 1.2, Q1.
  {
    id: "fe-1.2-flip-primitive-types",
    type: "flip",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-1-что-такое-значение-и-где-у-него-тип",
    question: `## Назови семь примитивных типов JavaScript.`,
    answer: `## Ответ

Примитивы (primitives): \`undefined\`, \`null\`, \`boolean\`, \`number\`, \`bigint\`, \`string\`, \`symbol\`.

Массив и функция — объекты. \`typeof\` не является точной таблицей типов: у \`null\` он возвращает \`"object"\`.`,
  },
  // Chapter 1.2, Q2.
  {
    id: "fe-1.2-flip-reference-model",
    type: "flip",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-2-чем-primitive-value-отличается-от-object-value",
    question: `## «Ссылка» — отдельный тип значения JavaScript?`,
    answer: `## Ответ

Нет. Ссылка (reference) — полезная модель доступа к объекту с конкретной identity.

Внутренний Reference Record спецификации не является пользовательским типом, который можно получить через \`typeof\` или положить в массив.`,
  },
  // Chapter 1.2, Q2.
  {
    id: "fe-1.2-flip-string-method",
    type: "flip",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-2-чем-primitive-value-отличается-от-object-value",
    question: `## Почему toUpperCase() не изменяет исходную строку?`,
    answer: `## Ответ

Строки — неизменяемые примитивы (immutable primitives). Метод возвращает новую строку.

Чтобы переменная хранила результат, нужно присвоить его: \`text = text.toUpperCase()\`. Это переназначение, а не изменение старого значения.`,
  },
  // Chapter 1.2, Q3.
  {
    id: "fe-1.2-flip-copy-levels",
    type: "flip",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-3-чем-mutation-отличается-от-reassignment-и-почему-появляется-shared-state",
    question: `## Как избежать общей мутации после {...defaults}?`,
    answer: `## Ответ

Поверхностная копия (shallow copy) не копирует вложенные объекты.

Скопируй каждый уровень на пути к изменяемому полю, например \`{ ...defaults, net: { ...defaults.net } }\`. Новая внешняя identity сама по себе не делает вложенные данные независимыми.`,
  },
  // Chapter 1.2, Q4.
  {
    id: "fe-1.2-flip-argument-replacement",
    type: "flip",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-4-javascript-передаёт-объекты-по-значению-или-по-ссылке",
    question: `## Как функции заменить объект у вызывающего кода?`,
    answer: `## Ответ

Вернуть новый объект, а вызывающему коду явно присвоить результат.

JavaScript использует передачу по значению (pass-by-value). Присваивание нового объекта локальному параметру не переназначает переменную снаружи.`,
  },
  // Chapter 1.2, Q5.
  {
    id: "fe-1.2-flip-missing-own",
    type: "flip",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-5-что-показывает-typeof-и-где-он-вводит-в-заблуждение",
    question: `## Как отличить пропущенное поле от поля со значением undefined?`,
    answer: `## Ответ

Для собственного свойства (own property) используй \`Object.hasOwn(object, key)\`.

Чтение значения или \`typeof object[key]\` не отличает эти случаи: оба могут дать \`undefined\` или строку \`"undefined"\` соответственно.`,
  },
  // Chapter 1.2, Q5.
  {
    id: "fe-1.2-flip-null-contract",
    type: "flip",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-5-что-показывает-typeof-и-где-он-вводит-в-заблуждение",
    question: `## undefined и null всегда означают разные виды отсутствия?`,
    answer: `## Ответ

Нет, это определяется контрактом API. Обычно \`undefined\` обозначает непредоставленное значение, а \`null\` — намеренное отсутствие.

Язык не заставляет следовать этому соглашению. Проверяй также, может ли само поле отсутствовать.`,
  },
  // Chapter 1.2, Q6.
  {
    id: "fe-1.2-flip-symbol-description",
    visual: { motif: "equality" },
    type: "flip",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-6-зачем-нужны-symbol-и-bigint",
    question: `## Делает ли одинаковое описание два Symbol равными?`,
    answer: `## Ответ

Нет. Обычный \`Symbol("id")\` каждый раз создаёт уникальный примитив (primitive).

\`Symbol.for("id")\` — другой механизм: поиск в глобальном реестре (global registry), где одинаковый ключ возвращает тот же символ.`,
  },
  // Chapter 1.2, Q6.
  {
    id: "fe-1.2-flip-bigint-precision",
    type: "flip",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-6-зачем-нужны-symbol-и-bigint",
    question: `## Как создать большое целое без предварительной потери точности?`,
    answer: `## Ответ

Используй литерал \`9007199254740993n\` или \`BigInt("9007199254740993")\`.

Передача уже округлённого \`Number\` в \`BigInt()\` не восстановит исходные цифры. Выбирай точную модель до первого преобразования (conversion).`,
  },
  // Chapter 1.2, Q7.
  {
    id: "fe-1.2-flip-nan-versus-global",
    visual: { motif: "conversion" },
    type: "flip",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-7-что-особенного-в-nan-infinity-и--0",
    question: `## Чем Number.isNaN отличается от глобальной isNaN?`,
    answer: `## Ответ

\`Number.isNaN(x)\` проверяет, является ли само значение числовым \`NaN\`.

Глобальная \`isNaN(x)\` сначала делает числовое преобразование (coercion). Поэтому для строки \`"bad"\` первая вернёт \`false\`, вторая — \`true\`.`,
  },
  // Chapter 1.2, Q7.
  {
    id: "fe-1.2-flip-finite-contract",
    type: "flip",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-7-что-особенного-в-nan-infinity-и--0",
    question: `## Почему !Number.isNaN(x) недостаточно для проверки числа?`,
    answer: `## Ответ

Проверку пройдут \`Infinity\`, строки и другие значения, не являющиеся \`NaN\`.

Для конечного Number используй \`Number.isFinite(x)\`. Она не делает преобразование типов (coercion). Дополнительно проверяй диапазон и целочисленность по контракту.`,
  },
  // Chapter 1.2, Q8.
  {
    id: "fe-1.2-flip-epsilon-scale",
    type: "flip",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-8-почему-01--02--03-и-как-сравнивать-дроби",
    question: `## Что на самом деле измеряет Number.EPSILON?`,
    answer: `## Ответ

Расстояние между \`1\` и следующим представимым числом (representable number).

Это не универсальный допуск для любой величины. Абсолютную и относительную погрешность выбирают с учётом масштаба и требований задачи.`,
  },
  // Chapter 1.2, Q8.
  {
    id: "fe-1.2-flip-money-rounding",
    type: "flip",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-8-почему-01--02--03-и-как-сравнивать-дроби",
    question: `## Решает ли toFixed() проблему точных денежных расчётов?`,
    answer: `## Ответ

Нет. \`toFixed()\` возвращает строку и не задаёт политику округления (rounding policy).

Нужен контракт: масштаб валюты, момент округления, безопасный диапазон. Выбирай целые минимальные единицы или подходящую десятичную модель.`,
  },
  // Chapter 1.2, Q9.
  {
    id: "fe-1.2-flip-nullish-set",
    type: "flip",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-9-что-такое-truthy-falsy-и-nullish-values",
    question: `## Какие значения входят в nullish?`,
    answer: `## Ответ

Только \`null\` и \`undefined\`.

\`0\`, \`-0\`, \`0n\`, \`false\`, \`NaN\` и \`""\` тоже falsy, но не nullish. Поэтому \`??\` сохраняет их, а \`||\` выбирает запасное значение.`,
  },
  // Chapter 1.2, Q10.
  {
    id: "fe-1.2-flip-operand-result",
    type: "flip",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-10-что-значит-short-circuit-evaluation-и-что-возвращают---",
    question: `## Возвращают ли && и || обязательно boolean?`,
    answer: `## Ответ

Нет. Они возвращают выбранный операнд (operand).

\`0 && "ready"\` даёт число \`0\`; \`true && "ready"\` — строку \`"ready"\`. Короткое замыкание (short-circuit) может пропустить правую часть целиком.`,
  },
  // Chapter 1.2, Q10.
  {
    id: "fe-1.2-flip-default-validation",
    type: "flip",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-10-что-значит-short-circuit-evaluation-и-что-возвращают---",
    question: `## Почему ?? не заменяет проверку входных данных?`,
    answer: `## Ответ

Nullish coalescing \`??\` обрабатывает только отсутствие: \`null\` и \`undefined\`.

Он сохраняет \`NaN\`, строки вместо чисел и другие неподходящие значения. Тип, формат, конечность и диапазон нужно проверять отдельно.`,
  },
  // Chapter 1.2, Q11.
  {
    id: "fe-1.2-flip-optional-grouping",
    type: "flip",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-11-что-делает-optional-chaining-и-где-прекращается-защита",
    question: `## Почему (data?.a).b может бросить TypeError?`,
    answer: `## Ответ

Скобки завершают непрерывную опциональную цепочку (optional chain).

Если \`data\` nullish, внутри скобок получается \`undefined\`. Следующий обычный доступ \`.b\` уже не защищён. Без скобок \`data?.a.b\` остановился бы на \`data\`.`,
  },
  // Chapter 1.2, Q11.
  {
    id: "fe-1.2-flip-optional-call",
    type: "flip",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-11-что-делает-optional-chaining-и-где-прекращается-защита",
    question: `## Что именно проверяет method?.()?`,
    answer: `## Ответ

Только отсутствие метода: \`null\` или \`undefined\`.

Вызываемость (callability) не гарантируется. Существующая строка вызовет \`TypeError\`. Исключение внутри реально вызванного метода тоже не будет подавлено.`,
  },
  // Chapter 1.2, Q11.
  {
    id: "fe-1.2-flip-optional-syntax",
    type: "flip",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-11-что-делает-optional-chaining-и-где-прекращается-защита",
    question: `## Можно ли присваивать через user?.name?`,
    answer: `## Ответ

Нет. Опциональная цепочка (optional chain) не является допустимой целью присваивания.

\`user?.name = "Ada"\` — \`SyntaxError\`. У \`new Constructor?.()\` и опционального tagged template тоже есть синтаксические запреты.`,
  },
  // Chapter 1.2, Q12.
  {
    id: "fe-1.2-flip-samevalue-differences",
    visual: { motif: "equality" },
    type: "flip",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-12-какие-семантики-равенства-есть-в-javascript",
    question: `## Чем Object.is отличается от ===?`,
    answer: `## Ответ

\`Object.is()\` использует SameValue: считает \`NaN\` равным себе и различает \`+0\` с \`-0\`.

В остальных обычных случаях результаты совпадают. Для объектов оба сравнивают identity и не обходят поля.`,
  },
  // Chapter 1.2, Q12.
  {
    id: "fe-1.2-flip-samevaluezero-users",
    visual: { motif: "equality" },
    type: "flip",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-12-какие-семантики-равенства-есть-в-javascript",
    question: `## Где используется SameValueZero?`,
    answer: `## Ответ

В \`includes()\` у массивов и типизированных массивов, для значений \`Set\` и ключей \`Map\`.

Эта семантика объединяет знаки нуля и считает \`NaN\` равным себе. Объекты по-прежнему сравниваются по identity.`,
  },
  // Chapter 1.2, Q12.
  {
    id: "fe-1.2-flip-domain-equality",
    visual: { motif: "equality" },
    type: "flip",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-12-какие-семантики-равенства-есть-в-javascript",
    question: `## Как сравнить объекты по смыслу, а не по identity?`,
    answer: `## Ответ

Задать доменный компаратор (domain comparator): какие поля важны и как сравнивать их значения.

\`===\`, \`Object.is()\` и SameValueZero не выполняют глубокое сравнение. Автоматически заменять их сериализацией тоже нельзя: правила данных могут отличаться.`,
  },
  // Chapter 1.2, Q13.
  {
    id: "fe-1.2-flip-loose-null-policy",
    visual: { motif: "equality" },
    type: "flip",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-13-когда--преобразует-типы-и-можно-ли-его-использовать-осознанно",
    question: `## Когда value == null может быть осознанным выбором?`,
    answer: `## Ответ

Для совместной проверки \`null\` и \`undefined\`, если команда явно допускает такой шаблон.

Для обычных значений это точное правило loose equality, а не общий перевод в Number. В браузере есть legacy-исключение \`document.all\`.`,
  },
  // Chapter 1.2, Q14.
  {
    id: "fe-1.2-flip-boolean-coercion",
    visual: { motif: "conversion" },
    type: "flip",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-14-что-такое-explicit-и-implicit-coercion",
    question: `## Вызывает ли Boolean(object) метод valueOf()?`,
    answer: `## Ответ

Нет. Логическое преобразование (boolean coercion) обычного объекта сразу даёт \`true\`.

Пустота объекта и результат его \`valueOf()\` не влияют на это. Преобразование в число работает по другому алгоритму.`,
  },
  // Chapter 1.2, Q14.
  {
    id: "fe-1.2-flip-empty-input",
    visual: { motif: "conversion" },
    type: "flip",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-14-что-такое-explicit-и-implicit-coercion",
    question: `## Почему пустой ввод нужно проверять до Number()?`,
    answer: `## Ответ

\`Number("")\` и \`Number(" ")\` дают \`0\`. После преобразования (conversion) они неотличимы от допустимого числового нуля.

Сначала проверь исходный тип, пустоту и формат, затем преобразуй и проверь числовой контракт.`,
  },
  // Chapter 1.2, Q15.
  {
    id: "fe-1.2-flip-plus-choice",
    visual: { motif: "conversion" },
    type: "flip",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-15-почему-оператор--особенно-опасен-для-mental-model",
    question: `## Когда бинарный + выбирает конкатенацию?`,
    answer: `## Ответ

После \`ToPrimitive\`, если хотя бы один результат — строка.

Оба примитива преобразуются к строкам, но Symbol может вызвать \`TypeError\`. Если строк нет, выбирается числовая ветка, где смешивание Number и BigInt запрещено.`,
  },
  // Chapter 1.2, Q16.
  {
    id: "fe-1.2-flip-ordering-equality",
    visual: { motif: "conversion" },
    type: "flip",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-16-как-работают-сравнения-----с-разными-типами",
    question: `## Почему null >= 0 истинно, а null == 0 ложно?`,
    answer: `## Ответ

Сравнение порядка (relational comparison) в этом случае преобразует \`null\` в \`0\`.

У loose equality другая ветвь: \`null\` не равен числу \`0\`. Нельзя выводить результат одного оператора из правил другого.`,
  },
  // Chapter 1.2, Q17.
  {
    id: "fe-1.2-flip-primitive-hints",
    visual: { motif: "conversion" },
    type: "flip",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-17-как-toprimitive-valueof-и-tostring-связаны-с-coercion",
    question: `## Какой порядок методов у обычного ToPrimitive?`,
    answer: `## Ответ

Без \`Symbol.toPrimitive\`: для hint \`"string"\` — \`toString()\` → \`valueOf()\`, для \`"number"\` — наоборот.

Первый примитив завершает поиск; объект заставляет попробовать следующий метод. Без примитивного результата — \`TypeError\`.`,
  },
  // Chapter 1.2, Q17.
  {
    id: "fe-1.2-flip-hook-result",
    visual: { motif: "conversion" },
    type: "flip",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-17-как-toprimitive-valueof-и-tostring-связаны-с-coercion",
    question: `## Что будет, если Symbol.toPrimitive вернёт объект?`,
    answer: `## Ответ

Сразу \`TypeError\`. Запасного вызова \`valueOf()\` или \`toString()\` не будет.

Специальный метод обязан вернуть примитив (primitive). Это отличается от обычного алгоритма перебора двух методов.`,
  },
  // Chapter 1.2, Q18.
  {
    id: "fe-1.2-flip-prediction-first",
    visual: { motif: "conversion" },
    type: "flip",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-18-как-системно-решать-output-prediction-задачи-на-values-и-coercion",
    question: `## С чего начинать задачу на результат выражения?`,
    answer: `## Ответ

Определи типы значений, общие object identities и порядок операций. Проверь short-circuit, затем правила конкретного оператора.

Запиши промежуточные преобразования. Не своди всё к Number и не запускай ToPrimitive там, где он не нужен.`,
  },
];
