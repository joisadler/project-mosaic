import type { QuizCardData } from "./card-types";
import { feSection1_9ReadMoreUrls } from "./fe-1.9-source-urls";

export const feSection1_9QuizCards: QuizCardData[] = [
  {
    id: "fe-1.9-quiz-countdown-deadline",
    type: "quiz",
    visual: { motif: "deadline" },
    question: `Отметки в мс по одним часам. Что выведет отсчёт?

~~~js
const end = 8000;
const left = now => {
  const s = (end - now) / 1000;
  return Math.max(0, Math.ceil(s));
};
console.log(left(6350), left(9500));
~~~`,
    options: [
      {
        id: "a",
        text: "1 / 0",
        explanation: "Math.ceil округляет 1,65 вверх до 2.",
      },
      {
        id: "b",
        text: "2 / -1",
        explanation: "Math.ceil даёт -1. Math.max заменяет его на 0.",
      },
      {
        id: "c",
        text: "2 / 0",
        explanation: "1650 мс дают 2 секунды. После дедлайна остаток равен 0.",
      },
      {
        id: "d",
        text: "1.65 / 0",
        explanation: "1,65 — промежуточное значение. Math.ceil даёт 2.",
      },
    ],
    correctOptionId: "c",
    readMoreUrl: feSection1_9ReadMoreUrls.q16,
  },
  {
    id: "fe-1.9-quiz-network-ready",
    type: "quiz",
    question: "Ответ сети готов, пока обработчик клика выполняет длинный синхронный расчёт. Что произойдёт в этом же потоке?",
    options: [
      {
        id: "a",
        text: "Обработчик ответа прервёт расчёт",
        explanation: "Готовность ответа не прерывает код.",
      },
      {
        id: "b",
        text: "Сеть начнёт ждать только после расчёта",
        explanation: "Сеть может завершить работу независимо.",
      },
      {
        id: "c",
        text: "Обработчик ответа дождётся конца расчёта",
        explanation: "Пока поток занят, новый вызов ждёт.",
      },
      {
        id: "d",
        text: "Результат сети заменит текущую задачу",
        explanation: "Текущая задача сохраняет управление.",
      },
    ],
    correctOptionId: "c",
    readMoreUrl: feSection1_9ReadMoreUrls.q1,
  },
  {
    id: "fe-1.9-quiz-nested-output",
    type: "quiz",
    question: `Что выведет обычный вызов?

~~~js
function run(fn) {
  fn("B");
  console.log("C");
}
console.log("A");
run(console.log);
~~~`,
    options: [
      {
        id: "a",
        text: "\"A\" / \"C\" / \"B\"",
        explanation: "Вызов fn завершится до печати C.",
      },
      {
        id: "b",
        text: "\"A\" / \"B\" / \"C\"",
        explanation: "fn вызывается синхронно внутри run.",
      },
      {
        id: "c",
        text: "\"B\" / \"C\" / \"A\"",
        explanation: "Первая запись делается до вызова run.",
      },
      {
        id: "d",
        text: "\"A\" / \"C\"",
        explanation: "Вызов fn тоже печатает строку.",
      },
    ],
    correctOptionId: "b",
    readMoreUrl: feSection1_9ReadMoreUrls.q2,
  },
  {
    id: "fe-1.9-quiz-ready-task-order",
    type: "quiz",
    question: "Таймер и событие ввода готовы, пока браузер выбирает следующую задачу. Что следует из этого условия?",
    options: [
      {
        id: "a",
        text: "Таймер всегда раньше ввода",
        explanation: "Тип источника не задаёт такой порядок.",
      },
      {
        id: "b",
        text: "Ввод всегда раньше таймера",
        explanation: "Здесь нет гарантии приоритета ввода.",
      },
      {
        id: "c",
        text: "Победит более ранняя регистрация",
        explanation: "Регистрация не образует общую FIFO.",
      },
      {
        id: "d",
        text: "Взаимный порядок не задан",
        explanation: "Нужны правила выбора в этом сценарии.",
      },
    ],
    correctOptionId: "d",
    readMoreUrl: feSection1_9ReadMoreUrls.q4,
  },
  {
    id: "fe-1.9-quiz-timer-no-interruption",
    type: "quiz",
    question: `Что выведет отдельный модуль?

~~~js
const p = new Promise(r => {
  setTimeout(() => r("T"), 0);
});
console.log("S");
console.log(await p);
~~~`,
    options: [
      {
        id: "a",
        text: "\"S\" / \"T\"",
        explanation: "Синхронная запись S предшествует таймеру.",
      },
      {
        id: "b",
        text: "\"T\" / \"S\"",
        explanation: "Таймер не прерывает синхронную запись.",
      },
      {
        id: "c",
        text: "\"T\"",
        explanation: "До таймера код успевает вывести S.",
      },
      {
        id: "d",
        text: "\"S\"",
        explanation: "Таймер разрешит p, и модуль выведет T.",
      },
    ],
    correctOptionId: "a",
    readMoreUrl: feSection1_9ReadMoreUrls.q3,
  },
  {
    id: "fe-1.9-quiz-checkpoint-after-call",
    type: "quiz",
    question: `Что выведет отдельный скрипт?

~~~js
queueMicrotask(() => log("M"));
const log = x => console.log(x);
log("S");
~~~`,
    options: [
      {
        id: "a",
        text: "\"M\" / \"S\"",
        explanation: "Микрозадача ждёт текущий код.",
      },
      {
        id: "b",
        text: "ReferenceError",
        explanation: "К моменту вызова log уже инициализирована.",
      },
      {
        id: "c",
        text: "\"S\" / \"M\"",
        explanation: "Синхронная запись S предшествует M.",
      },
      {
        id: "d",
        text: "\"S\"",
        explanation: "Зарегистрированная микрозадача тоже выполнится.",
      },
    ],
    correctOptionId: "c",
    readMoreUrl: feSection1_9ReadMoreUrls.q5,
  },
  {
    id: "fe-1.9-quiz-executor-sync",
    type: "quiz",
    question: `Каков вывод?

~~~js
const p = new Promise(r => {
  console.log("A");
  r();
});
p.then(() => console.log("C"));
console.log("B");
~~~`,
    options: [
      {
        id: "a",
        text: "\"A\" / \"C\" / \"B\"",
        explanation: "Реакция C выполнится после B.",
      },
      {
        id: "b",
        text: "\"B\" / \"A\" / \"C\"",
        explanation: "Исполнитель запускается внутри new Promise.",
      },
      {
        id: "c",
        text: "\"B\" / \"C\" / \"A\"",
        explanation: "Код A выполняется первым.",
      },
      {
        id: "d",
        text: "\"A\" / \"B\" / \"C\"",
        explanation: "Исполнитель и B выполняются до реакции.",
      },
    ],
    correctOptionId: "d",
    readMoreUrl: feSection1_9ReadMoreUrls.q6,
  },
  {
    id: "fe-1.9-quiz-ready-microtasks-fifo",
    type: "quiz",
    question: `Каков вывод отдельного скрипта?

~~~js
const log = console.log;
queueMicrotask(() => log("Q"));
Promise.resolve()
  .then(() => log("P"));
queueMicrotask(() => log("R"));
~~~`,
    options: [
      {
        id: "a",
        text: "\"Q\" / \"P\" / \"R\"",
        explanation: "Готовая реакция поставлена между Q и R.",
      },
      {
        id: "b",
        text: "\"P\" / \"Q\" / \"R\"",
        explanation: "У Promise нет отдельного приоритета.",
      },
      {
        id: "c",
        text: "\"Q\" / \"R\" / \"P\"",
        explanation: "Готовая реакция уже ждёт перед R.",
      },
      {
        id: "d",
        text: "\"R\" / \"P\" / \"Q\"",
        explanation: "Очередь не обращает порядок.",
      },
    ],
    correctOptionId: "a",
    readMoreUrl: feSection1_9ReadMoreUrls.q7,
  },
  {
    id: "fe-1.9-quiz-pending-reaction",
    type: "quiz",
    question: `Что выведет этот скрипт?

~~~js
let finish;
const p = new Promise(r => {
  finish = r;
});
const log = console.log;
p.then(() => log("P"));
queueMicrotask(() => log("Q"));
finish();
~~~`,
    options: [
      {
        id: "a",
        text: "\"P\" / \"Q\"",
        explanation: "Реакция P становится готовой после Q.",
      },
      {
        id: "b",
        text: "\"Q\" / \"P\"",
        explanation: "finish ставит P за уже ожидающей Q.",
      },
      {
        id: "c",
        text: "\"P\"",
        explanation: "Q уже поставлена в очередь.",
      },
      {
        id: "d",
        text: "\"Q\"",
        explanation: "finish разрешает Promise и ставит P.",
      },
    ],
    correctOptionId: "b",
    readMoreUrl: feSection1_9ReadMoreUrls.q7,
  },
  {
    id: "fe-1.9-quiz-nested-microtask-tail",
    type: "quiz",
    question: "В очереди микрозадачи A и B. Во время A ставится C. Как среда продолжит контрольную точку?",
    options: [
      {
        id: "a",
        text: "Запустит C вложенным вызовом в A",
        explanation: "C только добавляется в очередь.",
      },
      {
        id: "b",
        text: "После A выполнит C, затем B",
        explanation: "B уже стояла в очереди перед C.",
      },
      {
        id: "c",
        text: "После A выполнит B, затем C",
        explanation: "Новая микрозадача встаёт в конец.",
      },
      {
        id: "d",
        text: "Отложит C до следующей задачи",
        explanation: "Текущая проверка продолжается до опустошения.",
      },
    ],
    correctOptionId: "c",
    readMoreUrl: feSection1_9ReadMoreUrls.q8,
  },
  {
    id: "fe-1.9-quiz-microtask-between-timers",
    type: "quiz",
    question: "Браузерные таймеры A и B с задержкой 0 поставлены подряд одним скриптом. A ставит микрозадачу M. Каков порядок?",
    options: [
      {
        id: "a",
        text: "\"A\" / \"B\" / \"M\"",
        explanation: "Проверка микрозадач проходит между таймерами.",
      },
      {
        id: "b",
        text: "\"A\" / \"M\" / \"B\"",
        explanation: "M выполняется после завершения A, до B.",
      },
      {
        id: "c",
        text: "\"M\" / \"A\" / \"B\"",
        explanation: "До A микрозадача M ещё не поставлена.",
      },
      {
        id: "d",
        text: "\"B\" / \"A\" / \"M\"",
        explanation: "В этих условиях A поставлен раньше B.",
      },
    ],
    correctOptionId: "b",
    readMoreUrl: feSection1_9ReadMoreUrls.q9,
  },
  {
    id: "fe-1.9-quiz-dispatch-listener-order",
    type: "quiz",
    question: `Что выведет браузерный скрипт?

~~~js
const t = new EventTarget();
t.addEventListener("x", () => {
  console.log("L");
});
t.dispatchEvent(new Event("x"));
console.log("S");
~~~`,
    options: [
      {
        id: "a",
        text: "\"S\" / \"L\"",
        explanation: "Обработчик вызывается до возврата из dispatchEvent.",
      },
      {
        id: "b",
        text: "\"S\"",
        explanation: "Событие x имеет зарегистрированный обработчик.",
      },
      {
        id: "c",
        text: "\"L\"",
        explanation: "После отправки текущий скрипт продолжается.",
      },
      {
        id: "d",
        text: "\"L\" / \"S\"",
        explanation: "Отправка вызывает L синхронно, затем код печатает S.",
      },
    ],
    correctOptionId: "d",
    readMoreUrl: feSection1_9ReadMoreUrls.q10,
  },
  {
    id: "fe-1.9-quiz-dispatch-microtask-boundary",
    type: "quiz",
    question: "Обработчик синхронного dispatchEvent() ставит микрозадачу M. Сразу после возврата внешний скрипт печатает S. Что раньше?",
    options: [
      {
        id: "a",
        text: "Сначала S, затем M",
        explanation: "Внешний скрипт ещё удерживает стек.",
      },
      {
        id: "b",
        text: "Сначала M, затем S",
        explanation: "Вложенный обработчик вернулся в скрипт.",
      },
      {
        id: "c",
        text: "M внутри строки регистрации",
        explanation: "queueMicrotask только ставит работу в очередь.",
      },
      {
        id: "d",
        text: "Порядок зависит от частоты кадров",
        explanation: "Граница здесь задана стеком.",
      },
    ],
    correctOptionId: "a",
    readMoreUrl: feSection1_9ReadMoreUrls.q10,
  },
  {
    id: "fe-1.9-quiz-starvation-with-flat-stack",
    type: "quiz",
    question: "Каждый вызов микрозадачи завершается, но перед возвратом ставит следующую. Почему готовый таймер ждёт?",
    options: [
      {
        id: "a",
        text: "Все микрозадачи остались в стеке",
        explanation: "Завершённые вызовы снимаются со стека.",
      },
      {
        id: "b",
        text: "Очередь микрозадач не опустошается",
        explanation: "Контрольная точка продолжает обработку.",
      },
      {
        id: "c",
        text: "Таймер отменяется при новой микрозадаче",
        explanation: "Постановка микрозадачи не отменяет таймер.",
      },
      {
        id: "d",
        text: "Интерфейс приостановил сам таймер",
        explanation: "Хватает заданной бесконечной очереди.",
      },
    ],
    correctOptionId: "b",
    readMoreUrl: feSection1_9ReadMoreUrls.q11,
  },
  {
    id: "fe-1.9-quiz-yield-to-task",
    type: "quiz",
    question: "Обработка большого списка должна давать вводу шанс между порциями. Как запланировать продолжение после короткой порции?",
    options: [
      {
        id: "a",
        text: "Вызвать следующую порцию сразу",
        explanation: "Текущий синхронный вызов продолжится.",
      },
      {
        id: "b",
        text: "Поставить продолжение через queueMicrotask",
        explanation: "Оно останется в контрольной точке.",
      },
      {
        id: "c",
        text: "Дождаться Promise.resolve()",
        explanation: "Продолжение попадёт в микрозадачи.",
      },
      {
        id: "d",
        text: "Запланировать продолжение таймером",
        explanation: "Возврат даёт среде выбрать очередную задачу.",
      },
    ],
    correctOptionId: "d",
    readMoreUrl: feSection1_9ReadMoreUrls.q12,
  },
  {
    id: "fe-1.9-quiz-reentrant-chunk-cancel",
    type: "quiz",
    question: "visit() иногда отменяет обработку прямо во время порции. Где проверить отмену, чтобы не посетить следующий элемент?",
    options: [
      {
        id: "a",
        text: "Только перед первой порцией",
        explanation: "Отмена возможна уже во время обхода.",
      },
      {
        id: "b",
        text: "Лишь после обхода всей порции",
        explanation: "К этому моменту лишние элементы посещены.",
      },
      {
        id: "c",
        text: "Между элементами внутри порции",
        explanation: "Следующее посещение начнётся лишь при активности.",
      },
      {
        id: "d",
        text: "После вызова onDone",
        explanation: "Тогда обход и уведомление уже прошли.",
      },
    ],
    correctOptionId: "c",
    readMoreUrl: feSection1_9ReadMoreUrls.q12,
  },
  {
    id: "fe-1.9-quiz-empty-chunks",
    type: "quiz",
    question: "Отменяемая обработка получила пустой список. Отмены нет. Какое наблюдение соответствует обычному завершению?",
    options: [
      {
        id: "a",
        text: "0 вызовов visit, 1 вызов onDone",
        explanation: "Пустая работа сразу достигает завершения.",
      },
      {
        id: "b",
        text: "1 вызов visit, 1 вызов onDone",
        explanation: "В пустом списке нечего посещать.",
      },
      {
        id: "c",
        text: "0 вызовов visit, 0 вызовов onDone",
        explanation: "Об успешном завершении нужно сообщить.",
      },
      {
        id: "d",
        text: "0 вызовов visit, 2 вызова onDone",
        explanation: "Одной операции соответствует одно завершение.",
      },
    ],
    correctOptionId: "a",
    readMoreUrl: feSection1_9ReadMoreUrls.q12,
  },
  {
    id: "fe-1.9-quiz-timer-delayed-by-work",
    type: "quiz",
    visual: { motif: "deadline" },
    question: "Запрошена задержка 10 мс. Текущий синхронный расчёт занял ещё 40 мс. Что можно сказать о запуске таймера?",
    options: [
      {
        id: "a",
        text: "Он прервёт расчёт через 10 мс",
        explanation: "Обработчик ждёт освобождения потока.",
      },
      {
        id: "b",
        text: "Он начнётся после расчёта или позже",
        explanation: "Порог истечёт во время занятого вызова.",
      },
      {
        id: "c",
        text: "Его отменят по истечении 10 мс",
        explanation: "Задержка задаёт допуск, таймер остаётся.",
      },
      {
        id: "d",
        text: "Он начнётся ровно на 40-й мс",
        explanation: "После расчёта возможно другое ожидание.",
      },
    ],
    correctOptionId: "b",
    readMoreUrl: feSection1_9ReadMoreUrls.q13,
  },
  {
    id: "fe-1.9-quiz-nested-timer-minimum",
    type: "quiz",
    visual: { motif: "deadline" },
    question: "Браузер инициализирует таймер с задержкой 1 мс при текущем уровне вложенности 6. Какой порог задаёт правило HTML?",
    options: [
      {
        id: "a",
        text: "0 мс",
        explanation: "Правило поднимает короткую задержку.",
      },
      {
        id: "b",
        text: "1 мс",
        explanation: "Этот уровень выше 5, порог вырастет.",
      },
      {
        id: "c",
        text: "4 мс",
        explanation: "HTML поднимает порог до 4 мс.",
      },
      {
        id: "d",
        text: "6 мс",
        explanation: "Уровень вложенности не задаёт задержку.",
      },
    ],
    correctOptionId: "c",
    readMoreUrl: feSection1_9ReadMoreUrls.q14,
  },
  {
    id: "fe-1.9-quiz-resume-countdown",
    type: "quiz",
    visual: { motif: "deadline" },
    question: "Отсчёт должен идти и в фоне. При возврате в видимую вкладку часть тиков пропущена. Как обновить число на экране?",
    options: [
      {
        id: "a",
        text: "Пересчитать остаток от дедлайна",
        explanation: "Фактическая отметка учитывает паузу.",
      },
      {
        id: "b",
        text: "Вычесть секунду за последний тик",
        explanation: "Один тик может покрыть долгий интервал.",
      },
      {
        id: "c",
        text: "Начать заново с прежнего остатка",
        explanation: "Так отсчёт остановится на время фона.",
      },
      {
        id: "d",
        text: "Принять, что все тики прошли",
        explanation: "Доставка каждого тика не гарантирована.",
      },
    ],
    correctOptionId: "a",
    readMoreUrl: feSection1_9ReadMoreUrls.q15,
  },
  {
    id: "fe-1.9-quiz-clock-origin",
    type: "quiz",
    visual: { motif: "deadline" },
    question: "Дедлайн записан через Date.now(). Отсчёт вычитает из него performance.now(). Что исправить?",
    options: [
      {
        id: "a",
        text: "Сделать оба значения целыми",
        explanation: "Ошибка возникает из-за разных начал отсчёта.",
      },
      {
        id: "b",
        text: "Уменьшить интервал обновления",
        explanation: "Частота не меняет начало отсчёта.",
      },
      {
        id: "c",
        text: "Применить Math.abs к разности",
        explanation: "Модуль не делает отметки сопоставимыми.",
      },
      {
        id: "d",
        text: "Вычесть отметку тех же часов",
        explanation: "Для этого дедлайна годится Date.now().",
      },
    ],
    correctOptionId: "d",
    readMoreUrl: feSection1_9ReadMoreUrls.q16,
  },
  {
    id: "fe-1.9-quiz-frame-one-request",
    type: "quiz",
    visual: { motif: "frame" },
    question: "Видимая страница вызвала requestAnimationFrame(tick) один раз. В tick следующего запроса нет. Сколько раз выполнится tick от этого запроса?",
    options: [
      {
        id: "a",
        text: "Один раз при обработке запроса",
        explanation: "Для продолжения нужен новый запрос.",
      },
      {
        id: "b",
        text: "Раз в кадр, пока вкладка видима",
        explanation: "Регистрация обслуживает один вызов.",
      },
      {
        id: "c",
        text: "Дважды, до и после отрисовки",
        explanation: "Запрос даёт один обратный вызов.",
      },
      {
        id: "d",
        text: "До первого изменения DOM",
        explanation: "DOM не определяет число вызовов.",
      },
    ],
    correctOptionId: "a",
    readMoreUrl: feSection1_9ReadMoreUrls.q17,
  },
  {
    id: "fe-1.9-quiz-cancel-animation-handle",
    type: "quiz",
    visual: { motif: "frame" },
    question: "Компонент сохранил ID ожидающего rAF и удаляется до запуска обработчика. Как убрать этот запрос?",
    options: [
      {
        id: "a",
        text: "Передать ID в clearTimeout()",
        explanation: "Таймеры и кадры отменяют разными API.",
      },
      {
        id: "b",
        text: "Передать ID в cancelAnimationFrame()",
        explanation: "Этот API снимает ожидающий запрос rAF.",
      },
      {
        id: "c",
        text: "Только обнулить локальный ID",
        explanation: "Регистрация в браузере останется.",
      },
      {
        id: "d",
        text: "Отменить следующий кадр без ID",
        explanation: "Нужно указать конкретный запрос.",
      },
    ],
    correctOptionId: "b",
    readMoreUrl: feSection1_9ReadMoreUrls.q17,
  },
  {
    id: "fe-1.9-quiz-frame-position-from-time",
    type: "quiz",
    visual: { motif: "frame" },
    question: `Что выведут два расчёта положения?

~~~js
const start = 200;
const px = t =>
  60 * (t - start) / 1000;
console.log(px(700), px(1200));
~~~`,
    options: [
      {
        id: "a",
        text: "42 / 72",
        explanation: "Нужно вычесть отметку старта.",
      },
      {
        id: "b",
        text: "0 / 30",
        explanation: "К 700 мс уже прошло полсекунды.",
      },
      {
        id: "c",
        text: "30 / 60",
        explanation: "Прошло 0,5 и 1 секунда от старта.",
      },
      {
        id: "d",
        text: "500 / 1000",
        explanation: "Это интервалы, а вывод — в пикселях.",
      },
    ],
    correctOptionId: "c",
    readMoreUrl: feSection1_9ReadMoreUrls.q18,
  },
  {
    id: "fe-1.9-quiz-frame-latest-three",
    type: "quiz",
    visual: { motif: "frame" },
    question: "update(10), update(20) и update(30) пришли до кадра. Код хранит последнее значение и один ожидающий rAF. Что применит обработчик?",
    options: [
      {
        id: "a",
        text: "10, первое полученное значение",
        explanation: "Два обновления заменили первое значение.",
      },
      {
        id: "b",
        text: "20, среднее значение",
        explanation: "Схема заменяет значение без усреднения.",
      },
      {
        id: "c",
        text: "10, 20 и 30 по очереди",
        explanation: "В состоянии хранится одно значение.",
      },
      {
        id: "d",
        text: "30, последнее полученное значение",
        explanation: "Пока кадр ждал, значение обновилось.",
      },
    ],
    correctOptionId: "d",
    readMoreUrl: feSection1_9ReadMoreUrls.q19,
  },
  {
    id: "fe-1.9-quiz-animation-pause-policy",
    type: "quiz",
    visual: { motif: "frame" },
    question: "Анимация должна остановить своё время в фоне. После возврата первая отметка rAF сильно больше прежней. Как сохранить ожидаемую позицию?",
    options: [
      {
        id: "a",
        text: "Учесть весь интервал между кадрами",
        explanation: "Так положение догонит прошедшее время.",
      },
      {
        id: "b",
        text: "Вычесть время паузы",
        explanation: "Положение зависит от активного времени.",
      },
      {
        id: "c",
        text: "Перезапустить анимацию с нуля",
        explanation: "Это потеряет пройденное расстояние.",
      },
      {
        id: "d",
        text: "Добавить фиксированный шаг на кадр",
        explanation: "Скорость станет зависеть от кадров.",
      },
    ],
    correctOptionId: "b",
    readMoreUrl: feSection1_9ReadMoreUrls.q18,
  },
  {
    id: "fe-1.9-quiz-geometry-and-paint",
    type: "quiz",
    visual: { motif: "frame" },
    question: "Код изменил ширину элемента, затем прочитал новую ширину через getBoundingClientRect(). Что подтверждает чтение?",
    options: [
      {
        id: "a",
        text: "Промежуточный кадр уже виден",
        explanation: "Геометрия не показывает факт показа.",
      },
      {
        id: "b",
        text: "Сработал обработчик rAF",
        explanation: "Чтение геометрии само по себе не вызывает rAF.",
      },
      {
        id: "c",
        text: "Завершилась следующая задача",
        explanation: "Геометрия доступна в текущем вызове.",
      },
      {
        id: "d",
        text: "Код получил актуальную геометрию",
        explanation: "Чтение может потребовать пересчёта раскладки.",
      },
    ],
    correctOptionId: "d",
    readMoreUrl: feSection1_9ReadMoreUrls.q20,
  },
  {
    id: "fe-1.9-quiz-loading-microtask",
    type: "quiz",
    visual: { motif: "frame" },
    question: "Код показывает «Загрузка» и сразу ставит длинное вычисление через queueMicrotask(). Что можно обещать о показе надписи?",
    options: [
      {
        id: "a",
        text: "Показ до вычисления не гарантирован",
        explanation: "Микрозадача тоже занимает поток.",
      },
      {
        id: "b",
        text: "Надпись появится перед микрозадачей",
        explanation: "DOM может измениться до показа кадра.",
      },
      {
        id: "c",
        text: "Кадр гарантирован после записи в DOM",
        explanation: "Запись и показ происходят отдельно.",
      },
      {
        id: "d",
        text: "Вычисление уйдёт в другой поток",
        explanation: "queueMicrotask не создаёт поток.",
      },
    ],
    correctOptionId: "a",
    readMoreUrl: feSection1_9ReadMoreUrls.q20,
  },
  {
    id: "fe-1.9-quiz-node-entry-context",
    type: "quiz",
    question: "На собеседовании нужно предсказать порядок с process.nextTick() и setImmediate(). Чего не хватает для точного разбора?",
    options: [
      {
        id: "a",
        text: "Частоты кадров браузера",
        explanation: "Вопрос касается механизмов Node.js.",
      },
      {
        id: "b",
        text: "Версии и точки входа Node.js",
        explanation: "Порядок зависит от среды и контекста вызова.",
      },
      {
        id: "c",
        text: "Точной задержки setImmediate в мс",
        explanation: "У него нет фиксированной задержки в мс.",
      },
      {
        id: "d",
        text: "Только исходного порядка строк",
        explanation: "Фазы и контекст могут изменить порядок.",
      },
    ],
    correctOptionId: "b",
    readMoreUrl: feSection1_9ReadMoreUrls.q21,
  },
  {
    id: "fe-1.9-quiz-test-timer-order",
    type: "quiz",
    question: "Нужно проверить, что микрозадача T первого таймера записывается до второго таймера B. Какое утверждение теста проверяет именно это?",
    options: [
      {
        id: "a",
        text: "B записана ровно через 4 мс",
        explanation: "Точная задержка не проверяет нужную связь.",
      },
      {
        id: "b",
        text: "Обе записи появились в одном кадре",
        explanation: "Кадры не нужны для сравнения журнала.",
      },
      {
        id: "c",
        text: "В журнале T находится перед B",
        explanation: "Этого хватает для нужного порядка.",
      },
      {
        id: "d",
        text: "Между T и B нет других записей",
        explanation: "Соседство само по себе не задаёт порядок.",
      },
    ],
    correctOptionId: "c",
    readMoreUrl: feSection1_9ReadMoreUrls.q22,
  },
  {
    id: "fe-1.9-quiz-close-after-last-batch",
    type: "quiz",
    visual: { motif: "frame" },
    question: "Панель закончила обрабатывать данные, но запись результата ждёт rAF. Панель закрыли. Что нужно сделать с кадром?",
    options: [
      {
        id: "a",
        text: "Снять только таймер обработки",
        explanation: "Ожидающий кадр всё ещё может записать результат.",
      },
      {
        id: "b",
        text: "Подождать кадр и потом убрать панель",
        explanation: "К моменту закрытия запись уже не нужна.",
      },
      {
        id: "c",
        text: "Обнулить ID без отмены",
        explanation: "Запрос в браузере продолжит ждать.",
      },
      {
        id: "d",
        text: "Отменить ожидающий rAF",
        explanation: "Обработка и отображение имеют разные запросы.",
      },
    ],
    correctOptionId: "d",
    readMoreUrl: feSection1_9ReadMoreUrls.q19,
  },
  {
    id: "fe-1.9-quiz-independent-panel-test",
    type: "quiz",
    question: "Панели A и B запустили обработку и отображение. Закрыли только A. Как проверить независимость владельцев?",
    options: [
      {
        id: "a",
        text: "A прекращает работу, B завершает свою",
        explanation: "Закрытие A действует на её запросы.",
      },
      {
        id: "b",
        text: "Обе прекращают работу сразу",
        explanation: "Так проявилась бы общая отмена.",
      },
      {
        id: "c",
        text: "Обе завершают работу и показывают итог",
        explanation: "Закрытая A больше не должна писать.",
      },
      {
        id: "d",
        text: "Обе показывают одинаковое число кадров",
        explanation: "Число кадров не проверяет владение.",
      },
    ],
    correctOptionId: "a",
    readMoreUrl: feSection1_9ReadMoreUrls.q12,
  },
];
