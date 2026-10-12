import type { QuizCardData } from "./card-types";
import { feSection1_1ReadMoreUrls } from "./fe-1.1-source-urls";

// Authored for Project Mosaic on 2026-10-11; chapter 1.1 only.
// Source: https://github.com/joisadler/frontend-interview-preparation/blob/7e57113acc5632a5b91fa9062d336c36b60e35b7/handbook/01-javascript-and-async-programming/01-execution-model-declarations-and-scope.md
// App schema/baseline: joisadler/project-mosaic@049221a05ddbab8bae14526bedb11234d6d13dd6.
// Package namespace: fe-1.1. Runtime IDs use fe-1.1-*; exports use feSection1_1*.
// Primary checks: https://tc39.es/ecma262/2026/ and https://nodejs.org/api/modules.html#the-module-wrapper
// Browser-specific examples state their environment; Node VM checks are not Safari/PWA validation.
// 36 quiz cards.
export const feSection1_1QuizCards: QuizCardData[] = [
  {
    id: "fe-1.1-quiz-var-before",
    type: "quiz",
    readMoreUrl: feSection1_1ReadMoreUrls.q8,
    question: `## Что появится в консоли?

Строгий изолированный скрипт.

~~~js
console.log(value);
var value = 9;
~~~`,
    options: [
      {
        id: "option-1",
        text: "9",
        explanation: "Инициализатор = 9 ещё не выполнен. Правильный результат: undefined.",
      },
      {
        id: "option-2",
        text: "undefined",
        explanation: "Новая var-привязка заранее инициализирована undefined.",
      },
      {
        id: "option-3",
        text: "ReferenceError",
        explanation: "var не находится в TDZ. Правильный результат: undefined.",
      },
      {
        id: "option-4",
        text: "SyntaxError",
        explanation: "Код допустим: раннее чтение var разрешено. Правильный результат: undefined.",
      },
    ],
    correctOptionId: "option-2",
  },
  {
    id: "fe-1.1-quiz-let-before",
    type: "quiz",
    readMoreUrl: feSection1_1ReadMoreUrls.q9,
    question: `## Как завершится чтение?

Строгий изолированный скрипт.

~~~js
console.log(value);
let value = 9;
~~~`,
    options: [
      {
        id: "option-1",
        text: "undefined",
        explanation: "let до инициализации не содержит доступного undefined. Правильный результат: ReferenceError.",
      },
      {
        id: "option-2",
        text: "9",
        explanation: "До инициализатора выполнение не дойдёт: чтение бросит исключение. Правильный результат: ReferenceError.",
      },
      {
        id: "option-3",
        text: "ReferenceError",
        explanation: "Поиск находит let value в TDZ; чтение запрещено.",
      },
      {
        id: "option-4",
        text: "TypeError",
        explanation: "Это не вызов неподходящего значения, а чтение неинициализированной привязки. Правильный результат: ReferenceError.",
      },
    ],
    correctOptionId: "option-3",
  },
  {
    id: "fe-1.1-quiz-empty-let",
    type: "quiz",
    readMoreUrl: feSection1_1ReadMoreUrls.q2,
    question: `## Чем закончится фрагмент?

Строгий изолированный скрипт.

~~~js
let value;
console.log(value);
~~~`,
    options: [
      {
        id: "option-1",
        text: "undefined",
        explanation: "Строка let value инициализирует привязку значением undefined.",
      },
      {
        id: "option-2",
        text: "null",
        explanation: "Без инициализатора let не получает null. Правильный результат: undefined.",
      },
      {
        id: "option-3",
        text: "ReferenceError",
        explanation: "TDZ уже закончилась на строке объявления. Правильный результат: undefined.",
      },
      {
        id: "option-4",
        text: "SyntaxError",
        explanation: "В отличие от обычного const, let допускает отсутствие инициализатора. Правильный результат: undefined.",
      },
    ],
    correctOptionId: "option-1",
  },
  {
    id: "fe-1.1-quiz-repeat-var",
    type: "quiz",
    readMoreUrl: feSection1_1ReadMoreUrls.q2,
    question: `## Что выведет повторное объявление?

Строгий изолированный скрипт.

~~~js
var score = 10;
var score;
console.log(score);
~~~`,
    options: [
      {
        id: "option-1",
        text: "undefined",
        explanation: "Повторное var без инициализатора не стирает текущее значение. Правильный результат: 10.",
      },
      {
        id: "option-2",
        text: "10",
        explanation: "Оба объявления используют одну привязку; повторное объявление не присваивает undefined.",
      },
      {
        id: "option-3",
        text: "SyntaxError",
        explanation: "Совместимое повторное var в этой области разрешено. Правильный результат: 10.",
      },
      {
        id: "option-4",
        text: "ReferenceError",
        explanation: "Привязка уже инициализирована и доступна. Правильный результат: 10.",
      },
    ],
    correctOptionId: "option-2",
  },
  {
    id: "fe-1.1-quiz-mutate-const",
    type: "quiz",
    readMoreUrl: feSection1_1ReadMoreUrls.q1,
    question: `## Что выведет код?

Строгий изолированный скрипт.

~~~js
const user = { name: 'Ada' };
user.name = 'Grace';
console.log(user.name);
~~~`,
    options: [
      {
        id: "option-1",
        text: "Ada",
        explanation: "Поле объекта было изменено. Правильный результат: Grace.",
      },
      {
        id: "option-2",
        text: "Grace",
        explanation: "const сохраняет ссылку в привязке, но не запрещает менять поля объекта.",
      },
      {
        id: "option-3",
        text: "TypeError",
        explanation: "Повторного присваивания user нет: меняется свойство. Правильный результат: Grace.",
      },
      {
        id: "option-4",
        text: "SyntaxError",
        explanation: "Изменение свойства объекта, записанного в const, синтаксически допустимо. Правильный результат: Grace.",
      },
    ],
    correctOptionId: "option-2",
  },
  {
    id: "fe-1.1-quiz-reassign-const",
    type: "quiz",
    readMoreUrl: feSection1_1ReadMoreUrls.q3,
    question: `## Какие логи успеют появиться?

Строгий изолированный скрипт.

~~~js
const value = 1;
console.log(value);
value = 2;
console.log(value);
~~~`,
    options: [
      {
        id: "option-1",
        text: "1, затем TypeError",
        explanation: "Первое чтение успешно; повторное присваивание const бросает TypeError.",
      },
      {
        id: "option-2",
        text: "SyntaxError без логов",
        explanation: "Присваивание const допустимо синтаксически, но не выполняется успешно. Правильный результат: 1, затем TypeError.",
      },
      {
        id: "option-3",
        text: "1, затем 2",
        explanation: "Переназначение привязки const запрещено. Правильный результат: 1, затем TypeError.",
      },
      {
        id: "option-4",
        text: "ReferenceError без логов",
        explanation: "value уже инициализирована, поэтому это не ошибка поиска имени. Правильный результат: 1, затем TypeError.",
      },
    ],
    correctOptionId: "option-1",
  },
  {
    id: "fe-1.1-quiz-var-if",
    type: "quiz",
    readMoreUrl: feSection1_1ReadMoreUrls.q3,
    question: `## Что видно после if?

Строгий изолированный скрипт.

~~~js
function run() {
  if (true) { var count = 4; }
  console.log(count);
}
run();
~~~`,
    options: [
      {
        id: "option-1",
        text: "undefined",
        explanation: "Ветка выполнена, поэтому инициализатор записал 4. Правильный результат: 4.",
      },
      {
        id: "option-2",
        text: "4",
        explanation: "var принадлежит run, а не блоку if.",
      },
      {
        id: "option-3",
        text: "ReferenceError",
        explanation: "Обычный блок не ограничивает var. Правильный результат: 4.",
      },
      {
        id: "option-4",
        text: "SyntaxError",
        explanation: "Код не содержит конфликта объявлений. Правильный результат: 4.",
      },
    ],
    correctOptionId: "option-2",
  },
  {
    id: "fe-1.1-quiz-let-if",
    type: "quiz",
    readMoreUrl: feSection1_1ReadMoreUrls.q4,
    question: `## Что видно снаружи блока?

Строгий изолированный скрипт.

~~~js
if (true) { let count = 4; }
console.log(count);
~~~`,
    options: [
      {
        id: "option-1",
        text: "4",
        explanation: "let count ограничена блоком if. Правильный результат: ReferenceError.",
      },
      {
        id: "option-2",
        text: "undefined",
        explanation: "За пределами блока нет привязки count; это не доступная переменная со значением undefined. Правильный результат: ReferenceError.",
      },
      {
        id: "option-3",
        text: "ReferenceError",
        explanation: "Поиск имени за пределами блока не находит count.",
      },
      {
        id: "option-4",
        text: "TypeError",
        explanation: "Проблема в отсутствии имени, а не в типе найденного значения. Правильный результат: ReferenceError.",
      },
    ],
    correctOptionId: "option-3",
  },
  {
    id: "fe-1.1-quiz-call-site",
    type: "quiz",
    readMoreUrl: feSection1_1ReadMoreUrls.q5,
    question: `## Какое имя прочитает функция?

Строгий изолированный скрипт.

~~~js
const role = 'guest';
function read() { return role; }
function run() {
  const role = 'admin';
  console.log(read());
}
run();
~~~`,
    options: [
      {
        id: "option-1",
        text: "admin",
        explanation: "read берёт внешнюю role: guest.",
      },
      {
        id: "option-2",
        text: "guest",
        explanation: "read замкнута на внешнюю role со значением guest.",
      },
      {
        id: "option-3",
        text: "undefined",
        explanation: "Внешняя role инициализирована значением guest.",
      },
      {
        id: "option-4",
        text: "ReferenceError",
        explanation: "read видит внешнюю role: guest.",
      },
    ],
    correctOptionId: "option-2",
  },
  {
    id: "fe-1.1-quiz-shadow",
    type: "quiz",
    readMoreUrl: feSection1_1ReadMoreUrls.q5,
    question: `## Изменится ли внешняя переменная?

Строгий изолированный скрипт.

~~~js
let label = 'outer';
{ let label = 'inner'; }
console.log(label);
~~~`,
    options: [
      {
        id: "option-1",
        text: "inner",
        explanation: "Внутренняя label — другая привязка; она не присваивает значение внешней. Правильный результат: outer.",
      },
      {
        id: "option-2",
        text: "outer",
        explanation: "После блока читается внешняя label: она осталась outer.",
      },
      {
        id: "option-3",
        text: "SyntaxError",
        explanation: "Одинаковые let находятся в разных областях и не конфликтуют. Правильный результат: outer.",
      },
      {
        id: "option-4",
        text: "ReferenceError",
        explanation: "Внешняя label существует и инициализирована. Правильный результат: outer.",
      },
    ],
    correctOptionId: "option-2",
  },
  {
    id: "fe-1.1-quiz-shadow-tdz",
    type: "quiz",
    readMoreUrl: feSection1_1ReadMoreUrls.q9,
    question: `## Можно ли прочитать внешнюю count?

Строгий изолированный скрипт.

~~~js
let count = 1;
{
  console.log(count);
  let count = 2;
}
~~~`,
    options: [
      {
        id: "option-1",
        text: "1",
        explanation: "Поиск останавливается на внутренней count и не переходит к внешней. Правильный результат: ReferenceError.",
      },
      {
        id: "option-2",
        text: "2",
        explanation: "Инициализатор внутренней count ещё не выполнен. Правильный результат: ReferenceError.",
      },
      {
        id: "option-3",
        text: "undefined",
        explanation: "Неинициализированная let не даёт доступного undefined. Правильный результат: ReferenceError.",
      },
      {
        id: "option-4",
        text: "ReferenceError",
        explanation: "Внутренняя привязка уже затеняет внешнюю, но находится в TDZ.",
      },
    ],
    correctOptionId: "option-4",
  },
  {
    id: "fe-1.1-quiz-typeof-missing",
    type: "quiz",
    readMoreUrl: feSection1_1ReadMoreUrls.q9,
    question: `## Что вернёт typeof?

Строгий изолированный скрипт.

~~~js
console.log(typeof mosaicAbsentName);
~~~`,
    options: [
      {
        id: "option-1",
        text: "Строку \"undefined\"",
        explanation: "Для неразрешимого имени typeof возвращает именно строку undefined.",
      },
      {
        id: "option-2",
        text: "Значение undefined",
        explanation: "typeof всегда возвращает строку при успешном выполнении. Правильный результат: Строку \"undefined\".",
      },
      {
        id: "option-3",
        text: "ReferenceError",
        explanation: "Специальный случай typeof допускает отсутствующий идентификатор. Правильный результат: Строку \"undefined\".",
      },
      {
        id: "option-4",
        text: "SyntaxError",
        explanation: "Такой typeof синтаксически допустим. Правильный результат: Строку \"undefined\".",
      },
    ],
    correctOptionId: "option-1",
  },
  {
    id: "fe-1.1-quiz-typeof-tdz",
    type: "quiz",
    readMoreUrl: feSection1_1ReadMoreUrls.q9,
    question: `## Спасёт ли typeof от TDZ?

Строгий изолированный скрипт.

~~~js
console.log(typeof value);
let value;
~~~`,
    options: [
      {
        id: "option-1",
        text: "Строку \"undefined\"",
        explanation: "Имя существует в TDZ: безопасный случай отсутствующего имени здесь не применим. Правильный результат: ReferenceError.",
      },
      {
        id: "option-2",
        text: "ReferenceError",
        explanation: "typeof пытается прочитать неинициализированную лексическую привязку.",
      },
      {
        id: "option-3",
        text: "Строку \"object\"",
        explanation: "В TDZ значение прочитать нельзя, поэтому строкового результата нет. Правильный результат: ReferenceError.",
      },
      {
        id: "option-4",
        text: "SyntaxError",
        explanation: "Код синтаксически допустим; ошибка возникает при выполнении. Правильный результат: ReferenceError.",
      },
    ],
    correctOptionId: "option-2",
  },
  {
    id: "fe-1.1-quiz-self-init",
    type: "quiz",
    readMoreUrl: feSection1_1ReadMoreUrls.q9,
    question: `## Какое значение получит value?

Строгий изолированный скрипт.

~~~js
let value = value;
console.log(value);
~~~`,
    options: [
      {
        id: "option-1",
        text: "undefined",
        explanation: "Правая часть вычисляется до завершения инициализации let. Правильный результат: ReferenceError.",
      },
      {
        id: "option-2",
        text: "null",
        explanation: "Язык не подставляет null при самоссылке. Правильный результат: ReferenceError.",
      },
      {
        id: "option-3",
        text: "ReferenceError",
        explanation: "При вычислении правой части value всё ещё находится в TDZ.",
      },
      {
        id: "option-4",
        text: "SyntaxError",
        explanation: "Объявление синтаксически допустимо, но его выполнение бросает исключение. Правильный результат: ReferenceError.",
      },
    ],
    correctOptionId: "option-3",
  },
  {
    id: "fe-1.1-quiz-declaration",
    type: "quiz",
    readMoreUrl: feSection1_1ReadMoreUrls.q10,
    question: `## Можно ли вызвать функцию раньше?

Строгий изолированный скрипт.

~~~js
console.log(sum(2, 3));
function sum(a, b) { return a + b; }
~~~`,
    options: [
      {
        id: "option-1",
        text: "5",
        explanation: "Обычное объявление функции готовит привязку с функцией до выполнения вызова.",
      },
      {
        id: "option-2",
        text: "undefined",
        explanation: "sum уже содержит функцию, которая возвращает 5. Правильный результат: 5.",
      },
      {
        id: "option-3",
        text: "ReferenceError",
        explanation: "Здесь нет TDZ у const/let с функциональным выражением. Правильный результат: 5.",
      },
      {
        id: "option-4",
        text: "TypeError",
        explanation: "Значение sum вызываемо: это функция. Правильный результат: 5.",
      },
    ],
    correctOptionId: "option-1",
  },
  {
    id: "fe-1.1-quiz-expression-var",
    type: "quiz",
    readMoreUrl: feSection1_1ReadMoreUrls.q10,
    question: `## Как завершится ранний вызов?

Строгий изолированный скрипт.

~~~js
run();
var run = () => 7;
~~~`,
    options: [
      {
        id: "option-1",
        text: "7",
        explanation: "Присваивание функции ещё не выполнено. Правильный результат: TypeError.",
      },
      {
        id: "option-2",
        text: "undefined без ошибки",
        explanation: "Чтение run даёт undefined, но попытка вызвать его бросает исключение. Правильный результат: TypeError.",
      },
      {
        id: "option-3",
        text: "TypeError",
        explanation: "var run уже содержит undefined; undefined нельзя вызвать.",
      },
      {
        id: "option-4",
        text: "ReferenceError",
        explanation: "Привязка var существует и инициализирована: ошибка не в поиске имени. Правильный результат: TypeError.",
      },
    ],
    correctOptionId: "option-3",
  },
  {
    id: "fe-1.1-quiz-expression-const",
    type: "quiz",
    readMoreUrl: feSection1_1ReadMoreUrls.q10,
    question: `## Как завершится ранний вызов?

Строгий изолированный скрипт.

~~~js
run();
const run = () => 7;
~~~`,
    options: [
      {
        id: "option-1",
        text: "7",
        explanation: "Функциональное выражение ещё не вычислено. Правильный результат: ReferenceError.",
      },
      {
        id: "option-2",
        text: "TypeError",
        explanation: "Чтение const run падает раньше проверки вызываемости. Правильный результат: ReferenceError.",
      },
      {
        id: "option-3",
        text: "ReferenceError",
        explanation: "const run находится в TDZ до инициализации.",
      },
      {
        id: "option-4",
        text: "SyntaxError",
        explanation: "Код допустим синтаксически; раннее чтение вызывает исключение. Правильный результат: ReferenceError.",
      },
    ],
    correctOptionId: "option-3",
  },
  {
    id: "fe-1.1-quiz-early-let",
    type: "quiz",
    readMoreUrl: feSection1_1ReadMoreUrls.q11,
    question: `## Успеет ли появиться start?

Строгий изолированный скрипт.

~~~js
console.log('start');
let value = 1;
let value = 2;
~~~`,
    options: [
      {
        id: "option-1",
        text: "start, затем SyntaxError",
        explanation: "Повторное let обнаруживается до выполнения всего фрагмента. Правильный результат: SyntaxError без логов.",
      },
      {
        id: "option-2",
        text: "SyntaxError без логов",
        explanation: "Два let в одной области — ранний SyntaxError; ни одна инструкция не выполняется.",
      },
      {
        id: "option-3",
        text: "start, затем 2",
        explanation: "Повторное объявление запрещено, это не повторное присваивание. Правильный результат: SyntaxError без логов.",
      },
      {
        id: "option-4",
        text: "ReferenceError без логов",
        explanation: "Конфликт объявлений даёт SyntaxError, а не ошибку чтения. Правильный результат: SyntaxError без логов.",
      },
    ],
    correctOptionId: "option-2",
  },
  {
    id: "fe-1.1-quiz-illegal-var",
    type: "quiz",
    readMoreUrl: feSection1_1ReadMoreUrls.q11,
    question: `## Создаёт ли var внутреннюю переменную?

Строгий изолированный скрипт.

~~~js
let mode = 'outer';
{ var mode = 'inner'; }
console.log(mode);
~~~`,
    options: [
      {
        id: "option-1",
        text: "outer",
        explanation: "Отдельная внутренняя var-привязка не создаётся. Правильный результат: SyntaxError.",
      },
      {
        id: "option-2",
        text: "inner",
        explanation: "var выходит за обычный блок и конфликтует с внешним let. Правильный результат: SyntaxError.",
      },
      {
        id: "option-3",
        text: "ReferenceError",
        explanation: "Ошибка возникает до поиска имени при выполнении. Правильный результат: SyntaxError.",
      },
      {
        id: "option-4",
        text: "SyntaxError",
        explanation: "var и let пытаются объявить одно имя в конфликтующих областях; фрагмент отвергается.",
      },
    ],
    correctOptionId: "option-4",
  },
  {
    id: "fe-1.1-quiz-legal-shadow",
    type: "quiz",
    readMoreUrl: feSection1_1ReadMoreUrls.q11,
    question: `## Что выведет код с внешним var и внутренним let?

Строгий изолированный скрипт.

~~~js
var mode = 'outer';
{ let mode = 'inner'; }
console.log(mode);
~~~`,
    options: [
      {
        id: "option-1",
        text: "outer",
        explanation: "Внутренняя let находится в отдельном блоке и не меняет внешний var.",
      },
      {
        id: "option-2",
        text: "inner",
        explanation: "Внутреннее значение видно только внутри блока. Правильный результат: outer.",
      },
      {
        id: "option-3",
        text: "SyntaxError",
        explanation: "Здесь допустимое затенение: разные привязки в разных областях. Правильный результат: outer.",
      },
      {
        id: "option-4",
        text: "undefined",
        explanation: "Внешний инициализатор присвоил outer. Правильный результат: outer.",
      },
    ],
    correctOptionId: "option-1",
  },
  {
    id: "fe-1.1-quiz-loop-var",
    type: "quiz",
    readMoreUrl: feSection1_1ReadMoreUrls.q14,
    question: `## Что прочитают функции после цикла?

Строгий изолированный скрипт.

~~~js
const readers = [];
for (var i = 0; i < 3; i++) {
  readers.push(() => i);
}
console.log(readers.map(read => read()).join(','));
~~~`,
    options: [
      {
        id: "option-1",
        text: "0,1,2",
        explanation: "Функции не копируют значения каждой итерации при var. Правильный результат: 3,3,3.",
      },
      {
        id: "option-2",
        text: "1,2,3",
        explanation: "Все функции читают общую i уже после цикла. Ответ: 3,3,3.",
      },
      {
        id: "option-3",
        text: "3,3,3",
        explanation: "Общая i после цикла равна 3; все три функции читают её.",
      },
      {
        id: "option-4",
        text: "undefined,undefined,undefined",
        explanation: "i инициализирована и после цикла содержит 3. Правильный результат: 3,3,3.",
      },
    ],
    correctOptionId: "option-3",
  },
  {
    id: "fe-1.1-quiz-loop-let",
    type: "quiz",
    readMoreUrl: feSection1_1ReadMoreUrls.q14,
    question: `## Какие значения сохранят функции в for с let?

Строгий изолированный скрипт.

~~~js
const readers = [];
for (let i = 0; i < 3; i++) {
  readers.push(() => i);
}
console.log(readers.map(read => read()).join(','));
~~~`,
    options: [
      {
        id: "option-1",
        text: "3,3,3",
        explanation: "В for с let нет одной общей привязки для всех этих функций. Правильный результат: 0,1,2.",
      },
      {
        id: "option-2",
        text: "0,1,2",
        explanation: "Цикл создаёт привязки итераций; функции читают свои 0, 1 и 2.",
      },
      {
        id: "option-3",
        text: "1,2,3",
        explanation: "Увеличение цикла не превращает сохранённые привязки тела в 1, 2 и 3. Правильный результат: 0,1,2.",
      },
      {
        id: "option-4",
        text: "ReferenceError",
        explanation: "Функции сохраняют доступ к своим привязкам после завершения цикла. Правильный результат: 0,1,2.",
      },
    ],
    correctOptionId: "option-2",
  },
  {
    id: "fe-1.1-quiz-strict-missing",
    type: "quiz",
    readMoreUrl: feSection1_1ReadMoreUrls.q13,
    question: `## Что произойдёт без объявления имени?

Строгий изолированный скрипт.

~~~js
mosaicTotal = 5;
console.log(mosaicTotal);
~~~`,
    options: [
      {
        id: "option-1",
        text: "5",
        explanation: "Строгий режим не создаёт случайное глобальное свойство. Правильный результат: ReferenceError.",
      },
      {
        id: "option-2",
        text: "undefined",
        explanation: "Присваивание неразрешимому имени не создаёт привязку с undefined. Правильный результат: ReferenceError.",
      },
      {
        id: "option-3",
        text: "ReferenceError",
        explanation: "В строгом режиме такая запись бросает ReferenceError.",
      },
      {
        id: "option-4",
        text: "SyntaxError",
        explanation: "Сам синтаксис присваивания допустим; ошибка возникает при выполнении. Правильный результат: ReferenceError.",
      },
    ],
    correctOptionId: "option-3",
  },
  {
    id: "fe-1.1-quiz-classic-global",
    type: "quiz",
    readMoreUrl: feSection1_1ReadMoreUrls.q12,
    question: `## Что попадёт в globalThis?

Среда: чистый нестрогий классический скрипт браузера. Имена из примера заранее не существуют.

~~~js
var mosaicLegacy = 1;
let mosaicLexical = 2;
console.log(globalThis.mosaicLegacy);
console.log(globalThis.mosaicLexical);
~~~`,
    options: [
      {
        id: "option-1",
        text: "1, затем 2",
        explanation: "Глобальный let не становится свойством globalThis. Правильный результат: 1, затем undefined.",
      },
      {
        id: "option-2",
        text: "undefined, затем undefined",
        explanation: "В этой чистой classic-script среде var создаёт глобальное свойство. Правильный результат: 1, затем undefined.",
      },
      {
        id: "option-3",
        text: "1, затем undefined",
        explanation: "var связан со свойством глобального объекта; let хранится как глобальная лексическая привязка.",
      },
      {
        id: "option-4",
        text: "ReferenceError",
        explanation: "Чтение отсутствующего свойства объекта даёт undefined, а не ReferenceError. Правильный результат: 1, затем undefined.",
      },
    ],
    correctOptionId: "option-3",
  },
  // Chapter 1.1: Q3, Q8.
  {
    id: "fe-1.1-quiz-var-false",
    type: "quiz",
    readMoreUrl: feSection1_1ReadMoreUrls.q3,
    question: `## Что будет, если ветка не выполнена?

Строгий изолированный скрипт.

~~~js
function run() {
  if (false) { var value = 9; }
  console.log(value);
}
run();
~~~`,
    options: [
      {
        id: "option-1",
        text: "9",
        explanation: "Инициализатор находится в невыполненной ветке; привязка остаётся undefined.",
      },
      {
        id: "option-2",
        text: "ReferenceError",
        explanation: "var известен всей функции и заранее содержит undefined; отсутствие выполнения ветки не удаляет имя.",
      },
      {
        id: "option-3",
        text: "undefined",
        explanation: "Свежая var-привязка подготовлена с undefined. Присваивание 9 в невыполненной ветке не произошло.",
      },
      {
        id: "option-4",
        text: "SyntaxError",
        explanation: "Объявление допустимо. Условие false меняет выполнение, а не синтаксическую корректность.",
      },
    ],
    correctOptionId: "option-3",
  },
  // Chapter 1.1: Q4.
  {
    id: "fe-1.1-quiz-nested-function-var",
    type: "quiz",
    readMoreUrl: feSection1_1ReadMoreUrls.q4,
    question: `## Выходит ли var из вложенной функции?

Строгий изолированный скрипт.

~~~js
function outer() {
  function inner() { var secret = 7; }
  inner();
  console.log(secret);
}
outer();
~~~`,
    options: [
      {
        id: "option-1",
        text: "ReferenceError",
        explanation: "var secret локален в inner и не появляется в outer.",
      },
      {
        id: "option-2",
        text: "7",
        explanation: "var не пересекает границу функции; в outer имени secret нет.",
      },
      {
        id: "option-3",
        text: "undefined",
        explanation: "В outer нет привязки secret. Отсутствующее имя не равно доступной переменной с undefined.",
      },
      {
        id: "option-4",
        text: "SyntaxError",
        explanation: "Синтаксис допустим. ReferenceError возникает при чтении имени в outer.",
      },
    ],
    correctOptionId: "option-1",
  },
  // Chapter 1.1: Q2, Q9.
  {
    id: "fe-1.1-quiz-write-tdz",
    type: "quiz",
    readMoreUrl: feSection1_1ReadMoreUrls.q2,
    question: `## Можно ли заранее записать значение?

Строгий изолированный скрипт.

~~~js
value = 5;
let value;
console.log(value);
~~~`,
    options: [
      {
        id: "option-1",
        text: "5",
        explanation: "Присваивание не может заменить инициализацию let: value ещё в TDZ.",
      },
      {
        id: "option-2",
        text: "undefined",
        explanation: "Выполнение остановится на первой строке: запись в неинициализированную let запрещена.",
      },
      {
        id: "option-3",
        text: "TypeError",
        explanation: "let изменяемая, но пока не инициализирована. Поэтому возникает ReferenceError.",
      },
      {
        id: "option-4",
        text: "ReferenceError",
        explanation: "Привязка value существует, но находится в TDZ. Обычная запись до инициализации запрещена.",
      },
    ],
    correctOptionId: "option-4",
  },
  // Chapter 1.1: Q9.
  {
    id: "fe-1.1-quiz-delayed-read",
    type: "quiz",
    readMoreUrl: feSection1_1ReadMoreUrls.q9,
    question: `## Слишком рано определена функция?

Строгий изолированный скрипт.

~~~js
const read = () => value;
let value = 7;
console.log(read());
~~~`,
    options: [
      {
        id: "option-1",
        text: "ReferenceError",
        explanation: "Создание функции не читает value. При вызове привязка уже инициализирована числом 7.",
      },
      {
        id: "option-2",
        text: "7",
        explanation: "Чтение происходит при вызове read, после инициализации value. TDZ к этому моменту закончилась.",
      },
      {
        id: "option-3",
        text: "undefined",
        explanation: "let value получила 7 до вызова read; значение не фиксируется при создании функции.",
      },
      {
        id: "option-4",
        text: "TypeError",
        explanation: "read содержит вызываемую функцию; она читает уже готовую привязку value.",
      },
    ],
    correctOptionId: "option-2",
  },
  // Chapter 1.1: Q5, Q14.
  {
    id: "fe-1.1-quiz-live-binding",
    type: "quiz",
    readMoreUrl: feSection1_1ReadMoreUrls.q5,
    question: `## Функция запомнила число или привязку?

Строгий изолированный скрипт.

~~~js
let value = 1;
const read = () => value;
value = 2;
console.log(read());
~~~`,
    options: [
      {
        id: "option-1",
        text: "1",
        explanation: "Замыкание сохраняет доступ к привязке, а не снимок её значения. К моменту чтения там 2.",
      },
      {
        id: "option-2",
        text: "ReferenceError",
        explanation: "value уже инициализирована; присваивание 2 допустимо, потому что это let.",
      },
      {
        id: "option-3",
        text: "2",
        explanation: "Функция читает текущее значение общей внешней привязки. Создание функции не копировало число 1.",
      },
      {
        id: "option-4",
        text: "TypeError",
        explanation: "const read запрещает заменить саму функцию, но не читать изменяемую внешнюю value.",
      },
    ],
    correctOptionId: "option-3",
  },
  // Chapter 1.1: Q7.
  {
    id: "fe-1.1-quiz-call-stack-order",
    type: "quiz",
    readMoreUrl: feSection1_1ReadMoreUrls.q7,
    question: `## В каком порядке появятся логи?

Строгий изолированный скрипт.

~~~js
function second() { console.log("B"); }
function first() {
  console.log("A");
  second();
  console.log("C");
}
first();
~~~`,
    options: [
      {
        id: "option-1",
        text: "A, C, B",
        explanation: "Вызов second даёт порядок A, B, C.",
      },
      {
        id: "option-2",
        text: "B, A, C",
        explanation: "Объявление second не вызывает её; сначала first выводит A.",
      },
      {
        id: "option-3",
        text: "A, B; C не появится",
        explanation: "После возврата из second функция first выводит C.",
      },
      {
        id: "option-4",
        text: "A, B, C",
        explanation: "first выводит A, second — B, затем first продолжает с C.",
      },
    ],
    correctOptionId: "option-4",
  },
  // Chapter 1.1: Q11.
  {
    id: "fe-1.1-quiz-switch-duplicate",
    type: "quiz",
    readMoreUrl: feSection1_1ReadMoreUrls.q11,
    question: `## Спасает ли выбор только одного case?

Строгий изолированный скрипт.

~~~js
console.log("start");
switch (1) {
  case 1: let label = "one"; break;
  case 2: let label = "two"; break;
}
~~~`,
    options: [
      {
        id: "option-1",
        text: "SyntaxError без логов",
        explanation: "Оба let label находятся в одном CaseBlock. Ранний конфликт отвергает весь скрипт, включая start.",
      },
      {
        id: "option-2",
        text: "Только start",
        explanation: "Выбор ветки не отменяет статический конфликт; код не запускается.",
      },
      {
        id: "option-3",
        text: "start, затем ReferenceError",
        explanation: "Повторный let — ранний SyntaxError, поэтому логов не будет.",
      },
      {
        id: "option-4",
        text: "start, затем SyntaxError при входе во второй case",
        explanation: "Конфликт обнаруживается до выполнения, а не при входе во второй case.",
      },
    ],
    correctOptionId: "option-1",
  },
  // Chapter 1.1: Q8, Q9.
  {
    id: "fe-1.1-quiz-class-tdz",
    type: "quiz",
    readMoreUrl: feSection1_1ReadMoreUrls.q8,
    question: `## Что вернёт typeof перед class?

Строгий изолированный скрипт.

~~~js
console.log(typeof Widget);
class Widget {}
~~~`,
    options: [
      {
        id: "option-1",
        text: "function",
        explanation: "После объявления class typeof обычно даёт function, но сейчас Widget ещё в TDZ.",
      },
      {
        id: "option-2",
        text: "ReferenceError",
        explanation: "class создаёт лексическую привязку с TDZ. typeof не обходит запрет чтения до инициализации.",
      },
      {
        id: "option-3",
        text: "undefined",
        explanation: "Widget не отсутствует: его привязка уже существует и не инициализирована.",
      },
      {
        id: "option-4",
        text: "SyntaxError",
        explanation: "Синтаксис допустим. Ошибка возникает при выполнении typeof над привязкой в TDZ.",
      },
    ],
    correctOptionId: "option-2",
  },
  // Chapter 1.1: Q12.
  {
    id: "fe-1.1-quiz-module-var",
    type: "quiz",
    readMoreUrl: feSection1_1ReadMoreUrls.q12,
    question: `## Публикует ли модуль свой var?

ES-модуль; свойства globalThis.mosaicModuleValue заранее нет.

~~~js
var mosaicModuleValue = 7;
console.log(mosaicModuleValue);
console.log(globalThis.mosaicModuleValue);
~~~`,
    options: [
      {
        id: "option-1",
        text: "7, затем 7",
        explanation: "var в ES-модуле локален модулю. Без явной записи свойства globalThis второй лог — undefined.",
      },
      {
        id: "option-2",
        text: "ReferenceError без логов",
        explanation: "Локальная привязка var доступна модулю. Первый лог выводит 7.",
      },
      {
        id: "option-3",
        text: "7, затем undefined",
        explanation: "var остаётся в модуле и не создаёт одноимённое свойство globalThis.",
      },
      {
        id: "option-4",
        text: "undefined, затем undefined",
        explanation: "Локальная var равна 7; отсутствует лишь свойство globalThis.",
      },
    ],
    correctOptionId: "option-3",
  },
  // Chapter 1.1: Q13.
  {
    id: "fe-1.1-quiz-sloppy-global-delete",
    type: "quiz",
    readMoreUrl: feSection1_1ReadMoreUrls.q13,
    question: `## Удаляется ли случайное глобальное свойство?

Нестрогий браузерный classic script в чистой среде; имени mosaicAccidental заранее нет.

~~~js
mosaicAccidental = 2;
console.log(delete globalThis.mosaicAccidental);
console.log(typeof mosaicAccidental);
~~~`,
    options: [
      {
        id: "option-1",
        text: "false, затем number",
        explanation: "Свойство configurable: delete вернёт true, затем имя исчезнет.",
      },
      {
        id: "option-2",
        text: "ReferenceError без логов",
        explanation: "Скрипт явно нестрогий: присваивание отсутствующему имени создаёт глобальное свойство.",
      },
      {
        id: "option-3",
        text: "SyntaxError без логов",
        explanation: "Удаляется свойство globalThis, поэтому синтаксис допустим.",
      },
      {
        id: "option-4",
        text: "true, затем строка undefined",
        explanation: "delete вернёт true; после удаления typeof даст строку \"undefined\".",
      },
    ],
    correctOptionId: "option-4",
  },
  // Chapter 1.1: Q2, Q4.
  {
    id: "fe-1.1-quiz-forof-const",
    type: "quiz",
    readMoreUrl: feSection1_1ReadMoreUrls.q2,
    question: `## Почему const здесь допустим?

Строгий изолированный скрипт.

~~~js
for (const value of [1, 2]) {
  console.log(value);
}
~~~`,
    options: [
      {
        id: "option-1",
        text: "1, затем 2",
        explanation: "В for...of цикл инициализирует отдельную const-привязку для каждой итерации. Обычное const value; было бы ошибкой.",
      },
      {
        id: "option-2",
        text: "SyntaxError без логов",
        explanation: "Заголовок for...of — специальная форма объявления: значение задаёт цикл, явный = не нужен.",
      },
      {
        id: "option-3",
        text: "1, затем TypeError",
        explanation: "Вторая итерация получает новую привязку. Это не повторное присваивание одной const.",
      },
      {
        id: "option-4",
        text: "undefined, затем undefined",
        explanation: "Каждая привязка инициализируется очередным элементом массива: 1 и 2.",
      },
    ],
    correctOptionId: "option-1",
  },
  // Chapter 1.1: Q14.
  {
    id: "fe-1.1-quiz-loop-outer-let",
    type: "quiz",
    readMoreUrl: feSection1_1ReadMoreUrls.q14,
    question: `## Достаточно ли заменить var на let снаружи?

Строгий изолированный скрипт.

~~~js
const readers = [];
let i = 0;
for (; i < 3; i++) {
  readers.push(() => i);
}
console.log(readers.map(read => read()).join(","));
~~~`,
    options: [
      {
        id: "option-1",
        text: "0,1,2",
        explanation: "let объявлена снаружи цикла, поэтому все функции разделяют одну i.",
      },
      {
        id: "option-2",
        text: "3,3,3",
        explanation: "Все функции читают одну let i, объявленную перед циклом. После цикла её значение — 3.",
      },
      {
        id: "option-3",
        text: "ReferenceError",
        explanation: "i остаётся доступной во внешней области после цикла; TDZ закончилась до его запуска.",
      },
      {
        id: "option-4",
        text: "1,2,3",
        explanation: "Функции вызваны после цикла, а не после каждого увеличения. Все видят итоговое 3.",
      },
    ],
    correctOptionId: "option-2",
  },
];
