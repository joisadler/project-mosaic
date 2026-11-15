import { feSection1_6ReadMoreUrls } from "./fe-1.6-source-urls";
import type { InfoCardData } from "./card-types";

// MOS-42: owner-approved subsection 1.6 coverage and presentation.
export const feSection1_6InfoCards: InfoCardData[] = [
  {
    id: "fe-1.6-info-presence",
    type: "info",
    readMoreUrl: feSection1_6ReadMoreUrls.q1,
    pages: [
      `## Чтение не доказывает наличие

\`Map\` хранит пары «ключ → значение». \`get()\` возвращает \`undefined\` и для отсутствующего ключа, и для записи с таким значением. Проверку наличия выполняет \`has()\`.`,
      `## Один результат, две причины

~~~js
const map = new Map([
  ["ready", undefined],
]);
console.log(map.get("ready"));
console.log(map.get("missing"));
console.log(map.has("ready"));
console.log(map.has("missing"));
~~~
Результат: \`undefined; undefined; true; false\`.`,
      `## Выберите вопрос к данным

Если нужно значение — вызывайте \`get()\`. Если важно отличить отсутствие записи от сохранённого \`undefined\` — вызывайте \`has()\`. Условие \`if (map.get(key))\` дополнительно теряет значения \`0\`, \`false\` и \`""\`.`
    ]
  },
  {
    id: "fe-1.6-info-record-or-index",
    type: "info",
    readMoreUrl: feSection1_6ReadMoreUrls.q1,
    pages: [
      `## Форма данных задаёт выбор

Объект удобен для записи с известными полями: \`row.id\`, \`row.title\`. \`Map\` удобен для динамического индекса (index) с произвольными ключами и операциями \`set\`, \`get\`, \`has\`, \`delete\`, \`clear\`.`,
      `## Когда нужен именно объект

У объекта ключ свойства — строка или символ. Для словаря строковых ключей подойдёт \`Object.create(null)\`, если потребителю нужны свойства. Наличие собственного свойства проверяет \`Object.hasOwn()\`.`
    ]
  },
  {
    id: "fe-1.6-info-key-identity",
    type: "info",
    readMoreUrl: feSection1_6ReadMoreUrls.q2,
    pages: [
      `## Ключи сравниваются по идентичности

У \`Map\` наблюдаемое сравнение ключей соответствует SameValueZero: \`NaN\` совпадает с \`NaN\`, оба нуля совпадают. Число и строка различаются. Объекты совпадают только по идентичности.`,
      `## Две записи с одним id

~~~js
const row = { id: 7 };
const m = new Map([[row,
  "saved"]]);
console.log(m.has(row));
console.log(m.has({ id: 7 }));
~~~
Результат: \`true; false\`. Для разных экземпляров одной сущности обычно нужен устойчивый ID.`
    ]
  },
  {
    id: "fe-1.6-info-insertion-order",
    type: "info",
    readMoreUrl: feSection1_6ReadMoreUrls.q3,
    pages: [
      `## Обновление не переставляет ключ

\`Map\` обходит записи в порядке вставки. \`set()\` для существующего ключа меняет значение на прежнем месте. Удаление и новая вставка отправляют ключ в конец.`,
      `## Порядок после изменений

~~~js
const m = new Map([["a", 1], [
  "b", 2]]);
m.set("a", 3);
console.log([...m.keys()]);
m.delete("a");
m.set("a", 4);
console.log([...m.keys()]);
~~~
Результат: \`["a", "b"]; ["b", "a"]\`.`,
      `## Свойство не становится записью

\`m[key] = value\` создаёт обычное свойство экземпляра. Оно не попадает во внутреннюю коллекцию, в \`size\` и в обход пар. Для записи нужен \`m.set(key, value)\`.`
    ]
  },
  {
    id: "fe-1.6-info-live-iteration",
    type: "info",
    readMoreUrl: feSection1_6ReadMoreUrls.q4,
    pages: [
      `## Открытый обход видит изменения

Итератор \`Map\` работает с живой коллекцией. Удалённая до посещения запись пропускается. Новая запись может попасть в ещё не завершённый обход.`,
      `## Удаляем ещё не прочитанное

~~~js
const m = new Map([["a", 1], [
  "b", 2]]);
const it = m.keys();
console.log(it.next().value);
m.delete("b");
m.set("c", 3);
console.log([...it]);
~~~
Результат: \`"a"; ["c"]\`.`,
      `## Когда требуется снимок

Если нужны исходные пары, сначала получите \`[...map]\`. Это фиксирует состав пар, но не клонирует ключи и значения. Удаление и повторная вставка текущего ключа во время живого обхода могут сделать цикл бесконечным.`
    ]
  },
  {
    id: "fe-1.6-info-json-boundary",
    type: "info",
    readMoreUrl: feSection1_6ReadMoreUrls.q5,
    pages: [
      `## Внутренние записи не являются свойствами

Прямой \`JSON.stringify()\` обычного экземпляра \`Map\` даёт строку \`"{}"\`. Для передачи данных нужен явный формат: например, массив пар из JSON-совместимых ключей и значений.`,
      `## Объект может слить ключи

~~~js
const m = new Map([[7, "n"], [
  "7", "s"]]);
const obj = Object.fromEntries(
  m);
console.log(Object.keys(obj));
const pairs = JSON.stringify([
  ...m]);
console.log(new Map(JSON.parse(
  pairs)).size);
~~~
Результат: \`["7"]; 2\`.`,
      `## Передавайте смысл идентификатора

Массив пар сохраняет различие числа и строки, если они представимы в JSON. Объектный ключ после передачи не сохраняет исходную идентичность. Для внешней системы согласуйте устойчивый ID.`
    ]
  },
  {
    id: "fe-1.6-info-set-membership",
    type: "info",
    readMoreUrl: feSection1_6ReadMoreUrls.q6,
    pages: [
      `## Уникальность зависит от равенства

\`Set\` хранит уникальные значения по SameValueZero и обходит их в порядке вставки. \`add()\` возвращает сам набор, \`has()\` проверяет наличие, \`delete()\` сообщает, было ли удаление.`,
      `## Похожие объекты ещё не дубликаты

~~~js
const row = { id: 7 };
const s = new Set([NaN, NaN, -0,
  +0]);
s.add(row).add({ id: 7 }).add(
  row);
console.log(s.size);
~~~
Результат: \`4\`. Два объекта с одинаковыми полями имеют разные идентичности.`
    ]
  },
  {
    id: "fe-1.6-info-dedupe-policy",
    type: "info",
    readMoreUrl: feSection1_6ReadMoreUrls.q6,
    pages: [
      `## Сначала выберите победителя

При уникальности по \`id\` сравнивайте ID. Для первого совпадения нужны \`Set\` уже встреченных ID и отдельный результат. Проверяйте \`has()\` до добавления; сохраняйте исходную строку.`,
      `## Последняя запись на первом месте

~~~js
const rows = [{ id: 1,
  v: "old" },
  { id: 2, v: "two" },
  { id: 1, v: "new" }];
const byId = new Map();
for (const row of rows) {
  byId.set(row.id, row);
}
console.log([...byId.values()]
  .map(r => r.v));
~~~
Результат: \`["new", "two"]\`.`,
      `## Порядок тоже часть договора

Обновление \`Map\` по ID сохраняет порядок первого появления ключей, даже если побеждает последняя строка. Для порядка последних появлений нужен другой явно выбранный алгоритм.`
    ]
  },
  {
    id: "fe-1.6-info-set-operations",
    type: "info",
    readMoreUrl: feSection1_6ReadMoreUrls.q7,
    pages: [
      `## Операция возвращает новый набор

\`union\`, \`intersection\`, \`difference\`, \`symmetricDifference\` выражают объединение, пересечение, разность и симметрическую разность. \`isSubsetOf\`, \`isSupersetOf\`, \`isDisjointFrom\` проверяют отношения и возвращают boolean.`,
      `## Правый операнд задаёт договор

Современным операциям нужен set-like объект: \`size\`, \`has()\` и \`keys()\`. Поэтому справа подходит \`Map\` как набор ключей. Обычного массива недостаточно; его можно преобразовать через \`new Set(values)\`.`,
      `## Порядок пересечения не угадывайте

~~~js
const a = new Set([3, 1, 2]);
const b = new Map([[2, "b"], [3,
  "c"]]);
console.log([...a.intersection(
  b)]);
~~~
Результат: \`[2, 3]\`. При меньшем правом наборе порядок следует ему. При равном размере — получателю. Проверяйте поддержку методов в целевой среде.`
    ]
  },
  {
    id: "fe-1.6-info-grouping",
    type: "info",
    readMoreUrl: feSection1_6ReadMoreUrls.q7,
    pages: [
      `## Группа может иметь объектный ключ

\`Map.groupBy(items, keyOf)\` группирует элементы по произвольным ключам, сохраняя идентичность объекта-ключа. Каждый массив группы содержит исходные элементы, а не глубокие копии.`,
      `## Одна команда — одна группа

~~~js
const team = { name: "A" };
const rows = [{ team }, {
  team }];
const groups = Map.groupBy(rows,
  r => r.team);
console.log(groups.get(team)
  .length);
console.log(groups.has({
  name: "A" }));
~~~
Результат: \`2; false\`.`,
      `## Когда подходит Object.groupBy

\`Object.groupBy\` приводит результат функции к ключу свойства и возвращает объект без прототипа. Для стабильных строковых меток это удобно. Для различения объектных ключей выбирайте \`Map.groupBy\`.`
    ]
  },
  {
    id: "fe-1.6-info-weak-ownership",
    type: "info",
    readMoreUrl: feSection1_6ReadMoreUrls.q8,
    pages: [
      `## Метаданные не должны продлевать жизнь

Сильная достижимость (strong reachability) — цепочка сильных ссылок от работающей программы. Обычный \`Map\` удерживает свои ключи. Запись \`WeakMap\` сама по себе не удерживает слабый ключ.`,
      `## Разрешение на сборку — не срок

Когда других сильных ссылок нет, цель может стать доступной для сборки. Ни момент, ни наблюдаемый факт сборки не гарантированы. Не стройте обязательное освобождение ресурса на ожидании GC.`
    ]
  },
  {
    id: "fe-1.6-info-weak-api",
    type: "info",
    readMoreUrl: feSection1_6ReadMoreUrls.q9,
    pages: [
      `## Выберите данные или отметку

\`WeakMap\` хранит значение по слабому ключу: \`get\`, \`set\`, \`has\`, \`delete\`. \`WeakSet\` хранит только факт присутствия: \`add\`, \`has\`, \`delete\`. Это удобно для метаданных и отметок по экземпляру.`,
      `## Работа с известным экземпляром

~~~js
const row = {};
const sizes = new WeakMap([[row,
  32]]);
const seen = new WeakSet([row]);
console.log(sizes.get(row), seen
  .has(row));
~~~
Результат: \`32, true\`.`,
      `## Перечисление требует другого владельца

У слабых коллекций нет \`size\`, \`keys()\` и обычного обхода. Если нужен список активных ID, выгрузка или строгий предел размера, храните их отдельно с явным удалением.`
    ]
  },
  {
    id: "fe-1.6-info-weak-targets",
    type: "info",
    readMoreUrl: feSection1_6ReadMoreUrls.q10,
    pages: [
      `## Не всякий примитив годится

Современный стандарт допускает слабые цели-объекты и незарегистрированные символы. \`Symbol.for()\` возвращает зарегистрированный символ, который нельзя использовать как слабую цель. Поддержку символов проверяйте отдельно от наличия самого API.`,
      `## Запись и запрос различаются

~~~js
const w = new WeakMap();
console.log(w.has(7), w.get(7));
w.set(7, "value");
~~~
Вывод: \`false, undefined\`; затем \`TypeError\`. Запись с недопустимым ключом отклоняется, запрос наличия возвращает \`false\`.`,
      `## Три API — одна граница

\`WeakMap#set\`, \`WeakSet#add\` и \`new WeakRef()\` отклоняют недопустимую цель с \`TypeError\`. Для незарегистрированных символов современные среды поддерживают слабые цели; старые могут их отклонять.`
    ]
  },
  {
    id: "fe-1.6-info-conditional-value",
    type: "info",
    readMoreUrl: feSection1_6ReadMoreUrls.q10,
    pages: [
      `## Обратная ссылка не всегда удерживает

Значение \`WeakMap\` может ссылаться на собственный ключ. Если значение достижимо только через эту запись, такой цикл сам по себе не создаёт внешний сильный путь к ключу. Эта условная связь известна как ephemeron.`,
      `## Проверьте внешние корни

Если то же значение сохранено в живом массиве, а из него есть ссылка на ключ, возникает сильная цепочка: массив → значение → ключ. Одна слабая карта не отменяет остальные ссылки. В обоих случаях момент сборки предсказывать нельзя.`
    ]
  },
  {
    id: "fe-1.6-info-weakref-fallback",
    type: "info",
    readMoreUrl: feSection1_6ReadMoreUrls.q11,
    pages: [
      `## Слабое переиспользование допускает промах

\`WeakRef.deref()\` возвращает цель или \`undefined\`. Используйте его лишь там, где потеря цели допустима, а основной путь умеет восстановить результат. Сохраните успешный результат в локальной переменной.`,
      `## Восстановление проверяется без GC

~~~js
const ref = { deref: () =>
  undefined };
const cached = ref.deref();
const value = cached ?? {
  id: 7 };
console.log(value.id);
~~~
Результат: \`7\`. Управляемый промах проверяет ветку восстановления, а не работу сборщика.`,
      `## Слабая цель не ограничивает индекс

\`Map<Id, WeakRef<Value>>\` продолжает удерживать ID и обёртки \`WeakRef\`. Для жёсткого лимита нужны явное вытеснение и жизненный цикл. Успешно прочитанная цель сохраняется до конца текущего job.`
    ]
  },
  {
    id: "fe-1.6-info-symbol-identity",
    type: "info",
    readMoreUrl: feSection1_6ReadMoreUrls.q12,
    pages: [
      `## Описание не определяет ключ

Символ (Symbol) — примитив с собственной идентичностью. \`Symbol("id")\` каждый раз создаёт новый символ. Описание помогает отладке и не превращает два символа в один ключ.`,
      `## Реестр создаёт явную договорённость

~~~js
const a = Symbol.for("app.row");
console.log(a === Symbol.for(
  "app.row"));
console.log(Symbol.keyFor(a));
console.log(Symbol.keyFor(Symbol(
  "row")));
~~~
Результат: \`true; "app.row"; undefined\`.`,
      `## Когда нужен общий ключ

\`Symbol.for()\` ищет или создаёт символ в global symbol registry. Он полезен для частей программы, намеренно использующих один маркер. Для независимого локального ключа достаточно \`Symbol()\`.`
    ],
    visual: {
      motif: "tokens"
    }
  },
  {
    id: "fe-1.6-info-symbol-visibility",
    type: "info",
    readMoreUrl: feSection1_6ReadMoreUrls.q13,
    pages: [
      `## Символьное свойство видно рефлексии

\`Object.keys\`, \`Object.entries\` и \`for...in\` пропускают символьные ключи. \`Reflect.ownKeys()\` и \`Object.getOwnPropertySymbols()\` позволяют их получить. Символ снижает риск совпадений имён, но не создаёт приватность.`,
      `## Перечисляемость влияет на копирование

~~~js
const key = Symbol("tag");
const row = { id: 7, [
  key]: true };
console.log(Object.keys(row));
console.log(Reflect.ownKeys(row)
  .includes(key));
console.log(({ ...row })[key]);
~~~
Результат: \`["id"]; true; true\`. Spread копирует собственное перечисляемое символьное свойство.`
    ],
    visual: {
      motif: "tokens"
    }
  },
  {
    id: "fe-1.6-info-well-known-key",
    type: "info",
    readMoreUrl: feSection1_6ReadMoreUrls.q12,
    pages: [
      `## Движок ищет точный ключ

Известные символы (well-known symbols) — точки расширения языка. \`Symbol.iterator\` открывает обычный обход, \`Symbol.asyncIterator\` — асинхронный. Строка с таким именем или символ из реестра не заменяют этот ключ.`,
      `## Похожее имя не выполняет протокол

~~~js
console.log(
  Symbol.for("Symbol.iterator")
    === Symbol.iterator
);
~~~
Результат: \`false\`. Для метода обхода нужен именно \`[Symbol.iterator]()\`.`,
      `## Поведение можно расширять точечно

\`Symbol.toPrimitive\` управляет преобразованием в примитив. \`Symbol.toStringTag\` задаёт метку для \`Object.prototype.toString\`. Эти механизмы не делают объект автоматически итерируемым.`
    ],
    visual: {
      motif: "tokens"
    }
  },
  {
    id: "fe-1.6-info-symbol-enumerable",
    type: "info",
    readMoreUrl: feSection1_6ReadMoreUrls.q13,
    pages: [
      `## Тип ключа и атрибут — разные вещи

Символьный ключ может быть перечисляемым или неперечисляемым. \`Reflect.ownKeys()\` видит оба. Объектный spread копирует только собственные перечисляемые свойства, независимо от строкового или символьного типа ключа.`,
      `## Скрыли от spread, но не от рефлексии

~~~js
const key = Symbol("tag");
const row = {};
Object.defineProperty(row, key, {
  value: 7});
console.log(Reflect.ownKeys(row)
  .length);
console.log(({ ...row })[key]);
~~~
Результат: \`1; undefined\`. У \`defineProperty\` перечисляемость по умолчанию выключена.`
    ],
    visual: {
      motif: "tokens"
    }
  },
  {
    id: "fe-1.6-info-protocol",
    type: "info",
    readMoreUrl: feSection1_6ReadMoreUrls.q14,
    pages: [
      `## Источник открывает обход

Итерируемый объект (iterable) предоставляет \`[Symbol.iterator]()\`. Этот метод возвращает итератор (iterator), который продвигает один конкретный обход через \`next()\`.`,
      `## Конец задаёт done, а не value

~~~js
function* values() {
  yield undefined;
  return "end";
}
const it = values();
console.log(it.next());
console.log(it.next());
~~~
Первый результат: \`{ value: undefined, done: false }\`. Второй: \`{ value: "end", done: true }\`.`,
      `## Цикл не выдаёт завершающее значение

\`for...of\` берёт элементы, пока \`done\` ложен. Значение с \`done: true\` завершает обход. Поэтому \`undefined\` может быть нормальным элементом, а \`return "end"\` генератора — не элемент.`
    ],
    visual: {
      motif: "cursor"
    }
  },
  {
    id: "fe-1.6-info-array-like",
    type: "info",
    readMoreUrl: feSection1_6ReadMoreUrls.q15,
    pages: [
      `## Индексы не обещают обход

Массивоподобное значение (array-like) может иметь индексы и \`length\`, но не иметь итератора. \`Array.from()\` умеет читать такой вход. Spread в массиве требует протокол итерации.`,
      `## Одинаковые данные, разные договоры

~~~js
const source = { 0: "a",
  length: 1 };
console.log(Array.from(source));
console.log([...source]);
~~~
Сначала \`["a"]\`, затем \`TypeError\`. Объектный spread работает со свойствами и относится к другому договору.`
    ],
    visual: {
      motif: "cursor"
    }
  },
  {
    id: "fe-1.6-info-for-of-in",
    type: "info",
    readMoreUrl: feSection1_6ReadMoreUrls.q15,
    pages: [
      `## Значения или ключи свойств

\`for...of\` получает значения через итератор. \`for...in\` перечисляет строковые ключи перечисляемых свойств, включая унаследованные. Для собственных перечисляемых строковых пар объекта используйте \`Object.entries()\`.`,
      `## Map выдаёт пары

~~~js
const m = new Map([["a", 1]]);
for (const [key, value] of m) {
  console.log(key, value);
}
~~~
Результат: \`"a", 1\`. Для одного набора значений у \`Map\` есть отдельные \`keys()\` и \`values()\`.`
    ],
    visual: {
      motif: "cursor"
    }
  },
  {
    id: "fe-1.6-info-independent-cursors",
    type: "info",
    readMoreUrl: feSection1_6ReadMoreUrls.q16,
    pages: [
      `## Каждому читателю — свою позицию

Повторно обходимый источник создаёт новое состояние внутри каждого \`[Symbol.iterator]()\`. Если хранить общий курсор на самом источнике, два читателя будут сдвигать одну позицию.`,
      `## Состояние живёт внутри генератора

~~~js
const source = {
  *[Symbol.iterator]() {
    yield 2; yield 3;
  },
};
const a = source[Symbol
  .iterator]();
const b = source[Symbol
  .iterator]();
console.log(a.next().value, b
  .next().value);
~~~
Результат: \`2, 2\`. Каждый вызов метода открыл отдельный генератор.`
    ],
    visual: {
      motif: "cursor"
    }
  },
  {
    id: "fe-1.6-info-manual-next",
    type: "info",
    readMoreUrl: feSection1_6ReadMoreUrls.q16,
    pages: [
      `## next возвращает объект

Вызов next() всегда возвращает объект результата. Поле done сообщает о завершении обхода. Примитив вместо объекта нарушает протокол.`,
      `## Минимальный самостоятельный курсор

~~~js
const it = {
  n: 0,
  next() {
    return this.n++ === 0
      ? { value: 7, done: false }
      : { done: true };
  },
  [Symbol.iterator]() {
  return this; },
};
console.log([...it]);
~~~
Результат: \`[7]\`.`,
      `## Нарушение протокола — ошибка

Возврат числа вместо объекта из \`next()\` нарушает протокол и приводит к \`TypeError\` у потребителя. Не проверяйте конец по \`if (!value)\`: \`0\`, \`false\` и \`undefined\` могут быть элементами.`
    ],
    visual: {
      motif: "cursor"
    }
  },
  {
    id: "fe-1.6-info-generator-start",
    type: "info",
    readMoreUrl: feSection1_6ReadMoreUrls.q17,
    pages: [
      `## Вызов ещё не выполняет тело

Генератор (generator), созданный через \`function*\`, начинает тело при первом \`next()\`. \`yield\` выдаёт значение и приостанавливает выполнение до следующего запроса.`,
      `## Запросы двигают выполнение

~~~js
let runs = 0;
function* values() {
  runs++;
  yield 7;
}
const it = values();
console.log(runs);
console.log(it.next().value,
  runs);
~~~
Результат: \`0; 7, 1\`.`,
      `## Новый проход — новый вызов

Генератор сам итерируем, но одноразов. \`[...it]\` потребляет остаток текущего курсора. Вызов функции генератора заново создаёт новый курсор. Метод \`*[Symbol.iterator]()\` может выдавать его для каждого обхода.`
    ],
    visual: {
      motif: "cursor"
    }
  },
  {
    id: "fe-1.6-info-yield-return",
    type: "info",
    readMoreUrl: feSection1_6ReadMoreUrls.q18,
    pages: [
      `## yield выдаёт, return завершает

\`yield*\` делегирует обход другой последовательности. \`return\` завершает генератор; его значение находится в результате с \`done: true\` и не попадает в обычный \`for...of\` или spread.`,
      `## Передача значения внутрь

~~~js
function* select() {
  const name = yield "choose";
  return name.toUpperCase();
}
const it = select();
console.log(it.next("ignored"));
console.log(it.next("a"));
~~~
Первый шаг выдаёт \`"choose"\`. Второй завершается со значением \`"A"\`.`,
      `## Первый аргумент теряется

Аргумент \`next(value)\` становится результатом приостановленного выражения \`yield\`. У первого \`next()\` такого выражения ещё нет. \`throw(error)\` вводит исключение в точку приостановки; код генератора может его поймать.`
    ],
    visual: {
      motif: "cursor"
    }
  },
  {
    id: "fe-1.6-info-iterator-close",
    type: "info",
    readMoreUrl: feSection1_6ReadMoreUrls.q19,
    pages: [
      `## Ранний выход вызывает закрытие

При \`break\`, возврате из функции и исключении в теле \`for...of\` вызывается \`return()\` итератора, если метод есть. Закрытие генератора позволяет выполнить \`finally\`.`,
      `## finally освобождает ресурс

~~~js
const log = [];
function* values() {
  try { yield 1; yield 2; }
  finally { log.push("closed"); }
}
for (const n of values()) {
  break; }
console.log(log);
~~~
Результат: \`["closed"]\`.`,
      `## У закрытия есть границы

Ошибка самого \`next()\` не даёт общей гарантии вызова \`return()\`. При ручном обходе уборку организует вызывающий код. Не помещайте новый \`yield\` в обязательную уборку: один \`return()\` тогда может не завершить генератор.`
    ],
    visual: {
      motif: "cursor"
    }
  },
  {
    id: "fe-1.6-info-lazy-helpers",
    type: "info",
    readMoreUrl: feSection1_6ReadMoreUrls.q20,
    pages: [
      `## Преобразование начинается по запросу

Современные iterator helpers позволяют ленивую цепочку \`map\`, \`filter\`, \`take\`. \`Iterator.from()\` принимает итерируемый источник или итератор. Терминальная операция, например \`toArray()\`, начинает потребление.`,
      `## Ограничьте до материализации

~~~js
function* count() {
  for (let n = 1; ; n++) yield n;
}
const result = Iterator.from(
  count())
  .filter(n => n % 2 === 0)
  .take(3).toArray();
console.log(result);
~~~
Результат: \`[2, 4, 6]\`.`,
      `## Ленивость не обещает завершение

Не вызывайте \`toArray()\` для бесконечного остатка без границы. Даже \`filter(match).take(3)\` может не завершиться, если источник никогда не выдаст три совпадения. Сам протокол \`next()\` ещё не даёт методы \`Iterator.prototype\`.`
    ],
    visual: {
      motif: "cursor"
    }
  },
  {
    id: "fe-1.6-info-limit-ownership",
    type: "info",
    readMoreUrl: feSection1_6ReadMoreUrls.q19,
    pages: [
      `## Лимит проверяют до запроса

Для нулевого лимита не открывайте источник. После получения последнего нужного элемента прекращайте потребление до следующего \`next()\`. Переносимый вариант — обычный цикл с явной проверкой и ранним выходом.`,
      `## Последний yield ещё не уборка

Обёртка-генератор приостанавливается на последнем \`yield\`. Если ручной потребитель забрал значение и бросил курсор, код после \`yield\` ещё не выполнялся. Потребителю нужно возобновить или закрыть курсор.`,
      `## Исключение в точке yield

~~~js
function* outer() {
  try { yield 1; yield 2; }
  catch (error) { yield error
  .message; }
}
const it = outer();
console.log(it.next().value);
console.log(it.throw(new Error(
  "stop")).value);
~~~
Результат: \`1; "stop"\`. Исключение вошло в точку приостановки и было обработано.`
    ],
    visual: {
      motif: "cursor"
    }
  },
  {
    id: "fe-1.6-info-async-steps",
    type: "info",
    readMoreUrl: feSection1_6ReadMoreUrls.q21,
    pages: [
      `## Следующий шаг нужно дождаться

Асинхронный итерируемый объект (async iterable) предоставляет \`[Symbol.asyncIterator]()\`. Его \`next()\` возвращает Promise с объектом результата. \`for await...of\` ждёт шаги, а при раннем выходе — и закрытие через \`return()\`, если метод есть.`,
      `## Асинхронный генератор закрывается

~~~js
const log = [];
async function* pages() {
  try { yield await Promise
  .resolve(1); }
  finally { log.push("closed"); }
}
for await (const page of pages(
  )) {
  log.push(page); break;
}
console.log(log);
~~~
Результат: \`[1, "closed"]\`.`,
      `## Потребление не равно отмене

Источник может заранее буферизовать данные или запустить работу. Последовательные запросы цикла сами по себе не гарантируют отмену уже запущенных операций. Договор источника нужно проверить отдельно.`
    ],
    visual: {
      motif: "cursor"
    }
  },
  {
    id: "fe-1.6-info-async-materialization",
    type: "info",
    readMoreUrl: feSection1_6ReadMoreUrls.q22,
    pages: [
      `## Цикл позволяет остановиться

\`for await...of\` принимает асинхронный источник, а при отсутствии async iterator может адаптировать обычный. Для массива уже запущенных Promise последовательное ожидание не откладывает запуск этой работы.`,
      `## Array.fromAsync собирает итог

~~~js
const result = await Array
  .fromAsync([
  Promise.resolve(1),
  Promise.resolve(2),
]);
console.log(result);
~~~
Результат: \`[1, 2]\`. Метод материализует весь конечный источник.`,
      `## Граница совместимости уборки

У sync generator, выдавшего отклонённый Promise, закрытие через async-адаптер зависит от версии среды. Источник отмечает отличие Node.js 20/22 от 24/26. Для переносимой уборки используйте async generator с \`await\` внутри \`try\` либо \`for...of\` с \`await\` в теле.`
    ],
    visual: {
      motif: "cursor"
    }
  },
  {
    id: "fe-1.6-info-paged-dedupe",
    type: "info",
    readMoreUrl: feSection1_6ReadMoreUrls.q21,
    pages: [
      `## Составьте договор по частям

Для первых уникальных строк из async-страниц нужны \`Set\` устойчивых ID и результат в порядке появления. Проверяйте ID до добавления. Нулевой лимит должен завершиться до открытия источника.`,
      `## Остановка без лишней страницы

Как только получено достаточно уникальных строк, выйдите из тела \`for await...of\`. Цикл закроет итератор. Сам источник отвечает за уборку при ошибке получения данных. Проверьте пустые страницы, недобор и ошибку загрузки.`,
      `## Память зависит от границы

Потребитель хранит до \`limit\` строк и их ID: \`O(limit)\` памяти без учёта страницы и самого источника. Метаданные экземпляра можно вынести в \`WeakMap\`. Если нужно перечислить активные ID, понадобится отдельное явно управляемое хранилище.`
    ],
    visual: {
      motif: "cursor"
    }
  },
  {
    id: "fe-1.6-info-modern-compatibility",
    type: "info",
    readMoreUrl: feSection1_6ReadMoreUrls.modern,
    pages: [
      `## Новый стандарт не равен поддержке

Проверяйте поддержку в точной целевой версии. Современные группы API включают операции \`Set\`, \`Map.groupBy\`, iterator helpers и \`Array.fromAsync\`. Наличие одного метода не доказывает наличие остальных.`,
      `## Отсутствие и undefined различаются

\`getOrInsert\` сохраняет существующее значение, даже \`undefined\`. \`getOrInsertComputed\` вызывает функцию только при отсутствии ключа. Переносимая альтернатива — явная проверка \`has()\` и последующий \`set()\`.`,
      `## Последовательность нескольких источников

\`Iterator.concat\` последовательно обходит несколько iterable. Для совместимости можно делегировать их через \`yield*\`. Синхронная цепочка iterator helpers сама по себе не адаптирует асинхронный источник.`
    ],
    visual: {
      motif: "cursor"
    }
  }
];
