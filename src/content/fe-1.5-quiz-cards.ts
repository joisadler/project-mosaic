import type { QuizCardData } from "./card-types";
import { feSection1_5ReadMoreUrls } from "./fe-1.5-source-urls";

// MOS-41: owner-approved subsection 1.5 coverage and presentation.
export const feSection1_5QuizCards: QuizCardData[] = [
  {
    id: "fe-1.5-quiz-copy-reverse-hole",
    type: "quiz",
    readMoreUrl: feSection1_5ReadMoreUrls.q6,
    question: `## Что вернёт вызов?

~~~js
const a = [1, , 3];
console.log(a.toReversed());
~~~`,
    options: [
      {
        id: "a",
        text: "[3, undefined, 1]",
        explanation: "toReversed создаёт новый плотный массив. Пустой слот становится явным undefined."
      },
      {
        id: "b",
        text: "[3, 1]",
        explanation: "Позиция сохраняется: метод читает её как undefined, а не удаляет."
      },
      {
        id: "c",
        text: "[1, undefined, 3]",
        explanation: "Метод меняет порядок в новой копии. Исходный массив остаётся прежним."
      },
      {
        id: "d",
        text: "undefined",
        explanation: "Метод возвращает новый массив, а не undefined."
      }
    ],
    correctOptionId: "a",
    visual: {
      motif: "transformation"
    }
  },
  {
    id: "fe-1.5-quiz-typed-array-brand",
    type: "quiz",
    readMoreUrl: feSection1_5ReadMoreUrls.q1,
    question: `## Что выведет код?

~~~js
const a = new Uint8Array(2);
console.log(Array.isArray(a));
~~~`,
    options: [
      {
        id: "a",
        text: "true",
        explanation: "Индексированность не делает Uint8Array обычным Array."
      },
      {
        id: "b",
        text: "false",
        explanation: "Uint8Array — типизированный массив, а не объект Array."
      },
      {
        id: "c",
        text: "\"object\"",
        explanation: "Это результат typeof, но здесь вызван Array.isArray."
      },
      {
        id: "d",
        text: "TypeError",
        explanation: "Объект допустим для проверки; метод вернёт boolean."
      }
    ],
    correctOptionId: "b"
  },
  {
    id: "fe-1.5-quiz-fake-array-brand",
    type: "quiz",
    readMoreUrl: feSection1_5ReadMoreUrls.q1,
    question: `## Что выведет код?

~~~js
const a =
  Object.create(Array.prototype);
console.log(Array.isArray(a));
~~~`,
    options: [
      {
        id: "a",
        text: "true",
        explanation: "Array.prototype в цепочке недостаточно для Array.isArray."
      },
      {
        id: "b",
        text: "undefined",
        explanation: "Array.isArray возвращает boolean для этого значения."
      },
      {
        id: "c",
        text: "false",
        explanation: "Прототип не создаёт внутренний вид Array. Проверка даёт false."
      },
      {
        id: "d",
        text: "TypeError",
        explanation: "Создать обычный объект с таким прототипом допустимо."
      }
    ],
    correctOptionId: "c"
  },
  {
    id: "fe-1.5-quiz-index-growth",
    type: "quiz",
    readMoreUrl: feSection1_5ReadMoreUrls.q2,
    question: `## Что выведет код?

~~~js
const a = [];
a[4] = "x";
console.log(a.length,
  Object.keys(a).length);
~~~`,
    options: [
      {
        id: "a",
        text: "5 / 5",
        explanation: "Промежуточные индексные свойства автоматически не создаются."
      },
      {
        id: "b",
        text: "1 / 1",
        explanation: "length задаёт диапазон индексов, а не число свойств."
      },
      {
        id: "c",
        text: "4 / 1",
        explanation: "Граница length на единицу больше максимального индекса."
      },
      {
        id: "d",
        text: "5 / 1",
        explanation: "Индекс 4 расширяет границу до 5, но создаёт одно собственное свойство."
      }
    ],
    correctOptionId: "d"
  },
  {
    id: "fe-1.5-quiz-non-index",
    type: "quiz",
    readMoreUrl: feSection1_5ReadMoreUrls.q2,
    question: `## Что выведет код?

~~~js
const a = [];
a["01"] = 7;
console.log(a.length);
~~~`,
    options: [
      {
        id: "a",
        text: "0",
        explanation: "Ключ \"01\" не является каноническим индексом массива."
      },
      {
        id: "b",
        text: "1",
        explanation: "Обычное свойство не увеличивает length."
      },
      {
        id: "c",
        text: "2",
        explanation: "Числовое чтение строки как 1 здесь не применяется."
      },
      {
        id: "d",
        text: "TypeError",
        explanation: "Такое свойство допустимо у массива."
      }
    ],
    correctOptionId: "a"
  },
  {
    id: "fe-1.5-quiz-length-truncate",
    type: "quiz",
    readMoreUrl: feSection1_5ReadMoreUrls.q2,
    question: `## Что выведет код?

~~~js
const a = [1, 2, 3];
a.length = 1;
console.log(a[1], 1 in a);
~~~`,
    options: [
      {
        id: "a",
        text: "2 / true",
        explanation: "Элемент за новой границей удалён."
      },
      {
        id: "b",
        text: "undefined / false",
        explanation: "Сокращение удаляет собственное свойство 1; в примере его нет и в прототипе."
      },
      {
        id: "c",
        text: "undefined / true",
        explanation: "Свойство удалено, а не перезаписано значением undefined."
      },
      {
        id: "d",
        text: "TypeError",
        explanation: "Обычный массив разрешает такое сокращение."
      }
    ],
    correctOptionId: "b"
  },
  {
    id: "fe-1.5-quiz-length-refusal",
    type: "quiz",
    readMoreUrl: feSection1_5ReadMoreUrls.q7,
    question: `## Что выведет код?

~~~js
const a = [0, 1, 2];
Object.defineProperty(a, "2",
  { configurable: false });
console.log(Reflect.set(a,
  "length", 1));
~~~`,
    options: [
      {
        id: "a",
        text: "true",
        explanation: "Запись не смогла выполнить требуемое сокращение."
      },
      {
        id: "b",
        text: "1",
        explanation: "Reflect.set возвращает boolean, а не заданную длину."
      },
      {
        id: "c",
        text: "false",
        explanation: "Неконфигурируемый индекс нельзя удалить. Reflect.set сообщает отказ через false."
      },
      {
        id: "d",
        text: "TypeError",
        explanation: "Reflect.set сообщает этот отказ через false; strict-присваивание вызвало бы TypeError."
      }
    ],
    correctOptionId: "c"
  },
  {
    id: "fe-1.5-quiz-explicit-undefined",
    type: "quiz",
    readMoreUrl: feSection1_5ReadMoreUrls.q3,
    question: `## Что выведет код?

~~~js
const a = [undefined];
console.log(Object.hasOwn(a, 0),
  a.length);
~~~`,
    options: [
      {
        id: "a",
        text: "false / 1",
        explanation: "undefined как значение не означает отсутствие свойства."
      },
      {
        id: "b",
        text: "true / 0",
        explanation: "Существующий индекс 0 входит в диапазон длины 1."
      },
      {
        id: "c",
        text: "undefined / 1",
        explanation: "Object.hasOwn возвращает boolean, а не значение свойства."
      },
      {
        id: "d",
        text: "true / 1",
        explanation: "Свойство существует, даже если его значение undefined."
      }
    ],
    correctOptionId: "d"
  },
  {
    id: "fe-1.5-quiz-delete-length",
    type: "quiz",
    readMoreUrl: feSection1_5ReadMoreUrls.q4,
    question: `## Что выведет код?

~~~js
const a = [1, 2, 3];
delete a[1];
console.log(a.length,
  Object.hasOwn(a, 1));
~~~`,
    options: [
      {
        id: "a",
        text: "3 / false",
        explanation: "delete удаляет свойство, сохраняя границу length."
      },
      {
        id: "b",
        text: "2 / true",
        explanation: "Сдвиг и уменьшение длины выполняет splice, а не delete."
      },
      {
        id: "c",
        text: "3 / true",
        explanation: "Свойство удалено; это не запись undefined."
      },
      {
        id: "d",
        text: "2 / false",
        explanation: "Длина сохраняется, хотя свойство исчезает."
      }
    ],
    correctOptionId: "a"
  },
  {
    id: "fe-1.5-quiz-map-hole",
    type: "quiz",
    readMoreUrl: feSection1_5ReadMoreUrls.q5,
    question: `## Что выведет код?

~~~js
const a = [1, ,
  3].map(x => x * 2);
console.log(a.length,
  Object.hasOwn(a, 1));
~~~`,
    options: [
      {
        id: "a",
        text: "2 / true",
        explanation: "map не уплотняет результат, как filter."
      },
      {
        id: "b",
        text: "3 / false",
        explanation: "map пропускает callback для пустого слота и сохраняет позицию без свойства."
      },
      {
        id: "c",
        text: "3 / true",
        explanation: "map не материализует пустой слот как undefined."
      },
      {
        id: "d",
        text: "2 / false",
        explanation: "Длина результата остаётся равной исходной длине."
      }
    ],
    correctOptionId: "b"
  },
  {
    id: "fe-1.5-quiz-filter-hole",
    type: "quiz",
    readMoreUrl: feSection1_5ReadMoreUrls.q5,
    question: `## Что выведет код?

~~~js
console.log([1, ,
  3].filter(() => true));
~~~`,
    options: [
      {
        id: "a",
        text: "[1, undefined, 3]",
        explanation: "filter не добавляет значение для отсутствующего индекса."
      },
      {
        id: "b",
        text: "[1, null, 3]",
        explanation: "null автоматически не появляется: это другая операция, чем JSON-сериализация."
      },
      {
        id: "c",
        text: "[1, 3]",
        explanation: "Метод пропускает пустой слот, а выбранные элементы записываются подряд."
      },
      {
        id: "d",
        text: "undefined",
        explanation: "filter возвращает новый массив выбранных элементов."
      }
    ],
    correctOptionId: "c"
  },
  {
    id: "fe-1.5-quiz-find-hole",
    type: "quiz",
    readMoreUrl: feSection1_5ReadMoreUrls.q5,
    question: `## Что выведет код?

~~~js
console.log([, 7].findIndex(
  x => x === undefined));
~~~`,
    options: [
      {
        id: "a",
        text: "-1",
        explanation: "Этот метод не пропускает пустую позицию."
      },
      {
        id: "b",
        text: "1",
        explanation: "Значение на индексе 1 равно 7, а не undefined."
      },
      {
        id: "c",
        text: "undefined",
        explanation: "findIndex возвращает индекс либо -1, а не значение элемента."
      },
      {
        id: "d",
        text: "0",
        explanation: "findIndex читает пустую позицию как undefined и находит совпадение на индексе 0."
      }
    ],
    correctOptionId: "d"
  },
  {
    id: "fe-1.5-quiz-spread-hole",
    type: "quiz",
    readMoreUrl: feSection1_5ReadMoreUrls.q5,
    question: `## Что выведет код?

~~~js
const a = [...[,]];
console.log(a.length,
  Object.hasOwn(a, 0));
~~~`,
    options: [
      {
        id: "a",
        text: "1 / true",
        explanation: "Итерация читает пустой слот как undefined; spread создаёт свойство с этим значением."
      },
      {
        id: "b",
        text: "1 / false",
        explanation: "Так сохраняет разреженность slice, но не spread."
      },
      {
        id: "c",
        text: "0 / false",
        explanation: "Позиция не пропускается."
      },
      {
        id: "d",
        text: "TypeError",
        explanation: "Разреженный массив остаётся итерируемым."
      }
    ],
    correctOptionId: "a"
  },
  {
    id: "fe-1.5-quiz-with-dense",
    type: "quiz",
    readMoreUrl: feSection1_5ReadMoreUrls.q6,
    question: `## Что выведет код?

~~~js
const a = [, 2];
const b = a.with(1, 9);
console.log(b[0], Object.hasOwn(b,
  0));
~~~`,
    options: [
      {
        id: "a",
        text: "undefined / false",
        explanation: "Метод не переносит пустой слот как отсутствующее свойство."
      },
      {
        id: "b",
        text: "undefined / true",
        explanation: "with создаёт плотный результат: сохранённый пустой слот становится явным undefined."
      },
      {
        id: "c",
        text: "null / true",
        explanation: "JSON здесь не используется; null не появляется."
      },
      {
        id: "d",
        text: "2 / true",
        explanation: "Исходный индекс 0 пуст, а значение 2 находилось на индексе 1."
      }
    ],
    correctOptionId: "b",
    visual: {
      motif: "transformation"
    }
  },
  {
    id: "fe-1.5-quiz-push-return",
    type: "quiz",
    readMoreUrl: feSection1_5ReadMoreUrls.q8,
    question: `## Что выведет код?

~~~js
const a = [1];
const result = a.push(2);
console.log(result, a.length);
~~~`,
    options: [
      {
        id: "a",
        text: "[1, 2] / 2",
        explanation: "Возвращается длина, а не массив."
      },
      {
        id: "b",
        text: "2 / 1",
        explanation: "Успешное добавление увеличило длину входа."
      },
      {
        id: "c",
        text: "2 / 2",
        explanation: "push меняет массив и возвращает новую длину."
      },
      {
        id: "d",
        text: "undefined / 2",
        explanation: "push возвращает число, а не undefined."
      }
    ],
    correctOptionId: "c"
  },
  {
    id: "fe-1.5-quiz-pop-empty",
    type: "quiz",
    readMoreUrl: feSection1_5ReadMoreUrls.q8,
    question: `## Что выведет код?

~~~js
const a = [];
console.log(a.pop(), a.length);
~~~`,
    options: [
      {
        id: "a",
        text: "null / 0",
        explanation: "Контракт pop не использует null как признак пустоты."
      },
      {
        id: "b",
        text: "undefined / -1",
        explanation: "Длина массива не становится отрицательной."
      },
      {
        id: "c",
        text: "TypeError",
        explanation: "Вызов pop у пустого обычного массива допустим."
      },
      {
        id: "d",
        text: "undefined / 0",
        explanation: "У пустого массива pop возвращает undefined и сохраняет длину 0."
      }
    ],
    correctOptionId: "d"
  },
  {
    id: "fe-1.5-quiz-splice-result",
    type: "quiz",
    readMoreUrl: feSection1_5ReadMoreUrls.q9,
    question: `## Что выведет код?

~~~js
const a = [1, 2, 3];
console.log(a.splice(1, 1, 9));
console.log(a);
~~~`,
    options: [
      {
        id: "a",
        text: "[2] / [1, 9, 3]",
        explanation: "splice возвращает удалённый элемент в массиве, а во вход вставляет 9."
      },
      {
        id: "b",
        text: "[1, 9, 3] / [1, 2, 3]",
        explanation: "Это не копирующий метод: вход изменён, результат содержит удалённые значения."
      },
      {
        id: "c",
        text: "[9] / [1, 2, 3]",
        explanation: "Возвращаются удалённые значения, а не вставленные."
      },
      {
        id: "d",
        text: "[2] / [1, 3]",
        explanation: "Третий аргумент вставляет 9 на место удалённого элемента."
      }
    ],
    correctOptionId: "a",
    visual: {
      motif: "transformation"
    }
  },
  {
    id: "fe-1.5-quiz-slice-end",
    type: "quiz",
    readMoreUrl: feSection1_5ReadMoreUrls.q9,
    question: `## Что выведет код?

~~~js
const a = [0, 1, 2, 3];
console.log(a.slice(1, 3),
  a.length);
~~~`,
    options: [
      {
        id: "a",
        text: "[1, 2, 3] / 4",
        explanation: "Правая граница диапазона исключается."
      },
      {
        id: "b",
        text: "[1, 2] / 4",
        explanation: "end не включён. Исходный массив остаётся длины 4."
      },
      {
        id: "c",
        text: "[1, 2] / 2",
        explanation: "slice не меняет исходную длину."
      },
      {
        id: "d",
        text: "[0, 1, 2] / 4",
        explanation: "Копирование начинается с индекса 1."
      }
    ],
    correctOptionId: "b",
    visual: {
      motif: "transformation"
    }
  },
  {
    id: "fe-1.5-quiz-reverse-identity",
    type: "quiz",
    readMoreUrl: feSection1_5ReadMoreUrls.q8,
    question: `## Что выведет код?

~~~js
const a = [1, 2];
const b = a.reverse();
console.log(a === b, a[0]);
~~~`,
    options: [
      {
        id: "a",
        text: "false / 2",
        explanation: "Для копии предназначен toReversed; reverse возвращает исходный массив."
      },
      {
        id: "b",
        text: "false / 1",
        explanation: "reverse возвращает исходный массив и меняет его порядок: первым становится 2."
      },
      {
        id: "c",
        text: "true / 2",
        explanation: "reverse меняет вход и возвращает ту же ссылку."
      },
      {
        id: "d",
        text: "true / 1",
        explanation: "Первым после разворота становится 2."
      }
    ],
    correctOptionId: "c",
    visual: {
      motif: "transformation"
    }
  },
  {
    id: "fe-1.5-quiz-to-spliced",
    type: "quiz",
    readMoreUrl: feSection1_5ReadMoreUrls.q11,
    question: `## Что выведет код?

~~~js
const a = [1, 2, 3];
console.log(a.toSpliced(1, 1, 9));
console.log(a);
~~~`,
    options: [
      {
        id: "a",
        text: "[2] / [1, 9, 3]",
        explanation: "Такой контракт у splice, а не toSpliced."
      },
      {
        id: "b",
        text: "[9] / [1, 2, 3]",
        explanation: "Возвращается вся новая последовательность, а не только вставка."
      },
      {
        id: "c",
        text: "[1, 3] / [1, 2, 3]",
        explanation: "После удаления метод также вставляет третий аргумент 9."
      },
      {
        id: "d",
        text: "[1, 9, 3] / [1, 2, 3]",
        explanation: "toSpliced возвращает итоговую копию и сохраняет вход."
      }
    ],
    correctOptionId: "d",
    visual: {
      motif: "transformation"
    }
  },
  {
    id: "fe-1.5-quiz-with-negative",
    type: "quiz",
    readMoreUrl: feSection1_5ReadMoreUrls.q11,
    question: `## Что выведет код?

~~~js
const a = [1, 2, 3];
console.log(a.with(-1, 8), a[2]);
~~~`,
    options: [
      {
        id: "a",
        text: "[1, 2, 8] / 3",
        explanation: "-1 указывает на последний элемент копии. Вход не изменяется."
      },
      {
        id: "b",
        text: "[1, 2, 8] / 8",
        explanation: "with не записывает новое значение в исходник."
      },
      {
        id: "c",
        text: "[8, 2, 3] / 3",
        explanation: "Отрицательный индекс отсчитывается с конца."
      },
      {
        id: "d",
        text: "RangeError",
        explanation: "-1 входит в допустимый диапазон для длины 3."
      }
    ],
    correctOptionId: "a",
    visual: {
      motif: "transformation"
    }
  },
  {
    id: "fe-1.5-quiz-with-outside",
    type: "quiz",
    readMoreUrl: feSection1_5ReadMoreUrls.q11,
    question: `## Как завершится выражение?

~~~js
[1, 2].with(2, 9);
~~~`,
    options: [
      {
        id: "a",
        text: "[1, 2, 9]",
        explanation: "Такое расширение возможно при присваивании индекса, но не через with."
      },
      {
        id: "b",
        text: "RangeError",
        explanation: "Индекс 2 за границей длины 2. with не расширяет массив."
      },
      {
        id: "c",
        text: "[1, 9]",
        explanation: "Индекс 2 не означает последний элемент."
      },
      {
        id: "d",
        text: "TypeError",
        explanation: "Категория отказа для такого индекса — RangeError."
      }
    ],
    correctOptionId: "b",
    visual: {
      motif: "transformation"
    }
  },
  {
    id: "fe-1.5-quiz-fill-shared",
    type: "quiz",
    readMoreUrl: feSection1_5ReadMoreUrls.q8,
    question: `## Что выведет код?

~~~js
const a =
  new Array(2).fill({ n: 0 });
a[0].n = 4;
console.log(a[1].n);
~~~`,
    options: [
      {
        id: "a",
        text: "0",
        explanation: "fill не создаёт отдельные копии объекта."
      },
      {
        id: "b",
        text: "undefined",
        explanation: "В общем объекте существует свойство n."
      },
      {
        id: "c",
        text: "4",
        explanation: "Обе позиции содержат ссылку на один объект, переданный в fill."
      },
      {
        id: "d",
        text: "TypeError",
        explanation: "Запись разрешена и изменяет общий объект."
      }
    ],
    correctOptionId: "c",
    visual: {
      motif: "sharing"
    }
  },
  {
    id: "fe-1.5-quiz-copy-within-hole",
    type: "quiz",
    readMoreUrl: feSection1_5ReadMoreUrls.q8,
    question: `## Что выведет код?

~~~js
const a = [1, , 3];
a.copyWithin(0, 1, 2);
console.log(a.length,
  Object.hasOwn(a, 0));
~~~`,
    options: [
      {
        id: "a",
        text: "3 / true",
        explanation: "copyWithin сохраняет отсутствие свойства, а не записывает undefined."
      },
      {
        id: "b",
        text: "2 / false",
        explanation: "copyWithin не сокращает массив."
      },
      {
        id: "c",
        text: "TypeError",
        explanation: "Перенести пустую позицию через copyWithin допустимо."
      },
      {
        id: "d",
        text: "3 / false",
        explanation: "Копируется отсутствующее свойство: целевой индекс удаляется, длина сохраняется."
      }
    ],
    correctOptionId: "d",
    visual: {
      motif: "transformation"
    }
  },
  {
    id: "fe-1.5-quiz-map-missing-return",
    type: "quiz",
    readMoreUrl: feSection1_5ReadMoreUrls.q13,
    question: `## Что выведет код?

~~~js
console.log([1,
  2].map(x => { x * 2; }));
~~~`,
    options: [
      {
        id: "a",
        text: "[undefined, undefined]",
        explanation: "Блок стрелки требует явного return; оба callback возвращают undefined."
      },
      {
        id: "b",
        text: "[2, 4]",
        explanation: "Выражение внутри блока вычислено, но не возвращено."
      },
      {
        id: "c",
        text: "[]",
        explanation: "Существующие позиции не удаляются из результата map."
      },
      {
        id: "d",
        text: "undefined",
        explanation: "Сам map возвращает новый массив, даже если значения undefined."
      }
    ],
    correctOptionId: "a",
    visual: {
      motif: "transformation"
    }
  },
  {
    id: "fe-1.5-quiz-foreach-result",
    type: "quiz",
    readMoreUrl: feSection1_5ReadMoreUrls.q13,
    question: `## Что выведет код?

~~~js
console.log([1,
  2].forEach(x => x * 2));
~~~`,
    options: [
      {
        id: "a",
        text: "[2, 4]",
        explanation: "Для массива результатов нужен map."
      },
      {
        id: "b",
        text: "undefined",
        explanation: "forEach игнорирует значения callback и сам возвращает undefined."
      },
      {
        id: "c",
        text: "[1, 2]",
        explanation: "Исходный массив не является результатом forEach."
      },
      {
        id: "d",
        text: "4",
        explanation: "Последнее значение callback не становится результатом метода."
      }
    ],
    correctOptionId: "b",
    visual: {
      motif: "transformation"
    }
  },
  {
    id: "fe-1.5-quiz-filter-boolean",
    type: "quiz",
    readMoreUrl: feSection1_5ReadMoreUrls.q14,
    question: `## Что выведет код?

~~~js
console.log([0, 1, false,
  2].filter(Boolean));
~~~`,
    options: [
      {
        id: "a",
        text: "[0, 1, 2]",
        explanation: "Ноль тоже ложное значение и не проходит Boolean."
      },
      {
        id: "b",
        text: "[0, 1, false, 2]",
        explanation: "Ложные значения не проходят предикат."
      },
      {
        id: "c",
        text: "[1, 2]",
        explanation: "Boolean отвергает и 0, и false. filter сохраняет сами выбранные значения."
      },
      {
        id: "d",
        text: "[true, true]",
        explanation: "filter не заменяет элементы результатами предиката."
      }
    ],
    correctOptionId: "c",
    visual: {
      motif: "transformation"
    }
  },
  {
    id: "fe-1.5-quiz-filter-nullish",
    type: "quiz",
    readMoreUrl: feSection1_5ReadMoreUrls.q14,
    question: `## Что выведет код?

~~~js
const a = [0, null, false,
  undefined];
console.log(a.filter(x =>
  x != null));
~~~`,
    options: [
      {
        id: "a",
        text: "[]",
        explanation: "Это не фильтрация по truthiness: 0 и false сохраняются."
      },
      {
        id: "b",
        text: "[false]",
        explanation: "Ноль не равен null при таком сравнении."
      },
      {
        id: "c",
        text: "[0, null, false]",
        explanation: "null не проходит указанное условие."
      },
      {
        id: "d",
        text: "[0, false]",
        explanation: "Условие x != null исключает только null и undefined в этом наборе."
      }
    ],
    correctOptionId: "d",
    visual: {
      motif: "transformation"
    }
  },
  {
    id: "fe-1.5-quiz-find-distinction",
    type: "quiz",
    readMoreUrl: feSection1_5ReadMoreUrls.q14,
    question: `## Как найти значение undefined, отличив совпадение от отсутствия результата?`,
    options: [
      {
        id: "a",
        text: "findIndex и проверка на -1",
        explanation: "findIndex сообщает позицию совпадения либо -1."
      },
      {
        id: "b",
        text: "find и проверка результата на undefined",
        explanation: "find возвращает undefined и при совпадении, и при его отсутствии."
      },
      {
        id: "c",
        text: "filter(Boolean) и первый элемент",
        explanation: "Boolean удаляет само искомое значение undefined."
      },
      {
        id: "d",
        text: "every(x => x === undefined)",
        explanation: "every проверяет все элементы, а не позицию первого совпадения."
      }
    ],
    correctOptionId: "a"
  },
  {
    id: "fe-1.5-quiz-every-empty",
    type: "quiz",
    readMoreUrl: feSection1_5ReadMoreUrls.q14,
    question: `## Что выведет код?

~~~js
console.log([].every(() =>
  false));
~~~`,
    options: [
      {
        id: "a",
        text: "false",
        explanation: "every на пустом массиве возвращает true."
      },
      {
        id: "b",
        text: "true",
        explanation: "В пустом наборе нет нарушителя. Callback не вызывается."
      },
      {
        id: "c",
        text: "undefined",
        explanation: "Метод возвращает boolean, а не значение callback."
      },
      {
        id: "d",
        text: "TypeError",
        explanation: "Пустой массив допустим для every."
      }
    ],
    correctOptionId: "b"
  },
  {
    id: "fe-1.5-quiz-some-empty",
    type: "quiz",
    readMoreUrl: feSection1_5ReadMoreUrls.q14,
    question: `## Что выведет код?

~~~js
console.log([].some(() => true));
~~~`,
    options: [
      {
        id: "a",
        text: "true",
        explanation: "Callback не вызывается, поэтому его тело не даёт совпадение."
      },
      {
        id: "b",
        text: "undefined",
        explanation: "some возвращает boolean."
      },
      {
        id: "c",
        text: "false",
        explanation: "В пустом массиве нет элемента, удовлетворяющего условию."
      },
      {
        id: "d",
        text: "TypeError",
        explanation: "Пустой массив не делает вызов ошибочным."
      }
    ],
    correctOptionId: "c"
  },
  {
    id: "fe-1.5-quiz-reduce-empty",
    type: "quiz",
    readMoreUrl: feSection1_5ReadMoreUrls.q15,
    question: `## Как завершится вызов?

~~~js
[].reduce((sum, x) => sum + x);
~~~`,
    options: [
      {
        id: "a",
        text: "0",
        explanation: "Нулевой аккумулятор нужно передать явно."
      },
      {
        id: "b",
        text: "undefined",
        explanation: "У этого вызова предусмотрен отказ, а не результат undefined."
      },
      {
        id: "c",
        text: "[]",
        explanation: "reduce не создаёт пустой массив автоматически."
      },
      {
        id: "d",
        text: "TypeError",
        explanation: "Нет ни initialValue, ни существующего первого элемента для аккумулятора."
      }
    ],
    correctOptionId: "d",
    visual: {
      motif: "transformation"
    }
  },
  {
    id: "fe-1.5-quiz-reduce-single",
    type: "quiz",
    readMoreUrl: feSection1_5ReadMoreUrls.q15,
    question: `## Что выведет код?

~~~js
let calls = 0;
const n = [7].reduce((a, b) => {
  calls++; return a + b;
});
console.log(n, calls);
~~~`,
    options: [
      {
        id: "a",
        text: "7 / 0",
        explanation: "Единственный элемент становится аккумулятором; callback не нужен."
      },
      {
        id: "b",
        text: "7 / 1",
        explanation: "Без initialValue первый элемент не передаётся в callback как очередной элемент."
      },
      {
        id: "c",
        text: "14 / 1",
        explanation: "Единственный элемент не складывается сам с собой."
      },
      {
        id: "d",
        text: "undefined / 0",
        explanation: "Результат reduce — найденный начальный аккумулятор 7."
      }
    ],
    correctOptionId: "a",
    visual: {
      motif: "transformation"
    }
  },
  {
    id: "fe-1.5-quiz-reduce-initial",
    type: "quiz",
    readMoreUrl: feSection1_5ReadMoreUrls.q15,
    question: `## Что выведет код?

~~~js
console.log([1, 2, 3].reduce(
  (sum, x) => sum + x, 10));
~~~`,
    options: [
      {
        id: "a",
        text: "6",
        explanation: "Переданное initialValue участвует в свёртке."
      },
      {
        id: "b",
        text: "16",
        explanation: "Начальный аккумулятор 10, затем прибавляются 1, 2 и 3."
      },
      {
        id: "c",
        text: "10",
        explanation: "Существующие элементы тоже обрабатываются."
      },
      {
        id: "d",
        text: "\"10123\"",
        explanation: "Аккумулятор и элементы — числа, строкового сложения нет."
      }
    ],
    correctOptionId: "b",
    visual: {
      motif: "transformation"
    }
  },
  {
    id: "fe-1.5-quiz-async-foreach-return",
    type: "quiz",
    readMoreUrl: feSection1_5ReadMoreUrls.q16,
    question: `## Что выведет код?

~~~js
const result =
  [1].forEach(async x => x * 2);
console.log(result);
~~~`,
    options: [
      {
        id: "a",
        text: "[2]",
        explanation: "Callback не превращает forEach в map."
      },
      {
        id: "b",
        text: "Promise",
        explanation: "Сам forEach не возвращает Promise."
      },
      {
        id: "c",
        text: "undefined",
        explanation: "forEach не использует Promise callback и возвращает undefined."
      },
      {
        id: "d",
        text: "[Promise]",
        explanation: "Массив Promise мог бы вернуть map(async ...), но не forEach."
      }
    ],
    correctOptionId: "c",
    visual: {
      motif: "transformation"
    }
  },
  {
    id: "fe-1.5-quiz-traversal-append",
    type: "quiz",
    readMoreUrl: feSection1_5ReadMoreUrls.q17,
    question: `## Что выведет код?

~~~js
const a = [1, 2];
let calls = 0;
a.forEach(() => { calls++;
  a.push(9); });
console.log(calls, a.length);
~~~`,
    options: [
      {
        id: "a",
        text: "4 / 4",
        explanation: "Добавленные за исходной границей элементы не посещаются."
      },
      {
        id: "b",
        text: "2 / 2",
        explanation: "Мутация происходит, хотя новые элементы не посещаются."
      },
      {
        id: "c",
        text: "RangeError",
        explanation: "Обход не бесконечный: начальная длина фиксируется."
      },
      {
        id: "d",
        text: "2 / 4",
        explanation: "forEach ограничен начальной длиной 2; два вызова добавляют два элемента."
      }
    ],
    correctOptionId: "d"
  },
  {
    id: "fe-1.5-quiz-traversal-delete",
    type: "quiz",
    readMoreUrl: feSection1_5ReadMoreUrls.q17,
    question: `## Что выведет код?

~~~js
const a = [1, 2, 3];
const seen = [];
a.forEach((x, i) => {
  seen.push(
    x); if (i === 0) delete a[2];
});
console.log(seen);
~~~`,
    options: [
      {
        id: "a",
        text: "[1, 2]",
        explanation: "К достижению индекса 2 свойства уже нет; callback пропускается."
      },
      {
        id: "b",
        text: "[1, 2, 3]",
        explanation: "Значения будущих индексов не снимались в копию заранее."
      },
      {
        id: "c",
        text: "[1, 2, undefined]",
        explanation: "forEach пропускает отсутствующее свойство, а не передаёт undefined."
      },
      {
        id: "d",
        text: "[1]",
        explanation: "Индекс 1 существует и тоже посещается."
      }
    ],
    correctOptionId: "a"
  },
  {
    id: "fe-1.5-quiz-sort-default",
    type: "quiz",
    readMoreUrl: feSection1_5ReadMoreUrls.q18,
    question: `## Что выведет код?

~~~js
console.log([2, 10].sort());
~~~`,
    options: [
      {
        id: "a",
        text: "[2, 10]",
        explanation: "Строковый порядок отличается от числового."
      },
      {
        id: "b",
        text: "[10, 2]",
        explanation: "Без comparator сравниваются строковые представления; сами числа остаются числами."
      },
      {
        id: "c",
        text: "[\"10\", \"2\"]",
        explanation: "Для сравнения используются строки, но элементы не заменяются строками."
      },
      {
        id: "d",
        text: "TypeError",
        explanation: "Числа можно сортировать и без comparator, но порядок будет строковым."
      }
    ],
    correctOptionId: "b",
    visual: {
      motif: "transformation"
    }
  },
  {
    id: "fe-1.5-quiz-sort-numeric",
    type: "quiz",
    readMoreUrl: feSection1_5ReadMoreUrls.q18,
    question: `## Что выведет код?

~~~js
console.log([10, 2, 7].toSorted(
  (a, b) => a - b));
~~~`,
    options: [
      {
        id: "a",
        text: "[10, 2, 7]",
        explanation: "Явный comparator заменяет сравнение строковых представлений."
      },
      {
        id: "b",
        text: "[10, 7, 2]",
        explanation: "Для убывания нужен противоположный знак."
      },
      {
        id: "c",
        text: "[2, 7, 10]",
        explanation: "Для конечных чисел знак a - b задаёт возрастающий числовой порядок."
      },
      {
        id: "d",
        text: "[\"2\", \"7\", \"10\"]",
        explanation: "Элементы не преобразуются в строки."
      }
    ],
    correctOptionId: "c",
    visual: {
      motif: "transformation"
    }
  },
  {
    id: "fe-1.5-quiz-comparator-boolean",
    type: "quiz",
    readMoreUrl: feSection1_5ReadMoreUrls.q19,
    question: `## Для чисел: \`(a, b) => a > b\`. Что верно?`,
    options: [
      {
        id: "a",
        text: "Эквивалентно a - b",
        explanation: "При a < b нужен минус, а false превращается в 0."
      },
      {
        id: "b",
        text: "Гарантирует убывание",
        explanation: "Возвращается 0 или 1; убывание не гарантировано."
      },
      {
        id: "c",
        text: "sort выбросит TypeError",
        explanation: "sort не проверяет согласованность comparator."
      },
      {
        id: "d",
        text: "Порядок не гарантирован",
        explanation: "Boolean даёт только 0 или 1 и нарушает согласованность сравнения."
      }
    ],
    correctOptionId: "d",
    visual: {
      motif: "transformation"
    }
  },
  {
    id: "fe-1.5-quiz-stable-order",
    type: "quiz",
    readMoreUrl: feSection1_5ReadMoreUrls.q19,
    question: `## Что выведет код?

~~~js
const a = [{ id: "a", n: 2 },
  { id: "b", n: 1 }, { id: "c",
    n: 2 }];
a.sort((x, y) => x.n - y.n);
console.log(a.map(x =>
  x.id).join(""));
~~~`,
    options: [
      {
        id: "a",
        text: "\"bac\"",
        explanation: "b идёт первым; равные по n элементы a и c сохраняют взаимный порядок."
      },
      {
        id: "b",
        text: "\"bca\"",
        explanation: "Стабильность сохраняет a перед c при равных ключах."
      },
      {
        id: "c",
        text: "\"abc\"",
        explanation: "Элемент b с меньшим n должен быть раньше a."
      },
      {
        id: "d",
        text: "\"cab\"",
        explanation: "Порядок не соответствует возрастающим значениям n."
      }
    ],
    correctOptionId: "a",
    visual: {
      motif: "transformation"
    }
  },
  {
    id: "fe-1.5-quiz-multi-field",
    type: "quiz",
    readMoreUrl: feSection1_5ReadMoreUrls.q19,
    question: `## Что выведет код?

~~~js
const a = [{ p: 1, n: 2 }, { p: 1,
  n: 1 }];
a.sort((x, y) => x.p - y.p ||
  x.n - y.n);
console.log(a.map(x => x.n));
~~~`,
    options: [
      {
        id: "a",
        text: "[2, 1]",
        explanation: "Равенство первого ключа не завершает сравнение: используется второй."
      },
      {
        id: "b",
        text: "[1, 2]",
        explanation: "При равном p разность равна 0, поэтому сравнивается второй ключ n."
      },
      {
        id: "c",
        text: "[0, 0]",
        explanation: "map возвращает n, а не результаты comparator."
      },
      {
        id: "d",
        text: "TypeError",
        explanation: "Логическое ИЛИ допустимо для числовых разностей этих конечных ключей."
      }
    ],
    correctOptionId: "b",
    visual: {
      motif: "transformation"
    }
  },
  {
    id: "fe-1.5-quiz-sort-hole-order",
    type: "quiz",
    readMoreUrl: feSection1_5ReadMoreUrls.q20,
    question: `## Что выведет код?

~~~js
const a = [, undefined, 2];
a.sort();
console.log(Object.hasOwn(a, 1));
console.log(Object.hasOwn(a, 2));
~~~`,
    options: [
      {
        id: "a",
        text: "false / true",
        explanation: "Пустые слоты оказываются после явных undefined."
      },
      {
        id: "b",
        text: "true / true",
        explanation: "sort сохраняет число пустых слотов, а не уплотняет результат."
      },
      {
        id: "c",
        text: "true / false",
        explanation: "После числа идёт собственное undefined, затем отсутствующий индекс."
      },
      {
        id: "d",
        text: "false / false",
        explanation: "Собственное свойство с undefined не исчезает."
      }
    ],
    correctOptionId: "c",
    visual: {
      motif: "transformation"
    }
  },
  {
    id: "fe-1.5-quiz-sorted-dense",
    type: "quiz",
    readMoreUrl: feSection1_5ReadMoreUrls.q20,
    question: `## Что выведет код?

~~~js
const a = [, 2].toSorted();
console.log(a, Object.hasOwn(a,
  1));
~~~`,
    options: [
      {
        id: "a",
        text: "[2, undefined] / false",
        explanation: "У результата есть собственное свойство с undefined."
      },
      {
        id: "b",
        text: "[undefined, 2] / true",
        explanation: "undefined помещается после определённых значений."
      },
      {
        id: "c",
        text: "[2] / false",
        explanation: "Длина результата сохраняется."
      },
      {
        id: "d",
        text: "[2, undefined] / true",
        explanation: "toSorted читает пустую позицию как undefined и создаёт плотный массив."
      }
    ],
    correctOptionId: "d",
    visual: {
      motif: "transformation"
    }
  },
  {
    id: "fe-1.5-quiz-destructure-default",
    type: "quiz",
    readMoreUrl: feSection1_5ReadMoreUrls.q21,
    question: `## Что выведет код?

~~~js
const [a = 7, b = 7] = [, null];
console.log(a, b);
~~~`,
    options: [
      {
        id: "a",
        text: "7 / null",
        explanation: "Пустой слот даёт undefined и включает default. null остаётся значением."
      },
      {
        id: "b",
        text: "7 / 7",
        explanation: "Default не заменяет null."
      },
      {
        id: "c",
        text: "undefined / null",
        explanation: "Полученный undefined включает значение по умолчанию 7."
      },
      {
        id: "d",
        text: "null / 7",
        explanation: "Первое значение не превращается в null, а второе не включает default."
      }
    ],
    correctOptionId: "a"
  },
  {
    id: "fe-1.5-quiz-rest-dense",
    type: "quiz",
    readMoreUrl: feSection1_5ReadMoreUrls.q21,
    question: `## Что выведет код?

~~~js
const [first, ...rest] = [1, , 3];
console.log(rest.length,
  Object.hasOwn(rest, 0));
~~~`,
    options: [
      {
        id: "a",
        text: "2 / false",
        explanation: "Rest массива не сохраняет отсутствие индексного свойства."
      },
      {
        id: "b",
        text: "2 / true",
        explanation: "Rest собирает два оставшихся значения; пустой слот читается как undefined."
      },
      {
        id: "c",
        text: "1 / true",
        explanation: "Пустая позиция тоже даёт значение при итерации."
      },
      {
        id: "d",
        text: "3 / true",
        explanation: "Первый элемент уже извлечён отдельно."
      }
    ],
    correctOptionId: "b"
  },
  {
    id: "fe-1.5-quiz-object-spread-array",
    type: "quiz",
    readMoreUrl: feSection1_5ReadMoreUrls.q22,
    question: `## Что выведет код?

~~~js
const a = ["a", , "c"];
console.log(
  Object.keys(
  { ...a }).join(","));
~~~`,
    options: [
      {
        id: "a",
        text: "\"0,1,2\"",
        explanation: "Встроенная итерация здесь не используется."
      },
      {
        id: "b",
        text: "\"a,c\"",
        explanation: "Object.keys возвращает ключи, а не значения."
      },
      {
        id: "c",
        text: "\"0,2\"",
        explanation: "Object spread переносит собственные перечисляемые свойства; индекса 1 нет."
      },
      {
        id: "d",
        text: "\"length,0,2\"",
        explanation: "length у массива неперечислим и не переносится через object spread."
      }
    ],
    correctOptionId: "c",
    visual: {
      motif: "transformation"
    }
  },
  {
    id: "fe-1.5-quiz-spread-getter",
    type: "quiz",
    readMoreUrl: feSection1_5ReadMoreUrls.q23,
    question: `## Что выведет код?

~~~js
let reads = 0;
const a =
  { get n() { return ++reads; } };
const b = { ...a };
console.log(b.n, b.n, reads);
~~~`,
    options: [
      {
        id: "a",
        text: "1 / 2 / 2",
        explanation: "Accessor не переносится как живая функция getter."
      },
      {
        id: "b",
        text: "0 / 0 / 0",
        explanation: "Копирование перечисляемого свойства читает его значение."
      },
      {
        id: "c",
        text: "undefined / undefined / 0",
        explanation: "Значение свойства переносится после вызова getter."
      },
      {
        id: "d",
        text: "1 / 1 / 1",
        explanation: "Getter источника считан один раз; в копии обычное свойство данных."
      }
    ],
    correctOptionId: "d",
    visual: {
      motif: "transformation"
    }
  },
  {
    id: "fe-1.5-quiz-assign-target-setter",
    type: "quiz",
    readMoreUrl: feSection1_5ReadMoreUrls.q23,
    question: `## Что выведет код?

~~~js
let hits = 0;
const t = { set n(v) { hits++;
  } };
Object.assign(t, { n: 7 });
console.log(hits);
~~~`,
    options: [
      {
        id: "a",
        text: "1",
        explanation: "Object.assign выполняет обычную запись в цель, вызывая setter."
      },
      {
        id: "b",
        text: "0",
        explanation: "Прямое определение свойства характерно для object spread, а не assign."
      },
      {
        id: "c",
        text: "7",
        explanation: "hits считает вызовы, а не принимает присвоенное значение."
      },
      {
        id: "d",
        text: "TypeError",
        explanation: "Наличие setter делает такую запись допустимой."
      }
    ],
    correctOptionId: "a",
    visual: {
      motif: "transformation"
    }
  },
  {
    id: "fe-1.5-quiz-shallow-identity",
    type: "quiz",
    readMoreUrl: feSection1_5ReadMoreUrls.q24,
    question: `## Что выведет код?

~~~js
const a = [{ n: 1 }];
const b = [...a];
console.log(a === b,
  a[0] === b[0]);
~~~`,
    options: [
      {
        id: "a",
        text: "false / false",
        explanation: "Spread не клонирует вложенные объекты."
      },
      {
        id: "b",
        text: "false / true",
        explanation: "Внешний массив новый, вложенный объект общий."
      },
      {
        id: "c",
        text: "true / true",
        explanation: "Новый литерал массива создаёт другую внешнюю идентичность."
      },
      {
        id: "d",
        text: "true / false",
        explanation: "Контейнеры различаются, а объект внутри общий."
      }
    ],
    correctOptionId: "b",
    visual: {
      motif: "sharing"
    }
  },
  {
    id: "fe-1.5-quiz-sharing-update",
    type: "quiz",
    readMoreUrl: feSection1_5ReadMoreUrls.q25,
    question: `## Что выведет код?

~~~js
const a = { x: { n: 1 }, y: {} };
const b = { ...a, x: { ...a.x,
  n: 2 } };
console.log(a.x === b.x,
  a.y === b.y);
~~~`,
    options: [
      {
        id: "a",
        text: "false / false",
        explanation: "Неизменившуюся y не копировали."
      },
      {
        id: "b",
        text: "true / true",
        explanation: "Для x создан новый объект с изменённым n."
      },
      {
        id: "c",
        text: "false / true",
        explanation: "Путь x скопирован, ветвь y намеренно разделяется."
      },
      {
        id: "d",
        text: "true / false",
        explanation: "Изменённый путь новый, неизменённая ветвь общая."
      }
    ],
    correctOptionId: "c",
    visual: {
      motif: "sharing"
    }
  },
  {
    id: "fe-1.5-quiz-clone-cycle",
    type: "quiz",
    readMoreUrl: feSection1_5ReadMoreUrls.q28,
    question: `## Что выведет код?

~~~js
const a = {};
a.self = a;
const b = structuredClone(a);
console.log(b !== a,
  b.self === b);
~~~`,
    options: [
      {
        id: "a",
        text: "true / false",
        explanation: "Ссылка self должна указывать на новый корень."
      },
      {
        id: "b",
        text: "false / true",
        explanation: "Клон не является исходным объектом."
      },
      {
        id: "c",
        text: "DataCloneError",
        explanation: "Циклы обычных данных поддерживаются structuredClone."
      },
      {
        id: "d",
        text: "true / true",
        explanation: "Создаётся новый объект, а цикл восстанавливается внутри нового графа."
      }
    ],
    correctOptionId: "d",
    visual: {
      motif: "transformation"
    }
  },
  {
    id: "fe-1.5-quiz-clone-aliases",
    type: "quiz",
    readMoreUrl: feSection1_5ReadMoreUrls.q28,
    question: `## Что выведет код?

~~~js
const x = {};
const a = { first: x, second: x };
const b = structuredClone(a);
console.log(b.first === b.second,
  b.first === x);
~~~`,
    options: [
      {
        id: "a",
        text: "true / false",
        explanation: "Внутри клона повторная ссылка сохраняется, но новый узел отделён от исходного."
      },
      {
        id: "b",
        text: "false / false",
        explanation: "Один исходный объект не превращается в два независимых узла клона."
      },
      {
        id: "c",
        text: "true / true",
        explanation: "Клон не разделяет этот обычный объект с исходником."
      },
      {
        id: "d",
        text: "false / true",
        explanation: "Внутри нового графа ссылка общая, с исходником — разная."
      }
    ],
    correctOptionId: "a",
    visual: {
      motif: "transformation"
    }
  },
  {
    id: "fe-1.5-quiz-clone-class",
    type: "quiz",
    readMoreUrl: feSection1_5ReadMoreUrls.q29,
    question: `## Что выведет код?

~~~js
class User { greet(
  ) { return "hi"; } }
const b =
  structuredClone(new User());
console.log(typeof b.greet);
~~~`,
    options: [
      {
        id: "a",
        text: "\"function\"",
        explanation: "structuredClone переносит данные, а не пользовательский прототип с методом."
      },
      {
        id: "b",
        text: "\"undefined\"",
        explanation: "Метод пользовательского прототипа не восстанавливается; typeof даёт строку."
      },
      {
        id: "c",
        text: "undefined",
        explanation: "Результат typeof — строка \"undefined\", а не значение undefined."
      },
      {
        id: "d",
        text: "DataCloneError",
        explanation: "Метод на прототипе этого экземпляра не является клонируемым собственным значением."
      }
    ],
    correctOptionId: "b",
    visual: {
      motif: "transformation"
    }
  },
  {
    id: "fe-1.5-quiz-transfer-detach",
    type: "quiz",
    readMoreUrl: feSection1_5ReadMoreUrls.q30,
    question: `## Что выведет код?

~~~js
const a = new ArrayBuffer(8);
const b = structuredClone(a,
  { transfer: [a] });
console.log(a.byteLength,
  b.byteLength);
~~~`,
    options: [
      {
        id: "a",
        text: "8 / 8",
        explanation: "Это был бы результат копирования без transfer."
      },
      {
        id: "b",
        text: "0 / 0",
        explanation: "Данные остаются доступны через новый буфер."
      },
      {
        id: "c",
        text: "0 / 8",
        explanation: "Ресурс перенесён: исходный буфер отсоединён, новый сохраняет 8 байт."
      },
      {
        id: "d",
        text: "DataCloneError",
        explanation: "ArrayBuffer поддерживает перенос."
      }
    ],
    correctOptionId: "c",
    visual: {
      motif: "transformation"
    }
  },
  {
    id: "fe-1.5-quiz-json-null",
    type: "quiz",
    readMoreUrl: feSection1_5ReadMoreUrls.q31,
    question: `## Что выведет код?

~~~js
const a = [undefined, NaN];
console.log(
  JSON.parse(JSON.stringify(a)));
~~~`,
    options: [
      {
        id: "a",
        text: "[undefined, NaN]",
        explanation: "JSON не сохраняет эти значения как JavaScript-специальные значения."
      },
      {
        id: "b",
        text: "[]",
        explanation: "Позиции массива сохраняются, а не пропускаются."
      },
      {
        id: "c",
        text: "TypeError",
        explanation: "Эти значения в массиве не вызывают TypeError при stringify."
      },
      {
        id: "d",
        text: "[null, null]",
        explanation: "В массиве undefined и нечисловое значение NaN сериализуются как null."
      }
    ],
    correctOptionId: "d",
    visual: {
      motif: "transformation"
    }
  },
  {
    id: "fe-1.5-quiz-json-cycle",
    type: "quiz",
    readMoreUrl: feSection1_5ReadMoreUrls.q31,
    question: `## Как завершится код?

~~~js
const a = {};
a.self = a;
JSON.stringify(a);
~~~`,
    options: [
      {
        id: "a",
        text: "TypeError",
        explanation: "Циклический граф не представим обычным JSON.stringify без отдельного преобразования."
      },
      {
        id: "b",
        text: "\"{}\"",
        explanation: "Свойство self не пропускается автоматически."
      },
      {
        id: "c",
        text: "undefined",
        explanation: "Цикл вызывает исключение, а не такой результат."
      },
      {
        id: "d",
        text: "DataCloneError",
        explanation: "DataCloneError относится к structuredClone; здесь ошибка JSON — TypeError."
      }
    ],
    correctOptionId: "a",
    visual: {
      motif: "transformation"
    }
  },
  {
    id: "fe-1.5-quiz-clone-function",
    type: "quiz",
    readMoreUrl: feSection1_5ReadMoreUrls.q29,
    question: `## Как завершится вызов?

~~~js
structuredClone({ run: () => 1 });
~~~`,
    options: [
      {
        id: "a",
        text: "{}",
        explanation: "Функция не пропускается молча, как при JSON-сериализации свойства."
      },
      {
        id: "b",
        text: "DataCloneError",
        explanation: "Собственное значение-функция не поддерживается structuredClone."
      },
      {
        id: "c",
        text: "undefined",
        explanation: "Операция завершается исключением, а не undefined."
      },
      {
        id: "d",
        text: "TypeError",
        explanation: "Предусмотренная категория ошибки клонирования — DataCloneError."
      }
    ],
    correctOptionId: "b",
    visual: {
      motif: "transformation"
    }
  },
  {
    id: "fe-1.5-quiz-json-aliases",
    type: "quiz",
    readMoreUrl: feSection1_5ReadMoreUrls.q31,
    question: `## Что выведет код?

~~~js
const x = {};
const a = { first: x, second: x };
const b =
  JSON.parse(JSON.stringify(a));
console.log(b.first === b.second);
~~~`,
    options: [
      {
        id: "a",
        text: "true",
        explanation: "JSON не кодирует идентичность общей ссылки."
      },
      {
        id: "b",
        text: "undefined",
        explanation: "Сравнение идентичности возвращает boolean."
      },
      {
        id: "c",
        text: "false",
        explanation: "Два JSON-представления разобраны в два независимых объекта."
      },
      {
        id: "d",
        text: "TypeError",
        explanation: "Здесь нет цикла: повторная ссылка сама по себе допустима для JSON."
      }
    ],
    correctOptionId: "c",
    visual: {
      motif: "transformation"
    }
  },
  {
    id: "fe-1.5-quiz-clone-regexp",
    type: "quiz",
    readMoreUrl: feSection1_5ReadMoreUrls.q29,
    question: `## Что выведет код?

~~~js
const a = /x/g;
a.lastIndex = 4;
const b = structuredClone(a);
console.log(b.lastIndex);
~~~`,
    options: [
      {
        id: "a",
        text: "4",
        explanation: "Состояние lastIndex не входит в сохраняемые данные RegExp."
      },
      {
        id: "b",
        text: "undefined",
        explanation: "У нового RegExp существует lastIndex."
      },
      {
        id: "c",
        text: "DataCloneError",
        explanation: "Сам тип RegExp поддерживается алгоритмом."
      },
      {
        id: "d",
        text: "0",
        explanation: "RegExp поддерживается, но его lastIndex не сохраняется и начинается с 0."
      }
    ],
    correctOptionId: "d",
    visual: {
      motif: "transformation"
    }
  }
];
