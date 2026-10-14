import type { QuizCardData } from "./card-types";

// JOI-38: handbook section 1.2; authored 2026-10-13.
// Source links use verified GitHub heading anchors.
// Integrated and browser-validated on 2026-10-13.
// 51 quiz cards.
export const feSection1_2QuizCards: QuizCardData[] = [
  // Chapter 1.2, Q2.
  {
    id: "fe-1.2-quiz-primitive-copy",
    type: "quiz",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-2-чем-primitive-value-отличается-от-object-value",
    question: `## Что появится в консоли?

~~~js
const a = "cat";
let b = a;
b = b.toUpperCase();
console.log(a);
~~~`,
    options: [
      {
        id: "option-1",
        text: "CAT",
        explanation: "Метод возвращает новую строку. Переменная a не переназначалась.",
      },
      {
        id: "option-2",
        text: "TypeError",
        explanation: "Переназначение let b разрешено. Неизменяемость относится к самой строке.",
      },
      {
        id: "option-3",
        text: "undefined",
        explanation: "a содержит исходную строку cat; значение не исчезает.",
      },
      {
        id: "option-4",
        text: "cat",
        explanation: "Копирование примитива и переназначение b не меняют строку в a.",
      },
    ],
    correctOptionId: "option-4",
  },
  // Chapter 1.2, Q3.
  {
    id: "fe-1.2-quiz-shared-mutation",
    type: "quiz",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-3-чем-mutation-отличается-от-reassignment-и-почему-появляется-shared-state",
    question: `## Что появится в консоли?

~~~js
const a = { count: 1 };
const b = a;
b.count = 2;
console.log(a.count, a === b);
~~~`,
    options: [
      {
        id: "option-1",
        text: "1 / false",
        explanation: "Присваивание b = a не создаёт копию объекта: поля и identity общие.",
      },
      {
        id: "option-2",
        text: "2 / false",
        explanation: "Мутация поля не создаёт новый объект, поэтому a === b истинно.",
      },
      {
        id: "option-3",
        text: "2 / true",
        explanation: "Обе переменные обозначают один объект. Мутация не меняет его identity.",
      },
      {
        id: "option-4",
        text: "1 / true",
        explanation: "Identity общая, поэтому изменение через b видно и через a.",
      },
    ],
    correctOptionId: "option-3",
  },
  // Chapter 1.2, Q3.
  {
    id: "fe-1.2-quiz-nested-copy",
    type: "quiz",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-3-чем-mutation-отличается-от-reassignment-и-почему-появляется-shared-state",
    question: `## Что появится в консоли?

~~~js
const a = { n: { value: 1 } };
const b = { ...a };
console.log(a === b, a.n === b.n);
~~~`,
    options: [
      {
        id: "option-1",
        text: "true / false",
        explanation: "Внешние объекты разные, а вложенный n общий — наоборот.",
      },
      {
        id: "option-2",
        text: "false / true",
        explanation: "Поверхностная копия меняет внешнюю identity, но сохраняет вложенную.",
      },
      {
        id: "option-3",
        text: "false / false",
        explanation: "Вложенный объект n не копируется автоматически.",
      },
      {
        id: "option-4",
        text: "true / true",
        explanation: "Spread создал новый внешний объект: a !== b.",
      },
    ],
    correctOptionId: "option-2",
  },
  // Chapter 1.2, Q4.
  {
    id: "fe-1.2-quiz-argument-reassignment",
    type: "quiz",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-4-javascript-передаёт-объекты-по-значению-или-по-ссылке",
    question: `## Что появится в консоли?

~~~js
function update(x) {
  x.value = 2;
  x = { value: 3 };
}
const a = { value: 1 };
update(a);
console.log(a.value);
~~~`,
    options: [
      {
        id: "option-1",
        text: "2",
        explanation: "Мутация затронула общий объект, а присваивание параметру осталось локальным.",
      },
      {
        id: "option-2",
        text: "TypeError",
        explanation: "Параметр можно переназначить. Ошибки здесь нет.",
      },
      {
        id: "option-3",
        text: "3",
        explanation: "Новый объект записан только в параметр x. Внешняя переменная a не заменена.",
      },
      {
        id: "option-4",
        text: "1",
        explanation: "x.value = 2 меняет тот же объект, к которому обращается a.",
      },
    ],
    correctOptionId: "option-1",
  },
  // Chapter 1.2, Q5.
  {
    id: "fe-1.2-quiz-typeof-categories",
    type: "quiz",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-5-что-показывает-typeof-и-где-он-вводит-в-заблуждение",
    question: `## Что появится в консоли?

~~~js
console.log(typeof null, typeof []);
~~~`,
    options: [
      {
        id: "option-1",
        text: "null / array",
        explanation: "typeof не возвращает строки null и array.",
      },
      {
        id: "option-2",
        text: "object / object",
        explanation: "Это результаты typeof. При этом null — примитив, а массив — объект.",
      },
      {
        id: "option-3",
        text: "undefined / object",
        explanation: "null имеет исторический результат typeof: object.",
      },
      {
        id: "option-4",
        text: "object / array",
        explanation: "Массив для typeof относится к object; для точной проверки есть Array.isArray().",
      },
    ],
    correctOptionId: "option-2",
  },
  // Chapter 1.2, Q5.
  {
    id: "fe-1.2-quiz-own-undefined",
    type: "quiz",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-5-что-показывает-typeof-и-где-он-вводит-в-заблуждение",
    question: `## Что появится в консоли?

~~~js
const x = { value: undefined };
console.log(
  x.value === undefined,
  Object.hasOwn(x, "value")
);
~~~`,
    options: [
      {
        id: "option-1",
        text: "false / false",
        explanation: "Свойство value явно присутствует, поэтому hasOwn вернёт true.",
      },
      {
        id: "option-2",
        text: "true / false",
        explanation: "Чтение даёт undefined, а hasOwn видит существующее собственное свойство.",
      },
      {
        id: "option-3",
        text: "false / true",
        explanation: "hasOwn даст true, но чтение x.value тоже равно undefined: первое сравнение истинно.",
      },
      {
        id: "option-4",
        text: "true / true",
        explanation: "И чтение, и наличие совпали с условиями: оба результата true.",
      },
    ],
    correctOptionId: "option-4",
  },
  // Chapter 1.2, Q6.
  {
    id: "fe-1.2-quiz-symbol-registry",
    visual: { motif: "equality" },
    type: "quiz",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-6-зачем-нужны-symbol-и-bigint",
    question: `## Что появится в консоли?

~~~js
console.log(
  Symbol("x") === Symbol("x"),
  Symbol.for("x") === Symbol.for("x")
);
~~~`,
    options: [
      {
        id: "option-1",
        text: "false / false",
        explanation: "Symbol.for с одинаковым ключом возвращает тот же символ.",
      },
      {
        id: "option-2",
        text: "true / true",
        explanation: "Одинаковое описание не объединяет два обычных Symbol.",
      },
      {
        id: "option-3",
        text: "true / false",
        explanation: "Обычные символы различаются; реестр, наоборот, сохраняет идентичность по ключу.",
      },
      {
        id: "option-4",
        text: "false / true",
        explanation: "Обычный Symbol создаёт уникальное значение, Symbol.for повторно находит символ по ключу.",
      },
    ],
    correctOptionId: "option-4",
  },
  // Chapter 1.2, Q6.
  {
    id: "fe-1.2-quiz-symbol-string",
    visual: { motif: "conversion" },
    type: "quiz",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-6-зачем-нужны-symbol-и-bigint",
    question: `## Как завершится фрагмент?

~~~js
console.log("" + Symbol("x"));
~~~`,
    options: [
      {
        id: "option-1",
        text: "SyntaxError",
        explanation: "Синтаксис допустим. Ошибка возникает при выполнении преобразования.",
      },
      {
        id: "option-2",
        text: "Symbol(x)",
        explanation: "Такой результат даст явный String(Symbol(\"x\")), но не конкатенация.",
      },
      {
        id: "option-3",
        text: "NaN",
        explanation: "Выбрана строковая ветка +, однако Symbol нельзя неявно преобразовать в строку.",
      },
      {
        id: "option-4",
        text: "TypeError",
        explanation: "Неявное строковое преобразование примитива Symbol запрещено.",
      },
    ],
    correctOptionId: "option-4",
  },
  // Chapter 1.2, Q6.
  {
    id: "fe-1.2-quiz-bigint-division",
    type: "quiz",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-6-зачем-нужны-symbol-и-bigint",
    question: `## Что появится в консоли?

~~~js
console.log(-5n / 2n);
~~~`,
    options: [
      {
        id: "option-1",
        text: "TypeError",
        explanation: "Оба операнда — BigInt, поэтому деление разрешено.",
      },
      {
        id: "option-2",
        text: "-2.5",
        explanation: "BigInt хранит целые значения и не возвращает дробь Number.",
      },
      {
        id: "option-3",
        text: "-2n",
        explanation: "Результат -2.5 усекается к нулю до -2n.",
      },
      {
        id: "option-4",
        text: "-3n",
        explanation: "Деление BigInt отбрасывает дробную часть к нулю, а не округляет вниз.",
      },
    ],
    correctOptionId: "option-3",
  },
  // Chapter 1.2, Q6.
  {
    id: "fe-1.2-quiz-mixed-numeric",
    visual: { motif: "conversion" },
    type: "quiz",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-6-зачем-нужны-symbol-и-bigint",
    question: `## Как завершится фрагмент?

~~~js
console.log(1n + 2);
~~~`,
    options: [
      {
        id: "option-1",
        text: "12",
        explanation: "Строкового операнда нет. Конкатенация не выбирается.",
      },
      {
        id: "option-2",
        text: "3",
        explanation: "BigInt не преобразуется в Number автоматически для сложения.",
      },
      {
        id: "option-3",
        text: "TypeError",
        explanation: "В числовой ветке + нельзя смешивать BigInt и Number.",
      },
      {
        id: "option-4",
        text: "3n",
        explanation: "Number 2 не преобразуется в BigInt автоматически для сложения.",
      },
    ],
    correctOptionId: "option-3",
  },
  // Chapter 1.2, Q6.
  {
    id: "fe-1.2-quiz-bigint-comparison",
    visual: { motif: "equality" },
    type: "quiz",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-6-зачем-нужны-symbol-и-bigint",
    question: `## Что появится в консоли?

~~~js
console.log(1n === 1, 1n < 2);
~~~`,
    options: [
      {
        id: "option-1",
        text: "false / true",
        explanation: "=== различает типы, а сравнение порядка допускает Number и BigInt.",
      },
      {
        id: "option-2",
        text: "false / TypeError",
        explanation: "Смешанные типы запрещены в этой арифметике, но не в таком сравнении порядка.",
      },
      {
        id: "option-3",
        text: "true / false",
        explanation: "1n и 1 различаются по типу; 1n меньше 2.",
      },
      {
        id: "option-4",
        text: "true / true",
        explanation: "=== не преобразует 1n в Number: первое сравнение ложно.",
      },
    ],
    correctOptionId: "option-1",
  },
  // Chapter 1.2, Q7.
  {
    id: "fe-1.2-quiz-nan-checks",
    visual: { motif: "conversion" },
    type: "quiz",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-7-что-особенного-в-nan-infinity-и--0",
    question: `## Что появится в консоли?

~~~js
console.log(Number.isNaN("bad"), isNaN("bad"));
~~~`,
    options: [
      {
        id: "option-1",
        text: "false / true",
        explanation: "Number.isNaN проверяет значение, глобальная isNaN сначала преобразует его.",
      },
      {
        id: "option-2",
        text: "true / true",
        explanation: "Number.isNaN не преобразует строку в число.",
      },
      {
        id: "option-3",
        text: "false / false",
        explanation: "Глобальная isNaN преобразует bad в NaN и вернёт true.",
      },
      {
        id: "option-4",
        text: "TypeError",
        explanation: "Преобразование этой строки даёт NaN, а не исключение.",
      },
    ],
    correctOptionId: "option-1",
  },
  // Chapter 1.2, Q7.
  {
    id: "fe-1.2-quiz-finite-checks",
    type: "quiz",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-7-что-особенного-в-nan-infinity-и--0",
    question: `## Что появится в консоли?

~~~js
console.log(
  Number.isFinite("42"),
  Number.isFinite(Infinity)
);
~~~`,
    options: [
      {
        id: "option-1",
        text: "true / false",
        explanation: "Строка 42 не является Number, несмотря на числовой вид.",
      },
      {
        id: "option-2",
        text: "false / false",
        explanation: "Метод принимает только конечные значения типа number.",
      },
      {
        id: "option-3",
        text: "true / true",
        explanation: "Number.isFinite не преобразует строку и не принимает Infinity.",
      },
      {
        id: "option-4",
        text: "false / true",
        explanation: "Infinity — число, но не конечное.",
      },
    ],
    correctOptionId: "option-2",
  },
  // Chapter 1.2, Q7.
  {
    id: "fe-1.2-quiz-negative-zero",
    visual: { motif: "equality" },
    type: "quiz",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-7-что-особенного-в-nan-infinity-и--0",
    question: `## Что появится в консоли?

~~~js
console.log(0 === -0, Object.is(0, -0));
~~~`,
    options: [
      {
        id: "option-1",
        text: "false / true",
        explanation: "Правила противоположны: === объединяет нули, а Object.is различает.",
      },
      {
        id: "option-2",
        text: "false / false",
        explanation: "Для === значения 0 и -0 равны.",
      },
      {
        id: "option-3",
        text: "true / false",
        explanation: "=== объединяет знаки нуля, Object.is использует SameValue и различает их.",
      },
      {
        id: "option-4",
        text: "true / true",
        explanation: "Object.is различает знаки нуля.",
      },
    ],
    correctOptionId: "option-3",
  },
  // Chapter 1.2, Q8.
  {
    id: "fe-1.2-quiz-float-sum",
    type: "quiz",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-8-почему-01--02--03-и-как-сравнивать-дроби",
    question: `## Что появится в консоли?

~~~js
console.log(0.1 + 0.2 === 0.3);
~~~`,
    options: [
      {
        id: "option-1",
        text: "false",
        explanation: "Сумма равна 0.30000000000000004 из-за приближённого двоичного представления.",
      },
      {
        id: "option-2",
        text: "TypeError",
        explanation: "Операции разрешены. Отличие вызвано числовым представлением.",
      },
      {
        id: "option-3",
        text: "NaN",
        explanation: "Все операнды — числа; результат сравнения boolean, а не NaN.",
      },
      {
        id: "option-4",
        text: "true",
        explanation: "Десятичные дроби представлены приближённо; эта сумма не равна Number 0.3.",
      },
    ],
    correctOptionId: "option-1",
  },
  // Chapter 1.2, Q8.
  {
    id: "fe-1.2-quiz-epsilon-policy",
    type: "quiz",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-8-почему-01--02--03-и-как-сравнивать-дроби",
    question: `## Как выбирать допуск для сравнения дробей?`,
    options: [
      {
        id: "option-1",
        text: "По масштабу и требованиям задачи",
        explanation: "Абсолютный и относительный допуски выбирают по предметной области.",
      },
      {
        id: "option-2",
        text: "Округлить все числа до целых",
        explanation: "Так можно потерять значимые для задачи дробные данные.",
      },
      {
        id: "option-3",
        text: "Всегда ровно Number.EPSILON",
        explanation: "EPSILON характеризует точность около 1 и не подходит всем масштабам.",
      },
      {
        id: "option-4",
        text: "Заменить === на Object.is",
        explanation: "Object.is тоже не выполняет приближённое сравнение дробей.",
      },
    ],
    correctOptionId: "option-1",
  },
  // Chapter 1.2, Q9.
  {
    id: "fe-1.2-quiz-truthy-values",
    type: "quiz",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-9-что-такое-truthy-falsy-и-nullish-values",
    question: `## Что появится в консоли?

~~~js
console.log(Boolean([]), Boolean("0"));
~~~`,
    options: [
      {
        id: "option-1",
        text: "true / false",
        explanation: "Непустая строка 0 — truthy, независимо от её числового смысла.",
      },
      {
        id: "option-2",
        text: "false / false",
        explanation: "Ни пустой массив, ни непустая строка не являются falsy.",
      },
      {
        id: "option-3",
        text: "true / true",
        explanation: "Обычный объект и непустая строка истинны в boolean-контексте.",
      },
      {
        id: "option-4",
        text: "false / true",
        explanation: "Пустой массив — объект и остаётся truthy.",
      },
    ],
    correctOptionId: "option-3",
  },
  // Chapter 1.2, Q9.
  {
    id: "fe-1.2-quiz-wrapper-boolean",
    type: "quiz",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-9-что-такое-truthy-falsy-и-nullish-values",
    question: `## Что появится в консоли?

~~~js
console.log(Boolean(new Boolean(false)));
~~~`,
    options: [
      {
        id: "option-1",
        text: "false",
        explanation: "new Boolean(false) создаёт объект; его boolean-преобразование истинно.",
      },
      {
        id: "option-2",
        text: "undefined",
        explanation: "Boolean возвращает примитивный boolean, а не undefined.",
      },
      {
        id: "option-3",
        text: "TypeError",
        explanation: "Создание обёртки разрешено, хотя для обычного флага она не нужна.",
      },
      {
        id: "option-4",
        text: "true",
        explanation: "Обёртка Boolean — truthy-объект, даже если хранит false.",
      },
    ],
    correctOptionId: "option-4",
  },
  // Chapter 1.2, Q10.
  {
    id: "fe-1.2-quiz-default-zero",
    type: "quiz",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-10-что-значит-short-circuit-evaluation-и-что-возвращают---",
    question: `## Что появится в консоли?

~~~js
console.log(0 || 3, 0 ?? 3);
~~~`,
    options: [
      {
        id: "option-1",
        text: "0 / 0",
        explanation: "|| выбирает правый операнд, потому что 0 — falsy.",
      },
      {
        id: "option-2",
        text: "0 / 3",
        explanation: "Операторы работают наоборот: || заменяет 0, ?? сохраняет.",
      },
      {
        id: "option-3",
        text: "3 / 3",
        explanation: "?? реагирует только на null и undefined, а не на 0.",
      },
      {
        id: "option-4",
        text: "3 / 0",
        explanation: "|| заменяет falsy-ноль, а ?? сохраняет его, поскольку он не nullish.",
      },
    ],
    correctOptionId: "option-4",
  },
  // Chapter 1.2, Q10.
  {
    id: "fe-1.2-quiz-nullish-nan",
    type: "quiz",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-10-что-значит-short-circuit-evaluation-и-что-возвращают---",
    question: `## Что появится в консоли?

~~~js
console.log(Number.isNaN(NaN ?? 3));
~~~`,
    options: [
      {
        id: "option-1",
        text: "true",
        explanation: "?? не является валидацией числа: NaN сохраняется.",
      },
      {
        id: "option-2",
        text: "TypeError",
        explanation: "NaN — допустимое значение для обоих выражений.",
      },
      {
        id: "option-3",
        text: "false",
        explanation: "NaN не nullish, поэтому ?? сохраняет его и Number.isNaN вернёт true.",
      },
      {
        id: "option-4",
        text: "3",
        explanation: "В консоль передаётся boolean от Number.isNaN, а не число.",
      },
    ],
    correctOptionId: "option-1",
  },
  // Chapter 1.2, Q10.
  {
    id: "fe-1.2-quiz-short-circuit-effects",
    type: "quiz",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-10-что-значит-short-circuit-evaluation-и-что-возвращают---",
    question: `## Что появится в консоли?

~~~js
let calls = 0;
"ready" || ++calls;
0 && ++calls;
console.log(calls);
~~~`,
    options: [
      {
        id: "option-1",
        text: "0",
        explanation: "ready — truthy для ||, а 0 — falsy для &&. Оба инкремента пропущены.",
      },
      {
        id: "option-2",
        text: "1",
        explanation: "Ни одной правой части не требуется вычисление.",
      },
      {
        id: "option-3",
        text: "2",
        explanation: "Оба оператора останавливаются на левом значении.",
      },
      {
        id: "option-4",
        text: "undefined",
        explanation: "calls явно содержит число 0.",
      },
    ],
    correctOptionId: "option-1",
  },
  // Chapter 1.2, Q10.
  {
    id: "fe-1.2-quiz-logical-results",
    type: "quiz",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-10-что-значит-short-circuit-evaluation-и-что-возвращают---",
    question: `## Что появится в консоли?

~~~js
console.log(true && "ready", 0 && "hidden");
~~~`,
    options: [
      {
        id: "option-1",
        text: "ready / 0",
        explanation: "&& возвращает правое значение при truthy слева и левое при falsy.",
      },
      {
        id: "option-2",
        text: "ready / false",
        explanation: "Во второй операции возвращается сам 0, а не false.",
      },
      {
        id: "option-3",
        text: "true / 0",
        explanation: "В первой операции возвращается строка ready, а не true.",
      },
      {
        id: "option-4",
        text: "true / false",
        explanation: "Операторы возвращают выбранные значения, не обязательно boolean.",
      },
    ],
    correctOptionId: "option-1",
  },
  // Chapter 1.2, Q10.
  {
    id: "fe-1.2-quiz-coalesce-grouping",
    type: "quiz",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-10-что-значит-short-circuit-evaluation-и-что-возвращают---",
    question: `## Как завершится фрагмент?

~~~js
console.log(0 ?? 2 || 3);
~~~`,
    options: [
      {
        id: "option-1",
        text: "3",
        explanation: "Такой результат даст (0 ?? 2) || 3, но исходная запись запрещена.",
      },
      {
        id: "option-2",
        text: "SyntaxError",
        explanation: "Без скобок смешивать ?? с || запрещено синтаксисом.",
      },
      {
        id: "option-3",
        text: "TypeError",
        explanation: "До вычисления типов дело не дойдёт: запись синтаксически неверна.",
      },
      {
        id: "option-4",
        text: "0",
        explanation: "Такой результат даст 0 ?? (2 || 3), но здесь нет обязательных скобок.",
      },
    ],
    correctOptionId: "option-2",
  },
  // Chapter 1.2, Q10.
  {
    id: "fe-1.2-quiz-conditional-assignment",
    type: "quiz",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-10-что-значит-short-circuit-evaluation-и-что-возвращают---",
    question: `## Что появится в консоли?

~~~js
let a = 0;
let b = 0;
a ??= 3;
b ||= 3;
console.log(a, b);
~~~`,
    options: [
      {
        id: "option-1",
        text: "0 / 0",
        explanation: "||= заменяет 0, потому что он falsy.",
      },
      {
        id: "option-2",
        text: "0 / 3",
        explanation: "??= проверяет nullish, а ||= — все falsy значения.",
      },
      {
        id: "option-3",
        text: "3 / 3",
        explanation: "??= сохраняет 0, потому что он не nullish.",
      },
      {
        id: "option-4",
        text: "3 / 0",
        explanation: "Критерии операторов перепутаны: ??= уже, чем ||=.",
      },
    ],
    correctOptionId: "option-2",
  },
  // Chapter 1.2, Q11.
  {
    id: "fe-1.2-quiz-optional-gap",
    type: "quiz",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-11-что-делает-optional-chaining-и-где-прекращается-защита",
    question: `## Как завершится фрагмент?

~~~js
const user = { profile: null };
console.log(user?.profile.name);
~~~`,
    options: [
      {
        id: "option-1",
        text: "ReferenceError",
        explanation: "Имя user объявлено. Ошибка связана с доступом к свойству null.",
      },
      {
        id: "option-2",
        text: "TypeError",
        explanation: "?. защищает user, но не profile. Перед .name нужна отдельная optional-граница.",
      },
      {
        id: "option-3",
        text: "null",
        explanation: "Выражение пытается прочитать поле name, а не просто вернуть profile.",
      },
      {
        id: "option-4",
        text: "undefined",
        explanation: "user существует. Незащищённый доступ .name выполняется у null.",
      },
    ],
    correctOptionId: "option-2",
  },
  // Chapter 1.2, Q11.
  {
    id: "fe-1.2-quiz-optional-continuous",
    type: "quiz",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-11-что-делает-optional-chaining-и-где-прекращается-защита",
    question: `## Что появится в консоли?

~~~js
const data = null;
console.log(data?.a.b);
~~~`,
    options: [
      {
        id: "option-1",
        text: "null",
        explanation: "Результат остановленной optional chain — undefined, а не null.",
      },
      {
        id: "option-2",
        text: "TypeError",
        explanation: "При null слева вся непрерывная цепочка data?.a.b останавливается.",
      },
      {
        id: "option-3",
        text: "ReferenceError",
        explanation: "Переменная data объявлена и доступна.",
      },
      {
        id: "option-4",
        text: "undefined",
        explanation: "Цепочка остановлена на data; доступы .a и .b не выполняются.",
      },
    ],
    correctOptionId: "option-4",
  },
  // Chapter 1.2, Q11.
  {
    id: "fe-1.2-quiz-optional-grouping",
    type: "quiz",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-11-что-делает-optional-chaining-и-где-прекращается-защита",
    question: `## Как завершится фрагмент?

~~~js
const data = null;
console.log((data?.a).b);
~~~`,
    options: [
      {
        id: "option-1",
        text: "TypeError",
        explanation: "Скобки завершили optional chain. Затем .b читается у undefined.",
      },
      {
        id: "option-2",
        text: "undefined",
        explanation: "Скобки разрывают цепочку; следующий доступ .b уже не защищён.",
      },
      {
        id: "option-3",
        text: "SyntaxError",
        explanation: "Скобки разрешены. Ошибка возникает во время обычного доступа к свойству.",
      },
      {
        id: "option-4",
        text: "null",
        explanation: "Остановленная цепочка возвращает undefined, затем доступ .b вызывает ошибку.",
      },
    ],
    correctOptionId: "option-1",
  },
  // Chapter 1.2, Q11.
  {
    id: "fe-1.2-quiz-optional-callability",
    type: "quiz",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-11-что-делает-optional-chaining-и-где-прекращается-защита",
    question: `## Как завершится фрагмент?

~~~js
const api = { run: "later" };
console.log(api.run?.());
~~~`,
    options: [
      {
        id: "option-1",
        text: "ReferenceError",
        explanation: "Имя api и свойство run существуют; проблема в вызываемости значения.",
      },
      {
        id: "option-2",
        text: "TypeError",
        explanation: "?.() не делает существующее невызываемое значение функцией.",
      },
      {
        id: "option-3",
        text: "later",
        explanation: "Строка не функция, её нельзя вызвать.",
      },
      {
        id: "option-4",
        text: "undefined",
        explanation: "Опциональный вызов пропускает только nullish, а строка существует.",
      },
    ],
    correctOptionId: "option-2",
  },
  // Chapter 1.2, Q11.
  {
    id: "fe-1.2-quiz-optional-key-effects",
    type: "quiz",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-11-что-делает-optional-chaining-и-где-прекращается-защита",
    question: `## Что появится в консоли?

~~~js
let index = 0;
const items = null;
items?.[index++];
console.log(index);
~~~`,
    options: [
      {
        id: "option-1",
        text: "undefined",
        explanation: "В консоль передаётся index, а не результат optional chain.",
      },
      {
        id: "option-2",
        text: "0",
        explanation: "Цепочка остановилась до вычисления ключа; побочный эффект не произошёл.",
      },
      {
        id: "option-3",
        text: "TypeError",
        explanation: "?. защищает доступ к null, поэтому ошибки нет.",
      },
      {
        id: "option-4",
        text: "1",
        explanation: "При nullish items вычисление ключа index++ пропускается.",
      },
    ],
    correctOptionId: "option-2",
  },
  // Chapter 1.2, Q11.
  {
    id: "fe-1.2-quiz-optional-contract",
    type: "quiz",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-11-что-делает-optional-chaining-и-где-прекращается-защита",
    question: `## Что optional chaining НЕ подавляет?`,
    options: [
      {
        id: "option-1",
        text: "Доступ к null слева от ?.",
        explanation: "Именно такую границу ?. обрабатывает, возвращая undefined.",
      },
      {
        id: "option-2",
        text: "Доступ к undefined слева от ?.",
        explanation: "Это один из двух случаев остановки optional chain.",
      },
      {
        id: "option-3",
        text: "Отсутствующий метод при method?.()",
        explanation: "При null или undefined опциональный вызов просто пропускается.",
      },
      {
        id: "option-4",
        text: "Исключение внутри вызванной функции",
        explanation: "?. проверяет отсутствие значения; исключения реально выполненного кода выходят наружу.",
      },
    ],
    correctOptionId: "option-4",
  },
  // Chapter 1.2, Q12.
  {
    id: "fe-1.2-quiz-samevalue-nan",
    visual: { motif: "equality" },
    type: "quiz",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-12-какие-семантики-равенства-есть-в-javascript",
    question: `## Что появится в консоли?

~~~js
console.log(NaN === NaN, Object.is(NaN, NaN));
~~~`,
    options: [
      {
        id: "option-1",
        text: "false / false",
        explanation: "Object.is специально считает NaN равным NaN.",
      },
      {
        id: "option-2",
        text: "true / true",
        explanation: "Строгое равенство NaN с самим собой ложно.",
      },
      {
        id: "option-3",
        text: "true / false",
        explanation: "Правила обратные: === даёт false, Object.is — true.",
      },
      {
        id: "option-4",
        text: "false / true",
        explanation: "=== не считает NaN равным себе; Object.is использует SameValue и считает.",
      },
    ],
    correctOptionId: "option-4",
  },
  // Chapter 1.2, Q12.
  {
    id: "fe-1.2-quiz-nan-search",
    visual: { motif: "equality" },
    type: "quiz",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-12-какие-семантики-равенства-есть-в-javascript",
    question: `## Что появится в консоли?

~~~js
console.log(
  [NaN].includes(NaN),
  [NaN].indexOf(NaN)
);
~~~`,
    options: [
      {
        id: "option-1",
        text: "false / 0",
        explanation: "Поведение перепутано: includes находит NaN, indexOf не находит.",
      },
      {
        id: "option-2",
        text: "true / -1",
        explanation: "includes находит NaN благодаря SameValueZero; indexOf — нет.",
      },
      {
        id: "option-3",
        text: "false / -1",
        explanation: "includes использует SameValueZero и находит NaN.",
      },
      {
        id: "option-4",
        text: "true / 0",
        explanation: "indexOf не находит NaN при своей семантике сравнения.",
      },
    ],
    correctOptionId: "option-2",
  },
  // Chapter 1.2, Q12.
  {
    id: "fe-1.2-quiz-set-identity",
    visual: { motif: "equality" },
    type: "quiz",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-12-какие-семантики-равенства-есть-в-javascript",
    question: `## Что появится в консоли?

~~~js
const a = { id: 1 };
console.log(new Set([a, a, { id: 1 }]).size);
~~~`,
    options: [
      {
        id: "option-1",
        text: "3",
        explanation: "Повторная передача той же ссылки a не добавляет новый элемент.",
      },
      {
        id: "option-2",
        text: "4",
        explanation: "В массиве три элемента, а две ссылки a ещё и объединяются.",
      },
      {
        id: "option-3",
        text: "2",
        explanation: "Set объединяет две ссылки a, но сохраняет отдельный объект с теми же полями.",
      },
      {
        id: "option-4",
        text: "1",
        explanation: "Поля не сравниваются глубоко. Два литерала создают разные объекты.",
      },
    ],
    correctOptionId: "option-3",
  },
  // Chapter 1.2, Q12.
  {
    id: "fe-1.2-quiz-map-zero",
    visual: { motif: "equality" },
    type: "quiz",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-12-какие-семантики-равенства-есть-в-javascript",
    question: `## Что появится в консоли?

~~~js
const map = new Map();
map.set(0, "plus");
map.set(-0, "minus");
console.log(map.size, map.get(0));
~~~`,
    options: [
      {
        id: "option-1",
        text: "1 / plus",
        explanation: "Вторая запись по равному ключу заменяет значение на minus.",
      },
      {
        id: "option-2",
        text: "2 / plus",
        explanation: "Map не различает знаки нуля при выборе ключа.",
      },
      {
        id: "option-3",
        text: "2 / minus",
        explanation: "Значение minus верно, но ключ остался один.",
      },
      {
        id: "option-4",
        text: "1 / minus",
        explanation: "Map объединяет 0 и -0 как ключи; вторая запись заменяет первую.",
      },
    ],
    correctOptionId: "option-4",
  },
  // Chapter 1.2, Q13.
  {
    id: "fe-1.2-quiz-loose-null",
    visual: { motif: "equality" },
    type: "quiz",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-13-когда--преобразует-типы-и-можно-ли-его-использовать-осознанно",
    question: `## Что появится в консоли?

~~~js
console.log(null == undefined, null == 0);
~~~`,
    options: [
      {
        id: "option-1",
        text: "true / true",
        explanation: "== не преобразует null в 0 в этом сравнении.",
      },
      {
        id: "option-2",
        text: "true / false",
        explanation: "null и undefined loosely equal; null с Number 0 — нет.",
      },
      {
        id: "option-3",
        text: "false / false",
        explanation: "Для null и undefined в == есть специальная ветвь равенства.",
      },
      {
        id: "option-4",
        text: "false / true",
        explanation: "Правила перепутаны: null равен undefined, но не числу 0.",
      },
    ],
    correctOptionId: "option-2",
  },
  // Chapter 1.2, Q13.
  {
    id: "fe-1.2-quiz-loose-boolean",
    visual: { motif: "equality" },
    type: "quiz",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-13-когда--преобразует-типы-и-можно-ли-его-использовать-осознанно",
    question: `## Что появится в консоли?

~~~js
console.log("0" == false);
~~~`,
    options: [
      {
        id: "option-1",
        text: "undefined",
        explanation: "Оператор равенства возвращает boolean.",
      },
      {
        id: "option-2",
        text: "true",
        explanation: "Boolean false → 0, строка 0 → 0, затем числа равны.",
      },
      {
        id: "option-3",
        text: "false",
        explanation: "В == false превращается в 0, затем строка 0 тоже становится числом 0.",
      },
      {
        id: "option-4",
        text: "TypeError",
        explanation: "Такие преобразования примитивов разрешены.",
      },
    ],
    correctOptionId: "option-2",
  },
  // Chapter 1.2, Q14.
  {
    id: "fe-1.2-quiz-number-input",
    visual: { motif: "conversion" },
    type: "quiz",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-14-что-такое-explicit-и-implicit-coercion",
    question: `## Что появится в консоли?

~~~js
console.log(Number(" "), Number("42px"));
~~~`,
    options: [
      {
        id: "option-1",
        text: "0 / NaN",
        explanation: "Number принимает пробельную строку как 0, но отвергает суффикс px.",
      },
      {
        id: "option-2",
        text: "NaN / 0",
        explanation: "Пробельная строка даёт 0, а строка с px не является целиком числовой записью.",
      },
      {
        id: "option-3",
        text: "NaN / NaN",
        explanation: "Пробельная строка преобразуется в 0.",
      },
      {
        id: "option-4",
        text: "0 / 42",
        explanation: "Number не извлекает числовой префикс из строки 42px.",
      },
    ],
    correctOptionId: "option-1",
  },
  // Chapter 1.2, Q14.
  {
    id: "fe-1.2-quiz-unary-bigint",
    visual: { motif: "conversion" },
    type: "quiz",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-14-что-такое-explicit-и-implicit-coercion",
    question: `## Как завершится фрагмент?

~~~js
console.log(+1n);
~~~`,
    options: [
      {
        id: "option-1",
        text: "1",
        explanation: "Явный Number(1n) дал бы 1, но унарный плюс имеет другие ограничения.",
      },
      {
        id: "option-2",
        text: "SyntaxError",
        explanation: "Синтаксис корректен. Ошибка возникает при числовом преобразовании.",
      },
      {
        id: "option-3",
        text: "TypeError",
        explanation: "Унарный плюс не принимает BigInt.",
      },
      {
        id: "option-4",
        text: "1n",
        explanation: "Унарный плюс требует преобразования в Number, которое здесь запрещено.",
      },
    ],
    correctOptionId: "option-3",
  },
  // Chapter 1.2, Q14.
  {
    id: "fe-1.2-quiz-boolean-hook",
    visual: { motif: "conversion" },
    type: "quiz",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-14-что-такое-explicit-и-implicit-coercion",
    question: `## Что появится в консоли?

~~~js
let calls = 0;
const x = { valueOf() { calls++; return 0; } };
console.log(Boolean(x), calls);
~~~`,
    options: [
      {
        id: "option-1",
        text: "false / 1",
        explanation: "Boolean не использует valueOf для определения истинности объекта.",
      },
      {
        id: "option-2",
        text: "true / 0",
        explanation: "Boolean обычного объекта всегда true; valueOf не вызывается.",
      },
      {
        id: "option-3",
        text: "false / 0",
        explanation: "Обычный объект truthy, даже если его valueOf мог бы вернуть 0.",
      },
      {
        id: "option-4",
        text: "true / 1",
        explanation: "Результат true верен, но вызова valueOf не будет.",
      },
    ],
    correctOptionId: "option-2",
  },
  // Chapter 1.2, Q14.
  {
    id: "fe-1.2-quiz-input-boundary",
    visual: { motif: "conversion" },
    type: "quiz",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-14-что-такое-explicit-и-implicit-coercion",
    question: `## Пустой ввод запрещён. Что проверить ДО Number(input)?`,
    options: [
      {
        id: "option-1",
        text: "Только input !== null",
        explanation: "Пустая и пробельная строки всё ещё пройдут.",
      },
      {
        id: "option-2",
        text: "Только Number.isFinite(Number(input))",
        explanation: "Пустая строка станет 0, который является конечным числом.",
      },
      {
        id: "option-3",
        text: "Тип и непустую строку после trim",
        explanation: "После преобразования пустой ввод уже неотличим от допустимого нуля.",
      },
      {
        id: "option-4",
        text: "Только Number.isNaN(input)",
        explanation: "Для строки этот метод вернёт false и не проверит её допустимость.",
      },
    ],
    correctOptionId: "option-3",
  },
  // Chapter 1.2, Q15.
  {
    id: "fe-1.2-quiz-plus-order",
    visual: { motif: "conversion" },
    type: "quiz",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-15-почему-оператор--особенно-опасен-для-mental-model",
    question: `## Что появится в консоли?

~~~js
console.log(1 + 2 + "3", "1" + 2 + 3);
~~~`,
    options: [
      {
        id: "option-1",
        text: "33 / 33",
        explanation: "Во втором выражении конкатенация начинается уже с первого сложения.",
      },
      {
        id: "option-2",
        text: "123 / 123",
        explanation: "В первом выражении 1 и 2 сначала складываются как числа.",
      },
      {
        id: "option-3",
        text: "33 / 123",
        explanation: "+ группируется слева направо: в первом случае сначала 3, во втором сразу строка.",
      },
      {
        id: "option-4",
        text: "6 / 6",
        explanation: "Наличие строки выбирает конкатенацию, а не сумму всех трёх чисел.",
      },
    ],
    correctOptionId: "option-3",
  },
  // Chapter 1.2, Q15.
  {
    id: "fe-1.2-quiz-plus-versus-minus",
    visual: { motif: "conversion" },
    type: "quiz",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-15-почему-оператор--особенно-опасен-для-mental-model",
    question: `## Что появится в консоли?

~~~js
console.log("5" + 2, "5" - 2);
~~~`,
    options: [
      {
        id: "option-1",
        text: "7 / 3",
        explanation: "Для + строка выбирает конкатенацию, поэтому первый результат 52.",
      },
      {
        id: "option-2",
        text: "52 / 52",
        explanation: "У - нет строковой ветки конкатенации.",
      },
      {
        id: "option-3",
        text: "52 / 3",
        explanation: "+ конкатенирует со строкой, а - преобразует строку к числу.",
      },
      {
        id: "option-4",
        text: "TypeError",
        explanation: "Оба оператора допускают эти преобразования строки.",
      },
    ],
    correctOptionId: "option-3",
  },
  // Chapter 1.2, Q16.
  {
    id: "fe-1.2-quiz-relational-strings",
    visual: { motif: "conversion" },
    type: "quiz",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-16-как-работают-сравнения-----с-разными-типами",
    question: `## Что появится в консоли?

~~~js
console.log("2" < "10", "2" < 10);
~~~`,
    options: [
      {
        id: "option-1",
        text: "false / true",
        explanation: "Две строки сравниваются лексикографически; строка с числом — численно.",
      },
      {
        id: "option-2",
        text: "true / true",
        explanation: "В первом выражении обе стороны строки: 2 лексикографически больше 10.",
      },
      {
        id: "option-3",
        text: "false / false",
        explanation: "Во втором выражении строка 2 преобразуется в число.",
      },
      {
        id: "option-4",
        text: "true / false",
        explanation: "Нужно сначала определить типы: первое сравнение строковое, второе числовое.",
      },
    ],
    correctOptionId: "option-1",
  },
  // Chapter 1.2, Q16.
  {
    id: "fe-1.2-quiz-null-ordering",
    visual: { motif: "conversion" },
    type: "quiz",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-16-как-работают-сравнения-----с-разными-типами",
    question: `## Что появится в консоли?

~~~js
console.log(null == 0, null >= 0);
~~~`,
    options: [
      {
        id: "option-1",
        text: "false / false",
        explanation: "Сравнение >= преобразует null в 0, и 0 >= 0 истинно.",
      },
      {
        id: "option-2",
        text: "false / true",
        explanation: "== и >= используют разные алгоритмы: null не равен 0, но численно даёт 0 для >=.",
      },
      {
        id: "option-3",
        text: "TypeError",
        explanation: "Оба сравнения допустимы и возвращают boolean.",
      },
      {
        id: "option-4",
        text: "true / true",
        explanation: "Равенство null с 0 ложно: == здесь не делает числовое преобразование.",
      },
    ],
    correctOptionId: "option-2",
  },
  // Chapter 1.2, Q16.
  {
    id: "fe-1.2-quiz-nan-ordering",
    visual: { motif: "conversion" },
    type: "quiz",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-16-как-работают-сравнения-----с-разными-типами",
    question: `## Что появится в консоли?

~~~js
console.log(NaN < 1, NaN >= 1);
~~~`,
    options: [
      {
        id: "option-1",
        text: "true / false",
        explanation: "NaN не образует обычный числовой порядок.",
      },
      {
        id: "option-2",
        text: "false / true",
        explanation: "С NaN выражение >= тоже ложно; это не отрицание результата <.",
      },
      {
        id: "option-3",
        text: "true / true",
        explanation: "Оба сравнения с NaN ложны.",
      },
      {
        id: "option-4",
        text: "false / false",
        explanation: "Сравнения порядка с NaN дают false, включая >= и <=.",
      },
    ],
    correctOptionId: "option-4",
  },
  // Chapter 1.2, Q17.
  {
    id: "fe-1.2-quiz-primitive-methods",
    visual: { motif: "conversion" },
    type: "quiz",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-17-как-toprimitive-valueof-и-tostring-связаны-с-coercion",
    question: `## Что появится в консоли?

~~~js
const x = {
  valueOf: () => 7,
  toString: () => "seven",
};
console.log(Number(x), String(x));
~~~`,
    options: [
      {
        id: "option-1",
        text: "7 / seven",
        explanation: "Number начинает с valueOf, String — с toString.",
      },
      {
        id: "option-2",
        text: "TypeError",
        explanation: "Оба метода возвращают примитивы, преобразование успешно.",
      },
      {
        id: "option-3",
        text: "7 / 7",
        explanation: "Строковая подсказка заставляет начать с toString.",
      },
      {
        id: "option-4",
        text: "seven / seven",
        explanation: "Number использует числовую подсказку и сначала вызывает valueOf.",
      },
    ],
    correctOptionId: "option-1",
  },
  // Chapter 1.2, Q17.
  {
    id: "fe-1.2-quiz-primitive-fallback",
    visual: { motif: "conversion" },
    type: "quiz",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-17-как-toprimitive-valueof-и-tostring-связаны-с-coercion",
    question: `## Что появится в консоли?

~~~js
const x = {
  valueOf: () => ({}),
  toString: () => "8",
};
console.log(Number(x));
~~~`,
    options: [
      {
        id: "option-1",
        text: "NaN",
        explanation: "toString возвращает числовую строку 8, успешно преобразуемую в Number.",
      },
      {
        id: "option-2",
        text: "[object Object]",
        explanation: "Для Number нужен числовой результат; здесь выбран пользовательский toString.",
      },
      {
        id: "option-3",
        text: "8",
        explanation: "valueOf вернул объект; обычный алгоритм пробует toString, затем Number преобразует строку 8.",
      },
      {
        id: "option-4",
        text: "TypeError",
        explanation: "В обычном алгоритме объект из valueOf допускает попытку toString.",
      },
    ],
    correctOptionId: "option-3",
  },
  // Chapter 1.2, Q17.
  {
    id: "fe-1.2-quiz-hook-no-fallback",
    visual: { motif: "conversion" },
    type: "quiz",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-17-как-toprimitive-valueof-и-tostring-связаны-с-coercion",
    question: `## Как завершится фрагмент?

~~~js
const x = {
  [Symbol.toPrimitive]: () => ({}),
  valueOf: () => 7,
};
console.log(Number(x));
~~~`,
    options: [
      {
        id: "option-1",
        text: "NaN",
        explanation: "Неподходящий результат специального метода вызывает исключение, а не NaN.",
      },
      {
        id: "option-2",
        text: "7",
        explanation: "После объекта из Symbol.toPrimitive нет перехода к valueOf.",
      },
      {
        id: "option-3",
        text: "TypeError",
        explanation: "Symbol.toPrimitive обязан вернуть примитив. Возвращённый объект сразу вызывает ошибку.",
      },
      {
        id: "option-4",
        text: "SyntaxError",
        explanation: "Синтаксис метода разрешён; ошибка возникает при преобразовании.",
      },
    ],
    correctOptionId: "option-3",
  },
  // Chapter 1.2, Q17.
  {
    id: "fe-1.2-quiz-default-hint",
    visual: { motif: "conversion" },
    type: "quiz",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-17-как-toprimitive-valueof-и-tostring-связаны-с-coercion",
    question: `## Что появится в консоли?

~~~js
const x = {
  [Symbol.toPrimitive]: hint => hint,
};
console.log(x + 1);
~~~`,
    options: [
      {
        id: "option-1",
        text: "1",
        explanation: "Метод возвращает непустую строку default, она не исчезает.",
      },
      {
        id: "option-2",
        text: "number1",
        explanation: "Бинарный + вызывает ToPrimitive с подсказкой default, а не number.",
      },
      {
        id: "option-3",
        text: "NaN",
        explanation: "Метод возвращает строку, поэтому выбирается конкатенация.",
      },
      {
        id: "option-4",
        text: "default1",
        explanation: "Метод вернул строку default, после чего + конкатенирует её с 1.",
      },
    ],
    correctOptionId: "option-4",
  },
  // Chapter 1.2, Q17.
  {
    id: "fe-1.2-quiz-array-puzzle",
    visual: { motif: "conversion" },
    type: "quiz",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-17-как-toprimitive-valueof-и-tostring-связаны-с-coercion",
    question: `## Что появится в консоли?

~~~js
console.log([] == ![]);
~~~`,
    options: [
      {
        id: "option-1",
        text: "false",
        explanation: "![] даёт false, затем == приводит false и пустой массив к нулю.",
      },
      {
        id: "option-2",
        text: "undefined",
        explanation: "Равенство возвращает boolean после преобразований.",
      },
      {
        id: "option-3",
        text: "true",
        explanation: "![] → false → 0; левый [] → пустая строка → 0. В итоге 0 == 0.",
      },
      {
        id: "option-4",
        text: "TypeError",
        explanation: "Эта цепочка неявных преобразований разрешена.",
      },
    ],
    correctOptionId: "option-3",
  },
  // Chapter 1.2, Q18.
  {
    id: "fe-1.2-quiz-coercion-review",
    visual: { motif: "conversion" },
    type: "quiz",
    readMoreUrl: "https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md#-18-как-системно-решать-output-prediction-задачи-на-values-и-coercion",
    question: `## Как разбирать спорное выражение с преобразованиями?`,
    options: [
      {
        id: "option-1",
        text: "Типы → оператор → преобразования → результат",
        explanation: "Учитывай также identity, порядок и short-circuit, затем формулируй вывод для прикладного кода.",
      },
      {
        id: "option-2",
        text: "Считать == и >= одинаковыми",
        explanation: "Равенство и порядок используют разные алгоритмы, особенно заметные на null.",
      },
      {
        id: "option-3",
        text: "Все объекты заранее заменить на true",
        explanation: "Boolean-контекст и ToPrimitive работают по разным правилам.",
      },
      {
        id: "option-4",
        text: "Сначала привести всё к Number",
        explanation: "Оператор может выбрать строковую ветку или вообще не преобразовывать значения.",
      },
    ],
    correctOptionId: "option-1",
  },
];
