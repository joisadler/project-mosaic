import type { InfoCardData } from "./card-types";
import { feSection1_5ReadMoreUrls } from "./fe-1.5-source-urls";

// MOS-41: owner-approved subsection 1.5 coverage and presentation.
export const feSection1_5InfoCards: InfoCardData[] = [
  {
    id: "fe-1.5-info-holes-copying",
    type: "info",
    readMoreUrl: feSection1_5ReadMoreUrls.q5,
    pages: [
      `## Пустой слот — не значение

Пустой слот (hole) означает отсутствие собственного индексного свойства. Чтение даёт \`undefined\`, как у существующего свойства с таким значением. Но методы обхода ведут себя по-разному.`,
      `## Копия может изменить структуру

~~~js
const a = [1, , 3];
const b = a.slice();
const c = [...a];
console.log(Object.hasOwn(b, 1));
console.log(Object.hasOwn(c, 1));
~~~
Результат: \`false; true\`.`,
      `## Проверяйте конкретный метод

\`slice\` сохраняет пустой слот. Встроенная итерация массива при spread читает его как \`undefined\` и создаёт собственное свойство. Новый контейнер сам по себе не обещает сохранить разреженность.`
    ]
  },
  {
    id: "fe-1.5-info-array-brand",
    type: "info",
    readMoreUrl: feSection1_5ReadMoreUrls.q1,
    pages: [
      `## Проверяйте вид объекта

\`typeof []\` даёт строку \`"object"\`. Проверка \`Array.isArray\` отличает настоящий массив от обычного объекта и типизированного массива (TypedArray).`,
      `## Проверим на примере

~~~js
console.log(Array.isArray([]));
console.log(
  Array.isArray(
  new Uint8Array(2)));
console.log(Array.isArray({
  __proto__: Array.prototype
}));
~~~
Результат: \`true; false; false\`.`,
      `## Что из этого следует

\`instanceof Array\` зависит от среды выполнения (realm). Массив из iframe может не иметь локальный Array.prototype в цепочке. Array.isArray не требует совпадения этих прототипов.`,
      `## Другой realm

~~~js
const f =
  document.createElement(
  "iframe");
document.body.append(f);
const A = f.contentWindow.Array;
const a = new A();
console.log(Array.isArray(a));
console.log(a instanceof Array);
f.remove();
~~~
Результат: \`true; false\`.`
    ]
  },
  {
    id: "fe-1.5-info-length-boundary",
    type: "info",
    readMoreUrl: feSection1_5ReadMoreUrls.q2,
    pages: [
      `## length — граница, не счётчик

Запись по индексу за границей увеличивает \`length\`, но не создаёт промежуточные свойства. Увеличение длины тоже оставляет пустые слоты.`,
      `## Проверим на примере

~~~js
const a = ["a", "b", "c"];
a.length = 5;
console.log(Object.hasOwn(a, 3));
a.length = 1;
console.log(a.length,
  Object.hasOwn(a, 1));
~~~
Результат: \`false; 1, false\`.`,
      `## Что из этого следует

Уменьшение length удаляет собственные индексные свойства справа. После удаления всех элементов могут остаться обычные строковые свойства массива.`
    ]
  },
  {
    id: "fe-1.5-info-non-index-keys",
    type: "info",
    readMoreUrl: feSection1_5ReadMoreUrls.q2,
    pages: [
      `## Не каждый ключ — индекс

Отрицательные числа, дроби и строка \`"01"\` становятся обычными ключами. Они не расширяют массив. Индекс массива — каноническая строка целого от 0 до 2³² − 2.`,
      `## Проверим на примере

~~~js
const a = [];
a[-1] = "left";
a["01"] = "padded";
a[1.5] = "fraction";
console.log(a.length);
console.log(
  Object.keys(a).length);
~~~
Результат: \`0; 3\`.`,
      `## Что из этого следует

Свойство с ключом "4294967295" тоже не является индексом массива. Не используйте length как число всех свойств: Object.keys может вернуть ещё и обычные перечисляемые ключи.`
    ]
  },
  {
    id: "fe-1.5-info-length-failure",
    type: "info",
    readMoreUrl: feSection1_5ReadMoreUrls.q7,
    pages: [
      `## Сокращение бывает частичным

Если справа есть неконфигурируемое индексное свойство, присваивание меньшего length не может удалить его. В strict mode такое присваивание вызывает TypeError; более правые свойства уже могли удалиться.`,
      `## Проверим на примере

~~~js
const a = [0, 1, 2, 3];
Object.defineProperty(a, "2", {
  configurable: false
});
console.log(Reflect.set(a,
  "length", 0));
console.log(a.length,
  Object.hasOwn(a, 3));
~~~
Результат: \`false; 3, false\`.`,
      `## Что из этого следует

Reflect.set возвращает false вместо исключения при отказе такой записи. Здесь индекс 3 удалён, индекс 2 сохранён, а length восстановлен до 3. Ошибка записи не обещает откат.`
    ]
  },
  {
    id: "fe-1.5-info-own-hole",
    type: "info",
    readMoreUrl: feSection1_5ReadMoreUrls.q3,
    pages: [
      `## Чтение не доказывает наличие

В \`[undefined]\` свойство с индексом 0 существует. В \`[,]\` собственного свойства 0 нет. Оба чтения обычно дают undefined, но это разные структуры.`,
      `## Проверим на примере

~~~js
const a = [,];
const b = [undefined];
console.log(a[0] === b[0]);
console.log(Object.hasOwn(a, 0));
console.log(Object.hasOwn(b, 0));
~~~
Результат: \`true; false; true\`.`,
      `## Что из этого следует

Object.hasOwn проверяет собственное наличие. Оператор in смотрит также по цепочке прототипов. Пустой собственный слот не гарантирует undefined при чтении, если по этому индексу есть унаследованное свойство.`
    ]
  },
  {
    id: "fe-1.5-info-delete-sequence",
    type: "info",
    readMoreUrl: feSection1_5ReadMoreUrls.q4,
    pages: [
      `## Удалить свойство или позицию?

\`delete a[i]\` удаляет свойство, сохраняя длину и соседние индексы. \`splice(i, 1)\` удаляет позицию последовательности и сдвигает оставшиеся элементы.`,
      `## Проверим на примере

~~~js
const a = ["a", "b", "c"];
delete a[1];
const b = ["a", "b", "c"];
const removed = b.splice(1, 1);
console.log(a.length, b.length);
console.log(removed);
~~~
Результат: \`3, 2; ["b"]\`.`,
      `## Что из этого следует

Для нового массива без изменения входа используйте toSpliced. Он возвращает итоговую последовательность. Обычный splice возвращает массив удалённых элементов, а не обновлённый вход.`
    ],
    visual: {
      motif: "transformation"
    }
  },
  {
    id: "fe-1.5-info-traversal-holes",
    type: "info",
    readMoreUrl: feSection1_5ReadMoreUrls.q5,
    pages: [
      `## Нет единого правила пустот

map, filter, forEach, some, every и reduce проверяют наличие индекса. Без унаследованных индексных свойств они пропускают пустые слоты. find и findIndex читают и такие позиции.`,
      `## Проверим на примере

~~~js
const a = [1, , 3];
let count = 0;
const b = a.map(x => { count++;
  return x; });
console.log(count, b.length);
console.log(Object.hasOwn(b, 1));
console.log(a.filter(() => true));
~~~
Результат: \`2, 3; false; [1, 3]\`.`,
      `## Что из этого следует

map сохраняет позиции пропущенных слотов. filter собирает выбранные существующие элементы подряд. Если прототип содержит индексное свойство, методы с проверкой наличия могут увидеть и его.`
    ]
  },
  {
    id: "fe-1.5-info-copy-dense",
    type: "info",
    readMoreUrl: feSection1_5ReadMoreUrls.q6,
    pages: [
      `## Копирующие методы уплотняют

toSorted, toSpliced, toReversed и with создают новый плотный массив. Сохранённые пустые позиции читаются как undefined, а не переносятся как отсутствующие свойства.`,
      `## Проверим на примере

~~~js
const a = [, 1, ,];
const b = a.with(1, 7);
console.log(b);
console.log(Object.hasOwn(b, 0));
console.log(Object.hasOwn(a, 0));
~~~
Результат: \`[undefined, 7, undefined]; true; false\`.`,
      `## Что из этого следует

Это изменение структуры результата, а не исправление исходника. Если разреженность значима, проверяйте собственное наличие и длину, а не внешний вид массива в консоли.`
    ],
    visual: {
      motif: "transformation"
    }
  },
  {
    id: "fe-1.5-info-mutator-returns",
    type: "info",
    readMoreUrl: feSection1_5ReadMoreUrls.q8,
    pages: [
      `## Проверяйте вход и результат

push и unshift возвращают новую длину. pop и shift — удалённый элемент или undefined у пустого массива. splice — новый массив удалённых значений.`,
      `## Проверим на примере

~~~js
const a = [2, 1];
console.log(a.push(3));
console.log(a.reverse() === a);
console.log(a.pop());
~~~
Результат: \`3; true; 2\`.`,
      `## Что из этого следует

sort, reverse, fill и copyWithin возвращают тот же массив. Цепочка вызовов может выглядеть как преобразование, хотя исходный контейнер уже изменён.`
    ]
  },
  {
    id: "fe-1.5-info-fill-alias",
    type: "info",
    readMoreUrl: feSection1_5ReadMoreUrls.q8,
    pages: [
      `## fill не клонирует значение

fill(value) записывает одно переданное значение во все выбранные позиции. Если это объект, позиции получают одну общую ссылку.`,
      `## Проверим на примере

~~~js
const a =
  new Array(2).fill({ n: 0 });
a[0].n = 7;
console.log(a[1].n);
console.log(a[0] === a[1]);
~~~
Результат: \`7; true\`.`,
      `## Что из этого следует

Для отдельных объектов создавайте их отдельно, например через Array.from({ length: 2 }, () => ({ n: 0 })). copyWithin тоже копирует значения поверхностно внутри того же массива, сохраняя его длину.`
    ],
    visual: {
      motif: "sharing"
    }
  },
  {
    id: "fe-1.5-info-slice-splice",
    type: "info",
    readMoreUrl: feSection1_5ReadMoreUrls.q9,
    pages: [
      `## slice и splice возвращают разное

slice(start, end) копирует диапазон без изменения входа; end не включён. splice(start, count, ...items) меняет вход и возвращает удалённые значения.`,
      `## Проверим на примере

~~~js
const a = ["a", "b", "c", "d"];
console.log(a.slice(1, 3));
console.log(a.splice(1, 2, "x"));
console.log(a);
~~~
Результат: \`["b", "c"]; ["b", "c"]; ["a", "x", "d"]\`.`,
      `## Что из этого следует

toSpliced — копирующий вариант изменения последовательности, но возвращает итоговый массив. Не переносите на него ожидание «массив удалённых», знакомое по splice.`
    ],
    visual: {
      motif: "transformation"
    }
  },
  {
    id: "fe-1.5-info-mutation-ownership",
    type: "info",
    readMoreUrl: feSection1_5ReadMoreUrls.q10,
    pages: [
      `## Мутация зависит от владения

Функция, получившая чужой массив, должна выполнять обещанный контракт. Случайный sort меняет порядок и у вызывающего кода. Но мутация свежего локального результата может быть нормальным решением.`,
      `## Проверим на примере

~~~js
const input = [3, 1, 2];
const result = input.filter(x =>
  x > 1);
result.sort((a, b) => a - b);
console.log(input);
console.log(result);
~~~
Результат: \`[3, 1, 2]; [2, 3]\`.`,
      `## Что из этого следует

Неизменяемый вход не запрещает локальный push или sort нового контейнера. Проверьте также элементы: новый массив с прежними объектами ещё не защищает их вложенные свойства.`
    ],
    visual: {
      motif: "transformation"
    }
  },
  {
    id: "fe-1.5-info-copy-api",
    type: "info",
    readMoreUrl: feSection1_5ReadMoreUrls.q11,
    pages: [
      `## Новый массив — явное намерение

slice копирует диапазон, concat соединяет массивы, Array.from материализует значения и может сразу преобразовать их. Все эти операции поверхностны.`,
      `## Проверим на примере

~~~js
const a = [1, 2, 3];
console.log(a.with(-1, 9));
console.log(a);
~~~
Результат: \`[1, 2, 9]; [1, 2, 3]\`.`,
      `## Что из этого следует

with заменяет существующую позицию в копии. Отрицательный индекс отсчитывается с конца, а выход за границу вызывает RangeError. Метод не расширяет массив.`
    ],
    visual: {
      motif: "transformation"
    }
  },
  {
    id: "fe-1.5-info-method-result",
    type: "info",
    readMoreUrl: feSection1_5ReadMoreUrls.q12,
    pages: [
      `## Выбирайте форму результата

На каждый элемент нужен результат — map. Нужно подмножество — filter. Нужен первый подходящий элемент — find. Нужны ответы «есть хотя бы один?» и «все?» — some и every.`,
      `## Что из этого следует

Для эффекта используйте forEach; он возвращает undefined. Для свёртки — reduce с ясным аккумулятором. Цикл удобнее, если нужны ранний выход или несколько связанных состояний.`
    ]
  },
  {
    id: "fe-1.5-info-map-return",
    type: "info",
    readMoreUrl: feSection1_5ReadMoreUrls.q13,
    pages: [
      `## map использует return

map собирает возвращённые значения callback. Тело стрелочной функции в фигурных скобках требует явного return; само выражение внутри блока не становится результатом.`,
      `## Проверим на примере

~~~js
const a = [1, 2].map(x => { x * 2;
  });
const b = [1, 2].map(x => x * 2);
console.log(a);
console.log(b);
~~~
Результат: \`[undefined, undefined]; [2, 4]\`.`,
      `## Что из этого следует

forEach игнорирует возвращённые значения и сам возвращает undefined. map ради эффекта создаёт ненужный массив; forEach ради новой коллекции не даёт нужного результата.`
    ],
    visual: {
      motif: "transformation"
    }
  },
  {
    id: "fe-1.5-info-callback-arguments",
    type: "info",
    readMoreUrl: feSection1_5ReadMoreUrls.q12,
    pages: [
      `## Callback получает больше значения

map, filter, find, some, every и forEach передают callback три аргумента: value, index, array. Совместимость функции проверяется по всему договору вызова.`,
      `## Проверим на примере

~~~js
const a = ["10", "10", "10"];
console.log(a.map(x => parseInt(x,
  10)));
~~~
Результат: \`[10, 10, 10]\`.`,
      `## Что из этого следует

Не передавайте произвольную функцию только потому, что она принимает значение первым аргументом. Адаптер x => parseInt(x, 10) явно задаёт основание и не принимает индекс за второй параметр parseInt.`
    ],
    visual: {
      motif: "transformation"
    }
  },
  {
    id: "fe-1.5-info-filter-falsy",
    type: "info",
    readMoreUrl: feSection1_5ReadMoreUrls.q14,
    pages: [
      `## filter(Boolean) удаляет не только пустое

Boolean отвергает все ложные значения (falsy values): в том числе 0, false и пустую строку. Такой фильтр может незаметно удалить допустимые данные.`,
      `## Проверим на примере

~~~js
const a = [0, false, "", null,
  undefined];
console.log(a.filter(x =>
  x != null));
~~~
Результат: \`[0, false, ""]\`.`,
      `## Что из этого следует

Если нужно удалить только null и undefined, укажите это в предикате (predicate). Слово «пустое» в бизнес-требовании недостаточно: перечислите значения, которые действительно надо исключить.`
    ],
    visual: {
      motif: "transformation"
    }
  },
  {
    id: "fe-1.5-info-find-absence",
    type: "info",
    readMoreUrl: feSection1_5ReadMoreUrls.q14,
    pages: [
      `## undefined не всегда означает провал

find возвращает undefined и при отсутствии совпадения, и когда найдено само значение undefined. Пустой слот тоже может быть прочитан как undefined.`,
      `## Проверим на примере

~~~js
const a = [undefined];
console.log(a.find(x =>
  x === undefined));
console.log(a.findIndex(x =>
  x === undefined));
console.log([].findIndex(() =>
  true));
~~~
Результат: \`undefined; 0; -1\`.`,
      `## Что из этого следует

Если важно различать наличие совпадения, используйте findIndex и проверку индекса на -1. Для поиска именно собственного свойства добавьте Object.hasOwn к условию.`
    ]
  },
  {
    id: "fe-1.5-info-empty-quantifiers",
    type: "info",
    readMoreUrl: feSection1_5ReadMoreUrls.q14,
    pages: [
      `## Пустое every истинно

some ищет подходящий элемент; в пустом массиве его нет. every ищет нарушителя; в пустом массиве его тоже нет. Поэтому результаты — false и true соответственно.`,
      `## Проверим на примере

~~~js
console.log([].some(() => true));
console.log([].every(() =>
  false));
console.log(
  new Array(2).every(() =>
  false));
~~~
Результат: \`false; true; true\`.`,
      `## Что из этого следует

Если требование звучит «есть элементы, и все валидны», проверьте непустоту отдельно. На разреженном массиве эти методы без унаследованных индексных свойств не вызывают callback для пустых слотов.`
    ]
  },
  {
    id: "fe-1.5-info-reduce-seed",
    type: "info",
    readMoreUrl: feSection1_5ReadMoreUrls.q15,
    pages: [
      `## Задайте начальный аккумулятор

С initialValue тип и форма аккумулятора заданы явно. Без него reduce берёт первый существующий элемент и начинает callback со следующего.`,
      `## Проверим на примере

~~~js
console.log([].reduce((sum,
  x) => sum + x, 0));
let calls = 0;
const result = [7].reduce((a,
  b) => {
  calls++; return a + b;
});
console.log(result, calls);
~~~
Результат: \`0; 7, 0\`.`,
      `## Что из этого следует

Пустой массив или массив только с пустыми слотами без initialValue вызывает TypeError. Начальное значение делает пустой случай предсказуемым; оно не заменяет проверку корректности самих элементов.`
    ],
    visual: {
      motif: "transformation"
    }
  },
  {
    id: "fe-1.5-info-foreach-async",
    type: "info",
    readMoreUrl: feSection1_5ReadMoreUrls.q16,
    pages: [
      `## forEach не ожидает Promise

async callback возвращает Promise. forEach вызывает его как обычную функцию, игнорирует возвращённое значение и не собирает завершения работы.`,
      `## Проверим на примере

~~~js
const result =
  [1].forEach(async x => x * 2);
console.log(result);
~~~
Результат: \`undefined\`.`,
      `## Что из этого следует

map(async ...) возвращает массив Promise, а не готовых значений. Ожидание, последовательность и обработка ошибок требуют отдельной координации; это материал 1.10–1.11.`
    ],
    visual: {
      motif: "transformation"
    }
  },
  {
    id: "fe-1.5-info-traversal-mutation",
    type: "info",
    readMoreUrl: feSection1_5ReadMoreUrls.q17,
    pages: [
      `## Длина фиксируется, значения читаются позже

Методы вроде forEach и map запоминают исходную длину. Добавленный за этой границей элемент не посещается. Значение ещё не посещённого индекса читается при достижении позиции.`,
      `## Проверим на примере

~~~js
const a = [1, 2];
const seen = [];
a.forEach((x, i) => {
  seen.push(x);
  if (i === 0) { a.push(3);
    a[1] = 9; }
});
console.log(seen);
~~~
Результат: \`[1, 9]\`.`,
      `## Что из этого следует

Удаление будущего свойства может пропустить callback; сдвиг через shift меняет, какое значение окажется на следующем индексе. Избегайте изменения обходящейся коллекции без ясного контракта.`
    ]
  },
  {
    id: "fe-1.5-info-default-sort",
    type: "info",
    readMoreUrl: feSection1_5ReadMoreUrls.q18,
    pages: [
      `## По умолчанию порядок строковый

Без функции сравнения sort упорядочивает определённые значения по строковому представлению: число 10 может оказаться раньше 2. Сами элементы при этом не превращаются в строки.`,
      `## Проверим на примере

~~~js
console.log([2, 10, 1].sort());
console.log([2, 10,
  1].toSorted((a, b) => a - b));
~~~
Результат: \`[1, 10, 2]; [1, 2, 10]\`.`,
      `## Что из этого следует

Для конечных чисел задайте (a, b) => a - b. Политику для null, undefined и невалидных чисел определите отдельно. sort меняет вход; toSorted сохраняет исходный контейнер.`
    ],
    visual: {
      motif: "transformation"
    }
  },
  {
    id: "fe-1.5-info-comparator-contract",
    type: "info",
    readMoreUrl: feSection1_5ReadMoreUrls.q19,
    pages: [
      `## Важен знак, а не ровно −1

Функция сравнения (comparator) возвращает отрицательное число для «раньше», 0 для равенства по ключу и положительное для «позже». Boolean-компаратор не описывает оба направления.`,
      `## Проверим на примере

~~~js
const compare = (a, b) => a - b;
console.log(compare(2, 9) < 0);
console.log(compare(9, 2) > 0);
console.log(compare(2, 2));
~~~
Результат: \`true; true; 0\`.`,
      `## Что из этого следует

Сравнение должно быть согласованным: одинаковая пара даёт одинаковый результат; перестановка аргументов меняет знак; отношения транзитивны. Для некорректного comparator нет единственного переносимого порядка.`
    ],
    visual: {
      motif: "transformation"
    }
  },
  {
    id: "fe-1.5-info-stable-sort",
    type: "info",
    readMoreUrl: feSection1_5ReadMoreUrls.q19,
    pages: [
      `## Стабильность сохраняет равенство

При корректном сравнении элементы, равные по ключу, сохраняют взаимный порядок. Это гарантия стабильной сортировки (stable sort), а не обещание конкретного внутреннего алгоритма.`,
      `## Проверим на примере

~~~js
const a = [{ id: "a", n: 2 },
  { id: "b", n: 1 }, { id: "c",
    n: 2 }];
const b = a.toSorted((x,
  y) => x.n - y.n);
console.log(b.map(x =>
  x.id).join(""));
~~~
Результат: \`"bac"\`.`,
      `## Что из этого следует

При нескольких полях сначала сравните основной ключ, затем следующий при равенстве. Для строк с локалью используйте localeCompare или подходящий Intl.Collator. Конкретную сложность встроенного sort измеряют в целевой среде.`
    ],
    visual: {
      motif: "transformation"
    }
  },
  {
    id: "fe-1.5-info-sort-holes",
    type: "info",
    readMoreUrl: feSection1_5ReadMoreUrls.q20,
    pages: [
      `## Пустоты после undefined

sort помещает явные undefined после остальных значений, а пустые слоты — ещё правее. Callback сравнения не получает эти undefined. toSorted читает пустоты как undefined и даёт плотную копию.`,
      `## Проверим на примере

~~~js
const a = [, undefined, 2];
a.sort();
console.log(Object.hasOwn(a, 1));
console.log(Object.hasOwn(a, 2));
console.log(
  Object.hasOwn(a.toSorted(), 2));
~~~
Результат: \`true; false; true\`.`,
      `## Что из этого следует

Сравнивайте не только отображение в консоли, но и Object.hasOwn. toSorted копирует контейнер, а не объекты-элементы: сортировка копии не создаёт независимый вложенный граф.`
    ],
    visual: {
      motif: "transformation"
    }
  },
  {
    id: "fe-1.5-info-destructuring-default",
    type: "info",
    readMoreUrl: feSection1_5ReadMoreUrls.q21,
    pages: [
      `## Default срабатывает для undefined

Значение по умолчанию в деструктуризации (destructuring) применяется, если извлечено undefined: из отсутствующей позиции, пустого слота или явного значения. null остаётся null.`,
      `## Проверим на примере

~~~js
const [a = 7, b = 7, c = 7] = [,
  null, 0];
console.log(a, b, c);
~~~
Результат: \`7, null, 0\`.`,
      `## Что из этого следует

Это не проверка truthiness: 0, false и пустая строка тоже сохраняются. В объектной деструктуризации работают такие же defaults; переименование свойства не меняет правило.`
    ]
  },
  {
    id: "fe-1.5-info-rest-array",
    type: "info",
    readMoreUrl: feSection1_5ReadMoreUrls.q21,
    pages: [
      `## Rest собирает новый массив

Остаточный элемент (rest element) должен быть последним. Он собирает оставшиеся значения в новый массив. Пропуск позиции в шаблоне не означает удаление элемента исходника.`,
      `## Проверим на примере

~~~js
const a = [1, , 3];
const [first, ...rest] = a;
console.log(first, rest.length);
console.log(Object.hasOwn(rest,
  0));
~~~
Результат: \`1, 2; true\`.`,
      `## Что из этого следует

Rest в параметрах функции собирает аргументы, а rest в деструктуризации — оставшиеся элементы. Для массива встроенная итерация читает пустые слоты как undefined, поэтому собранный остаток плотный.`
    ]
  },
  {
    id: "fe-1.5-info-spread-context",
    type: "info",
    readMoreUrl: feSection1_5ReadMoreUrls.q22,
    pages: [
      `## Три контекста spread

В \`[...value]\` и \`fn(...value)\` разворот (spread) требует итерируемое значение (iterable). В \`{...value}\` копируются собственные перечисляемые свойства. Это разные операции.`,
      `## Проверим на примере

~~~js
const a = ["a", , "c"];
console.log(
  Object.keys({ ...a }));
console.log([...a].length);
~~~
Результат: \`["0", "2"]; 3\`.`,
      `## Что из этого следует

У массива пустой слот не является собственным свойством: object spread его пропустит. Поздний ключ перезаписывает ранний. Разворачивать огромный массив в аргументы рискованно: общего безопасного лимита для всех движков нет.`
    ],
    visual: {
      motif: "transformation"
    }
  },
  {
    id: "fe-1.5-info-assign-setter",
    type: "info",
    readMoreUrl: feSection1_5ReadMoreUrls.q23,
    pages: [
      `## Создание свойства и обычная запись

Object.assign(target, source) записывает значения в существующую цель и может вызвать её setter. Object spread создаёт собственные свойства данных нового объекта.`,
      `## Проверим на примере

~~~js
let hits = 0;
const target =
  { set n(v) { hits++; } };
Object.assign(target, { n: 7 });
const copy = { ...target, n: 8 };
console.log(hits, copy.n);
~~~
Результат: \`1, 8\`.`,
      `## Что из этого следует

Оба варианта читают собственные перечисляемые строковые и Symbol-ключи источника. Они поверхностны и не переносят исходные дескрипторы как дескрипторы.`
    ],
    visual: {
      motif: "transformation"
    }
  },
  {
    id: "fe-1.5-info-getter-copy",
    type: "info",
    readMoreUrl: feSection1_5ReadMoreUrls.q23,
    pages: [
      `## Копирование может выполнить код

И object spread, и Object.assign могут вызвать getter источника при чтении. В результате появляется обычное свойство со считанным значением, а не живой accessor.`,
      `## Проверим на примере

~~~js
let reads = 0;
const source =
  { get n() { return ++reads; } };
const copy = { ...source };
console.log(copy.n, copy.n,
  reads);
~~~
Результат: \`1, 1, 1\`.`,
      `## Что из этого следует

Для поверхностного переноса дескрипторов нужны Object.getOwnPropertyDescriptors и Object.defineProperties. Даже это не копирует автоматически весь граф, прототип и внутренние слоты встроенного типа.`
    ],
    visual: {
      motif: "transformation"
    }
  },
  {
    id: "fe-1.5-info-shallow-graph",
    type: "info",
    readMoreUrl: feSection1_5ReadMoreUrls.q24,
    pages: [
      `## Новый контейнер, прежние ссылки

Поверхностная копия (shallow copy) переносит значения верхнего уровня. Объектные значения по-прежнему указывают на прежние объекты. Новый внешний массив не делает всё содержимое независимым.`,
      `## Проверим на примере

~~~js
const a = [{ n: 1 }];
const b = [...a];
console.log(a === b,
  a[0] === b[0]);
b[0] = { n: 9 };
console.log(a[0].n);
~~~
Результат: \`false, true; 1\`.`,
      `## Что из этого следует

Различайте замену позиции copy[0] = другойОбъект и запись copy[0].n = 7. Первая меняет только новый контейнер, вторая — общий объект. Рисуйте ссылки до выбора способа копирования.`
    ],
    visual: {
      motif: "sharing"
    }
  },
  {
    id: "fe-1.5-info-structural-sharing",
    type: "info",
    readMoreUrl: feSection1_5ReadMoreUrls.q25,
    pages: [
      `## Копируйте изменяемый путь

Структурное разделение (structural sharing) создаёт новые контейнеры на пути к изменению. Неизменившиеся ветви намеренно сохраняют идентичность.`,
      `## Проверим на примере

~~~js
const a = { user: { n: 1 },
  config: {} };
const b = { ...a,
  user: { ...a.user, n: 2 } };
console.log(a !== b,
  a.user !== b.user);
console.log(a.config === b.config,
  a.user.n);
~~~
Результат: \`true, true; true, 1\`.`,
      `## Что из этого следует

Это не глубокая неизменяемость. Общие ветви нельзя позже мутировать, если старые версии должны остаться прежними. Проверьте новое значение и сравните ссылки вдоль изменённого и неизменённого путей.`
    ],
    visual: {
      motif: "sharing"
    }
  },
  {
    id: "fe-1.5-info-copy-cost",
    type: "info",
    readMoreUrl: feSection1_5ReadMoreUrls.q26,
    pages: [
      `## Ясный контракт до оптимизации

filter().map().toSorted() может быть понятным решением, но создаёт промежуточные контейнеры. На горячем пути один цикл иногда удобнее. Это решение по данным и профилю, а не по моде.`,
      `## Что из этого следует

Оцените объём, частоту, память и читаемость. Локальная мутация свежего результата совместима с неизменяемым входом. Глубокое копирование всего графа не заменяет договор о владении.`
    ]
  },
  {
    id: "fe-1.5-info-deep-contract",
    type: "info",
    readMoreUrl: feSection1_5ReadMoreUrls.q27,
    pages: [
      `## Глубокая копия — договор

Значение может быть графом с циклами и повторными ссылками. До выбора инструмента решите, какие типы, связи, прототипы, дескрипторы и внешние ресурсы должны сохраниться.`,
      `## Что из этого следует

Варианты: явное копирование известной схемы, structuredClone для поддерживаемых данных, JSON только для совместимого представления или библиотека с нужным проверенным договором. Универсального обещания «сохранить всё» нет.`
    ],
    visual: {
      motif: "transformation"
    }
  },
  {
    id: "fe-1.5-info-clone-graph",
    type: "info",
    readMoreUrl: feSection1_5ReadMoreUrls.q28,
    pages: [
      `## Новый граф с прежними связями

structuredClone сохраняет циклы и повторные ссылки внутри результата. Объекты результата отделены от исходных, но две ссылки на один исходный узел должны вести на один новый узел.`,
      `## Проверим на примере

~~~js
const shared = {};
const a = { x: shared,
  y: shared };
a.self = a;
const b = structuredClone(a);
console.log(b.self === b,
  b.x === b.y);
console.log(b.x === a.x);
~~~
Результат: \`true, true; false\`.`,
      `## Что из этого следует

Алгоритм поддерживает обычные данные и ряд встроенных типов: Date, RegExp, Map, Set, буферы и типизированные массивы. Набор объектов среды проверяйте для целевой платформы.`
    ],
    visual: {
      motif: "transformation"
    }
  },
  {
    id: "fe-1.5-info-clone-limits",
    type: "info",
    readMoreUrl: feSection1_5ReadMoreUrls.q29,
    pages: [
      `## Данные не равны поведению класса

structuredClone не воспроизводит пользовательский прототип, методы и закрытые поля класса. Функции и неподдерживаемые объекты графа приводят к DataCloneError.`,
      `## Проверим на примере

~~~js
class User {
  name = "Ada";
  greet() { return this.name; }
}
const b =
  structuredClone(new User());
console.log(b.name,
  typeof b.greet);
~~~
Результат: \`"Ada", "undefined"\`.`,
      `## Что из этого следует

Getter может выполниться при чтении, но accessor-дескриптор не переносится. RegExp.lastIndex сбрасывается. Не обещайте сохранить неперечисляемые или Symbol-свойства как часть переносимой модели данных.`,
      `## DOM-узел не клонируется так

Браузерный DOM-узел не поддерживается structuredClone. Этот пример намеренно вызывает DataCloneError.

~~~js
structuredClone(
  document.createElement("div"));
~~~
Исключение: \`DataCloneError\`.`
    ],
    visual: {
      motif: "transformation"
    }
  },
  {
    id: "fe-1.5-info-transfer-buffer",
    type: "info",
    readMoreUrl: feSection1_5ReadMoreUrls.q30,
    pages: [
      `## Перенос меняет владельца

Передаваемый ресурс (transferable) можно перенести вместо копирования. При переносе ArrayBuffer исходный буфер отсоединяется: прежний владелец теряет доступ к его данным.`,
      `## Проверим на примере

~~~js
const a = new ArrayBuffer(8);
new Uint8Array(a)[0] = 42;
const b = structuredClone(a,
  { transfer: [a] });
console.log(a.byteLength,
  b.byteLength);
console.log(new Uint8Array(b)[0]);
~~~
Результат: \`0, 8; 42\`.`,
      `## Что из этого следует

Это наблюдаемое изменение владения, а не безусловная оптимизация. Буфер должен быть частью нужного результата; наличие только в transfer-списке само по себе не добавляет его в граф.`
    ],
    visual: {
      motif: "transformation"
    }
  },
  {
    id: "fe-1.5-info-json-copy",
    type: "info",
    readMoreUrl: feSection1_5ReadMoreUrls.q31,
    pages: [
      `## JSON переносит представление

JSON.parse(JSON.stringify(value)) допустим для намеренно совместимой модели данных. Он не сохраняет всю семантику JavaScript: undefined в объекте исчезает, а в массиве превращается в null.`,
      `## Проверим на примере

~~~js
const a = { x: undefined,
  list: [undefined] };
const b =
  JSON.parse(JSON.stringify(a));
console.log(Object.hasOwn(b,
  "x"));
console.log(b.list);
~~~
Результат: \`false; [null]\`.`,
      `## Что из этого следует

Циклы и BigInt без специального toJSON вызывают TypeError. Date превращается в строку; NaN и Infinity — в null. Пользовательский toJSON может заменить представление, а общие ссылки после разбора становятся независимыми.`
    ],
    visual: {
      motif: "transformation"
    }
  }
];
