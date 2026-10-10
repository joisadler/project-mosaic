import type { QuizCardData } from "./card-types";

export const quizCards: QuizCardData[] = [
  {
    id: "closure-remembered-value-quiz",
    type: "quiz",
    question: `## Что выведет этот код?

~~~js
function makeCounter() {
  let count = 0;
  return () => ++count;
}

const next = makeCounter();
console.log(next(), next());
~~~`,
    options: [
      {
        id: "zero-one",
        text: "0 1",
        explanation: "Префиксный ++ сначала увеличивает count, поэтому первый вызов уже возвращает 1.",
      },
      {
        id: "one-one",
        text: "1 1",
        explanation: "Оба вызова используют одно замыкание и одну переменную count, поэтому значение не сбрасывается.",
      },
      {
        id: "one-two",
        text: "1 2",
        explanation: "Замыкание сохраняет общий count, а каждый вызов увеличивает его перед возвратом.",
      },
      {
        id: "reference-error",
        text: "ReferenceError",
        explanation: "count доступна возвращённой функции через lexical scope даже после завершения makeCounter.",
      },
    ],
    correctOptionId: "one-two",
  },
  {
    id: "event-loop-output-quiz",
    type: "quiz",
    question: `## В каком порядке появятся буквы?

~~~js
console.log("A");
setTimeout(() => console.log("B"), 0);
Promise.resolve().then(() => console.log("C"));
console.log("D");
~~~`,
    options: [
      {
        id: "a-b-c-d",
        text: "A, B, C, D",
        explanation: "Таймер не прерывает текущий синхронный код, даже если задержка равна 0.",
      },
      {
        id: "a-d-b-c",
        text: "A, D, B, C",
        explanation: "После синхронного кода microtask Promise выполняется раньше задачи таймера.",
      },
      {
        id: "a-c-d-b",
        text: "A, C, D, B",
        explanation: "Колбэк Promise — microtask, но он выполнится только после завершения текущего синхронного кода.",
      },
      {
        id: "a-d-c-b",
        text: "A, D, C, B",
        explanation: "Сначала выполняется синхронный код, затем microtask Promise, после неё задача таймера.",
      },
    ],
    correctOptionId: "a-d-c-b",
  },
  {
    id: "effect-purpose-quiz",
    type: "quiz",
    question: `## Где действительно нужен \`useEffect\`?`,
    options: [
      {
        id: "full-name",
        text: "Собрать fullName из props",
        explanation: "Производное значение можно вычислить прямо во время render без дополнительного state и effect.",
      },
      {
        id: "sorted-items",
        text: "Отсортировать массив для UI",
        explanation: "Сортировку для UI можно выполнить во время render, не мутируя исходный массив; при необходимости её отдельно оптимизируют.",
      },
      {
        id: "chat-connection",
        text: "Синхронизировать chat connection",
        explanation: "Подключение — внешняя система, поэтому effect может создать соединение и вернуть cleanup.",
      },
      {
        id: "button-handler",
        text: "Обработать нажатие кнопки",
        explanation: "Действие пользователя следует обрабатывать непосредственно в event handler кнопки.",
      },
    ],
    correctOptionId: "chat-connection",
  },
];
