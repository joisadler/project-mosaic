import type { InfoCardData } from "./card-types";

// JOI-38: handbook section 1.2; authored 2026-10-13.
// Source links use verified GitHub heading anchors.
// Integrated and browser-validated on 2026-10-13.
// 39 info cards.
export const feSection1_2InfoCards: InfoCardData[] = [
  // Chapter 1.2, Q1.
  {
    id: "fe-1.2-info-value-type",
    type: "info",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-1-что-такое-значение-и-где-у-него-тип",
    pages: [
      `## Тип относится к значению

Значение (value) имеет тип (type). Имя переменной не закрепляет runtime-тип навсегда: одна привязка может последовательно хранить число и строку.

~~~js
let result = 42;
result = "done";
console.log(typeof result);
// "string"
~~~`,
      `## Две группы значений

Примитивы (primitives): \`undefined\`, \`null\`, \`boolean\`, \`number\`, \`bigint\`, \`string\`, \`symbol\`.

Объекты (objects): обычные объекты, массивы, функции, даты. Функция тоже объект, хотя \`typeof\` выделяет её строкой \`"function"\`.`,
    ],
  },
  // Chapter 1.2, Q2.
  {
    id: "fe-1.2-info-primitive-immutable",
    type: "info",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-2-чем-primitive-value-отличается-от-object-value",
    pages: [
      `## Строка не меняется изнутри

Неизменяемость (immutability) примитива означает, что операция возвращает другое значение. Исходная строка сохраняется.

~~~js
const text = "cat";
text.toUpperCase();
console.log(text); // "cat"
~~~`,
      `## Сохранить результат

Переназначение (reassignment) меняет значение в переменной, а не старую строку. Для него нужна изменяемая привязка.

~~~js
let text = "cat";
text = text.toUpperCase();
console.log(text); // "CAT"
~~~`,
    ],
  },
  // Chapter 1.2, Q2.
  {
    id: "fe-1.2-info-object-identity",
    visual: { motif: "equality" },
    type: "info",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-2-чем-primitive-value-отличается-от-object-value",
    pages: [
      `## Одинаковые поля ≠ один объект

Идентичность (identity) отличает конкретный объект от другого. Сравнение \`===\` не обходит его поля.

~~~js
const a = { id: 1 };
const b = { id: 1 };
console.log(a === b); // false
~~~`,
      `## Изменение сохраняет identity

Присваивание объектного значения другой переменной сохраняет доступ к тому же объекту.

~~~js
const a = { id: 1 };
const b = a;
b.id = 2;
console.log(a === b); // true
console.log(a.id); // 2
~~~`,
    ],
  },
  // Chapter 1.2, Q3.
  {
    id: "fe-1.2-info-mutation-reassignment",
    type: "info",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-3-чем-mutation-отличается-от-reassignment-и-почему-появляется-shared-state",
    pages: [
      `## Изменить объект или заменить его?

Мутация (mutation) меняет существующий объект. Переназначение (reassignment) записывает другое значение в привязку.

Если две переменные видят один объект, мутация видна обеим. Переназначение одной переменной не переназначает другую.`,
      `## Бывшие соседи расходятся

~~~js
let current = { count: 1 };
const saved = current;
current = { count: 2 };
console.log(saved.count); // 1
console.log(current === saved); // false
~~~

Новый объект получил другую идентичность (identity).`,
    ],
  },
  // Chapter 1.2, Q3.
  {
    id: "fe-1.2-info-shallow-copy",
    type: "info",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-3-чем-mutation-отличается-от-reassignment-и-почему-появляется-shared-state",
    pages: [
      `## Копия только снаружи

Поверхностная копия (shallow copy) через spread создаёт новый внешний объект. Вложенные объекты остаются общими.

~~~js
const a = { net: { retries: 2 } };
const b = { ...a };
console.log(a === b); // false
console.log(a.net === b.net); // true
~~~`,
      `## Проверь уровень изменения

~~~js
const a = { net: { retries: 2 } };
const b = { ...a };
b.net.retries = 5;
console.log(a.net.retries); // 5
~~~

Чтобы изменить \`net\` независимо, скопируй и этот уровень. Полное глубокое копирование — отдельная задача, не свойство spread.`,
    ],
  },
  // Chapter 1.2, Q4.
  {
    id: "fe-1.2-info-pass-by-value",
    type: "info",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-4-javascript-передаёт-объекты-по-значению-или-по-ссылке",
    pages: [
      `## Копируется значение аргумента

Передача по значению (pass-by-value) действует и для объектов. Параметр получает собственную привязку к тому же объекту.

Изменение поля видно вызывающему коду. Присваивание нового объекта параметру меняет только локальную привязку.`,
      `## Мутация видна, замена — нет

~~~js
function update(item) {
  item.count = 2;
  item = { count: 3 };
}
const original = { count: 1 };
update(original);
console.log(original.count); // 2
~~~`,
      `## Как вернуть замену

Если функция должна заменить значение снаружи, верни результат и явно присвой его.

~~~js
function replace(item) {
  return { ...item, count: 3 };
}
let item = { count: 1 };
item = replace(item);
console.log(item.count); // 3
~~~`,
    ],
  },
  // Chapter 1.2, Q5.
  {
    id: "fe-1.2-info-typeof-classification",
    type: "info",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-5-что-показывает-typeof-и-где-он-вводит-в-заблуждение",
    pages: [
      `## typeof даёт грубую классификацию

\`typeof\` возвращает строку с runtime-категорией. Он не различает все виды объектов.

~~~js
console.log(typeof null);
// "object"
console.log(typeof []);
// "object"
console.log(typeof NaN);
// "number"
console.log(typeof (() => {}));
// "function"
~~~`,
      `## Выбирай точную проверку

\`null\` — примитив (primitive), несмотря на исторический результат \`typeof null\`.

Для массива используй \`Array.isArray(value)\`, для \`null\` — \`value === null\`, для \`NaN\` — \`Number.isNaN(value)\`.

Одного \`typeof value === "object"\` недостаточно для проверки структуры данных.`,
    ],
  },
  // Chapter 1.2, Q5.
  {
    id: "fe-1.2-info-absence-contract",
    type: "info",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-5-что-показывает-typeof-и-где-он-вводит-в-заблуждение",
    pages: [
      `## Отсутствие — часть контракта

\`undefined\` часто означает, что значение не предоставлено. \`null\` обычно обозначает намеренное отсутствие.

Это соглашение API, а не гарантия языка. Заранее реши, различаются ли пропущенное поле, \`undefined\` и \`null\`.`,
      `## Поле есть, но значение undefined

Проверка собственного свойства (own property) отличается от проверки его значения.

~~~js
const a = {};
const b = { value: undefined };
console.log(Object.hasOwn(a, "value")); // false
console.log(Object.hasOwn(b, "value")); // true
~~~`,
    ],
  },
  // Chapter 1.2, Q6.
  {
    id: "fe-1.2-info-symbol-identity",
    visual: { motif: "equality" },
    type: "info",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-6-зачем-нужны-symbol-и-bigint",
    pages: [
      `## Описание Symbol не является ключом

Каждый обычный вызов \`Symbol()\` создаёт уникальный примитив (primitive). Одинаковое описание не делает значения равными.

~~~js
console.log(Symbol("id") === Symbol("id")); // false
~~~`,
      `## Реестр — отдельный механизм

\`Symbol.for()\` использует глобальный реестр (global registry): одинаковый ключ возвращает тот же символ.

~~~js
const a = Symbol.for("id");
const b = Symbol.for("id");
console.log(a === b); // true
~~~

Символы могут служить ключами свойств без совпадений со строковыми именами.`,
    ],
  },
  // Chapter 1.2, Q6.
  {
    id: "fe-1.2-info-symbol-conversion",
    visual: { motif: "conversion" },
    type: "info",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-6-зачем-нужны-symbol-и-bigint",
    pages: [
      `## Symbol в строку — явно

Явное преобразование (explicit conversion) \`String(symbol)\` разрешено.

~~~js
const token = Symbol("token");
console.log(String(token));
// "Symbol(token)"
~~~

Шаблонная строка и конкатенация с \`""\` используют другие правила.`,
      `## Неявное преобразование запрещено

Преобразование типов (coercion) при сложении со строкой не умеет автоматически превращать примитив Symbol в строку.

~~~js
const token = Symbol("token");
console.log("" + token); // TypeError
~~~

Для отображения символа используй \`String(token)\`.`,
    ],
  },
  // Chapter 1.2, Q6.
  {
    id: "fe-1.2-info-bigint-model",
    type: "info",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-6-зачем-нужны-symbol-и-bigint",
    pages: [
      `## BigInt хранит целые

\`BigInt\` нужен для целых чисел за пределами безопасного диапазона (safe integer range) \`Number\`.

~~~js
const id = 9007199254740993n;
console.log(typeof id); // "bigint"
console.log(5n / 2n); // 2n
~~~

Деление отбрасывает дробную часть к нулю.`,
      `## Одна арифметическая модель

Смешивание \`Number\` и \`BigInt\` при сложении вызывает \`TypeError\`. Выбери тип явно.

~~~js
console.log(1n + BigInt(2)); // 3n
console.log(1n === 1); // false
console.log(1n < 2); // true
~~~

Сравнения допускают случаи, запрещённые в арифметике.`,
      `## Преобразование может терять точность

Большой \`BigInt\` при переводе в \`Number\` может округлиться. Создавай точные большие целые из строк или литералов \`n\`.

~~~js
const id = BigInt("9007199254740993");
console.log(id); // 9007199254740993n
~~~

Уже округлённый \`Number\` нельзя «починить» последующим \`BigInt()\`.`,
    ],
  },
  // Chapter 1.2, Q7.
  {
    id: "fe-1.2-info-nan-validation",
    type: "info",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-7-что-особенного-в-nan-infinity-и--0",
    pages: [
      `## NaN остаётся числом

\`NaN\` — числовое значение для неудачного числового результата. Оно не равно себе при строгом равенстве (strict equality).

~~~js
console.log(typeof NaN); // "number"
console.log(NaN === NaN); // false
console.log(Number.isNaN(NaN)); // true
~~~`,
      `## Проверка или преобразование?

\`Number.isNaN()\` проверяет само значение. Глобальная \`isNaN()\` сначала преобразует аргумент в число.

~~~js
console.log(Number.isNaN("bad")); // false
console.log(isNaN("bad")); // true
console.log(isNaN("")); // false
~~~

Последний результат связан с преобразованием пустой строки в \`0\`.`,
    ],
  },
  // Chapter 1.2, Q7.
  {
    id: "fe-1.2-info-finite-numbers",
    type: "info",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-7-что-особенного-в-nan-infinity-и--0",
    pages: [
      `## Не NaN — ещё не подходящее число

\`Infinity\` и \`-Infinity\` имеют тип \`number\`. Отсутствие \`NaN\` не доказывает, что число конечное (finite).

~~~js
console.log(1 / 0); // Infinity
console.log(Infinity - Infinity); // NaN
~~~`,
      `## Валидация конечного Number

\`Number.isFinite()\` не преобразует вход. Она принимает только конечные значения типа \`number\`.

~~~js
console.log(Number.isFinite(42)); // true
console.log(Number.isFinite("42")); // false
console.log(Number.isFinite(Infinity)); // false
~~~

Диапазон и целочисленность проверяй отдельно по контракту.`,
    ],
  },
  // Chapter 1.2, Q7.
  {
    id: "fe-1.2-info-signed-zero",
    visual: { motif: "equality" },
    type: "info",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-7-что-особенного-в-nan-infinity-и--0",
    pages: [
      `## Два знака нуля

Знаковый ноль (signed zero) наблюдаем в некоторых операциях, хотя \`===\` объединяет \`0\` и \`-0\`.

~~~js
console.log(0 === -0); // true
console.log(Object.is(0, -0)); // false
console.log(1 / -0); // -Infinity
~~~`,
      `## Сначала требования

В обычном счётчике различать знаки нуля обычно не нужно. В математическом API знак может быть важен.

\`Object.is()\` использует SameValue и различает эти значения. Это причина выбрать его для конкретного контракта, а не заменить им все сравнения.`,
    ],
  },
  // Chapter 1.2, Q8.
  {
    id: "fe-1.2-info-binary-fractions",
    type: "info",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-8-почему-01--02--03-и-как-сравнивать-дроби",
    pages: [
      `## Десятичная дробь в двоичном формате

\`Number\` использует двоичную плавающую точку (binary floating-point) IEEE 754. Многие десятичные дроби хранятся приближённо.

~~~js
console.log(0.1 + 0.2); // 0.30000000000000004
console.log(0.1 + 0.2 === 0.3); // false
~~~`,
      `## Это ограничение представления

Не каждое десятичное значение помещается в конечное число двоичных разрядов.

Если задача допускает погрешность, сравнивай с обоснованным допуском (tolerance). Если нужна точная десятичная арифметика, выбери соответствующую модель данных.`,
    ],
  },
  // Chapter 1.2, Q8.
  {
    id: "fe-1.2-info-floating-tolerance",
    type: "info",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-8-почему-01--02--03-и-как-сравнивать-дроби",
    pages: [
      `## EPSILON не универсальная погрешность

\`Number.EPSILON\` — расстояние между \`1\` и следующим представимым числом (representable number).

Для других масштабов и прикладных требований этот допуск может не подойти. Его нельзя механически подставлять во все сравнения дробей.`,
      `## Два вида допуска

Абсолютный допуск (absolute tolerance) задаёт допустимую разницу около нуля. Относительный (relative tolerance) учитывает масштаб чисел.

Для конечных входов сравнивают \`abs(a - b)\` с максимумом абсолютного допуска и относительного допуска, умноженного на \`max(abs(a), abs(b))\`.`,
      `## Обработай особые значения

Сначала можно проверить \`a === b\`: это учтёт одинаковые числа и одинаковые бесконечности.

Затем отклонить оставшиеся неконечные значения через \`Number.isFinite()\`. Только после этого вычислять разницу.

Размер допусков задаёт контракт: пиксели и физические измерения требуют разных правил.`,
    ],
  },
  // Chapter 1.2, Q8.
  {
    id: "fe-1.2-info-money-contract",
    type: "info",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-8-почему-01--02--03-и-как-сравнивать-дроби",
    pages: [
      `## Сумма в минимальных единицах

Для фиксированного масштаба храни целые минимальные единицы валюты (minor units), если они помещаются в безопасный диапазон.

~~~js
const priceInCents = 1099;
console.log(priceInCents * 3); // 3297
~~~

Проверяй \`Number.isSafeInteger()\` для итоговых сумм.`,
      `## Округление — часть модели

Согласуй валюту, масштаб, момент и правило округления налогов и скидок.

\`toFixed()\` возвращает строку и не определяет бизнес-правила. Для больших целых подходит \`BigInt\`; для точных дробных расчётов может понадобиться десятичная модель (decimal model).`,
    ],
  },
  // Chapter 1.2, Q9.
  {
    id: "fe-1.2-info-falsy-nullish",
    type: "info",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-9-что-такое-truthy-falsy-и-nullish-values",
    pages: [
      `## Falsy и nullish — разные группы

Ложные значения (falsy): \`false\`, \`0\`, \`-0\`, \`0n\`, \`NaN\`, \`""\`, \`null\`, \`undefined\`.

Отсутствующие значения (nullish): только \`null\` и \`undefined\`.

\`0\`, \`false\` и пустая строка могут быть полноценными данными. Проверка на отсутствие не должна их автоматически отбрасывать.`,
      `## Пустой объект остаётся truthy

Обычные объекты истинны в логическом контексте (truthy), включая пустые массивы и обёртку Boolean.

~~~js
console.log(Boolean([])); // true
console.log(Boolean({})); // true
console.log(Boolean(new Boolean(false))); // true
~~~

Редкое legacy-исключение браузера — \`document.all\`.`,
    ],
  },
  // Chapter 1.2, Q10.
  {
    id: "fe-1.2-info-logical-operands",
    type: "info",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-10-что-значит-short-circuit-evaluation-и-что-возвращают---",
    pages: [
      `## Логические операторы возвращают значения

\`||\` возвращает первый истинный (truthy) операнд либо последний. \`&&\` — первый ложный (falsy) либо последний.

Результат не обязан быть boolean.

~~~js
console.log("Ada" || "Guest");
// "Ada"
console.log(0 && "ready");
// 0
~~~`,
      `## Правая часть может не выполниться

Короткое замыкание (short-circuit evaluation) пропускает ненужный операнд и его побочные эффекты.

~~~js
let calls = 0;
const result = "ready" || ++calls;
console.log(calls); // 0
console.log(result); // "ready"
~~~`,
    ],
  },
  // Chapter 1.2, Q10.
  {
    id: "fe-1.2-info-nullish-default",
    type: "info",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-10-что-значит-short-circuit-evaluation-и-что-возвращают---",
    pages: [
      `## Сохрани валидный ноль

Оператор nullish coalescing \`??\` выбирает запасное значение только для \`null\` и \`undefined\`.

~~~js
console.log(0 || 3); // 3
console.log(0 ?? 3); // 0
console.log(false ?? true); // false
~~~

Если ноль означает «не повторять запрос», \`||\` нарушит настройку.`,
      `## Default не заменяет валидацию

\`??\` сохраняет \`NaN\`, пустые строки и значения неверного типа, потому что они не nullish.

~~~js
console.log(Number.isNaN(NaN ?? 3)); // true
~~~

Сначала реши, какие значения валидны. Запасное значение для отсутствующих данных — только одна часть проверки.`,
    ],
  },
  // Chapter 1.2, Q10.
  {
    id: "fe-1.2-info-logical-assignment",
    type: "info",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-10-что-значит-short-circuit-evaluation-и-что-возвращают---",
    pages: [
      `## Присваивать только при необходимости

Логическое присваивание (logical assignment) \`||=\` заменяет falsy, а \`??=\` — только nullish. Правая часть вычисляется лишь при записи.

~~~js
let retries = 0;
retries ??= 3;
console.log(retries); // 0
~~~`,
      `## Группировку нужно указать

Смешивать \`??\` с \`||\` или \`&&\` без скобок нельзя: это \`SyntaxError\`.

~~~js
console.log((0 ?? 2) || 3); // 3
console.log(0 ?? (2 || 3)); // 0
~~~

Скобки явно задают намерение. Выбирай группировку по смыслу, а не ради устранения ошибки.`,
    ],
  },
  // Chapter 1.2, Q11.
  {
    id: "fe-1.2-info-optional-boundary",
    type: "info",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-11-что-делает-optional-chaining-и-где-прекращается-защита",
    pages: [
      `## Защита конкретной границы

Опциональная цепочка (optional chaining) \`?.\` проверяет значение слева на \`null\` или \`undefined\`.

~~~js
const user = { profile: null };
console.log(user?.profile?.name); // undefined
~~~

В \`user?.profile.name\` защита \`user\` не защищает существующий \`profile: null\`.`,
      `## Цепочка может закончиться

Если начальный объект nullish, непрерывная цепочка остановится целиком. Скобки могут прервать эту защиту.

~~~js
const data = null;
console.log(data?.a.b); // undefined
~~~

В \`(data?.a).b\` после \`undefined\` произойдёт обычный доступ \`.b\` и \`TypeError\`.`,
    ],
  },
  // Chapter 1.2, Q11.
  {
    id: "fe-1.2-info-optional-call",
    type: "info",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-11-что-делает-optional-chaining-и-где-прекращается-защита",
    pages: [
      `## Отсутствует или не является функцией?

Опциональный вызов (optional call) \`method?.()\` пропускает вызов только для \`null\` или \`undefined\`.

~~~js
const api = { run: "later" };
api.run?.(); // TypeError
~~~

Существующую строку вызвать нельзя. \`?.()\` не проверяет вызываемость (callability).`,
      `## Защищай нужное значение

\`api?.run()\` проверяет \`api\`. \`api.run?.()\` проверяет \`run\`. \`api?.run?.()\` проверяет оба.

~~~js
const api = {};
console.log(api.run?.()); // undefined
~~~

Ошибка внутри реально вызванной функции всё равно выйдет наружу.`,
    ],
  },
  // Chapter 1.2, Q11.
  {
    id: "fe-1.2-info-optional-effects",
    type: "info",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-11-что-делает-optional-chaining-и-где-прекращается-защита",
    pages: [
      `## Пропускается и вычисление ключа

Короткое замыкание (short-circuit) действует внутри остановленной опциональной цепочки.

~~~js
let index = 0;
const items = null;
items?.[index++];
console.log(index); // 0
~~~`,
      `## Это не обработчик исключений

\`?.\` не скрывает ошибку getter или вызванной функции. Корневое имя должно существовать; необъявленное имя даст \`ReferenceError\`.

Цепочка не может быть целью присваивания: \`user?.name = "Ada"\` — \`SyntaxError\`.

Обязательные поля проверяй явно, чтобы не маскировать нарушение контракта.`,
    ],
  },
  // Chapter 1.2, Q12.
  {
    id: "fe-1.2-info-strict-equality",
    visual: { motif: "equality" },
    type: "info",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-12-какие-семантики-равенства-есть-в-javascript",
    pages: [
      `## Равенство без преобразования

Строгое равенство (strict equality) \`===\` сразу отвергает разные типы. Для объектов оно сравнивает идентичность (identity), а не поля.

~~~js
console.log(0 === "0"); // false
console.log({ id: 1 } === { id: 1 }); // false
~~~`,
      `## Два числовых исключения

~~~js
console.log(NaN === NaN); // false
console.log(0 === -0); // true
~~~

\`===\` подходит как обычный выбор. Для сравнения содержимого объектов нужен отдельный алгоритм по правилам задачи: какие поля важны и как их сравнивать.`,
    ],
  },
  // Chapter 1.2, Q12.
  {
    id: "fe-1.2-info-same-value",
    visual: { motif: "equality" },
    type: "info",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-12-какие-семантики-равенства-есть-в-javascript",
    pages: [
      `## Object.is использует SameValue

По сравнению с \`===\` меняются два случая: \`NaN\` равен себе, а нули разных знаков различаются.

~~~js
console.log(Object.is(NaN, NaN)); // true
console.log(Object.is(0, -0)); // false
~~~`,
      `## Глубокого сравнения всё ещё нет

Для объектов \`Object.is()\` сохраняет сравнение по идентичности (identity).

~~~js
const a = { id: 1 };
console.log(Object.is(a, a)); // true
console.log(Object.is(a, { id: 1 })); // false
~~~

Название метода не означает обход свойств.`,
    ],
  },
  // Chapter 1.2, Q12.
  {
    id: "fe-1.2-info-same-value-zero",
    visual: { motif: "equality" },
    type: "info",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-12-какие-семантики-равенства-есть-в-javascript",
    pages: [
      `## SameValueZero для поиска и коллекций

SameValueZero считает \`NaN\` равным себе и объединяет \`0\` с \`-0\`. Так работают \`includes()\`, значения \`Set\` и ключи \`Map\`.

~~~js
console.log([NaN].includes(NaN)); // true
console.log(new Set([0, -0]).size); // 1
~~~`,
      `## indexOf ведёт себя иначе

~~~js
console.log([NaN].indexOf(NaN)); // -1
console.log(new Set([NaN, NaN]).size); // 1
console.log(new Set([{}, {}]).size); // 2
~~~

\`indexOf()\` не находит \`NaN\`. Объекты в коллекциях всё равно различаются по идентичности (identity).`,
    ],
  },
  // Chapter 1.2, Q13.
  {
    id: "fe-1.2-info-loose-equality",
    visual: { motif: "equality" },
    type: "info",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-13-когда--преобразует-типы-и-можно-ли-его-использовать-осознанно",
    pages: [
      `## == — алгоритм, а не общий Number()

Нестрогое равенство (loose equality) имеет отдельные ветви: boolean превращается в число, строка рядом с числом — в число, объект рядом с подходящим примитивом проходит \`ToPrimitive\`.

~~~js
console.log(false == 0); // true
console.log("5" == 5); // true
~~~`,
      `## Nullish сравниваются особо

~~~js
console.log(null == undefined); // true
console.log(null == 0); // false
~~~

Шаблон \`value == null\` проверяет \`null\` и \`undefined\` для обычных значений. Он допустим при явном соглашении команды; иначе используй две проверки \`===\`.

Legacy-исключение браузера — \`document.all\`.`,
    ],
  },
  // Chapter 1.2, Q13.
  {
    id: "fe-1.2-info-legacy-document-all",
    visual: { motif: "equality" },
    type: "info",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-13-когда--преобразует-типы-и-можно-ли-его-использовать-осознанно",
    pages: [
      `## Исключение ради старого веба

В браузере \`document.all\` — особый объект совместимости (legacy compatibility): он falsy, имеет \`typeof\` со значением \`"undefined"\` и равен \`null\` при \`==\`.

Эти особенности не распространяются на обычные объекты.`,
      `## Узнавать, а не использовать

\`document.all\` не является настоящим \`undefined\`: строгое сравнение с ним ложно.

Это редкий браузерный случай для понимания старого кода. Не используй его для проверки возможностей браузера и не переноси его поведение на \`{}\` или \`[]\`.`,
    ],
  },
  // Chapter 1.2, Q14.
  {
    id: "fe-1.2-info-explicit-conversion",
    visual: { motif: "conversion" },
    type: "info",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-14-что-такое-explicit-и-implicit-coercion",
    pages: [
      `## Явное намерение не равно валидации

Явное преобразование (explicit coercion) видно в \`Number(x)\`, \`String(x)\`, \`Boolean(x)\`. Неявное (implicit coercion) запускают контекст или оператор.

~~~js
console.log(Number("42")); // 42
console.log("5" * 2); // 10
~~~`,
      `## Boolean не спрашивает объект

Логическое преобразование обычного объекта не вызывает \`valueOf()\` или \`toString()\`: результат всегда \`true\`.

~~~js
const value = { valueOf: () => 0 };
console.log(Boolean(value)); // true
console.log(Number(value)); // 0
~~~

Правила зависят от контекста преобразования.`,
    ],
  },
  // Chapter 1.2, Q14.
  {
    id: "fe-1.2-info-number-conversion",
    visual: { motif: "conversion" },
    type: "info",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-14-что-такое-explicit-и-implicit-coercion",
    pages: [
      `## Number принимает больше, чем кажется

При преобразовании типов (coercion) пустая строка, пробелы и \`null\` превращаются в ноль.

~~~js
console.log(Number(" ")); // 0
console.log(Number(null)); // 0
console.log(Number(undefined)); // NaN
console.log(Number("42px")); // NaN
~~~`,
      `## Унарный плюс не полностью равен Number

\`Number(1n)\` явно переводит \`BigInt\` в число, но унарный \`+1n\` вызывает \`TypeError\`.

Преобразование большого \`BigInt\` может потерять точность. \`Number(Symbol())\` тоже вызывает \`TypeError\`.

Определи тип и формат входа до выбора преобразования.`,
    ],
  },
  // Chapter 1.2, Q14.
  {
    id: "fe-1.2-info-numeric-input",
    visual: { motif: "conversion" },
    type: "info",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-14-что-такое-explicit-и-implicit-coercion",
    pages: [
      `## Нормализация на границе

Для внешнего ввода (input boundary) сначала проверь тип, пустоту и разрешённый формат. Затем преобразуй и проверь конечность, диапазон и целочисленность по требованиям.

\`Number.isFinite()\` не отсеет пустую строку, если она уже стала нулём после \`Number()\`.`,
      `## Минимальная проверка строки

~~~js
const input = " ";
const valid = input.trim() !== "" &&
  Number.isFinite(Number(input));
console.log(valid); // false
~~~

Здесь вход уже гарантированно строка. Для строгого десятичного формата нужна отдельная проверка: \`Number()\` принимает и другие записи.`,
    ],
  },
  // Chapter 1.2, Q15.
  {
    id: "fe-1.2-info-plus-branches",
    visual: { motif: "conversion" },
    type: "info",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-15-почему-оператор--особенно-опасен-для-mental-model",
    pages: [
      `## Сначала примитивы, затем ветка

Бинарный \`+\` применяет \`ToPrimitive\`. Если хотя бы один результат — строка, выбирается конкатенация (concatenation). Иначе — числовое сложение.

~~~js
console.log("1" + 2); // "12"
console.log(true + 1); // 2
console.log(null + 1); // 1
~~~`,
      `## Числовые типы должны совпасть

~~~js
console.log(1n + 2n); // 3n
console.log("1" + 2n); // "12"
~~~

Во втором случае выбрана строковая ветка. А \`1n + 2\` вызовет \`TypeError\`: в числовой ветке нельзя смешать \`BigInt\` и \`Number\`.

Примитив Symbol не поддерживает неявное преобразование в строку.`,
    ],
  },
  // Chapter 1.2, Q15.
  {
    id: "fe-1.2-info-plus-order",
    visual: { motif: "conversion" },
    type: "info",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-15-почему-оператор--особенно-опасен-для-mental-model",
    pages: [
      `## Порядок меняет результат

Операции \`+\` группируются слева направо (left associativity).

~~~js
console.log(1 + 2 + "3"); // "33"
console.log("1" + 2 + 3); // "123"
~~~

В первом случае числа успевают сложиться. Во втором строковая конкатенация начинается сразу.`,
      `## Другие операторы требуют чисел

Преобразование типов (coercion) для \`-\`, \`*\` и \`/\` не выбирает строковую конкатенацию.

~~~js
console.log("5" - 2); // 3
console.log("5" * 2); // 10
console.log("5" / 2); // 2.5
~~~

Чтобы намерение было видно, нормализуй строковый ввод до вычислений.`,
    ],
  },
  // Chapter 1.2, Q16.
  {
    id: "fe-1.2-info-relational-comparison",
    visual: { motif: "conversion" },
    type: "info",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-16-как-работают-сравнения-----с-разными-типами",
    pages: [
      `## Две строки сравниваются как строки

Сравнение порядка (relational comparison) двух строк идёт по кодовым единицам UTF-16, а не по их числовому смыслу.

~~~js
console.log("2" < "10"); // false
console.log("2" < 10); // true
console.log(2n < 2.5); // true
~~~`,
      `## Порядок и равенство — разные пути

~~~js
console.log(null == 0); // false
console.log(null >= 0); // true
console.log(NaN < 1); // false
console.log(NaN >= 1); // false
~~~

Не делай вывод о валидности числа из одного сравнения. Например, \`null >= 0\` проходит после преобразования \`null\` в \`0\`.`,
    ],
  },
  // Chapter 1.2, Q17.
  {
    id: "fe-1.2-info-ordinary-to-primitive",
    visual: { motif: "conversion" },
    type: "info",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-17-как-toprimitive-valueof-и-tostring-связаны-с-coercion",
    pages: [
      `## Объект сначала становится примитивом

\`ToPrimitive\` сначала ищет метод \`Symbol.toPrimitive\`. Если его нет, порядок обычных методов зависит от подсказки (hint).

Для \`"number"\`: \`valueOf()\` → \`toString()\`. Для \`"string"\`: наоборот. Первый полученный примитив завершает этот этап.`,
      `## Один объект — разные контексты

~~~js
const amount = {
  valueOf: () => 7,
  toString: () => "seven",
};
console.log(Number(amount));
// 7
console.log(String(amount));
// "seven"
console.log(amount + 1);
// 8
~~~`,
      `## Если метод вернул объект

Обычный алгоритм пробует следующий метод. Если ни один не дал примитив, возникает \`TypeError\`.

Подсказка \`"default"\` без специального метода обычно обрабатывается как \`"number"\`. Стандартный \`Date\` ведёт себя иначе: его метод трактует \`"default"\` как \`"string"\`.`,
    ],
  },
  // Chapter 1.2, Q17.
  {
    id: "fe-1.2-info-primitive-hook",
    visual: { motif: "conversion" },
    type: "info",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-17-как-toprimitive-valueof-и-tostring-связаны-с-coercion",
    pages: [
      `## Symbol.toPrimitive имеет приоритет

Метод получает подсказку (hint) \`"number"\`, \`"string"\` или \`"default"\`. Полученный примитив затем обрабатывается по правилам оператора.

Hint задаёт предпочтение, а не обязательный тип результата. Метод может вернуть любой примитив, но не объект.`,
      `## Бинарный плюс просит default

~~~js
const value = {
  [Symbol.toPrimitive](hint) {
    return hint === "number" ? 10 : 20;
  },
};
console.log(+value); // 10
console.log(value + 1); // 21
~~~`,
      `## Ошибка без запасного пути

Если \`Symbol.toPrimitive\` вернул объект, сразу возникает \`TypeError\`. Перехода к \`valueOf()\` после такого результата нет.

Не путай это с обычным алгоритмом, где объект из \`valueOf()\` позволяет попробовать \`toString()\`.`,
    ],
  },
  // Chapter 1.2, Q17.
  {
    id: "fe-1.2-info-coercion-puzzle",
    visual: { motif: "conversion" },
    type: "info",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-17-как-toprimitive-valueof-и-tostring-связаны-с-coercion",
    pages: [
      `## Почему [] == ![] истинно?

Это упражнение на преобразование типов (coercion), а не образец прикладного кода.

~~~js
console.log([] == ![]); // true
~~~

Сначала \`![]\` даёт \`false\`: пустой массив — truthy-объект.`,
      `## Разверни скрытые шаги

В \`==\` значение \`false\` становится \`0\`. Левый массив проходит \`ToPrimitive\` и даёт пустую строку. Рядом с числом \`""\` превращается в \`0\`.

Остаётся \`0 == 0\`.

Логическая истинность массива и результат его числового преобразования — разные свойства.`,
    ],
  },
  // Chapter 1.2, Q18.
  {
    id: "fe-1.2-info-prediction-method",
    visual: { motif: "conversion" },
    type: "info",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-18-как-системно-решать-output-prediction-задачи-на-values-и-coercion",
    pages: [
      `## Разбор вместо угадывания

Для задачи на результат (output prediction):

1. Выпиши типы и общие объекты.
2. Определи порядок вычислений.
3. Проверь короткое замыкание.
4. Назови правила оператора.
5. Запиши преобразования и результат.

Не применяй \`ToPrimitive\` к объектам автоматически: например, \`===\` и boolean-контекст его не требуют.`,
      `## Заверши инженерным выводом

~~~js
const values = [1];
console.log(values + 2); // "12"
~~~

\`ToPrimitive\` даёт \`"1"\`, затем \`+\` выбирает строковую ветку. В прикладном коде сначала определяй тип данных и явно нормализуй вход, чтобы такой результат был намеренным.`,
    ],
  },
];
