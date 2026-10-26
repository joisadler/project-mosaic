import type { InfoCardData } from "./card-types";
import { feSection1_3ReadMoreUrls } from "./fe-1.3-source-urls";

// MOS-39: handbook subsection 1.3; owner-approved coverage and visual direction.
export const feSection1_3InfoCards: InfoCardData[] = [
  {
    id: "fe-1.3-info-function-value",
    type: "info",
    readMoreUrl: feSection1_3ReadMoreUrls.q1,
    pages: [
      `## Функцию можно передать

Функция — значение первого класса (first-class value): её можно сохранить, передать и вернуть. Присваивание сохраняет ту же функцию.`,
      `## Функцию можно передать

~~~js
function twice(x) {
  return x * 2;
}
const operation = twice;
console.log(operation(3));
// 6
const same = operation === twice;
console.log(same); // true
~~~`
    ]
  },
  {
    id: "fe-1.3-info-named-self-reference",
    type: "info",
    readMoreUrl: feSection1_3ReadMoreUrls.q3,
    pages: [
      `## Внутреннее имя остаётся

Именованное выражение (named function expression) даёт функции собственное имя. Оно полезно для самоссылки, даже если внешняя переменная изменится.`,
      `## Внутреннее имя остаётся

~~~js
let run = function self() {
  return typeof self;
};
const saved = run;
run = null;
console.log(saved());
// "function"
~~~`
    ]
  },
  {
    id: "fe-1.3-info-function-name",
    type: "info",
    readMoreUrl: feSection1_3ReadMoreUrls.q1,
    pages: [
      `## Имя помогает отладке

У функции есть свойство \`name\`. Оно не равно имени любой переменной, в которой функция хранится.`,
      `## Имя помогает отладке

~~~js
const run =
  function internal() {};
const alias = run;
console.log(alias.name);
// "internal"
~~~`,
      `## Имя не является контрактом

Анонимная функция может получить имя из места присваивания. Минификация способна изменить имена. Не строй логику приложения на \`fn.name\`; используй явный идентификатор операции.`
    ]
  },
  {
    id: "fe-1.3-info-arrow-semantics",
    type: "info",
    readMoreUrl: feSection1_3ReadMoreUrls.q4,
    pages: [
      `## Стрелка меняет семантику

Стрелочная функция (arrow function) не создаёт собственные \`this\` и \`arguments\`. Она читает их из внешнего окружения, если они там доступны. Короткая запись удобна для преобразования данных.`,
      `## Стрелка меняет семантику

Для метода с получателем текущего вызова обычно нужна обычная функция или краткая запись метода.`,
      `## Вернуть объект

Без скобок фигурные скобки после стрелки начинают тело функции. Для неявного возврата объекта нужны круглые скобки.`,
      `## Вернуть объект

~~~js
const make = () => ({ id: 1 });
console.log(make().id); // 1
~~~`
    ],
    visual: {
      motif: "invocation"
    }
  },
  {
    id: "fe-1.3-info-parameter-contract",
    type: "info",
    readMoreUrl: feSection1_3ReadMoreUrls.q5,
    pages: [
      `## Параметр и аргумент

Параметр (parameter) — привязка в определении функции. Аргумент (argument) — значение конкретного вызова. Лишние аргументы допустимы, а отсутствующий обычно даёт \`undefined\`.`,
      `## Параметр и аргумент

~~~js
function first(value) {
  return value;
}
console.log(first());
// undefined
console.log(first(7, 8)); // 7
~~~`
    ],
    visual: {
      motif: "invocation"
    }
  },
  {
    id: "fe-1.3-info-default-boundary",
    type: "info",
    readMoreUrl: feSection1_3ReadMoreUrls.q6,
    pages: [
      `## Значение по умолчанию

Параметр по умолчанию (default parameter) срабатывает при пропущенном аргументе или \`undefined\`. Он не заменяет \`null\`, \`0\` и пустую строку.`,
      `## Значение по умолчанию

~~~js
const label = (x = "new") => x;
console.log(label()); // "new"
console.log(label(null));
// null
~~~`,
      `## Подстановка не проверяет ввод

Значение по умолчанию описывает отсутствие данных. Тип, диапазон и допустимость \`null\` проверяются отдельно. Иначе функция может получить формально переданное, но недопустимое значение.`
    ],
    visual: {
      motif: "invocation"
    }
  },
  {
    id: "fe-1.3-info-default-evaluation",
    type: "info",
    readMoreUrl: feSection1_3ReadMoreUrls.q6,
    pages: [
      `## Вычисление при вызове

Выражение по умолчанию вычисляется заново, только когда аргумент отсутствует или равен \`undefined\`.`,
      `## Вычисление при вызове

~~~js
let seed = 0;
function next(id = ++seed) {
  return id;
}
console.log(next()); // 1
console.log(next(9)); // 9
console.log(next()); // 2
~~~`,
      `## Порядок слева направо

Более поздний параметр может читать уже инициализированный ранний. Обратное чтение до инициализации приводит к \`ReferenceError\`.`,
      `## Порядок слева направо

~~~js
function pair(a, b = a + 1) {
  return [a, b];
}
console.log(pair(3));
// [3, 4]
~~~`
    ],
    visual: {
      motif: "invocation"
    }
  },
  {
    id: "fe-1.3-info-default-scope",
    type: "info",
    readMoreUrl: feSection1_3ReadMoreUrls.q6,
    pages: [
      `## Тело не видно из default

Выражение по умолчанию выполняется вне области тела функции. В этом примере вызов даёт \`ReferenceError\`: \`helper\` объявлена только в теле.`,
      `## Тело не видно из default

~~~js
function build(x = helper()) {
  function helper() { return 1; }
  return x;
}
build();
~~~`
    ],
    visual: {
      motif: "invocation"
    }
  },
  {
    id: "fe-1.3-info-destructured-defaults",
    type: "info",
    readMoreUrl: feSection1_3ReadMoreUrls.q6,
    pages: [
      `## Два уровня подстановки

Внешнее \`= {}\` даёт объект при отсутствии всего аргумента. Внутреннее \`size = 3\` подставляет отсутствующее свойство.`,
      `## Два уровня подстановки

~~~js
function read(
  { size = 3 } = {}
) {
  return size;
}
console.log(read()); // 3
const config = { size: 0 };
console.log(read(config));
// 0
~~~`,
      `## null — отдельный случай

В \`read(null)\` аргумент присутствует, поэтому внешнее значение по умолчанию не применяется. Деструктуризация \`null\` вызовет \`TypeError\`. Если \`null\` допустим, опиши и обработай этот случай явно.`
    ],
    visual: {
      motif: "invocation"
    }
  },
  {
    id: "fe-1.3-info-rest-and-arguments",
    type: "info",
    readMoreUrl: feSection1_3ReadMoreUrls.q7,
    pages: [
      `## Остаток — настоящий массив

Остаточный параметр (rest parameter) собирает аргументы после именованных параметров. Он должен стоять последним.`,
      `## Остаток — настоящий массив

~~~js
function read(first, ...rest) {
  console.log(rest); // [2, 3]
  console.log(
    Array.isArray(rest)
  ); // true
}
read(1, 2, 3);
~~~`,
      `## arguments содержит все

В обычной функции \`arguments\` — массивоподобный объект со всеми фактическими аргументами. Это не массив: методы массива не доступны напрямую. В новом API явный остаточный параметр обычно понятнее.`
    ],
    visual: {
      motif: "invocation"
    }
  },
  {
    id: "fe-1.3-info-arrow-arguments",
    type: "info",
    readMoreUrl: feSection1_3ReadMoreUrls.q7,
    pages: [
      `## arguments берётся снаружи

Стрелочная функция не создаёт собственный \`arguments\`. Остаточный параметр у неё при этом может быть своим.`,
      `## arguments берётся снаружи

~~~js
function outer(value) {
  const read = (...args) =>
    [arguments[0], args[0]];
  return read("inner");
}
console.log(outer("outer"));
// ["outer", "inner"]
~~~`
    ],
    visual: {
      motif: "invocation"
    }
  },
  {
    id: "fe-1.3-info-arity-counts",
    type: "info",
    readMoreUrl: feSection1_3ReadMoreUrls.q8,
    pages: [
      `## length — синтаксический счёт

Свойство \`fn.length\` считает параметры до первого значения по умолчанию. Остаточный параметр не входит в счёт. Шаблон деструктуризации считается одним параметром.`,
      `## length — синтаксический счёт

~~~js
function run(a, b = 2, ...rest) {}
console.log(run.length); // 1
~~~`,
      `## Три разных числа

\`fn.length\` описывает определение, \`arguments.length\` — текущий вызов, \`rest.length\` — собранный остаток. Ни одно из этих чисел не проверяет типы и допустимость аргументов.`
    ],
    visual: {
      motif: "invocation"
    }
  },
  {
    id: "fe-1.3-info-arguments-legacy",
    type: "info",
    readMoreUrl: feSection1_3ReadMoreUrls.q7,
    pages: [
      `## Legacy: связь с параметром

В нестрогой обычной функции с простыми параметрами переданный аргумент может быть связан с \`arguments\`.`,
      `## Legacy: связь с параметром

~~~js
function read(x) {
  x = 2;
  return arguments[0];
}
console.log(read(1)); // 2
~~~`,
      `## Современная граница

В строгом режиме такой связи нет. Она также отсутствует у функций с default, rest или деструктуризацией. Не строй API на этом legacy-поведении; используй явные параметры.`
    ],
    visual: {
      motif: "invocation"
    }
  },
  {
    id: "fe-1.3-info-higher-order-function",
    type: "info",
    readMoreUrl: feSection1_3ReadMoreUrls.q9,
    pages: [
      `## Функция создаёт функцию

Функция высшего порядка (higher-order function, HOF) принимает или возвращает функцию. Возвращённая функция может помнить настройку через замыкание.`,
      `## Функция создаёт функцию

~~~js
const multiplyBy = n => x => n * x;
const double = multiplyBy(2);
console.log(double(5)); // 10
~~~`
    ],
    visual: {
      motif: "composition"
    }
  },
  {
    id: "fe-1.3-info-callback-contract",
    type: "info",
    readMoreUrl: feSection1_3ReadMoreUrls.q10,
    pages: [
      `## Колбэк — роль функции

Функция обратного вызова (callback) передаётся коду, который вызывает её по своему контракту. Колбэк не обязательно асинхронный: например, \`map\` вызывает его синхронно.`,
      `## Что нужно выяснить

Кто, когда и сколько раз вызывает функцию? Какие аргументы и \`this\` передаются? Как используется результат и распространяется ошибка? Кто хранит ссылку и как отменить регистрацию?`,
      `## Что нужно выяснить

Контракт важнее краткости записи.`
    ],
    visual: {
      motif: "composition"
    }
  },
  {
    id: "fe-1.3-info-callback-adapter",
    type: "info",
    readMoreUrl: feSection1_3ReadMoreUrls.q10,
    pages: [
      `## Согласуй сигнатуры

\`map\` передаёт значение, индекс и массив. У \`parseInt\` второй аргумент — основание системы счисления. Прямое совмещение даёт неожиданный результат.`,
      `## Согласуй сигнатуры

~~~js
const result = ["10", "20"].map(
  parseInt
);
console.log(result);
// [10, NaN]
~~~`,
      `## Явный адаптер

Небольшая функция передаёт только нужные аргументы.`,
      `## Явный адаптер

~~~js
const values = ["10", "20"];
const parse = value =>
  Number.parseInt(value, 10);
const result = values.map(parse);
console.log(result);
// [10, 20]
~~~`
    ],
    visual: {
      motif: "composition"
    }
  },
  {
    id: "fe-1.3-info-receiver-call-site",
    type: "info",
    readMoreUrl: feSection1_3ReadMoreUrls.q11,
    pages: [
      `## Получатель определяется вызовом

У обычной функции \`this\` зависит от формы вызова. Один объект-функция может быть методом разных объектов.`,
      `## Получатель определяется вызовом

~~~js
function read() {
  return this.name;
}
const a = { name: "Ada", read };
const b = { name: "Lin", read };
console.log(a.read()); // "Ada"
console.log(b.read()); // "Lin"
~~~`
    ],
    visual: {
      motif: "invocation"
    }
  },
  {
    id: "fe-1.3-info-detached-method",
    type: "info",
    readMoreUrl: feSection1_3ReadMoreUrls.q12,
    pages: [
      `## Передали только функцию

\`obj.method\` получает значение функции. Последующий \`fn()\` уже не является вызовом метода. В строгом режиме получатель такого вызова — \`undefined\`.`,
      `## Передали только функцию

~~~js
"use strict";
const obj = {
  read() { return this; }
};
const fn = obj.read;
console.log(fn());
// undefined
~~~`,
      `## Сохрани намерение

Для разового вызова подходит \`call\`. Для будущего колбэка можно сохранить результат \`bind\` или стрелочный адаптер. Если позже нужно снять регистрацию, сохрани ту же ссылку на функцию.`
    ],
    visual: {
      motif: "invocation"
    }
  },
  {
    id: "fe-1.3-info-call-apply-bind",
    type: "info",
    readMoreUrl: feSection1_3ReadMoreUrls.q13,
    pages: [
      `## Вызвать или подготовить

\`call\` и \`apply\` немедленно вызывают функцию и возвращают её результат. \`bind\` возвращает новую функцию для будущего вызова.`,
      `## Вызвать или подготовить

У \`call\` аргументы перечисляются отдельно, у \`apply\` передаются одним массивоподобным значением.`,
      `## Первые аргументы закреплены

\`bind\` не выполнил сложение: вычисление произошло при вызове \`addTwo\`.`,
      `## Первые аргументы закреплены

~~~js
function add(a, b) {
  return a + b;
}
const addTwo = add.bind(null, 2);
console.log(addTwo(5)); // 7
~~~`
    ],
    visual: {
      motif: "invocation"
    }
  },
  {
    id: "fe-1.3-info-apply-array-like",
    type: "info",
    readMoreUrl: feSection1_3ReadMoreUrls.q14,
    pages: [
      `## apply и spread различаются

\`apply\` принимает массивоподобный объект с \`length\` и индексами. Spread в вызове требует итерируемое значение. Обычный массив подходит обоим.`,
      `## apply и spread различаются

~~~js
const args = {
  0: 4, 1: 7, length: 2
};
const max = Math.max.apply(
  null, args
);
console.log(max); // 7
~~~`,
      `## Заимствование без копирования

\`call\` позволяет вызвать подходящий метод с другим получателем. Метод не копируется в объект.`,
      `## Заимствование без копирования

Для обычной проверки собственного свойства современный \`Object.hasOwn(obj, key)\` понятнее ручного заимствования \`hasOwnProperty\`.`
    ],
    visual: {
      motif: "invocation"
    }
  },
  {
    id: "fe-1.3-info-receiver-normalization",
    type: "info",
    readMoreUrl: feSection1_3ReadMoreUrls.q14,
    pages: [
      `## Режим функции имеет значение

Обычная функция в строгом режиме использует явно переданный \`thisArg\` без преобразований.`,
      `## Режим функции имеет значение

~~~js
function read() {
  "use strict";
  return this;
}
console.log(read.call(null));
// null
~~~`,
      `## Legacy: нестрогий режим

У нестрогой обычной функции \`null\` и \`undefined\` заменяются глобальным объектом её среды, а примитивы оборачиваются. В ES-модулях действует строгий режим.`,
      `## Legacy: нестрогий режим

Не переноси ожидания из нестрогого script в модуль.`
    ],
    visual: {
      motif: "invocation"
    }
  },
  {
    id: "fe-1.3-info-bound-identity",
    type: "info",
    readMoreUrl: feSection1_3ReadMoreUrls.q15,
    pages: [
      `## Каждый bind — новая функция

Два одинаковых вызова \`bind\` создают разные объекты-функции.`,
      `## Каждый bind — новая функция

~~~js
function run() {}
const obj = {};
const a = run.bind(obj);
const b = run.bind(obj);
console.log(a === b); // false
~~~`,
      `## Очистке нужна та же ссылка

Сохрани привязанный обработчик один раз и передай его при регистрации и удалении.`,
      `## Очистке нужна та же ссылка

Совпадения тела функции и получателя недостаточно: \`removeEventListener\` сопоставляет сам обработчик и параметры регистрации.`
    ],
    visual: {
      motif: "invocation"
    }
  },
  {
    id: "fe-1.3-info-bound-arguments",
    type: "info",
    readMoreUrl: feSection1_3ReadMoreUrls.q15,
    pages: [
      `## Повторное связывание

Второй \`bind\` не заменяет уже привязанный \`this\`, но добавляет аргументы после закреплённых раньше.`,
      `## Повторное связывание

~~~js
function list(...xs) { return xs; }
const a = list.bind(null, "A");
const b = a.bind(null, "B");
console.log(b("C"));
// ["A", "B", "C"]
~~~`,
      `## Метаданные обёртки

Для обычной функции с неизменённым числовым \`length\` результат \`bind\` уменьшает его на число закреплённых аргументов, минимум до нуля. Имя получает префикс \`"bound "\`.`,
      `## Метаданные обёртки

Эти свойства помогают отладке, но не заменяют контракт.`
    ],
    visual: {
      motif: "invocation"
    }
  },
  {
    id: "fe-1.3-info-lexical-this",
    type: "info",
    readMoreUrl: feSection1_3ReadMoreUrls.q14,
    pages: [
      `## Стрелка читает внешний this

Поздний \`call\` или \`bind\` не меняет \`this\` стрелки. Аргументы при этом передаются и закрепляются.`,
      `## Стрелка читает внешний this

~~~js
function make() {
  return x => this.n + x;
}
const f = make.call({ n: 2 });
const other = { n: 9 };
console.log(f.call(other, 3));
// 5
~~~`
    ],
    visual: {
      motif: "invocation"
    }
  },
  {
    id: "fe-1.3-info-bind-or-adapter",
    type: "info",
    readMoreUrl: feSection1_3ReadMoreUrls.q15,
    pages: [
      `## Объект или живая привязка

\`obj.method.bind(obj)\` закрепляет текущий объект и текущую функцию. Адаптер \`() => obj.method()\` читает переменную и свойство заново при вызове.`,
      `## Объект или живая привязка

Это разные контракты, если объект или его метод может измениться. Оба варианта создают новую функцию; для снятия регистрации нужна сохранённая ссылка.`
    ],
    visual: {
      motif: "invocation"
    }
  },
  {
    id: "fe-1.3-info-construction-model",
    type: "info",
    readMoreUrl: feSection1_3ReadMoreUrls.q16,
    pages: [
      `## Практическая модель new

Для обычной функции-конструктора \`new\` создаёт объект, связывает его с прототипом конструктора и вызывает функцию с этим объектом в \`this\`. Если конструктор вернул объект, он заменяет созданный экземпляр.`,
      `## Практическая модель new

Возвращённый примитив игнорируется.`,
      `## Вызываемый ≠ конструктор

Стрелка и краткая запись метода не поддерживают \`new\`. \`bind\` сохраняет возможность конструирования только тогда, когда она есть у исходной функции.`,
      `## Вызываемый ≠ конструктор

Само наличие свойства \`prototype\` не является универсальным тестом конструктора.`
    ],
    visual: {
      motif: "invocation"
    }
  },
  {
    id: "fe-1.3-info-bound-constructor",
    type: "info",
    readMoreUrl: feSection1_3ReadMoreUrls.q16,
    pages: [
      `## new использует новый this

У привязанного конструктора заранее заданные аргументы сохраняются, а привязанный получатель игнорируется.`,
      `## new использует новый this

~~~js
function Point(x) { this.x = x; }
const old = { x: 9 };
const Fixed = Point.bind(old, 2);
console.log(new Fixed().x);
// 2
console.log(old.x); // 9
~~~`
    ],
    visual: {
      motif: "invocation"
    }
  },
  {
    id: "fe-1.3-info-closure-live-binding",
    type: "info",
    readMoreUrl: feSection1_3ReadMoreUrls.q18,
    pages: [
      `## Доступ сохраняется

Замыкание (closure) — функция вместе с доступом к лексическим привязкам места её создания. Это не замороженная копия значений.`,
      `## Доступ сохраняется

~~~js
let count = 0;
const read = () => count;
count = 2;
console.log(read()); // 2
~~~`,
      `## Снимок создаётся явно

Отдельная привязка может сохранить прежний примитив.`,
      `## Снимок создаётся явно

~~~js
let count = 0;
const snapshot = count;
const read = () => snapshot;
count = 2;
console.log(read()); // 0
~~~`
    ]
  },
  {
    id: "fe-1.3-info-closure-versus-stack",
    type: "info",
    readMoreUrl: feSection1_3ReadMoreUrls.q17,
    pages: [
      `## Внешний вызов завершился

Завершение внешней функции убирает её активный вызов из стека. Возвращённое замыкание всё ещё может читать нужные привязки.`,
      `## Внешний вызов завершился

~~~js
function make(prefix) {
  return name => prefix + name;
}
const greet = make("Hi, ");
console.log(greet("Ada"));
// "Hi, Ada"
~~~`,
      `## Это не копия всего стека

Лексическая область задаёт доступность имён, стек — активные вызовы. Замыкание сохраняет нужный доступ после вызова.`,
      `## Это не копия всего стека

Движок может оптимизировать представление окружения; обещать копирование всей внешней области неверно.`
    ]
  },
  {
    id: "fe-1.3-info-factory-state",
    type: "info",
    readMoreUrl: feSection1_3ReadMoreUrls.q19,
    pages: [
      `## Один вызов — общее состояние

Методы, созданные одной фабрикой (factory), могут разделять закрытую привязку.`,
      `## Один вызов — общее состояние

~~~js
function make() {
  let n = 0;
  return {
    inc: () => ++n, read: () => n
  };
}
const box = make();
box.inc();
console.log(box.read()); // 1
~~~`,
      `## Другой вызов — свои привязки

Каждый вызов фабрики создаёт новое состояние. Возвращённый API управляет доступом к нему и может проверять границы.`,
      `## Другой вызов — свои привязки

Компромисс: каждый экземпляр получает свои объекты-функции; закрытое состояние требует понятного жизненного цикла.`
    ]
  },
  {
    id: "fe-1.3-info-captured-object",
    type: "info",
    readMoreUrl: feSection1_3ReadMoreUrls.q18,
    pages: [
      `## Старый объект и текущая переменная

Замыкание над переменной читает её текущее значение. Отдельная переменная может сохранить прежний объект, но не защищает его от мутации.`,
      `## Старый объект и текущая переменная

~~~js
let state = { n: 1 };
const old = state;
const read = () => state.n;
state.n = 2;
state = { n: 3 };
const n = read();
console.log(n, old.n);
// 3 / 2
~~~`
    ]
  },
  {
    id: "fe-1.3-info-loop-repair",
    type: "info",
    readMoreUrl: feSection1_3ReadMoreUrls.q21,
    pages: [
      `## Исправить общий захват

У \`for (var i...)\` одна привязка. Поздние колбэки читают её итоговое значение. \`let\` в заголовке \`for\` создаёт отдельные привязки по итерациям.`,
      `## Исправить общий захват

Для legacy-кода фабрика или IIFE может получить отдельный параметр на каждом шаге. Важно место создания привязки, а не форма стрелки.`
    ]
  },
  {
    id: "fe-1.3-info-memoization-contract",
    type: "info",
    readMoreUrl: feSection1_3ReadMoreUrls.q20,
    pages: [
      `## Кеш — часть контракта

Мемоизация (memoization) сохраняет результат для повторных входных данных. Ключ должен учитывать всё, что влияет на вычисление: вход, настройки и изменяемые зависимости.`,
      `## Кеш — часть контракта

Если функция преобразования меняется между вызовами, кеш только по значению может вернуть результат другой операции.`,
      `## Проверяй наличие записи

Результат \`undefined\` тоже можно сохранить. Проверка истинности \`cache.get(key)\` путает отсутствие с сохранёнными \`0\`, \`false\` или \`undefined\`.

Используй \`cache.has(key)\`, если эти значения допустимы.`
    ]
  },
  {
    id: "fe-1.3-info-cache-lifetime",
    type: "info",
    readMoreUrl: feSection1_3ReadMoreUrls.q20,
    pages: [
      `## У кеша должны быть границы

Определи максимальный размер, удаление записей и сброс устаревших данных. LRU (least recently used) удаляет запись, которой дольше всего не пользовались.`,
      `## У кеша должны быть границы

TTL (time to live) ограничивает время актуальности.`,
      `## Ключ и результат могут меняться

Объекты в \`Map\` сравниваются по идентичности. Мутация объекта-ключа не создаёт новый ключ. Возвращённый из кеша объект тоже может оказаться общим.`,
      `## Ключ и результат могут меняться

Для ошибок и отклонённых промисов нужна отдельная политика. Кеш не всегда окупается.`
    ]
  },
  {
    id: "fe-1.3-info-retaining-path",
    type: "info",
    readMoreUrl: feSection1_3ReadMoreUrls.q22,
    pages: [
      `## Ищи путь удержания

Долгоживущий реестр событий, таймер или кеш может удерживать колбэк, а через него — захваченное состояние. Само замыкание не доказывает утечку. Проблема возникает, когда данные живут дольше нужного.`,
      `## Ищи путь удержания

Подтверждение требует цепочки удержания и наблюдений памяти.`,
      `## Очистка рядом с регистрацией

Сохраняй обработчик для удаления, останавливай ненужный таймер, отменяй подписку и очищай кеш. Повторная очистка должна быть безопасной.`,
      `## Очистка рядом с регистрацией

Извлечение маленького поля помогает, только если оно само не ведёт обратно к большому графу.`
    ]
  },
  {
    id: "fe-1.3-info-event-cleanup",
    type: "info",
    readMoreUrl: feSection1_3ReadMoreUrls.q22,
    pages: [
      `## Та же функция снимает регистрацию

Пример для браузера: после удаления обработчик больше не вызывается. Объект событий изолирован от страницы.`,
      `## Та же функция снимает регистрацию

~~~js
const el = new EventTarget();
let n = 0;
const f = () => n++;
el.addEventListener("x", f);
el.removeEventListener("x", f);
el.dispatchEvent(new Event("x"));
console.log(n); // 0
~~~`
    ]
  },
  {
    id: "fe-1.3-info-pure-function",
    type: "info",
    readMoreUrl: feSection1_3ReadMoreUrls.q23,
    pages: [
      `## Вычисление без внешних эффектов

Чистая функция (pure function) для одинаковых входных данных даёт одинаковый наблюдаемый результат и не создаёт внешних наблюдаемых эффектов.`,
      `## Вычисление без внешних эффектов

Чтение изменяемого внешнего состояния, времени или случайности может сделать результат зависимым от момента вызова.`,
      `## Эффекты нужны приложению

DOM, сеть, хранилище, журналирование и регистрация событий — эффекты. Они не являются ошибкой сами по себе.`,
      `## Эффекты нужны приложению

Отделяй преобразование данных от выполнения эффекта, чтобы контракт и место обработки ошибки были понятны.`
    ],
    visual: {
      motif: "composition"
    }
  },
  {
    id: "fe-1.3-info-local-mutation",
    type: "info",
    readMoreUrl: feSection1_3ReadMoreUrls.q23,
    pages: [
      `## Локальная мутация допустима

Изменение свежего результата, ещё не доступного другим частям программы, может оставаться ненаблюдаемым снаружи.`,
      `## Локальная мутация допустима

~~~js
function doubleAll(items) {
  const result = [];
  for (const x of items) {
    result.push(x * 2);
  }
  return result;
}
const xs = doubleAll([1, 2]);
console.log(xs); // [2, 4]
~~~`
    ],
    visual: {
      motif: "composition"
    }
  },
  {
    id: "fe-1.3-info-ownership-boundary",
    type: "info",
    readMoreUrl: feSection1_3ReadMoreUrls.q23,
    pages: [
      `## Кто владеет данными?

Функция, которая меняет объект вызывающего кода, создаёт наблюдаемый эффект. Новая внешняя spread-копия не делает вложенные объекты независимыми.`,
      `## Кто владеет данными?

Для изменения вложенного поля копируй нужные уровни либо явно договорись о допустимой мутации.`
    ],
    visual: {
      motif: "composition"
    }
  },
  {
    id: "fe-1.3-info-currying-partial",
    type: "info",
    readMoreUrl: feSection1_3ReadMoreUrls.q24,
    pages: [
      `## Изменить форму вызова

Каррирование (currying) превращает вызов с несколькими аргументами в цепочку одноаргументных вызовов.`,
      `## Изменить форму вызова

~~~js
const add = a => b => c =>
  a + b + c;
console.log(add(1)(2)(3));
// 6
~~~`,
      `## Закрепить часть аргументов

Частичное применение (partial application) фиксирует часть аргументов. Оставшаяся функция не обязана быть одноаргументной.`,
      `## Закрепить часть аргументов

~~~js
const sum = (a, b, c) =>
  a + b + c;
const addOne = sum.bind(null, 1);
console.log(addOne(2, 3));
// 6
~~~`
    ],
    visual: {
      motif: "composition"
    }
  },
  {
    id: "fe-1.3-info-composition-order",
    type: "info",
    readMoreUrl: feSection1_3ReadMoreUrls.q25,
    pages: [
      `## Результат становится входом

Композиция (function composition) соединяет операции с совместимыми входом и результатом. В определении ниже сначала работает \`g\`, затем \`f\`.`,
      `## Результат становится входом

~~~js
const compose = (f, g) =>
  x => f(g(x));
const add = x => x + 1;
const twice = x => x * 2;
const result = compose(
  twice, add
)(3);
console.log(result); // 8
~~~`,
      `## Конвейер читается по шагам

В обычном соглашении \`pipe(g, f)\` перечисляет тот же порядок слева направо. Это соглашение конкретной функции, а не встроенный оператор JavaScript.`,
      `## Конвейер читается по шагам

Именуй этапы и не скрывай ветвление или обработку ошибок в цепочке.`
    ],
    visual: {
      motif: "composition"
    }
  },
  {
    id: "fe-1.3-info-pattern-tradeoffs",
    type: "info",
    readMoreUrl: feSection1_3ReadMoreUrls.q26,
    pages: [
      `## Начни с контракта

Выясни вход и результат, владение данными, получателя вызова, захваченные привязки и срок их жизни. Затем выбирай фабрику, адаптер или композицию.`,
      `## Начни с контракта

Настройки с необязательными полями часто понятнее длинной цепочки каррирования. \`fn.length\` — хрупкая основа для универсального curry.`
    ],
    visual: {
      motif: "composition"
    }
  },
  {
    id: "fe-1.3-info-factory-invariants",
    type: "info",
    readMoreUrl: feSection1_3ReadMoreUrls.q19,
    pages: [
      `## Закрытое состояние не заменяет проверку

Фабрика может проверять настройки до создания API и защищать состояние через методы. Например, контейнер токенов не должен уходить ниже нуля или выше ёмкости.`,
      `## Закрытое состояние не заменяет проверку

Default описывает отсутствие параметра. Отрицательное, дробное или неподходящее по типу значение проверяется отдельно.`,
      `## Отказ не меняет состояние

Пример предполагает заранее проверенную положительную целую ёмкость.`,
      `## Отказ не меняет состояние

~~~js
function make(capacity) {
  let n = capacity;
  return () => n > 0
    ? (--n, true) : false;
}
const take = make(1);
console.log(take(), take());
// true / false
~~~`
    ]
  }
];
