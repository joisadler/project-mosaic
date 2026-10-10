type BaseCardData = {
  id: string;
};

export type InfoCardData = BaseCardData & {
  type: "info";
  pages: string[];
};

export type QuizOptionData = {
  id: string;
  text: string;
  explanation: string;
};

export type QuizCardData = BaseCardData & {
  type: "quiz";
  question: string;
  options: [QuizOptionData, QuizOptionData, QuizOptionData, QuizOptionData];
  correctOptionId: string;
};

export type LearningCardData = InfoCardData | QuizCardData;

export const learningCards: LearningCardData[] = [
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
    id: "closures-backpack",
    type: "info",
    pages: [
      `## Функция с рюкзаком 🎒

**Замыкание (closure)** — это функция, которая помнит переменные из места, где была создана.

Даже когда внешняя функция завершилась, внутренняя всё ещё может обращаться к этим переменным.`,
      `## Классический счётчик

~~~js
function makeCounter() {
  let count = 0;
  return () => ++count;
}

const next = makeCounter();
next(); // 1
next(); // 2
~~~

Приватная переменная \`count\` сохраняется, потому что \`next\` её замыкает. И никаких классов.`,
    ],
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
    id: "event-loop-order",
    type: "info",
    pages: [
      `## Кто следующий? 🎡

JavaScript выполняет по одной задаче за раз. **Цикл событий (event loop)** решает, что следующим попадёт в **стек вызовов (call stack)**.

![Задачи движутся вокруг стека вызовов JavaScript](/illustrations/event-loop.svg)`,
      `## Две очереди, один сюрприз

Закончив текущий код, JavaScript сначала очищает **очередь микрозадач (microtask queue)**, и лишь потом берёт новую задачу.

- Колбэки \`Promise\` — микрозадачи.
- Таймеры планируют задачи.
- Между задачами браузер может обновить экран.`,
      `## Предскажи вывод

~~~js
console.log("A");
setTimeout(() => console.log("B"), 0);
Promise.resolve().then(() => console.log("C"));
console.log("D");
~~~

Ответ: **A, D, C, B**. Ноль миллисекунд всё равно означает «потом».`,
    ],
  },
  {
    id: "temporal-dead-zone",
    type: "info",
    pages: [
      `## Объявлена, но недоступна

~~~js
console.log(answer); // ReferenceError
const answer = 42;
~~~

От начала области видимости до момента инициализации \`let\` и \`const\` находятся в **мёртвой зоне (Temporal Dead Zone)**.

Объявления всплывают (hoisting), но обращаться к ним раньше времени нельзя. Коварно, да?`,
    ],
  },
  {
    id: "react-rerenders",
    type: "info",
    pages: [
      `## Re-render — не repaint

Когда меняется state, React вызывает компонент снова, чтобы рассчитать следующий UI. Это **повторный рендер (re-render)**.

Это ещё не означает **перерисовку (repaint)**. React сравнивает результаты и меняет в DOM только необходимое.`,
      `## Пусть рендер будет скучным

Полезные правила:

1. Сохраняй рендер чистым.
2. Вычисляй производные значения прямо во время рендера.
3. Побочные эффекты переноси в события или effects.
4. Мемоизируй, только когда нашёл реальную лишнюю работу.

Лишний рендер часто дешевле лишней абстракции.`,
    ],
  },
  {
    id: "css-specificity",
    type: "info",
    pages: [
      `## Сюжетный поворот specificity

У \`:where(.card #title)\` **нулевая специфичность (specificity)**.

Да, даже с ID внутри. \`:where()\` специально создан, чтобы такие стили оставалось легко переопределить. ✨`,
    ],
  },
  {
    id: "async-await-order",
    type: "info",
    pages: [
      `## \`await\` ставит на паузу, а не останавливает

Асинхронная функция (**async function**) идёт синхронно, пока не дойдёт до \`await\`.

Затем она отдаёт управление. Остаток функции продолжится в микрозадаче (**microtask**), когда ожидаемое значение будет готово.`,
      `## Читай сверху вниз… но внимательно

~~~js
async function demo() {
  console.log(1);
  await 0;
  console.log(2);
}

demo();
console.log(3);
~~~

Вывод: **1, 3, 2**. Код после \`await\` возвращается в очередь.`,
    ],
  },
  {
    id: "equality-coercion",
    type: "info",
    pages: [
      `## Почти одинаково — не одинаково

\`0 == false\` даёт \`true\`: **нестрогое равенство (loose equality)** выполняет **приведение типов (type coercion)**.

\`0 === false\` даёт \`false\`: **строгое равенство (strict equality)** сравнивает и тип, и значение.

По умолчанию выбирай \`===\`. А приведение типов знай для собеседований и legacy-кода, а не для фокусов.`,
    ],
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
  {
    id: "use-effect-sync",
    type: "info",
    pages: [
      `## Effects связывают миры

Используй \`useEffect\`, чтобы синхронизировать React с чем-то **вне React**. Это и есть побочный эффек (**effect**):

- browser API,
- сетевое соединение,
- сторонний виджет,
- подписка.

Если ты лишь вычисляешь данные для UI, effect, скорее всего, не нужен.`,
      `## Контракт cleanup

~~~js
useEffect(() => {
  const controller = new AbortController();
  loadUser(id, controller.signal);

  return () => controller.abort();
}, [id]);
~~~

Функция очистки (**cleanup**) должна отменить прежнюю синхронизацию перед следующим запуском effect или удалением компонента.`,
    ],
  },
];
