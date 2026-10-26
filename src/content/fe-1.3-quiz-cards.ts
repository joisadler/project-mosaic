import type { QuizCardData } from "./card-types";
import { feSection1_3ReadMoreUrls } from "./fe-1.3-source-urls";

// MOS-39: handbook subsection 1.3; owner-approved coverage and visual direction.
export const feSection1_3QuizCards: QuizCardData[] = [
  {
    id: "fe-1.3-quiz-named-after-reassignment",
    type: "quiz",
    readMoreUrl: feSection1_3ReadMoreUrls.q3,
    question: `Что выведет код?

~~~js
let f = function self() { return 7; };
const saved = f;
f = null;
console.log(saved());
~~~`,
    options: [
      {
        id: "option-1",
        text: "TypeError",
        explanation: "saved хранит функцию."
      },
      {
        id: "option-2",
        text: "7",
        explanation: "f не меняет saved."
      },
      {
        id: "option-3",
        text: "null",
        explanation: "null записан в f."
      },
      {
        id: "option-4",
        text: "undefined",
        explanation: "Возврат — число 7."
      }
    ],
    correctOptionId: "option-2"
  },
  {
    id: "fe-1.3-quiz-internal-recursion",
    type: "quiz",
    readMoreUrl: feSection1_3ReadMoreUrls.q3,
    question: `Что выведет код?

~~~js
let f = function self(n) {
  return n ? self(n - 1) : "done";
};
const saved = f;
f = null;
console.log(saved(2));
~~~`,
    options: [
      {
        id: "option-1",
        text: "null",
        explanation: "self не читает f."
      },
      {
        id: "option-2",
        text: "TypeError",
        explanation: "self — функция."
      },
      {
        id: "option-3",
        text: "\"done\"",
        explanation: "Срабатывает база."
      },
      {
        id: "option-4",
        text: "\"self\"",
        explanation: "Имя не возвращалось."
      }
    ],
    correctOptionId: "option-3"
  },
  {
    id: "fe-1.3-quiz-arrow-object-block",
    type: "quiz",
    readMoreUrl: feSection1_3ReadMoreUrls.q4,
    question: `Что выведет код?

~~~js
const make = () => { n: 1 };
console.log(make());
~~~`,
    options: [
      {
        id: "option-1",
        text: "1",
        explanation: "n: 1 здесь метка."
      },
      {
        id: "option-2",
        text: "undefined",
        explanation: "В теле нет return."
      },
      {
        id: "option-3",
        text: "TypeError",
        explanation: "make вызываема."
      },
      {
        id: "option-4",
        text: "\"1\"",
        explanation: "Возврата строки нет."
      }
    ],
    correctOptionId: "option-2",
    visual: {
      motif: "invocation"
    }
  },
  {
    id: "fe-1.3-quiz-default-null",
    type: "quiz",
    readMoreUrl: feSection1_3ReadMoreUrls.q6,
    question: `Что выведет код?

~~~js
const read = (x = 3) => x;
console.log(
  read(undefined), read(null)
);
~~~`,
    options: [
      {
        id: "option-1",
        text: "3 / 3",
        explanation: "null не заменяется."
      },
      {
        id: "option-2",
        text: "undefined / null",
        explanation: "undefined заменяется."
      },
      {
        id: "option-3",
        text: "3 / null",
        explanation: "Default — для undefined."
      },
      {
        id: "option-4",
        text: "TypeError",
        explanation: "Здесь null не читают."
      }
    ],
    correctOptionId: "option-3",
    visual: {
      motif: "invocation"
    }
  },
  {
    id: "fe-1.3-quiz-default-lazy",
    type: "quiz",
    readMoreUrl: feSection1_3ReadMoreUrls.q6,
    question: `Что выведет код?

~~~js
let n = 0;
const read = (x = ++n) => x;
read(9);
console.log(n);
~~~`,
    options: [
      {
        id: "option-1",
        text: "1",
        explanation: "Аргумент задан."
      },
      {
        id: "option-2",
        text: "9",
        explanation: "n не присваивали x."
      },
      {
        id: "option-3",
        text: "undefined",
        explanation: "n содержит число."
      },
      {
        id: "option-4",
        text: "0",
        explanation: "++n не выполнялся."
      }
    ],
    correctOptionId: "option-4",
    visual: {
      motif: "invocation"
    }
  },
  {
    id: "fe-1.3-quiz-default-live-outer",
    type: "quiz",
    readMoreUrl: feSection1_3ReadMoreUrls.q6,
    question: `Что выведет код?

~~~js
let n = 1;
const read = (x = n) => x;
n = 4;
console.log(read());
~~~`,
    options: [
      {
        id: "option-1",
        text: "4",
        explanation: "n читается при вызове."
      },
      {
        id: "option-2",
        text: "1",
        explanation: "Снимка здесь нет."
      },
      {
        id: "option-3",
        text: "undefined",
        explanation: "n содержит число 4."
      },
      {
        id: "option-4",
        text: "ReferenceError",
        explanation: "n уже готова."
      }
    ],
    correctOptionId: "option-1",
    visual: {
      motif: "invocation"
    }
  },
  {
    id: "fe-1.3-quiz-default-fresh-object",
    type: "quiz",
    readMoreUrl: feSection1_3ReadMoreUrls.q6,
    question: `Что выведет код?

~~~js
function make(items = []) {
  items.push(1);
  return items.length;
}
console.log(make(), make());
~~~`,
    options: [
      {
        id: "option-1",
        text: "1 / 2",
        explanation: "Массивы не общие."
      },
      {
        id: "option-2",
        text: "0 / 0",
        explanation: "push добавил элемент."
      },
      {
        id: "option-3",
        text: "1 / 1",
        explanation: "У вызовов свои массивы."
      },
      {
        id: "option-4",
        text: "TypeError",
        explanation: "Это обычный массив."
      }
    ],
    correctOptionId: "option-3",
    visual: {
      motif: "invocation"
    }
  },
  {
    id: "fe-1.3-quiz-parameter-tdz",
    type: "quiz",
    readMoreUrl: feSection1_3ReadMoreUrls.q6,
    question: `Как завершится вызов?

~~~js
function read(a = b, b = 2) {
  return a;
}
read();
~~~`,
    options: [
      {
        id: "option-1",
        text: "Вернёт 2",
        explanation: "b ещё не готов."
      },
      {
        id: "option-2",
        text: "ReferenceError",
        explanation: "b ещё в TDZ."
      },
      {
        id: "option-3",
        text: "Вернёт undefined",
        explanation: "b находится в TDZ."
      },
      {
        id: "option-4",
        text: "SyntaxError",
        explanation: "Синтаксис допустим."
      }
    ],
    correctOptionId: "option-2",
    visual: {
      motif: "invocation"
    }
  },
  {
    id: "fe-1.3-quiz-default-body-scope",
    type: "quiz",
    readMoreUrl: feSection1_3ReadMoreUrls.q6,
    question: `Что выведет код?

~~~js
const n = 3;
function read(x = n) {
  const n = 9;
  return x;
}
console.log(read());
~~~`,
    options: [
      {
        id: "option-1",
        text: "9",
        explanation: "Тело не видно default."
      },
      {
        id: "option-2",
        text: "ReferenceError",
        explanation: "Внешняя n уже готова."
      },
      {
        id: "option-3",
        text: "undefined",
        explanation: "Default читает n."
      },
      {
        id: "option-4",
        text: "3",
        explanation: "Читается внешняя n."
      }
    ],
    correctOptionId: "option-4",
    visual: {
      motif: "invocation"
    }
  },
  {
    id: "fe-1.3-quiz-destructure-null",
    type: "quiz",
    readMoreUrl: feSection1_3ReadMoreUrls.q6,
    question: `Как завершится вызов?

~~~js
function read({ n = 1 } = {}) {
  return n;
}
read(null);
~~~`,
    options: [
      {
        id: "option-1",
        text: "Вернёт 1",
        explanation: "null не заменяется."
      },
      {
        id: "option-2",
        text: "Вернёт null",
        explanation: "null нельзя разобрать."
      },
      {
        id: "option-3",
        text: "TypeError",
        explanation: "null не является объектом."
      },
      {
        id: "option-4",
        text: "ReferenceError",
        explanation: "Имя здесь найдено."
      }
    ],
    correctOptionId: "option-3",
    visual: {
      motif: "invocation"
    }
  },
  {
    id: "fe-1.3-quiz-three-lengths",
    type: "quiz",
    readMoreUrl: feSection1_3ReadMoreUrls.q8,
    question: `Что выведет код?

~~~js
function f(a, b = 2, ...rest) {
  return [f.length,
    arguments.length, rest.length];
}
console.log(f(1, undefined, 3, 4));
~~~`,
    options: [
      {
        id: "option-1",
        text: "[1, 4, 2]",
        explanation: "Это три разных счёта."
      },
      {
        id: "option-2",
        text: "[2, 4, 2]",
        explanation: "b не входит в счёт."
      },
      {
        id: "option-3",
        text: "[1, 3, 2]",
        explanation: "Это тоже аргумент."
      },
      {
        id: "option-4",
        text: "[1, 4, 3]",
        explanation: "rest идёт после b."
      }
    ],
    correctOptionId: "option-1",
    visual: {
      motif: "invocation"
    }
  },
  {
    id: "fe-1.3-quiz-destructuring-length",
    type: "quiz",
    readMoreUrl: feSection1_3ReadMoreUrls.q8,
    question: `Что выведет код?

~~~js
function read({ x, y }, ...rest) {}
console.log(read.length);
~~~`,
    options: [
      {
        id: "option-1",
        text: "2",
        explanation: "Поля не считаются."
      },
      {
        id: "option-2",
        text: "1",
        explanation: "Шаблон — один параметр."
      },
      {
        id: "option-3",
        text: "0",
        explanation: "Default здесь нет."
      },
      {
        id: "option-4",
        text: "3",
        explanation: "rest не считается."
      }
    ],
    correctOptionId: "option-2",
    visual: {
      motif: "invocation"
    }
  },
  {
    id: "fe-1.3-quiz-strict-arguments",
    type: "quiz",
    readMoreUrl: feSection1_3ReadMoreUrls.q7,
    question: `Строгий режим. Что выведет код?

~~~js
"use strict";
function read(x) {
  x = 2;
  return arguments[0];
}
console.log(read(1));
~~~`,
    options: [
      {
        id: "option-1",
        text: "2",
        explanation: "В strict связи нет."
      },
      {
        id: "option-2",
        text: "undefined",
        explanation: "Аргумент передан."
      },
      {
        id: "option-3",
        text: "1",
        explanation: "Связи с x нет."
      },
      {
        id: "option-4",
        text: "TypeError",
        explanation: "Менять x разрешено."
      }
    ],
    correctOptionId: "option-3",
    visual: {
      motif: "invocation"
    }
  },
  {
    id: "fe-1.3-quiz-non-simple-arguments",
    type: "quiz",
    readMoreUrl: feSection1_3ReadMoreUrls.q7,
    question: `Нестрогий script. Что выведет код?

~~~js
function read(x = 0) {
  x = 2;
  return arguments[0];
}
console.log(read(1));
~~~`,
    options: [
      {
        id: "option-1",
        text: "2",
        explanation: "С default связи нет."
      },
      {
        id: "option-2",
        text: "1",
        explanation: "Параметры непростые."
      },
      {
        id: "option-3",
        text: "0",
        explanation: "Аргумент задан."
      },
      {
        id: "option-4",
        text: "SyntaxError",
        explanation: "Синтаксис допустим."
      }
    ],
    correctOptionId: "option-2",
    visual: {
      motif: "invocation"
    }
  },
  {
    id: "fe-1.3-quiz-arrow-outer-arguments",
    type: "quiz",
    readMoreUrl: feSection1_3ReadMoreUrls.q7,
    question: `Что выведет код?

~~~js
function outer(x) {
  return ((y) => arguments[0])(2);
}
console.log(outer(1));
~~~`,
    options: [
      {
        id: "option-1",
        text: "2",
        explanation: "arguments — внешний."
      },
      {
        id: "option-2",
        text: "undefined",
        explanation: "Внешний вызов был."
      },
      {
        id: "option-3",
        text: "1",
        explanation: "Это аргумент outer."
      },
      {
        id: "option-4",
        text: "ReferenceError",
        explanation: "arguments доступен."
      }
    ],
    correctOptionId: "option-3",
    visual: {
      motif: "invocation"
    }
  },
  {
    id: "fe-1.3-quiz-hof-identification",
    type: "quiz",
    readMoreUrl: feSection1_3ReadMoreUrls.q9,
    question: "Какая функция является функцией высшего порядка (HOF)?",
    options: [
      {
        id: "option-1",
        text: "Принимает функцию или возвращает её",
        explanation: "Это определение HOF."
      },
      {
        id: "option-2",
        text: "Всегда выполняется асинхронно",
        explanation: "Время — не условие."
      },
      {
        id: "option-3",
        text: "Обязательно рекурсивная",
        explanation: "Рекурсия не нужна."
      },
      {
        id: "option-4",
        text: "Имеет больше трёх параметров",
        explanation: "Арность не критерий."
      }
    ],
    correctOptionId: "option-1",
    visual: {
      motif: "composition"
    }
  },
  {
    id: "fe-1.3-quiz-callback-sync",
    type: "quiz",
    readMoreUrl: feSection1_3ReadMoreUrls.q10,
    question: `Что выведет код?

~~~js
const marks = [];
[1].map(() => marks.push("B"));
marks.push("A");
console.log(marks.join(","));
~~~`,
    options: [
      {
        id: "option-1",
        text: "\"A,B\"",
        explanation: "map синхронный."
      },
      {
        id: "option-2",
        text: "\"B,A\"",
        explanation: "B добавлена раньше A."
      },
      {
        id: "option-3",
        text: "\"A\"",
        explanation: "Колбэк был вызван."
      },
      {
        id: "option-4",
        text: "\"B\"",
        explanation: "A добавлена позже."
      }
    ],
    correctOptionId: "option-2",
    visual: {
      motif: "composition"
    }
  },
  {
    id: "fe-1.3-quiz-callback-radix",
    type: "quiz",
    readMoreUrl: feSection1_3ReadMoreUrls.q10,
    question: `Что выведет код?

~~~js
const result = ["10", "20", "30"]
  .map(parseInt);
console.log(result);
~~~`,
    options: [
      {
        id: "option-1",
        text: "[10, 20, 30]",
        explanation: "Индекс — это radix."
      },
      {
        id: "option-2",
        text: "[NaN, NaN, NaN]",
        explanation: "Первый radix — 0."
      },
      {
        id: "option-3",
        text: "[10, NaN, NaN]",
        explanation: "radix меняется с индексом."
      },
      {
        id: "option-4",
        text: "[\"10\", \"20\", \"30\"]",
        explanation: "parseInt даёт число."
      }
    ],
    correctOptionId: "option-3",
    visual: {
      motif: "composition"
    }
  },
  {
    id: "fe-1.3-quiz-pass-or-call",
    type: "quiz",
    readMoreUrl: feSection1_3ReadMoreUrls.q10,
    question: "Нужно вызвать save только при клике. Что передать в button.addEventListener(\"click\", …)?",
    options: [
      {
        id: "option-1",
        text: "save()",
        explanation: "save вызвана сразу."
      },
      {
        id: "option-2",
        text: "\"save\"",
        explanation: "Нужна функция."
      },
      {
        id: "option-3",
        text: "save",
        explanation: "Передана сама функция."
      },
      {
        id: "option-4",
        text: "save.bind(null)()",
        explanation: "Это вызов сейчас."
      }
    ],
    correctOptionId: "option-3",
    visual: {
      motif: "composition"
    }
  },
  {
    id: "fe-1.3-quiz-method-receiver",
    type: "quiz",
    readMoreUrl: feSection1_3ReadMoreUrls.q11,
    question: `Что выведет код?

~~~js
function read() { return this.n; }
const a = { n: 1, read };
const b = { n: 2, read: a.read };
console.log(b.read());
~~~`,
    options: [
      {
        id: "option-1",
        text: "1",
        explanation: "read не закреплён за a."
      },
      {
        id: "option-2",
        text: "2",
        explanation: "Сейчас получатель — b."
      },
      {
        id: "option-3",
        text: "undefined",
        explanation: "У b есть n."
      },
      {
        id: "option-4",
        text: "TypeError",
        explanation: "read — функция."
      }
    ],
    correctOptionId: "option-2",
    visual: {
      motif: "invocation"
    }
  },
  {
    id: "fe-1.3-quiz-detached-strict",
    type: "quiz",
    readMoreUrl: feSection1_3ReadMoreUrls.q12,
    question: `Строгий режим. Как завершится код?

~~~js
"use strict";
const obj = { n: 1,
  read() { return this.n; } };
const read = obj.read;
read();
~~~`,
    options: [
      {
        id: "option-1",
        text: "Вернёт 1",
        explanation: "Вызов потерял объект."
      },
      {
        id: "option-2",
        text: "Вернёт undefined",
        explanation: "this — undefined."
      },
      {
        id: "option-3",
        text: "ReferenceError",
        explanation: "Имя read найдено."
      },
      {
        id: "option-4",
        text: "TypeError",
        explanation: "this равен undefined."
      }
    ],
    correctOptionId: "option-4",
    visual: {
      motif: "invocation"
    }
  },
  {
    id: "fe-1.3-quiz-call-result",
    type: "quiz",
    readMoreUrl: feSection1_3ReadMoreUrls.q13,
    question: `Что выведет код?

~~~js
function add(x) { return this.n + x; }
console.log(add.call({ n: 2 }, 3));
~~~`,
    options: [
      {
        id: "option-1",
        text: "5",
        explanation: "call задаёт получателя."
      },
      {
        id: "option-2",
        text: "2",
        explanation: "x тоже участвует."
      },
      {
        id: "option-3",
        text: "undefined",
        explanation: "Есть return."
      },
      {
        id: "option-4",
        text: "\"5\"",
        explanation: "Оба операнда — числа."
      }
    ],
    correctOptionId: "option-1",
    visual: {
      motif: "invocation"
    }
  },
  {
    id: "fe-1.3-quiz-apply-arraylike",
    type: "quiz",
    readMoreUrl: feSection1_3ReadMoreUrls.q14,
    question: `Что выведет код?

~~~js
const args = { 0: 3, 1: 8, length: 2 };
const max = Math.max.apply(null, args);
console.log(max);
~~~`,
    options: [
      {
        id: "option-1",
        text: "TypeError",
        explanation: "apply читает индексы."
      },
      {
        id: "option-2",
        text: "NaN",
        explanation: "Переданы два числа."
      },
      {
        id: "option-3",
        text: "8",
        explanation: "Это максимум 3 и 8."
      },
      {
        id: "option-4",
        text: "2",
        explanation: "Это число входов."
      }
    ],
    correctOptionId: "option-3",
    visual: {
      motif: "invocation"
    }
  },
  {
    id: "fe-1.3-quiz-spread-not-iterable",
    type: "quiz",
    readMoreUrl: feSection1_3ReadMoreUrls.q14,
    question: `Как завершится код?

~~~js
const args = { 0: 3, length: 1 };
Math.max(...args);
~~~`,
    options: [
      {
        id: "option-1",
        text: "Вернёт 3",
        explanation: "Нет итератора."
      },
      {
        id: "option-2",
        text: "TypeError",
        explanation: "Нужен iterable."
      },
      {
        id: "option-3",
        text: "Вернёт NaN",
        explanation: "Вызов не начался."
      },
      {
        id: "option-4",
        text: "SyntaxError",
        explanation: "Это runtime-ошибка."
      }
    ],
    correctOptionId: "option-2",
    visual: {
      motif: "invocation"
    }
  },
  {
    id: "fe-1.3-quiz-strict-thisarg",
    type: "quiz",
    readMoreUrl: feSection1_3ReadMoreUrls.q14,
    question: `Что выведет код?

~~~js
function read() {
  "use strict";
  return this;
}
console.log(read.call(null));
~~~`,
    options: [
      {
        id: "option-1",
        text: "undefined",
        explanation: "Передан именно null."
      },
      {
        id: "option-2",
        text: "\"null\"",
        explanation: "Это не строка."
      },
      {
        id: "option-3",
        text: "TypeError",
        explanation: "Свойства не читаются."
      },
      {
        id: "option-4",
        text: "null",
        explanation: "Strict сохраняет null."
      }
    ],
    correctOptionId: "option-4",
    visual: {
      motif: "invocation"
    }
  },
  {
    id: "fe-1.3-quiz-sloppy-thisarg",
    type: "quiz",
    readMoreUrl: feSection1_3ReadMoreUrls.q14,
    question: `Нестрогий script. Что выведет код?

~~~js
function read() {
  return this === globalThis;
}
console.log(read.call(null));
~~~`,
    options: [
      {
        id: "option-1",
        text: "true",
        explanation: "Это нестрогая функция."
      },
      {
        id: "option-2",
        text: "false",
        explanation: "null заменяется."
      },
      {
        id: "option-3",
        text: "null",
        explanation: "Возвращается boolean."
      },
      {
        id: "option-4",
        text: "TypeError",
        explanation: "Вызов разрешён."
      }
    ],
    correctOptionId: "option-1",
    visual: {
      motif: "invocation"
    }
  },
  {
    id: "fe-1.3-quiz-bind-does-not-call",
    type: "quiz",
    readMoreUrl: feSection1_3ReadMoreUrls.q15,
    question: `Что выведет код?

~~~js
let n = 0;
function run() { n++; }
const bound = run.bind(null);
console.log(n, typeof bound);
~~~`,
    options: [
      {
        id: "option-1",
        text: "1 / \"function\"",
        explanation: "run не вызывали."
      },
      {
        id: "option-2",
        text: "0 / \"function\"",
        explanation: "bind готовит функцию."
      },
      {
        id: "option-3",
        text: "0 / \"undefined\"",
        explanation: "bind вернул функцию."
      },
      {
        id: "option-4",
        text: "1 / undefined",
        explanation: "Тело run не выполнено."
      }
    ],
    correctOptionId: "option-2",
    visual: {
      motif: "invocation"
    }
  },
  {
    id: "fe-1.3-quiz-rebind-receiver",
    type: "quiz",
    readMoreUrl: feSection1_3ReadMoreUrls.q15,
    question: `Что выведет код?

~~~js
function read() { return this.n; }
const a = read.bind({ n: 1 });
const b = a.bind({ n: 2 });
console.log(b());
~~~`,
    options: [
      {
        id: "option-1",
        text: "2",
        explanation: "this уже закреплён."
      },
      {
        id: "option-2",
        text: "undefined",
        explanation: "Получатель сохранён."
      },
      {
        id: "option-3",
        text: "1",
        explanation: "this задаёт первый bind."
      },
      {
        id: "option-4",
        text: "TypeError",
        explanation: "bind можно повторить."
      }
    ],
    correctOptionId: "option-3",
    visual: {
      motif: "invocation"
    }
  },
  {
    id: "fe-1.3-quiz-rebind-arguments",
    type: "quiz",
    readMoreUrl: feSection1_3ReadMoreUrls.q15,
    question: `Что выведет код?

~~~js
const list = (...xs) => xs.join(",");
const a = list.bind(null, "A");
const b = a.bind(null, "B");
console.log(b("C"));
~~~`,
    options: [
      {
        id: "option-1",
        text: "\"B,C\"",
        explanation: "A сохранён раньше."
      },
      {
        id: "option-2",
        text: "\"A,C,B\"",
        explanation: "B идёт перед C."
      },
      {
        id: "option-3",
        text: "\"C,B,A\"",
        explanation: "Порядок не меняется."
      },
      {
        id: "option-4",
        text: "\"A,B,C\"",
        explanation: "Сначала bound-аргументы."
      }
    ],
    correctOptionId: "option-4",
    visual: {
      motif: "invocation"
    }
  },
  {
    id: "fe-1.3-quiz-bound-length-name",
    type: "quiz",
    readMoreUrl: feSection1_3ReadMoreUrls.q15,
    question: `Что выведет код?

~~~js
function task(a, b, c) {}
const f = task.bind(null, 1);
console.log(f.length, f.name);
~~~`,
    options: [
      {
        id: "option-1",
        text: "2 / \"bound task\"",
        explanation: "Один аргумент закреплён."
      },
      {
        id: "option-2",
        text: "3 / \"task\"",
        explanation: "У обёртки своё имя."
      },
      {
        id: "option-3",
        text: "1 / \"bound task\"",
        explanation: "thisArg не считается."
      },
      {
        id: "option-4",
        text: "2 / \"f\"",
        explanation: "Имя дано через bind."
      }
    ],
    correctOptionId: "option-1",
    visual: {
      motif: "invocation"
    }
  },
  {
    id: "fe-1.3-quiz-bound-identity",
    type: "quiz",
    readMoreUrl: feSection1_3ReadMoreUrls.q15,
    question: `Что выведет код?

~~~js
function run() {}
const a = run.bind(null);
const b = run.bind(null);
console.log(a === b);
~~~`,
    options: [
      {
        id: "option-1",
        text: "true",
        explanation: "Настройка не identity."
      },
      {
        id: "option-2",
        text: "false",
        explanation: "Объекты функций разные."
      },
      {
        id: "option-3",
        text: "undefined",
        explanation: "Это сравнение."
      },
      {
        id: "option-4",
        text: "TypeError",
        explanation: "Сравнение разрешено."
      }
    ],
    correctOptionId: "option-2",
    visual: {
      motif: "invocation"
    }
  },
  {
    id: "fe-1.3-quiz-arrow-thisarg",
    type: "quiz",
    readMoreUrl: feSection1_3ReadMoreUrls.q14,
    question: `Что выведет код?

~~~js
function make() {
  return x => this.n + x;
}
const f = make.call({ n: 2 });
console.log(f.call({ n: 9 }, 1));
~~~`,
    options: [
      {
        id: "option-1",
        text: "10",
        explanation: "this взят из make."
      },
      {
        id: "option-2",
        text: "NaN",
        explanation: "Внешний n равен 2."
      },
      {
        id: "option-3",
        text: "3",
        explanation: "this взят из make."
      },
      {
        id: "option-4",
        text: "TypeError",
        explanation: "Аргумент передан."
      }
    ],
    correctOptionId: "option-3",
    visual: {
      motif: "invocation"
    }
  },
  {
    id: "fe-1.3-quiz-bound-versus-adapter",
    type: "quiz",
    readMoreUrl: feSection1_3ReadMoreUrls.q15,
    question: `Что выведет код?

~~~js
let obj = { n: 1,
  read() { return this.n; } };
const bound = obj.read.bind(obj);
const adapter = () => obj.read();
obj = { ...obj, n: 2 };
console.log(bound(), adapter());
~~~`,
    options: [
      {
        id: "option-1",
        text: "2 / 2",
        explanation: "Сохранён старый obj."
      },
      {
        id: "option-2",
        text: "1 / 1",
        explanation: "obj читается заново."
      },
      {
        id: "option-3",
        text: "2 / 1",
        explanation: "Контракты обратные."
      },
      {
        id: "option-4",
        text: "1 / 2",
        explanation: "obj читается заново."
      }
    ],
    correctOptionId: "option-4",
    visual: {
      motif: "invocation"
    }
  },
  {
    id: "fe-1.3-quiz-constructor-primitive",
    type: "quiz",
    readMoreUrl: feSection1_3ReadMoreUrls.q16,
    question: `Что выведет код?

~~~js
function Box() {
  this.n = 1;
  return 9;
}
console.log(new Box().n);
~~~`,
    options: [
      {
        id: "option-1",
        text: "9",
        explanation: "Число игнорируется."
      },
      {
        id: "option-2",
        text: "1",
        explanation: "Получен новый экземпляр."
      },
      {
        id: "option-3",
        text: "undefined",
        explanation: "n записан в экземпляр."
      },
      {
        id: "option-4",
        text: "TypeError",
        explanation: "Box — конструктор."
      }
    ],
    correctOptionId: "option-2",
    visual: {
      motif: "invocation"
    }
  },
  {
    id: "fe-1.3-quiz-constructor-object",
    type: "quiz",
    readMoreUrl: feSection1_3ReadMoreUrls.q16,
    question: `Что выведет код?

~~~js
function Box() {
  this.n = 1;
  return { n: 9 };
}
console.log(new Box().n);
~~~`,
    options: [
      {
        id: "option-1",
        text: "1",
        explanation: "Возвращён объект."
      },
      {
        id: "option-2",
        text: "undefined",
        explanation: "Возвращён объект с n."
      },
      {
        id: "option-3",
        text: "9",
        explanation: "Возвращён объект."
      },
      {
        id: "option-4",
        text: "TypeError",
        explanation: "Возврат разрешён."
      }
    ],
    correctOptionId: "option-3",
    visual: {
      motif: "invocation"
    }
  },
  {
    id: "fe-1.3-quiz-arrow-constructor",
    type: "quiz",
    readMoreUrl: feSection1_3ReadMoreUrls.q16,
    question: `Как завершится код?

~~~js
const Box = () => ({ n: 1 });
new Box();
~~~`,
    options: [
      {
        id: "option-1",
        text: "TypeError",
        explanation: "Стрелка не конструктор."
      },
      {
        id: "option-2",
        text: "Вернёт объект с n = 1",
        explanation: "С new вызвать нельзя."
      },
      {
        id: "option-3",
        text: "SyntaxError",
        explanation: "Синтаксис допустим."
      },
      {
        id: "option-4",
        text: "Вернёт undefined",
        explanation: "Вызов не завершён."
      }
    ],
    correctOptionId: "option-1",
    visual: {
      motif: "invocation"
    }
  },
  {
    id: "fe-1.3-quiz-bound-constructor",
    type: "quiz",
    readMoreUrl: feSection1_3ReadMoreUrls.q16,
    question: `Что выведет код?

~~~js
function Box(n) { this.n = n; }
const old = { n: 9 };
const Fixed = Box.bind(old, 2);
console.log(new Fixed().n, old.n);
~~~`,
    options: [
      {
        id: "option-1",
        text: "2 / 2",
        explanation: "old не меняется."
      },
      {
        id: "option-2",
        text: "9 / 9",
        explanation: "Аргумент 2 сохранён."
      },
      {
        id: "option-3",
        text: "TypeError",
        explanation: "Box — конструктор."
      },
      {
        id: "option-4",
        text: "2 / 9",
        explanation: "Создан новый объект."
      }
    ],
    correctOptionId: "option-4",
    visual: {
      motif: "invocation"
    }
  },
  {
    id: "fe-1.3-quiz-bound-arrow-constructor",
    type: "quiz",
    readMoreUrl: feSection1_3ReadMoreUrls.q16,
    question: `Как завершится код?

~~~js
const Box = (() => ({})).bind(null);
new Box();
~~~`,
    options: [
      {
        id: "option-1",
        text: "Вернёт пустой объект",
        explanation: "bind не добавляет new."
      },
      {
        id: "option-2",
        text: "TypeError",
        explanation: "Стрелка не конструктор."
      },
      {
        id: "option-3",
        text: "SyntaxError",
        explanation: "Синтаксис допустим."
      },
      {
        id: "option-4",
        text: "Вернёт null",
        explanation: "null — не результат."
      }
    ],
    correctOptionId: "option-2",
    visual: {
      motif: "invocation"
    }
  },
  {
    id: "fe-1.3-quiz-shared-closure",
    type: "quiz",
    readMoreUrl: feSection1_3ReadMoreUrls.q19,
    question: `Что выведет код?

~~~js
function make() {
  let n = 0;
  return [() => ++n, () => n];
}
const [inc, read] = make();
inc(); inc();
console.log(read());
~~~`,
    options: [
      {
        id: "option-1",
        text: "0",
        explanation: "Привязка n общая."
      },
      {
        id: "option-2",
        text: "1",
        explanation: "Увеличений было два."
      },
      {
        id: "option-3",
        text: "2",
        explanation: "read видит общее n."
      },
      {
        id: "option-4",
        text: "ReferenceError",
        explanation: "Доступ к n сохранён."
      }
    ],
    correctOptionId: "option-3"
  },
  {
    id: "fe-1.3-quiz-independent-factories",
    type: "quiz",
    readMoreUrl: feSection1_3ReadMoreUrls.q19,
    question: `Что выведет код?

~~~js
const make = () => {
  let n = 0;
  return () => ++n;
};
const a = make(), b = make();
a();
console.log(b());
~~~`,
    options: [
      {
        id: "option-1",
        text: "1",
        explanation: "У фабрик разные n."
      },
      {
        id: "option-2",
        text: "2",
        explanation: "n у функций не общий."
      },
      {
        id: "option-3",
        text: "0",
        explanation: "Сначала ++n."
      },
      {
        id: "option-4",
        text: "TypeError",
        explanation: "Это функции."
      }
    ],
    correctOptionId: "option-1"
  },
  {
    id: "fe-1.3-quiz-snapshot-difference",
    type: "quiz",
    readMoreUrl: feSection1_3ReadMoreUrls.q18,
    question: `Что выведет код?

~~~js
let mode = "light";
const snapshot = mode;
const read = () => snapshot;
mode = "dark";
console.log(read());
~~~`,
    options: [
      {
        id: "option-1",
        text: "\"dark\"",
        explanation: "read читает snapshot."
      },
      {
        id: "option-2",
        text: "undefined",
        explanation: "snapshot уже готова."
      },
      {
        id: "option-3",
        text: "ReferenceError",
        explanation: "Привязка доступна."
      },
      {
        id: "option-4",
        text: "\"light\"",
        explanation: "Сохранён примитив."
      }
    ],
    correctOptionId: "option-4"
  },
  {
    id: "fe-1.3-quiz-captured-object-replacement",
    type: "quiz",
    readMoreUrl: feSection1_3ReadMoreUrls.q18,
    question: `Что выведет код?

~~~js
let state = { n: 1 };
const old = state;
const read = () => state.n;
state.n = 2;
state = { n: 3 };
console.log(old.n, read());
~~~`,
    options: [
      {
        id: "option-1",
        text: "1 / 3",
        explanation: "Была мутация."
      },
      {
        id: "option-2",
        text: "2 / 3",
        explanation: "old хранит старый объект."
      },
      {
        id: "option-3",
        text: "3 / 3",
        explanation: "state уже заменена."
      },
      {
        id: "option-4",
        text: "2 / 2",
        explanation: "state уже другая."
      }
    ],
    correctOptionId: "option-2"
  },
  {
    id: "fe-1.3-quiz-loop-repair-choice",
    type: "quiz",
    readMoreUrl: feSection1_3ReadMoreUrls.q21,
    question: "В цикле for (var i…) создаются поздние колбэки () => i. Что даёт каждому колбэку отдельную привязку?",
    options: [
      {
        id: "option-1",
        text: "Добавить setTimeout вокруг вызова",
        explanation: "Отсрочка не делит var."
      },
      {
        id: "option-2",
        text: "Сделать стрелку обычной функцией",
        explanation: "Внешний var тот же."
      },
      {
        id: "option-3",
        text: "Объявить let i в заголовке for",
        explanation: "У итераций свои привязки."
      },
      {
        id: "option-4",
        text: "Переименовать i в index",
        explanation: "Область прежняя."
      }
    ],
    correctOptionId: "option-3"
  },
  {
    id: "fe-1.3-quiz-cached-undefined",
    type: "quiz",
    readMoreUrl: feSection1_3ReadMoreUrls.q20,
    question: `Кеш содержит запись. Что выведет код?

~~~js
const c = new Map([["x", undefined]]);
console.log(c.has("x"), c.get("x"));
~~~`,
    options: [
      {
        id: "option-1",
        text: "false / undefined",
        explanation: "has — про наличие."
      },
      {
        id: "option-2",
        text: "true / \"undefined\"",
        explanation: "Сохранено не строкой."
      },
      {
        id: "option-3",
        text: "false / null",
        explanation: "Ключ в кеше есть."
      },
      {
        id: "option-4",
        text: "true / undefined",
        explanation: "undefined тоже результат."
      }
    ],
    correctOptionId: "option-4"
  },
  {
    id: "fe-1.3-quiz-cache-object-key",
    type: "quiz",
    readMoreUrl: feSection1_3ReadMoreUrls.q20,
    question: `Кеш по identity. Что выведет код?

~~~js
const key = { n: 1 };
const c = new Map([[key, 7]]);
key.n = 2;
console.log(c.get(key));
~~~`,
    options: [
      {
        id: "option-1",
        text: "undefined",
        explanation: "Identity не изменилась."
      },
      {
        id: "option-2",
        text: "7",
        explanation: "Объект-ключ тот же."
      },
      {
        id: "option-3",
        text: "2",
        explanation: "n — не результат кеша."
      },
      {
        id: "option-4",
        text: "TypeError",
        explanation: "Ключ допустим."
      }
    ],
    correctOptionId: "option-2"
  },
  {
    id: "fe-1.3-quiz-cache-distinct-key",
    type: "quiz",
    readMoreUrl: feSection1_3ReadMoreUrls.q20,
    question: `Кеш по identity. Что выведет код?

~~~js
const c = new Map([[{ n: 1 }, 7]]);
console.log(c.get({ n: 1 }));
~~~`,
    options: [
      {
        id: "option-1",
        text: "7",
        explanation: "Это другой объект."
      },
      {
        id: "option-2",
        text: "null",
        explanation: "get даёт undefined."
      },
      {
        id: "option-3",
        text: "undefined",
        explanation: "Identity ключей разная."
      },
      {
        id: "option-4",
        text: "TypeError",
        explanation: "get разрешён."
      }
    ],
    correctOptionId: "option-3"
  },
  {
    id: "fe-1.3-quiz-cache-dependency",
    type: "quiz",
    readMoreUrl: feSection1_3ReadMoreUrls.q20,
    question: `Что выведет код?

~~~js
let factor = 2;
const c = new Map();
const read = x => {
  if (!c.has(x)) c.set(x, x * factor);
  return c.get(x);
};
read(3); factor = 4;
console.log(read(3));
~~~`,
    options: [
      {
        id: "option-1",
        text: "6",
        explanation: "factor не входит в ключ."
      },
      {
        id: "option-2",
        text: "12",
        explanation: "Есть попадание."
      },
      {
        id: "option-3",
        text: "undefined",
        explanation: "Запись для 3 есть."
      },
      {
        id: "option-4",
        text: "TypeError",
        explanation: "Кеш устарел."
      }
    ],
    correctOptionId: "option-1"
  },
  {
    id: "fe-1.3-quiz-lru-policy",
    type: "quiz",
    readMoreUrl: feSection1_3ReadMoreUrls.q20,
    question: "В LRU-кеше на 2 записи: добавить A, добавить B, прочитать A, добавить C. Чтение обновляет давность. Какая запись удаляется?",
    options: [
      {
        id: "option-1",
        text: "A",
        explanation: "A прочитана недавно."
      },
      {
        id: "option-2",
        text: "C",
        explanation: "C добавлена сейчас."
      },
      {
        id: "option-3",
        text: "Ни одна",
        explanation: "Превышен лимит."
      },
      {
        id: "option-4",
        text: "B",
        explanation: "B использовалась раньше."
      }
    ],
    correctOptionId: "option-4"
  },
  {
    id: "fe-1.3-quiz-listener-identity",
    type: "quiz",
    readMoreUrl: feSection1_3ReadMoreUrls.q15,
    question: `Браузер. Что выведет код?

~~~js
const t = new EventTarget();
let n = 0, f = () => n++;
t.addEventListener("x", f.bind());
t.removeEventListener("x", f.bind());
t.dispatchEvent(new Event("x"));
console.log(n);
~~~`,
    options: [
      {
        id: "option-1",
        text: "0",
        explanation: "bind создал другую f."
      },
      {
        id: "option-2",
        text: "1",
        explanation: "Старая f осталась."
      },
      {
        id: "option-3",
        text: "2",
        explanation: "Событие было одно."
      },
      {
        id: "option-4",
        text: "TypeError",
        explanation: "bind разрешён."
      }
    ],
    correctOptionId: "option-2",
    visual: {
      motif: "invocation"
    }
  },
  {
    id: "fe-1.3-quiz-cleanup-repeat",
    type: "quiz",
    readMoreUrl: feSection1_3ReadMoreUrls.q22,
    question: "API start() каждый раз создаёт таймер и обработчик. Повторный start() перезаписывает ссылки. Как надёжнее организовать жизненный цикл?",
    options: [
      {
        id: "option-1",
        text: "Снимать обработчик новым bind",
        explanation: "Нужна та же f."
      },
      {
        id: "option-2",
        text: "Только обнулять локальные переменные",
        explanation: "Регистрации остаются."
      },
      {
        id: "option-3",
        text: "Сначала очистить прежние ресурсы",
        explanation: "Ссылки ещё доступны."
      },
      {
        id: "option-4",
        text: "Удалить DOM-узел и забыть таймер",
        explanation: "Таймер не отменён."
      }
    ],
    correctOptionId: "option-3"
  },
  {
    id: "fe-1.3-quiz-closure-leak-evidence",
    type: "quiz",
    readMoreUrl: feSection1_3ReadMoreUrls.q22,
    question: "Что лучше подтверждает утечку через замыкание?",
    options: [
      {
        id: "option-1",
        text: "Сам факт вложенной функции",
        explanation: "Утечка не доказана."
      },
      {
        id: "option-2",
        text: "Рост удержанных объектов после очистки",
        explanation: "Проверь путь удержания."
      },
      {
        id: "option-3",
        text: "Любое использование const",
        explanation: "const не управляет GC."
      },
      {
        id: "option-4",
        text: "Длинное имя обработчика",
        explanation: "Имя не влияет."
      }
    ],
    correctOptionId: "option-2"
  },
  {
    id: "fe-1.3-quiz-local-mutation-purity",
    type: "quiz",
    readMoreUrl: feSection1_3ReadMoreUrls.q23,
    question: "Функция создаёт новый массив, заполняет его через push и возвращает. Вход не меняет, внешнее состояние не читает. Что верно?",
    options: [
      {
        id: "option-1",
        text: "Любой push делает функцию нечистой",
        explanation: "Мутация локальна."
      },
      {
        id: "option-2",
        text: "Она обязана вернуть тот же объект",
        explanation: "Identity не критерий."
      },
      {
        id: "option-3",
        text: "Она обязана использовать freeze",
        explanation: "freeze необязателен."
      },
      {
        id: "option-4",
        text: "Такая локальная мутация допустима",
        explanation: "Вход не меняется."
      }
    ],
    correctOptionId: "option-4",
    visual: {
      motif: "composition"
    }
  },
  {
    id: "fe-1.3-quiz-hidden-state-purity",
    type: "quiz",
    readMoreUrl: feSection1_3ReadMoreUrls.q23,
    question: `Что выведет код?

~~~js
let fee = 1;
const total = x => x + fee;
console.log(total(2));
fee = 3;
console.log(total(2));
~~~`,
    options: [
      {
        id: "option-1",
        text: "3 / 3",
        explanation: "fee читается заново."
      },
      {
        id: "option-2",
        text: "3 / 5",
        explanation: "Есть внешняя зависимость."
      },
      {
        id: "option-3",
        text: "5 / 5",
        explanation: "Первый fee равен 1."
      },
      {
        id: "option-4",
        text: "TypeError",
        explanation: "Читать fee допустимо."
      }
    ],
    correctOptionId: "option-2",
    visual: {
      motif: "composition"
    }
  },
  {
    id: "fe-1.3-quiz-nested-ownership",
    type: "quiz",
    readMoreUrl: feSection1_3ReadMoreUrls.q23,
    question: "copy = {...user}, затем copy.settings.theme = \"dark\". settings — общий вложенный объект. Как избежать мутации settings исходного user?",
    options: [
      {
        id: "option-1",
        text: "Скопировать и settings перед изменением",
        explanation: "Нужен новый settings."
      },
      {
        id: "option-2",
        text: "Объявить copy через const",
        explanation: "Поля можно менять."
      },
      {
        id: "option-3",
        text: "Ещё раз скопировать только user",
        explanation: "settings общий."
      },
      {
        id: "option-4",
        text: "Использовать copy === user",
        explanation: "Копии здесь нет."
      }
    ],
    correctOptionId: "option-1",
    visual: {
      motif: "composition"
    }
  },
  {
    id: "fe-1.3-quiz-effect-boundary",
    type: "quiz",
    readMoreUrl: feSection1_3ReadMoreUrls.q23,
    question: "Нужно преобразовать заказ и записать аудит. Как сделать границу побочного эффекта явной?",
    options: [
      {
        id: "option-1",
        text: "Записывать аудит внутри скрытого getter",
        explanation: "Эффект скрыт."
      },
      {
        id: "option-2",
        text: "Скрыть audit в глобальной переменной",
        explanation: "Зависимость скрыта."
      },
      {
        id: "option-3",
        text: "Вычислить результат, затем вызвать record",
        explanation: "Эффект вызван явно."
      },
      {
        id: "option-4",
        text: "Назвать функцию pure и оставить мутацию",
        explanation: "Мутация остаётся."
      }
    ],
    correctOptionId: "option-3",
    visual: {
      motif: "composition"
    }
  },
  {
    id: "fe-1.3-quiz-partial-not-currying",
    type: "quiz",
    readMoreUrl: feSection1_3ReadMoreUrls.q24,
    question: "Функция f(a,b,c) превращена в g(b,c), где a заранее закреплён. Как называется преобразование?",
    options: [
      {
        id: "option-1",
        text: "Мемоизация",
        explanation: "Кеш здесь не описан."
      },
      {
        id: "option-2",
        text: "Частичное применение",
        explanation: "Закреплена часть входов."
      },
      {
        id: "option-3",
        text: "Глубокое копирование",
        explanation: "Копии здесь нет."
      },
      {
        id: "option-4",
        text: "Обязательно каррирование",
        explanation: "Цепочки здесь нет."
      }
    ],
    correctOptionId: "option-2",
    visual: {
      motif: "composition"
    }
  },
  {
    id: "fe-1.3-quiz-curried-result",
    type: "quiz",
    readMoreUrl: feSection1_3ReadMoreUrls.q24,
    question: `Что выведет код?

~~~js
const add = a => b => a + b;
const addTwo = add(2);
console.log(addTwo(5));
~~~`,
    options: [
      {
        id: "option-1",
        text: "2",
        explanation: "Оба вызова участвуют."
      },
      {
        id: "option-2",
        text: "\"25\"",
        explanation: "Это сложение чисел."
      },
      {
        id: "option-3",
        text: "TypeError",
        explanation: "add(2) даёт функцию."
      },
      {
        id: "option-4",
        text: "7",
        explanation: "Функция помнит a."
      }
    ],
    correctOptionId: "option-4",
    visual: {
      motif: "composition"
    }
  },
  {
    id: "fe-1.3-quiz-compose-direction",
    type: "quiz",
    readMoreUrl: feSection1_3ReadMoreUrls.q25,
    question: `Что выведет код?

~~~js
const compose = (f, g) => x => f(g(x));
const add = x => x + 1;
const twice = x => x * 2;
console.log(compose(add, twice)(3));
~~~`,
    options: [
      {
        id: "option-1",
        text: "8",
        explanation: "twice идёт первым."
      },
      {
        id: "option-2",
        text: "7",
        explanation: "3 → 6 → 7."
      },
      {
        id: "option-3",
        text: "6",
        explanation: "Дальше идёт add."
      },
      {
        id: "option-4",
        text: "TypeError",
        explanation: "Этапы совместимы."
      }
    ],
    correctOptionId: "option-2",
    visual: {
      motif: "composition"
    }
  },
  {
    id: "fe-1.3-quiz-pipe-direction",
    type: "quiz",
    readMoreUrl: feSection1_3ReadMoreUrls.q25,
    question: `Здесь pipe выполняет f, затем g. Вывод?

~~~js
const pipe = (f, g) => x => g(f(x));
const add = x => x + 1;
const twice = x => x * 2;
console.log(pipe(add, twice)(3));
~~~`,
    options: [
      {
        id: "option-1",
        text: "7",
        explanation: "Здесь порядок прямой."
      },
      {
        id: "option-2",
        text: "4",
        explanation: "После add есть twice."
      },
      {
        id: "option-3",
        text: "8",
        explanation: "3 → 4 → 8."
      },
      {
        id: "option-4",
        text: "TypeError",
        explanation: "Этапы совместимы."
      }
    ],
    correctOptionId: "option-3",
    visual: {
      motif: "composition"
    }
  },
  {
    id: "fe-1.3-quiz-composition-contract",
    type: "quiz",
    readMoreUrl: feSection1_3ReadMoreUrls.q25,
    question: "Первый этап возвращает число, следующий без проверки вызывает value.trim(). Какое условие композиции нарушено?",
    options: [
      {
        id: "option-1",
        text: "Совместимость результата и входа",
        explanation: "Число не имеет trim."
      },
      {
        id: "option-2",
        text: "Одинаковые имена параметров",
        explanation: "Имена не важны."
      },
      {
        id: "option-3",
        text: "Обязательная асинхронность",
        explanation: "Async необязателен."
      },
      {
        id: "option-4",
        text: "Использование только стрелок",
        explanation: "Важны входы этапов."
      }
    ],
    correctOptionId: "option-1",
    visual: {
      motif: "composition"
    }
  },
  {
    id: "fe-1.3-quiz-factory-bounds",
    type: "quiz",
    readMoreUrl: feSection1_3ReadMoreUrls.q19,
    question: "Контейнер хранит один токен. take() уменьшает остаток только при успехе. Что должны вернуть два вызова подряд?",
    options: [
      {
        id: "option-1",
        text: "true / true",
        explanation: "Второму не хватает."
      },
      {
        id: "option-2",
        text: "false / true",
        explanation: "Первый может взять."
      },
      {
        id: "option-3",
        text: "true / false",
        explanation: "Токен только один."
      },
      {
        id: "option-4",
        text: "1 / 0",
        explanation: "Нужен boolean."
      }
    ],
    correctOptionId: "option-3"
  },
  {
    id: "fe-1.3-quiz-memoized-throw",
    type: "quiz",
    readMoreUrl: feSection1_3ReadMoreUrls.q20,
    question: "Мемоизатор записывает результат только после успешного operation(key). operation бросает до записи. Что будет при повторе того же ключа?",
    options: [
      {
        id: "option-1",
        text: "Вернётся прежняя ошибка из кеша",
        explanation: "Ошибку не записали."
      },
      {
        id: "option-2",
        text: "operation выполнится снова",
        explanation: "Успешной записи нет."
      },
      {
        id: "option-3",
        text: "Вернётся undefined без вызова",
        explanation: "Это промах кеша."
      },
      {
        id: "option-4",
        text: "Функция перестанет быть вызываемой",
        explanation: "Функция не исчезает."
      }
    ],
    correctOptionId: "option-2"
  }
];
