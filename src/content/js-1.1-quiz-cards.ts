import type { QuizCardData } from "./card-types";

// Source: Frontend Interview Preparation, section 1.1.
export const js11QuizCards: QuizCardData[] = [
  {
    id: "js11-quiz-var-before",
    type: "quiz",
    question: `## Что появится в консоли?

Среда: отдельный фрагмент JavaScript в строгом режиме. Внешних одноимённых привязок нет.

~~~js
console.log(value);
var value = 9;
~~~`,
    options: [
      {
        id: "option-1",
        text: "9",
        explanation: "Инициализатор = 9 ещё не выполнен.",
      },
      {
        id: "option-2",
        text: "undefined",
        explanation: "Новая var-привязка заранее инициализирована undefined.",
      },
      {
        id: "option-3",
        text: "ReferenceError",
        explanation: "var не находится в TDZ.",
      },
      {
        id: "option-4",
        text: "SyntaxError",
        explanation: "Код допустим: раннее чтение var разрешено.",
      },
    ],
    correctOptionId: "option-2",
  },
  {
    id: "js11-quiz-let-before",
    type: "quiz",
    question: `## Как завершится чтение?

Среда: отдельный фрагмент JavaScript в строгом режиме. Внешних одноимённых привязок нет.

~~~js
console.log(value);
let value = 9;
~~~`,
    options: [
      {
        id: "option-1",
        text: "undefined",
        explanation: "let до инициализации не содержит доступного undefined.",
      },
      {
        id: "option-2",
        text: "9",
        explanation: "До инициализатора выполнение не дойдёт: чтение бросит исключение.",
      },
      {
        id: "option-3",
        text: "ReferenceError",
        explanation: "Поиск находит let value в TDZ; чтение запрещено.",
      },
      {
        id: "option-4",
        text: "TypeError",
        explanation: "Это не вызов неподходящего значения, а чтение неинициализированной привязки.",
      },
    ],
    correctOptionId: "option-3",
  },
  {
    id: "js11-quiz-empty-let",
    type: "quiz",
    question: `## Чем закончится фрагмент?

Среда: отдельный фрагмент JavaScript в строгом режиме. Внешних одноимённых привязок нет.

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
        explanation: "Без инициализатора let не получает null.",
      },
      {
        id: "option-3",
        text: "ReferenceError",
        explanation: "TDZ уже закончилась на строке объявления.",
      },
      {
        id: "option-4",
        text: "SyntaxError",
        explanation: "В отличие от обычного const, let допускает отсутствие инициализатора.",
      },
    ],
    correctOptionId: "option-1",
  },
  {
    id: "js11-quiz-repeat-var",
    type: "quiz",
    question: `## Что выведет повторное объявление?

Среда: отдельный фрагмент JavaScript в строгом режиме. Внешних одноимённых привязок нет.

~~~js
var score = 10;
var score;
console.log(score);
~~~`,
    options: [
      {
        id: "option-1",
        text: "undefined",
        explanation: "Повторное var без инициализатора не стирает текущее значение.",
      },
      {
        id: "option-2",
        text: "10",
        explanation: "Оба объявления используют одну привязку; повторное объявление не присваивает undefined.",
      },
      {
        id: "option-3",
        text: "SyntaxError",
        explanation: "Совместимое повторное var в этой области разрешено.",
      },
      {
        id: "option-4",
        text: "ReferenceError",
        explanation: "Привязка уже инициализирована и доступна.",
      },
    ],
    correctOptionId: "option-2",
  },
  {
    id: "js11-quiz-mutate-const",
    type: "quiz",
    question: `## Что выведет код?

Среда: отдельный фрагмент JavaScript в строгом режиме. Внешних одноимённых привязок нет.

~~~js
const user = { name: 'Ada' };
user.name = 'Grace';
console.log(user.name);
~~~`,
    options: [
      {
        id: "option-1",
        text: "Ada",
        explanation: "Поле объекта было изменено.",
      },
      {
        id: "option-2",
        text: "Grace",
        explanation: "const сохраняет ссылку в привязке, но не запрещает менять поля объекта.",
      },
      {
        id: "option-3",
        text: "TypeError",
        explanation: "Повторного присваивания user нет: меняется свойство.",
      },
      {
        id: "option-4",
        text: "SyntaxError",
        explanation: "Изменение свойства объекта, записанного в const, синтаксически допустимо.",
      },
    ],
    correctOptionId: "option-2",
  },
  {
    id: "js11-quiz-reassign-const",
    type: "quiz",
    question: `## Какие логи успеют появиться?

Среда: отдельный фрагмент JavaScript в строгом режиме. Внешних одноимённых привязок нет.

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
        explanation: "Присваивание const допустимо синтаксически, но не выполняется успешно.",
      },
      {
        id: "option-3",
        text: "1, затем 2",
        explanation: "Переназначение привязки const запрещено.",
      },
      {
        id: "option-4",
        text: "ReferenceError без логов",
        explanation: "value уже инициализирована, поэтому это не ошибка поиска имени.",
      },
    ],
    correctOptionId: "option-1",
  },
  {
    id: "js11-quiz-var-if",
    type: "quiz",
    question: `## Что видно после if?

Среда: отдельный фрагмент JavaScript в строгом режиме. Внешних одноимённых привязок нет.

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
        explanation: "Ветка выполнена, поэтому инициализатор записал 4.",
      },
      {
        id: "option-2",
        text: "4",
        explanation: "var принадлежит run, а не блоку if.",
      },
      {
        id: "option-3",
        text: "ReferenceError",
        explanation: "Обычный блок не ограничивает var.",
      },
      {
        id: "option-4",
        text: "SyntaxError",
        explanation: "Код не содержит конфликта объявлений.",
      },
    ],
    correctOptionId: "option-2",
  },
  {
    id: "js11-quiz-let-if",
    type: "quiz",
    question: `## Что видно снаружи блока?

Среда: отдельный фрагмент JavaScript в строгом режиме. Внешних одноимённых привязок нет.

~~~js
if (true) { let count = 4; }
console.log(count);
~~~`,
    options: [
      {
        id: "option-1",
        text: "4",
        explanation: "let count ограничена блоком if.",
      },
      {
        id: "option-2",
        text: "undefined",
        explanation: "За пределами блока нет привязки count; это не доступная переменная со значением undefined.",
      },
      {
        id: "option-3",
        text: "ReferenceError",
        explanation: "Поиск имени за пределами блока не находит count.",
      },
      {
        id: "option-4",
        text: "TypeError",
        explanation: "Проблема в отсутствии имени, а не в типе найденного значения.",
      },
    ],
    correctOptionId: "option-3",
  },
  {
    id: "js11-quiz-call-site",
    type: "quiz",
    question: `## Какое имя прочитает функция?

Среда: отдельный фрагмент JavaScript в строгом режиме. Внешних одноимённых привязок нет.

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
        explanation: "Место вызова не добавляет локальную role из run в цепочку read.",
      },
      {
        id: "option-2",
        text: "guest",
        explanation: "read определена снаружи run и находит внешнюю role со значением guest.",
      },
      {
        id: "option-3",
        text: "undefined",
        explanation: "Внешняя role инициализирована.",
      },
      {
        id: "option-4",
        text: "ReferenceError",
        explanation: "Имя доступно из лексической области определения read.",
      },
    ],
    correctOptionId: "option-2",
  },
  {
    id: "js11-quiz-shadow",
    type: "quiz",
    question: `## Изменится ли внешняя переменная?

Среда: отдельный фрагмент JavaScript в строгом режиме. Внешних одноимённых привязок нет.

~~~js
let label = 'outer';
{ let label = 'inner'; }
console.log(label);
~~~`,
    options: [
      {
        id: "option-1",
        text: "inner",
        explanation: "Внутренняя label — другая привязка; она не присваивает значение внешней.",
      },
      {
        id: "option-2",
        text: "outer",
        explanation: "После блока читается внешняя label: она осталась outer.",
      },
      {
        id: "option-3",
        text: "SyntaxError",
        explanation: "Одинаковые let находятся в разных областях и не конфликтуют.",
      },
      {
        id: "option-4",
        text: "ReferenceError",
        explanation: "Внешняя label существует и инициализирована.",
      },
    ],
    correctOptionId: "option-2",
  },
  {
    id: "js11-quiz-shadow-tdz",
    type: "quiz",
    question: `## Можно ли прочитать внешнюю count?

Среда: отдельный фрагмент JavaScript в строгом режиме. Внешних одноимённых привязок нет.

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
        explanation: "Поиск останавливается на внутренней count и не переходит к внешней.",
      },
      {
        id: "option-2",
        text: "2",
        explanation: "Инициализатор внутренней count ещё не выполнен.",
      },
      {
        id: "option-3",
        text: "undefined",
        explanation: "Неинициализированная let не даёт доступного undefined.",
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
    id: "js11-quiz-typeof-missing",
    type: "quiz",
    question: `## Что вернёт typeof?

Среда: отдельный фрагмент JavaScript в строгом режиме. Внешних одноимённых привязок нет.

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
        explanation: "typeof всегда возвращает строку при успешном выполнении.",
      },
      {
        id: "option-3",
        text: "ReferenceError",
        explanation: "Специальный случай typeof допускает отсутствующий идентификатор.",
      },
      {
        id: "option-4",
        text: "SyntaxError",
        explanation: "Такой typeof синтаксически допустим.",
      },
    ],
    correctOptionId: "option-1",
  },
  {
    id: "js11-quiz-typeof-tdz",
    type: "quiz",
    question: `## Спасёт ли typeof от TDZ?

Среда: отдельный фрагмент JavaScript в строгом режиме. Внешних одноимённых привязок нет.

~~~js
console.log(typeof value);
let value;
~~~`,
    options: [
      {
        id: "option-1",
        text: "Строку \"undefined\"",
        explanation: "Имя существует в TDZ: безопасный случай отсутствующего имени здесь не применим.",
      },
      {
        id: "option-2",
        text: "ReferenceError",
        explanation: "typeof пытается прочитать неинициализированную лексическую привязку.",
      },
      {
        id: "option-3",
        text: "Строку \"object\"",
        explanation: "В TDZ значение прочитать нельзя, поэтому строкового результата нет.",
      },
      {
        id: "option-4",
        text: "SyntaxError",
        explanation: "Код синтаксически допустим; ошибка возникает при выполнении.",
      },
    ],
    correctOptionId: "option-2",
  },
  {
    id: "js11-quiz-self-init",
    type: "quiz",
    question: `## Какое значение получит value?

Среда: отдельный фрагмент JavaScript в строгом режиме. Внешних одноимённых привязок нет.

~~~js
let value = value;
console.log(value);
~~~`,
    options: [
      {
        id: "option-1",
        text: "undefined",
        explanation: "Правая часть вычисляется до завершения инициализации let.",
      },
      {
        id: "option-2",
        text: "null",
        explanation: "Язык не подставляет null при самоссылке.",
      },
      {
        id: "option-3",
        text: "ReferenceError",
        explanation: "При вычислении правой части value всё ещё находится в TDZ.",
      },
      {
        id: "option-4",
        text: "SyntaxError",
        explanation: "Объявление синтаксически допустимо, но его выполнение бросает исключение.",
      },
    ],
    correctOptionId: "option-3",
  },
  {
    id: "js11-quiz-declaration",
    type: "quiz",
    question: `## Можно ли вызвать функцию раньше?

Среда: отдельный фрагмент JavaScript в строгом режиме. Внешних одноимённых привязок нет.

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
        explanation: "sum уже содержит функцию, которая возвращает 5.",
      },
      {
        id: "option-3",
        text: "ReferenceError",
        explanation: "Здесь нет TDZ у const/let с функциональным выражением.",
      },
      {
        id: "option-4",
        text: "TypeError",
        explanation: "Значение sum вызываемо: это функция.",
      },
    ],
    correctOptionId: "option-1",
  },
  {
    id: "js11-quiz-expression-var",
    type: "quiz",
    question: `## Как завершится ранний вызов?

Среда: отдельный фрагмент JavaScript в строгом режиме. Внешних одноимённых привязок нет.

~~~js
run();
var run = () => 7;
~~~`,
    options: [
      {
        id: "option-1",
        text: "7",
        explanation: "Присваивание функции ещё не выполнено.",
      },
      {
        id: "option-2",
        text: "undefined без ошибки",
        explanation: "Чтение run даёт undefined, но попытка вызвать его бросает исключение.",
      },
      {
        id: "option-3",
        text: "TypeError",
        explanation: "var run уже содержит undefined; undefined нельзя вызвать.",
      },
      {
        id: "option-4",
        text: "ReferenceError",
        explanation: "Привязка var существует и инициализирована: ошибка не в поиске имени.",
      },
    ],
    correctOptionId: "option-3",
  },
  {
    id: "js11-quiz-expression-const",
    type: "quiz",
    question: `## Как завершится ранний вызов?

Среда: отдельный фрагмент JavaScript в строгом режиме. Внешних одноимённых привязок нет.

~~~js
run();
const run = () => 7;
~~~`,
    options: [
      {
        id: "option-1",
        text: "7",
        explanation: "Функциональное выражение ещё не вычислено.",
      },
      {
        id: "option-2",
        text: "TypeError",
        explanation: "Чтение const run падает раньше проверки вызываемости.",
      },
      {
        id: "option-3",
        text: "ReferenceError",
        explanation: "const run находится в TDZ до инициализации.",
      },
      {
        id: "option-4",
        text: "SyntaxError",
        explanation: "Код допустим синтаксически; раннее чтение вызывает исключение.",
      },
    ],
    correctOptionId: "option-3",
  },
  {
    id: "js11-quiz-early-let",
    type: "quiz",
    question: `## Успеет ли появиться start?

Среда: отдельный фрагмент JavaScript в строгом режиме. Внешних одноимённых привязок нет.

~~~js
console.log('start');
let value = 1;
let value = 2;
~~~`,
    options: [
      {
        id: "option-1",
        text: "start, затем SyntaxError",
        explanation: "Повторное let обнаруживается до выполнения всего фрагмента.",
      },
      {
        id: "option-2",
        text: "SyntaxError без логов",
        explanation: "Два let в одной области — ранний SyntaxError; ни одна инструкция не выполняется.",
      },
      {
        id: "option-3",
        text: "start, затем 2",
        explanation: "Повторное объявление запрещено, это не повторное присваивание.",
      },
      {
        id: "option-4",
        text: "ReferenceError без логов",
        explanation: "Конфликт объявлений даёт SyntaxError, а не ошибку чтения.",
      },
    ],
    correctOptionId: "option-2",
  },
  {
    id: "js11-quiz-illegal-var",
    type: "quiz",
    question: `## Создаёт ли var внутреннюю переменную?

Среда: отдельный фрагмент JavaScript в строгом режиме. Внешних одноимённых привязок нет.

~~~js
let mode = 'outer';
{ var mode = 'inner'; }
console.log(mode);
~~~`,
    options: [
      {
        id: "option-1",
        text: "outer",
        explanation: "Отдельная внутренняя var-привязка не создаётся.",
      },
      {
        id: "option-2",
        text: "inner",
        explanation: "var выходит за обычный блок и конфликтует с внешним let.",
      },
      {
        id: "option-3",
        text: "ReferenceError",
        explanation: "Ошибка возникает до поиска имени при выполнении.",
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
    id: "js11-quiz-legal-shadow",
    type: "quiz",
    question: `## А если снаружи var, а внутри let?

Среда: отдельный фрагмент JavaScript в строгом режиме. Внешних одноимённых привязок нет.

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
        explanation: "Внутреннее значение видно только внутри блока.",
      },
      {
        id: "option-3",
        text: "SyntaxError",
        explanation: "Здесь допустимое затенение: разные привязки в разных областях.",
      },
      {
        id: "option-4",
        text: "undefined",
        explanation: "Внешний инициализатор присвоил outer.",
      },
    ],
    correctOptionId: "option-1",
  },
  {
    id: "js11-quiz-loop-var",
    type: "quiz",
    question: `## Что прочитают функции после цикла?

Среда: отдельный фрагмент JavaScript в строгом режиме. Внешних одноимённых привязок нет.

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
        explanation: "Функции не копируют значения каждой итерации при var.",
      },
      {
        id: "option-2",
        text: "1,2,3",
        explanation: "Все читают одну привязку после завершения цикла, а не значения после каждого увеличения.",
      },
      {
        id: "option-3",
        text: "3,3,3",
        explanation: "Общая i после цикла равна 3; все три функции читают её.",
      },
      {
        id: "option-4",
        text: "undefined,undefined,undefined",
        explanation: "i инициализирована и после цикла содержит 3.",
      },
    ],
    correctOptionId: "option-3",
  },
  {
    id: "js11-quiz-loop-let",
    type: "quiz",
    question: `## Что изменится с let?

Среда: отдельный фрагмент JavaScript в строгом режиме. Внешних одноимённых привязок нет.

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
        explanation: "В for с let нет одной общей привязки для всех этих функций.",
      },
      {
        id: "option-2",
        text: "0,1,2",
        explanation: "Цикл создаёт привязки итераций; функции читают свои 0, 1 и 2.",
      },
      {
        id: "option-3",
        text: "1,2,3",
        explanation: "Увеличение цикла не превращает сохранённые привязки тела в 1, 2 и 3.",
      },
      {
        id: "option-4",
        text: "ReferenceError",
        explanation: "Функции сохраняют доступ к своим привязкам после завершения цикла.",
      },
    ],
    correctOptionId: "option-2",
  },
  {
    id: "js11-quiz-strict-missing",
    type: "quiz",
    question: `## Что произойдёт без объявления имени?

Среда: отдельный фрагмент JavaScript в строгом режиме. Внешних одноимённых привязок нет.

~~~js
mosaicTotal = 5;
console.log(mosaicTotal);
~~~`,
    options: [
      {
        id: "option-1",
        text: "5",
        explanation: "Строгий режим не создаёт случайное глобальное свойство.",
      },
      {
        id: "option-2",
        text: "undefined",
        explanation: "Присваивание неразрешимому имени не создаёт привязку с undefined.",
      },
      {
        id: "option-3",
        text: "ReferenceError",
        explanation: "В строгом режиме такая запись бросает ReferenceError.",
      },
      {
        id: "option-4",
        text: "SyntaxError",
        explanation: "Сам синтаксис присваивания допустим; ошибка возникает при выполнении.",
      },
    ],
    correctOptionId: "option-3",
  },
  {
    id: "js11-quiz-classic-global",
    type: "quiz",
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
        explanation: "Глобальный let не становится свойством globalThis.",
      },
      {
        id: "option-2",
        text: "undefined, затем undefined",
        explanation: "В этой чистой classic-script среде var создаёт глобальное свойство.",
      },
      {
        id: "option-3",
        text: "1, затем undefined",
        explanation: "var связан со свойством глобального объекта; let хранится как глобальная лексическая привязка.",
      },
      {
        id: "option-4",
        text: "ReferenceError",
        explanation: "Чтение отсутствующего свойства объекта даёт undefined, а не ReferenceError.",
      },
    ],
    correctOptionId: "option-3",
  },
];
