import type { InfoCardData } from "./card-types";
import { feSection1_1ReadMoreUrls } from "./fe-1.1-source-urls";

// Authored for Project Mosaic on 2026-10-11; chapter 1.1 only.
// Source: https://github.com/joisadler/frontend-interview-preparation/blob/7e57113acc5632a5b91fa9062d336c36b60e35b7/handbook/01-javascript-and-async-programming/01-execution-model-declarations-and-scope.md
// App schema/baseline: joisadler/project-mosaic@049221a05ddbab8bae14526bedb11234d6d13dd6.
// Package namespace: fe-1.1. Runtime IDs use fe-1.1-*; exports use feSection1_1*.
// Primary checks: https://tc39.es/ecma262/2026/ and https://nodejs.org/api/modules.html#the-module-wrapper
// Browser-specific examples state their environment; Node VM checks are not Safari/PWA validation.
// 40 info cards.
export const feSection1_1InfoCards: InfoCardData[] = [
  // Chapter 1.1: Q1.
  {
    id: "fe-1.1-info-binding",
    type: "info",
    readMoreUrl: feSection1_1ReadMoreUrls.q1,
    pages: [
      `## Имя → привязка → значение

В \`let count = 1\` есть три вещи: идентификатор (identifier) \`count\`, привязка имени (binding) и значение (value) \`1\`. Привязка связывает имя с текущим значением и правилами доступа.`,
      `## Меняется значение, не имя

Присваивание (assignment) записывает новое значение в уже инициализированную привязку.

~~~js
let count = 1;
count = 2;
console.log(count); // 2
~~~

Одно и то же имя в другом блоке может относиться к другой привязке. Поэтому важно искать не просто слово, а его область.`,
    ],
  },
  // Chapter 1.1: Q2.
  {
    id: "fe-1.1-info-lifecycle",
    visual: { motif: "lifecycle" },
    type: "info",
    readMoreUrl: feSection1_1ReadMoreUrls.q2,
    pages: [
      `## Четыре разных события

Объявление (declaration) сообщает об имени. Создание привязки (binding creation) подготавливает запись. Инициализация (initialization) впервые делает её доступной. Присваивание (assignment) меняет значение позже.`,
      `## Где проходит граница?

При выполнении объявления \`let\` сначала вычисляется инициализатор, затем привязка получает значение. Последующая запись уже является присваиванием.

~~~js
let count = 1; // initialization
count = 2; // assignment
console.log(count); // 2
~~~`,
      `## Заранее создана ≠ готова

У свежей \`var\`-привязки заранее есть \`undefined\`. У \`let\` и \`const\` привязка создана, но до инициализации недоступна. Это временная мёртвая зона (Temporal Dead Zone, TDZ).`,
    ],
  },
  // Chapter 1.1: Q2, Q9.
  {
    id: "fe-1.1-info-let-empty",
    visual: { motif: "lifecycle" },
    type: "info",
    readMoreUrl: feSection1_1ReadMoreUrls.q2,
    pages: [
      `## Без значения — тоже инициализация

\`let value;\` допустимо. Когда выполняется эта строка, привязка (binding) получает \`undefined\`, и временная мёртвая зона (Temporal Dead Zone, TDZ) заканчивается.

~~~js
let value;
console.log(value); // undefined
~~~`,
      `## До строки это не undefined

До выполнения объявления нельзя читать значение или присваивать новое: привязка ещё не инициализирована.

~~~js
value = 5; // ReferenceError
let value;
~~~

Раннее присваивание не заменяет инициализацию объявления.`,
    ],
  },
  // Chapter 1.1: Q1.
  {
    id: "fe-1.1-info-const-object",
    type: "info",
    readMoreUrl: feSection1_1ReadMoreUrls.q1,
    pages: [
      `## const фиксирует привязку

\`const\` запрещает переназначение привязки (binding). Он не запрещает мутацию (mutation) объекта, к которому она даёт доступ.

~~~js
const user = { name: "Ada" };
user.name = "Grace";
console.log(user.name); // "Grace"
~~~`,
      `## Новый объект — уже переназначение

Изменение свойства сохраняет прежний объект. Запись \`user = ...\` пытается заменить значение самой привязки.

~~~js
const user = { name: "Ada" };
user = { name: "Grace" }; // TypeError
~~~

Ошибка возникает при выполнении присваивания; это не ранняя синтаксическая ошибка.`,
    ],
  },
  // Chapter 1.1: Q3.
  {
    id: "fe-1.1-info-choose",
    type: "info",
    readMoreUrl: feSection1_1ReadMoreUrls.q3,
    pages: [
      `## const по умолчанию

Выбирай \`const\`, если привязка (binding) не будет переназначаться. \`let\` нужен, когда повторное присваивание намеренно. Длина массива и поля объекта могут меняться при \`const\`.

~~~js
const items = [];
items.push("first");
console.log(items.length); // 1
~~~`,
      `## let сообщает о намерении

Счётчик или результат пошагового вычисления часто требуют переназначения. Здесь \`let\` делает это намерение видимым.

~~~js
let total = 0;
total += 5;
console.log(total); // 5
~~~

\`var\` стоит понимать для устаревшего кода (legacy) и интервью. Механическая замена может изменить поведение.`,
    ],
  },
  // Chapter 1.1: Q3, Q4.
  {
    id: "fe-1.1-info-var-block",
    type: "info",
    readMoreUrl: feSection1_1ReadMoreUrls.q3,
    pages: [
      `## Обычный блок не удержит var

\`var\` ограничен ближайшей функцией или верхним уровнем скрипта/модуля. Обычный блок (block) \`if\` не создаёт для него отдельную область видимости (scope).

~~~js
function run() {
  if (true) { var message = "ready"; }
  console.log(message); // "ready"
}
run();
~~~`,
      `## Не выполнена ветка, но имя есть

Объявление известно функции заранее. Присваивание в инициализаторе выполняется только при входе в ветку.

~~~js
function run() {
  if (false) { var message = "ready"; }
  console.log(message); // undefined
}
run();
~~~`,
    ],
  },
  // Chapter 1.1: Q4.
  {
    id: "fe-1.1-info-lexical-block",
    type: "info",
    readMoreUrl: feSection1_1ReadMoreUrls.q4,
    pages: [
      `## let и const остаются в блоке

Лексические объявления обычно имеют блочную область видимости (block scope). Снаружи блока их локальные имена недоступны.

~~~js
{ const token = "local"; }
console.log(token); // ReferenceError
~~~`,
      `## Фигурные скобки бывают разными

Блок \`{ ... }\` может создать область для локальных объявлений. Объектный литерал (object literal) лишь создаёт объект.

~~~js
const user = { name: "Ada" };
console.log(user.name); // "Ada"
~~~

Свойство \`name\` не объявляет отдельную переменную \`name\`.`,
    ],
  },
  // Chapter 1.1: Q5.
  {
    id: "fe-1.1-info-lexical-location",
    type: "info",
    readMoreUrl: feSection1_1ReadMoreUrls.q5,
    pages: [
      `## Важно, где функция определена

Лексическая область видимости (lexical scope) связывает функцию с внешними областями места её определения. Место вызова эту цепочку не заменяет.

~~~js
const role = "guest";
const read = () => role;
function run() {
  const role = "admin";
  return read();
}
console.log(run()); // "guest"
~~~`,
      `## Вызывающий код не становится внешним

\`read\` определена снаружи \`run\`. Поэтому локальная \`role\` внутри \`run\` не участвует в поиске имени для \`read\`.

На интервью сначала найди место определения функции, затем пройди её внешние области. Не двигайся по списку вызвавших её функций.`,
    ],
  },
  // Chapter 1.1: Q5, Q11.
  {
    id: "fe-1.1-info-shadow",
    type: "info",
    readMoreUrl: feSection1_1ReadMoreUrls.q5,
    pages: [
      `## Затенение не меняет внешнее

Затенение (shadowing) создаёт во вложенной области отдельную привязку с тем же именем. Поиск находит её первой.

~~~js
let label = "outer";
{
  let label = "inner";
  console.log(label); // "inner"
}
console.log(label); // "outer"
~~~`,
      `## Присваивание — другое действие

Если внутреннего объявления нет, поиск может найти внешнюю привязку. Тогда присваивание меняет именно её.

~~~js
let label = "outer";
{ label = "updated"; }
console.log(label); // "updated"
~~~

Разница — наличие \`let\` внутри блока, а не просто фигурные скобки.`,
    ],
  },
  // Chapter 1.1: Q5, Q9.
  {
    id: "fe-1.1-info-resolution",
    type: "info",
    readMoreUrl: feSection1_1ReadMoreUrls.q5,
    pages: [
      `## Поиск имени идёт наружу

Разрешение идентификатора (identifier resolution): текущая область → внешняя → следующая внешняя. Первое найденное имя останавливает поиск. Это цепочка областей видимости (scope chain).`,
      `## Ближайшая привязка может быть в TDZ

Внутреннее имя скрывает внешнее уже при входе в блок. Временная мёртвая зона (Temporal Dead Zone, TDZ) запрещает чтение; поиск не перескакивает наружу.

~~~js
const state = "outer";
{
  console.log(state); // ReferenceError
  const state = "inner";
}
~~~`,
    ],
  },
  // Chapter 1.1: Q5.
  {
    id: "fe-1.1-info-missing-property",
    type: "info",
    readMoreUrl: feSection1_1ReadMoreUrls.q5,
    pages: [
      `## Нет имени ≠ нет свойства

Чтение неразрешимого идентификатора (identifier) даёт \`ReferenceError\`. Чтение отсутствующего свойства (property) обычного объекта возвращает \`undefined\`.

~~~js
const config = {};
console.log(config.port); // undefined
console.log(mosaicMissing); // ReferenceError
~~~`,
      `## Сначала имя, затем свойство

У \`config.port\` сначала нужно найти привязку \`config\`. Только потом выполняется поиск свойства \`port\`.

~~~js
console.log(mosaicAbsentConfig.port);
// ReferenceError
~~~

Отсутствующее свойство не делает безопасным обращение через отсутствующий объект.`,
    ],
  },
  // Chapter 1.1: Q7.
  {
    id: "fe-1.1-info-context",
    type: "info",
    readMoreUrl: feSection1_1ReadMoreUrls.q7,
    pages: [
      `## Вызов создаёт рабочее состояние

Контекст выполнения (execution context) хранит состояние выполняемого кода. Каждый обычный вызов функции получает свои параметры и локальные привязки.`,
      `## Блок не равен вызову

Обычный блок может добавить область видимости (scope) для \`let\` и \`const\`. Но он не вызывает функцию и не добавляет кадр вызова (stack frame).

~~~js
function render() {
  if (true) {
    const label = "Details";
    console.log(label);
  }
}
render();
~~~`,
    ],
  },
  // Chapter 1.1: Q7.
  {
    id: "fe-1.1-info-environment",
    type: "info",
    readMoreUrl: feSection1_1ReadMoreUrls.q7,
    pages: [
      `## Окружение — модель привязок

Лексическое окружение (lexical environment) описывает, где искать имена. Запись окружения (Environment Record) представляет привязки одного уровня и связь с внешним уровнем.`,
      `## Две ссылки в контексте

\`LexicalEnvironment\` указывает на текущее окружение для поиска имён. \`VariableEnvironment\` связана с размещением \`var\`-объявлений. При входе в блок поиск учитывает его лексические имена; обычный блок не удерживает \`var\`.`,
      `## Не объект, который можно открыть

Environment Record — понятие спецификации. Нельзя получить её как обычный JavaScript-объект или удалить локальную привязку через свойство. Движок вправе оптимизировать внутреннее представление.`,
    ],
  },
  // Chapter 1.1: Q6, Q8.
  {
    id: "fe-1.1-info-hoisting",
    visual: { motif: "lifecycle" },
    type: "info",
    readMoreUrl: feSection1_1ReadMoreUrls.q8,
    pages: [
      `## Строки никуда не переезжают

Подъём объявлений (hoisting) — наблюдаемое поведение подготовки привязок (bindings). Это не физическое перемещение строк исходного кода.`,
      `## Готовность бывает разной

До выполнения обычных инструкций:

- свежая \`var\` уже содержит \`undefined\`;
- \`let\`/\`const\`/\`class\` ещё не инициализированы;
- обычное объявление функции уже содержит функцию.`,
      `## Инициализатор остаётся на месте

Значение справа от \`=\` вычисляется, когда выполнение достигает этой строки.

~~~js
console.log(total); // undefined
var total = 3;
console.log(total); // 3
~~~

На интервью спрашивай: «В каком состоянии привязка сейчас?»`,
    ],
  },
  // Chapter 1.1: Q9.
  {
    id: "fe-1.1-info-tdz-time",
    visual: { motif: "lifecycle" },
    type: "info",
    readMoreUrl: feSection1_1ReadMoreUrls.q9,
    pages: [
      `## TDZ — время, не номер строки

Временная мёртвая зона (Temporal Dead Zone, TDZ) продолжается до инициализации привязки. Функция может быть написана раньше объявления, но читать значение позже.

~~~js
const read = () => value;
let value = 7;
console.log(read()); // 7
~~~`,
      `## Ранний вызов меняет результат

Создание функции не читает \`value\`. Чтение происходит при её вызове.

~~~js
const read = () => value;
console.log(read()); // ReferenceError
let value = 7;
~~~

Проверь момент вызова, а не только расположение функции в исходнике.`,
    ],
  },
  // Chapter 1.1: Q9.
  {
    id: "fe-1.1-info-typeof",
    type: "info",
    readMoreUrl: feSection1_1ReadMoreUrls.q9,
    pages: [
      `## typeof для отсутствующего имени

Если идентификатор (identifier) вообще не найден, \`typeof\` возвращает строку \`"undefined"\`.

~~~js
console.log(typeof mosaicAbsent);
// "undefined"
console.log(typeof typeof mosaicAbsent);
// "string"
~~~

Вывод консоли может скрывать кавычки. Результат оператора — строка, не значение \`undefined\`.`,
      `## typeof не обходит TDZ

Если привязка существует, но находится во временной мёртвой зоне (Temporal Dead Zone, TDZ), оператор бросает \`ReferenceError\`.

~~~js
console.log(typeof later); // ReferenceError
let later;
~~~

Сначала различи: имени совсем нет или оно найдено, но ещё не готово.`,
    ],
  },
  // Chapter 1.1: Q10.
  {
    id: "fe-1.1-info-function-readiness",
    visual: { motif: "lifecycle" },
    type: "info",
    readMoreUrl: feSection1_1ReadMoreUrls.q10,
    pages: [
      `## Объявление функции готово заранее

Обычное объявление функции (function declaration) подготавливает привязку с функцией до выполнения вызова.

~~~js
console.log(ready()); // ok
function ready() { return "ok"; }
~~~`,
      `## Выражение в var ещё не вычислено

Функциональное выражение (function expression) становится значением при выполнении. Ранний \`var\` содержит \`undefined\`.

~~~js
ready(); // TypeError
var ready = function () { return "ok"; };
~~~

Имя найдено. Ошибка в попытке вызвать значение, которое не является функцией.`,
      `## Выражение в const находится в TDZ

До инициализации \`const\` запрещено даже чтение содержащей функцию привязки.

~~~js
ready(); // ReferenceError
const ready = () => "ok";
~~~

До проверки вызываемости выполнение не доходит.`,
    ],
  },
  // Chapter 1.1: Q6, Q11.
  {
    id: "fe-1.1-info-early-error",
    visual: { motif: "lifecycle" },
    type: "info",
    readMoreUrl: feSection1_1ReadMoreUrls.q11,
    pages: [
      `## Ошибка до первого лога

Повторные \`let\` в одной области — ранняя статическая ошибка (Early Error). Весь отдельный фрагмент отвергается до выполнения инструкций.

~~~js
console.log("start");
let item = 1;
let item = 2;
~~~

\`start\` не появится; результат — \`SyntaxError\`.`,
      `## Исключение во время выполнения

Ошибка при чтении из временной мёртвой зоны (Temporal Dead Zone, TDZ) происходит позже: предыдущие инструкции уже могли выполниться.

~~~js
console.log("start");
console.log(item); // ReferenceError
let item = 1;
~~~

Здесь \`start\` появится. Класс ошибки и момент возникновения — разные части ответа.`,
    ],
  },
  // Chapter 1.1: Q11.
  {
    id: "fe-1.1-info-switch",
    type: "info",
    readMoreUrl: feSection1_1ReadMoreUrls.q11,
    pages: [
      `## case не создаёт отдельную область

Все \`case\` одного \`switch\` разделяют общий лексический блок (CaseBlock). Одинаковые \`let\`/\`const\` конфликтуют ещё до выбора ветки. \`break\` не создаёт область.`,
      `## Добавь блоки явно

Фигурные скобки дают каждой ветке собственную блочную область видимости (block scope).

~~~js
switch ("idle") {
  case "idle": {
    const message = "Waiting";
    console.log(message);
    break;
  }
  case "done": { const message = "Complete"; }
}
~~~

Синтаксически похожие ветки не обязательно являются разными областями.`,
    ],
  },
  // Chapter 1.1: Q12.
  {
    id: "fe-1.1-info-global",
    type: "info",
    readMoreUrl: feSection1_1ReadMoreUrls.q12,
    pages: [
      `## Глобальное имя не всегда свойство

В чистом браузерном классическом скрипте (classic script) верхнеуровневый \`var\` обычно создаёт свойство \`globalThis\`. Глобальные \`let\`/\`const\` создают лексические привязки, но не такие свойства.`,
      `## Проверка в classic script

Среда: отдельный браузерный classic script, одноимённых свойств заранее нет.

~~~js
var legacy = 1;
let lexical = 2;
console.log(globalThis.legacy); // 1
console.log(globalThis.lexical); // undefined
console.log(lexical); // 2
~~~`,
      `## Модуль меняет границу

В ES-модуле (ES module) верхнеуровневые \`var\`, \`let\` и \`const\` принадлежат модулю. Объявления не публикуются на \`globalThis\` автоматически. Явная запись свойства — отдельное действие.`,
    ],
  },
  // Chapter 1.1: Q12.
  {
    id: "fe-1.1-info-hosts",
    type: "info",
    readMoreUrl: feSection1_1ReadMoreUrls.q12,
    pages: [
      `## Перед ответом назови среду

Один фрагмент верхнего уровня может вести себя по-разному в браузерном классическом скрипте (classic script), ES-модуле (ES module) и файле Node.js CommonJS.`,
      `## CommonJS — функция-обёртка

Node.js оборачивает файл CommonJS функцией. Верхнеуровневый \`var\` локален этой обёртке и не становится свойством глобального объекта. Весь файл не получает строгий режим автоматически.`,
      `## Консоль — особая среда

DevTools и REPL могут сохранять имена между командами и иначе обрабатывать повторные объявления. Для проверки конкретного правила запускай отдельный файл или \`<script>\` нужного типа.`,
    ],
  },
  // Chapter 1.1: Q13.
  {
    id: "fe-1.1-info-strict",
    type: "info",
    readMoreUrl: feSection1_1ReadMoreUrls.q13,
    pages: [
      `## Опечатка не должна стать глобальной

В строгом режиме (strict mode) присваивание неразрешимому имени бросает \`ReferenceError\`. ES-модули автоматически строгие.

~~~js
"use strict";
mosaicTotal = 5; // ReferenceError
~~~`,
      `## Явно обозначь владельца значения

В нестрогом classic script пропущенное объявление может создать случайное глобальное свойство (accidental global). Вместо этого объяви локальное имя и верни результат.

~~~js
function count(items) {
  const total = items.length;
  return total;
}
console.log(count(["a", "b"])); // 2
~~~`,
    ],
  },
  // Chapter 1.1: Q13.
  {
    id: "fe-1.1-info-delete",
    type: "info",
    readMoreUrl: feSection1_1ReadMoreUrls.q13,
    pages: [
      `## delete удаляет свойство

\`delete\` работает со свойством (property) объекта, а не с объявленной локальной привязкой.

~~~js
const config = { debug: true };
console.log(delete config.debug); // true
console.log(config.debug); // undefined
~~~`,
      `## Важно: configurable

Настраиваемость (configurable) определяет, можно ли удалить свойство. Для ненастраиваемого свойства нестрогий \`delete\` возвращает \`false\`, а строгий бросает \`TypeError\`.`,
      `## Имя нельзя удалить как свойство

В строгом исходном коде \`delete identifier\` — ранний \`SyntaxError\`, даже если имя вообще отсутствует. Для свойства используй \`delete object.property\`.`,
    ],
  },
  // Chapter 1.1: Q14.
  {
    id: "fe-1.1-info-loop",
    type: "info",
    readMoreUrl: feSection1_1ReadMoreUrls.q14,
    pages: [
      `## Замыкание читает привязку

Замыкание (closure) сохраняет доступ к привязке, а не снимок числа. В \`for (var i = ...)\` все отложенные функции читают одну общую \`i\`.

~~~js
const readers = [];
for (var i = 0; i < 3; i++) {
  readers.push(() => i);
}
console.log(readers.map(read => read()).join(","));
// "3,3,3"
~~~`,
      `## let даёт привязки итераций

В \`for (let i = ...)\` цикл создаёт отдельные привязки итераций (per-iteration bindings). Каждая функция получает доступ к своей.

~~~js
const readers = [];
for (let i = 0; i < 3; i++) {
  readers.push(() => i);
}
console.log(readers.map(read => read()).join(","));
// "0,1,2"
~~~`,
      `## Разницу создаёт цикл

Это не особый режим замыкания и не автоматическое копирование значения. С \`var\` одна привязка; с \`let\` в заголовке этого цикла — разные. Проверяй место объявления счётчика.`,
    ],
  },
  // Chapter 1.1: Q4.
  {
    id: "fe-1.1-info-scope-map",
    type: "info",
    readMoreUrl: feSection1_1ReadMoreUrls.q4,
    pages: [
      `## Четыре границы видимости

Область видимости (scope) определяет, к какой привязке относится имя. Основные границы: глобальная (global), модульная (module), функциональная (function) и блочная (block).`,
      `## Сначала разметь границы

Внутри функции параметр и локальные имена принадлежат вызову. Блок дополнительно ограничивает свои \`let\`/\`const\`.

~~~js
function calculate(price) {
  var tax = price * 0.17;
  if (tax > 0) {
    const message = "tax applied";
    console.log(message);
  }
  return price + tax;
}
~~~

За пределами функции недоступны и \`price\`, и \`tax\`, и \`message\`.`,
    ],
  },
  // Chapter 1.1: Q4, Q7.
  {
    id: "fe-1.1-info-function-locals",
    type: "info",
    readMoreUrl: feSection1_1ReadMoreUrls.q4,
    pages: [
      `## Каждый вызов — свои локальные имена

Вызов функции создаёт собственные параметры и локальные привязки (bindings). Последовательные вызовы не продолжают счётчик друг друга.

~~~js
function next() {
  let count = 0;
  count += 1;
  return count;
}
console.log(next(), next()); // 1 1
~~~`,
      `## Общее состояние находится снаружи

Если счётчик объявлен во внешней области, оба вызова могут читать и менять одну привязку.

~~~js
let count = 0;
function next() { return ++count; }
console.log(next(), next()); // 1 2
~~~

Разницу создаёт место объявления, а не одинаковое имя функции.`,
    ],
  },
  // Chapter 1.1: Q4, Q5.
  {
    id: "fe-1.1-info-scope-direction",
    type: "info",
    readMoreUrl: feSection1_1ReadMoreUrls.q4,
    pages: [
      `## Видимость направлена наружу

Вложенный код ищет имена во внешних областях. Внешний код не получает прямой доступ к локальным привязкам вложенной функции. Это направление цепочки областей (scope chain).

~~~js
function readSecret() {
  const secret = "local";
  return secret;
}
console.log(readSecret());
// "local"
~~~`,
      `## Возвращённое значение не раскрывает имя

\`return\` отдаёт значение вызывающему коду, но не переносит локальное объявление в его область.

~~~js
function readSecret() {
  const secret = "local";
  return secret;
}
console.log(secret); // ReferenceError
~~~`,
    ],
  },
  // Chapter 1.1: Q4, Q5.
  {
    id: "fe-1.1-info-lexical-principle",
    type: "info",
    readMoreUrl: feSection1_1ReadMoreUrls.q4,
    pages: [
      `## Lexical — правило связи областей

Лексическая область видимости (lexical scope) — не пятый вид области рядом с global/function/block/module. Это принцип: внешние области функции определяются её местом в исходном коде.`,
      `## Функция сохраняет эту связь

Созданная во вложенной функции читает её привязку и после возврата. Это необходимое здесь следствие замыкания (closure).

~~~js
function createReader() {
  const role = "admin";
  return () => role;
}
const read = createReader();
console.log(read()); // "admin"
~~~

Полный разбор замыканий относится к следующей теме; здесь важно направление поиска имени.`,
    ],
  },
  // Chapter 1.1: Q6.
  {
    id: "fe-1.1-info-prepare-per-entry",
    visual: { motif: "lifecycle" },
    type: "info",
    readMoreUrl: feSection1_1ReadMoreUrls.q6,
    pages: [
      `## Подготовка не одна на весь файл

Подготовка объявлений (declaration instantiation) зависит от выполняемой части кода: скрипта, вызова функции, блока или модуля. Модель «создание → выполнение» полезна, но не означает ровно два прохода движка по файлу.`,
      `## Блок можно войти несколько раз

При новом входе в блок его локальные привязки создаются заново. До своего объявления \`let\` снова находится во временной мёртвой зоне (Temporal Dead Zone, TDZ).

~~~js
for (let i = 0; i < 2; i++) {
  let label = "iteration " + i;
  console.log(label);
}
// "iteration 0"
// "iteration 1"
~~~`,
    ],
  },
  // Chapter 1.1: Q7.
  {
    id: "fe-1.1-info-call-stack",
    type: "info",
    readMoreUrl: feSection1_1ReadMoreUrls.q7,
    pages: [
      `## Последний вызван — первый завершён

Стек вызовов (call stack) хранит незавершённые вызовы. Если \`first\` вызывает \`second\`, выполнение \`first\` ждёт возврата из \`second\`.`,
      `## Проследи порядок возвращения

Вложенный вызов выполняется синхронно. После его завершения вызывающая функция продолжает следующую инструкцию.

~~~js
function second() { console.log("B"); }
function first() {
  console.log("A");
  second();
  console.log("C");
}
first(); // "A", "B", "C"
~~~`,
    ],
  },
  // Chapter 1.1: Q5, Q7.
  {
    id: "fe-1.1-info-stack-vs-scope",
    type: "info",
    readMoreUrl: feSection1_1ReadMoreUrls.q5,
    pages: [
      `## Стек вызовов ≠ цепочка областей

Стек вызовов (call stack) отвечает: «Кто кого вызвал и куда вернуться?» Цепочка областей (scope chain) отвечает: «Где искать имя?» Эти пути могут не совпадать.`,
      `## Вызывающий не подменяет окружение

\`caller\` находится в стеке при вызове \`read\`. Но её локальное \`value\` не становится внешним для \`read\`.

~~~js
const value = "global";
function read() { return value; }
function caller() {
  const value = "local";
  return read();
}
console.log(caller()); // "global"
~~~`,
    ],
  },
  // Chapter 1.1: Q2, Q5, Q9.
  {
    id: "fe-1.1-info-uninitialized-vs-missing",
    type: "info",
    readMoreUrl: feSection1_1ReadMoreUrls.q2,
    pages: [
      `## Три разных состояния имени

Имя может отсутствовать, существовать с \`undefined\` или существовать без инициализации. Последнее состояние — временная мёртвая зона (Temporal Dead Zone, TDZ), а не доступное значение \`undefined\`.`,
      `## Одинаковая ошибка, разные причины

Обычное чтение отсутствующего имени и чтение лексической привязки в TDZ дают \`ReferenceError\`. Но причины различны: «не найдено» и «найдено, ещё не готово».

\`typeof\` помогает увидеть разницу: для отсутствующего имени возвращает строку, для TDZ бросает исключение.`,
    ],
  },
  // Chapter 1.1: Q2, Q11.
  {
    id: "fe-1.1-info-redeclaration",
    type: "info",
    readMoreUrl: feSection1_1ReadMoreUrls.q2,
    pages: [
      `## Повторное объявление ≠ присваивание

Повторное объявление (redeclaration) снова объявляет имя в той же области. Присваивание (assignment) меняет значение существующей изменяемой привязки.

~~~js
let mode = "idle";
mode = "ready"; // allowed
console.log(mode); // "ready"
~~~

Второе \`let mode\` в этой области было бы \`SyntaxError\`.`,
      `## Повторный var не обнуляет

Совместимый \`var\` переиспользует привязку. Объявление без инициализатора не записывает в неё новое значение.

~~~js
var score = 10;
var score;
console.log(score); // 10
var score = 20;
console.log(score); // 20
~~~`,
    ],
  },
  // Chapter 1.1: Q11.
  {
    id: "fe-1.1-info-illegal-shadow",
    type: "info",
    readMoreUrl: feSection1_1ReadMoreUrls.q11,
    pages: [
      `## Когда затенения не получилось

Недопустимое затенение (illegal shadowing) — интервью-название конфликта: \`var\` во внутреннем обычном блоке не получает отдельную область и сталкивается с внешним \`let\`.

~~~js
let mode = "outer";
{ var mode = "inner"; }
// SyntaxError
~~~`,
      `## В обратную сторону допустимо

Внутренний \`let\` действительно создаёт отдельную блочную привязку. Поэтому внешний \`var\` с ним не конфликтует.

~~~js
var mode = "outer";
{ let mode = "inner"; }
console.log(mode); // "outer"
~~~

Не суди по вложенным скобкам: сначала определи эффективную область каждого объявления.`,
    ],
  },
  // Chapter 1.1: Q10.
  {
    id: "fe-1.1-info-named-expression",
    type: "info",
    readMoreUrl: feSection1_1ReadMoreUrls.q10,
    pages: [
      `## Два имени, разные роли

Именованное функциональное выражение (named function expression) может иметь внешнюю привязку и внутреннее имя самой функции.

~~~js
const outer = function inner(n) {
  return n === 0 ? "done" : inner(n - 1);
};
console.log(outer(2)); // "done"
~~~`,
      `## Внутреннее имя не экспортируется

\`inner\` доступно внутри функции, например для рекурсии. Во внешней области оно не объявляется.

~~~js
const outer = function inner() {};
console.log(typeof inner);
// "undefined"
console.log(typeof outer);
// "function"
~~~

Функциональное выражение не превращается в внешнее function declaration из-за наличия имени.`,
    ],
  },
  // Chapter 1.1: Q12.
  {
    id: "fe-1.1-info-global-record",
    type: "info",
    readMoreUrl: feSection1_1ReadMoreUrls.q12,
    pages: [
      `## Две части глобального окружения

В классических скриптах (classic scripts) Global Environment Record составная: объектная часть связана с глобальным объектом, декларативная хранит глобальные \`let\`/\`const\`/\`class\`.`,
      `## Имя видно, свойства нет

Глобальная лексическая привязка может быть видна вложенным функциям и следующим classic scripts той же среды. Это не требует свойства на \`globalThis\`.

Поэтому \`name\` и \`globalThis.name\` могут обращаться к разным значениям. Уточняй, проверяется привязка или свойство.`,
    ],
  },
  // Chapter 1.1: Q12.
  {
    id: "fe-1.1-info-module-boundary",
    type: "info",
    readMoreUrl: feSection1_1ReadMoreUrls.q12,
    pages: [
      `## Локальные объявления, глобальные API

ES-модуль (ES module) не публикует собственные верхнеуровневые объявления глобально. Но его внешняя связь ведёт к глобальной среде, где могут находиться API вроде \`document\`.`,
      `## Мост должен быть явным

Если устаревший код (legacy) требует глобальный API, публикуй конкретный контракт намеренно. Это отдельная запись свойства, а не побочный эффект \`var\`.

~~~js
const api = { version: "1.0" };
globalThis.mosaicApi = api;
console.log(globalThis.mosaicApi.version);
// "1.0"
~~~

Пример иллюстрирует границу JavaScript; TypeScript может потребовать описание типа глобального свойства.`,
    ],
  },
  // Chapter 1.1: Q12.
  {
    id: "fe-1.1-info-script-sequence",
    visual: { motif: "lifecycle" },
    type: "info",
    readMoreUrl: feSection1_1ReadMoreUrls.q12,
    pages: [
      `## Hoisting не путешествует между script

Каждый классический скрипт (classic script) подготавливает объявления перед своим выполнением. Будущее объявление не делает имя доступным предыдущему скрипту задним числом.`,
      `## Следующий script видит готовое состояние

При последовательном запуске classic scripts в одной изолированной среде глобальная \`let\` из первого может быть доступна второму. Но повторное несовместимое объявление даст \`SyntaxError\` до инструкций второго.`,
      `## До инструкций — не всегда Early Error

Межскриптовый конфликт зависит от уже созданного глобального состояния и обнаруживается при GlobalDeclarationInstantiation. Статическая Early Error внутри одной единицы кода — другая фаза.`,
    ],
  },
  // Chapter 1.1: Q14.
  {
    id: "fe-1.1-info-loop-location",
    type: "info",
    readMoreUrl: feSection1_1ReadMoreUrls.q14,
    pages: [
      `## Само слово let не всё решает

Отдельные привязки итераций (per-iteration bindings) создаются в \`for (let i = ...)\`. Если \`let i\` объявлен перед циклом, функции получают доступ к одной общей привязке.

~~~js
let i = 0;
const readers = [];
for (; i < 3; i++) {
  readers.push(() => i);
}
console.log(readers.map(read => read()).join(","));
// "3,3,3"
~~~`,
      `## Смотри на заголовок цикла

Для независимых индексов объяви \`let i\` в заголовке \`for\`. Важно, кто создаёт привязки и сколько их, а не только выбор между \`var\` и \`let\`.

Сохранение доступа к общей привязке — не дефект замыкания (closure). Это ожидаемое поведение.`,
    ],
  },
  // Chapter 1.1: Q15.
  {
    id: "fe-1.1-info-analysis-order",
    type: "info",
    readMoreUrl: feSection1_1ReadMoreUrls.q15,
    pages: [
      `## Не начинай с первой строки

Для задачи на результат сначала назови среду, проверь ранние ошибки (Early Errors) и разметь области видимости (scopes). Недопустимый фрагмент не начнёт выполнение.`,
      `## Найди привязку, проверь состояние

Для каждого имени выбери ближайшую привязку (binding). Затем проверь, инициализирована ли она и какое значение содержит. Только после этого выполняй инструкцию.`,
      `## Объясни точку остановки

Различай результаты:

- \`ReferenceError\`: имя отсутствует или привязка в TDZ;
- \`TypeError\`: например, вызов \`undefined\` или переназначение \`const\`;
- \`SyntaxError\`: например, конфликт объявлений.

Назови также логи, которые успели появиться, и фазу ошибки.`,
    ],
  },
];
