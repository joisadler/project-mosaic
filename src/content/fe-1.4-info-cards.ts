import type { InfoCardData } from "./card-types";
import { feSection1_4ReadMoreUrls } from "./fe-1.4-source-urls";

// MOS-40: owner-approved subsection 1.4 coverage and presentation.
export const feSection1_4InfoCards: InfoCardData[] = [
  {
    id: "fe-1.4-info-assignment-receiver",
    type: "info",
    readMoreUrl: feSection1_4ReadMoreUrls.q10,
    pages: [
      `## Где setter, а где получатель?

Унаследованный setter найден в прототипе, но его \`this\` — получатель операции (receiver). В записи \`child.score = 7\` это \`child\`.`,
      `## Запись вызывает setter

~~~js
const base = {
  set score(n) {
    this.saved = n;
  }
};
const child =
  Object.create(base);
child.score = 7;
console.log(child.saved); // 7
console.log(base.saved);
// undefined
~~~`,
      `## Определение — другая операция

\`Object.defineProperty(child, "score", ...)\` определяет собственное свойство напрямую. Setter прототипа не вызывается.

Публичное поле класса тоже использует определение свойства, а не обычное присваивание.`
    ],
    visual: {
      motif: "descriptor"
    }
  },
  {
    id: "fe-1.4-info-inherited-receiver",
    type: "info",
    readMoreUrl: feSection1_4ReadMoreUrls.q1,
    pages: [
      `## Поиск выше, this ниже

Если метод найден в прототипе, вызов \`child.read()\` всё равно передаёт \`child\` как \`this\`. Место хранения функции и получатель вызова — разные вещи.`,
      `## Общая функция

~~~js
const base = {
  read() { return this.name; }
};
const child = Object.create(base);
child.name = "Lin";
console.log(child.read());
// "Lin"
~~~`,
      `## Отделение меняет вызов

\`const read = child.read\` сохраняет функцию, но не получателя. Для позднего вызова используйте сохранённый \`bind(child)\` или адаптер \`() => child.read()\`. Стрелка в объектном литерале не создаёт собственного \`this\`.`
    ]
  },
  {
    id: "fe-1.4-info-class-callback",
    type: "info",
    readMoreUrl: feSection1_4ReadMoreUrls.q14,
    pages: [
      `## Метод класса не привязан

Обычный метод (prototype method) общий для экземпляров, но не получает постоянный \`this\`. Если передать его колбэком, получателя определит вызывающий API.`,
      `## Связать один раз

~~~js
class Counter {
  value = 2;
  read() { return this.value; }
}
const c = new Counter();
const read = c.read.bind(c);
console.log(read()); // 2
~~~`,
      `## Устойчивый колбэк

Стрелочное поле класса сохраняет \`this\` экземпляра, но создаёт отдельную функцию для каждого объекта. При регистрации и снятии обработчика нужна одна и та же ссылка; новый \`bind\` создаёт другую функцию.`
    ]
  },
  {
    id: "fe-1.4-info-creation-contract",
    type: "info",
    readMoreUrl: feSection1_4ReadMoreUrls.q5,
    pages: [
      `## Сначала контракт объекта

Литерал (object literal) удобен для одного объекта. Фабрика (factory function) возвращает результат обычного вызова. Класс требует \`new\` и описывает семейство экземпляров.`,
      `## Делегация без конструктора

\`Object.create(proto)\` задаёт внутренний прототип нового объекта, но не выполняет инициализацию конструктора. Собственное состояние нужно подготовить отдельно.`,
      `## Выбор без универсального победителя

Сравнивайте владение состоянием, общие методы, приватность и форму API. Фабрика может вернуть экземпляр класса или использовать общий прототип: отдельные функции не обязательны для любой фабрики.`
    ]
  },
  {
    id: "fe-1.4-info-state-method-placement",
    type: "info",
    readMoreUrl: feSection1_4ReadMoreUrls.q5,
    pages: [
      `## Состояние своё, метод общий

Изменяемые данные экземпляра обычно хранятся на нём самом. Метод можно разместить в прототипе: все экземпляры найдут одну функцию без копирования.`,
      `## Одна функция для двух объектов

~~~js
class Item {
  value = 0;
  read() { return this.value; }
}
const a = new Item();
const b = new Item();
console.log(a.read === b.read);
// true
~~~`,
      `## Общая ссылка — общий риск

Если изменяемый объект записан в прототипе, его найдут все экземпляры. Изменение вложенного объекта не создаёт отдельную копию. Храните состояние на экземпляре, если оно не должно разделяться.`
    ]
  },
  {
    id: "fe-1.4-info-construction-topology",
    type: "info",
    readMoreUrl: feSection1_4ReadMoreUrls.q6,
    pages: [
      `## new связывает экземпляр

Для обычного базового конструктора \`new\` создаёт объект, задаёт ему прототип из \`Constructor.prototype\` и выполняет конструктор с новым \`this\`.`,
      `## Возврат может заменить объект

~~~js
function Model() {
  this.local = true;
  return { external: true };
}
const m = new Model();
console.log(m instanceof Model);
// false
~~~`,
      `## Граница простой модели

Возврат примитива базовым конструктором игнорируется; возврат объекта или функции заменяет результат. Для примитивного \`.prototype\` используется подходящий встроенный прототип. Производные классы имеют дополнительные правила.`
    ]
  },
  {
    id: "fe-1.4-info-new-target",
    type: "info",
    readMoreUrl: feSection1_4ReadMoreUrls.q7,
    pages: [
      `## Кто начал создание?

\`new.target\` показывает цель конструирования. При \`new Child()\` базовый конструктор видит \`Child\`, хотя выполняется код базы. Так создание сохраняет тип наследника.`,
      `## База видит наследника

~~~js
class Base {
  constructor() {
    this.kind = new.target;
  }
}
class Child extends Base {}
console.log(
  new Child().kind === Child
); // true
~~~`,
      `## Это не проверка свойства

Наличие \`.prototype\` не доказывает возможность вызова через \`new\`: внутренний \`[[Construct]]\` не добавляется присваиванием. При обычном вызове функции \`new.target\` равен \`undefined\`; класс без \`new\` бросает \`TypeError\`.`
    ]
  },
  {
    id: "fe-1.4-info-prototype-links",
    type: "info",
    readMoreUrl: feSection1_4ReadMoreUrls.q8,
    pages: [
      `## Две разные связи

\`.prototype\` — обычное свойство конструктора для будущих экземпляров. \`[[Prototype]]\` — внутренняя ссылка конкретного объекта, читаемая через \`Object.getPrototypeOf\`.`,
      `## Экземпляр и функция

~~~js
function User() {}
const u = new User();
console.log(
  Object.getPrototypeOf(u) ===
  User.prototype
); // true
console.log(
  Object.getPrototypeOf(User) ===
  Function.prototype
); // true
~~~`,
      `## Метод не переносится

\`User.prototype\` тоже является объектом со своей цепочкой. Экземпляр ищет методы по этой цепочке. Прототип самой функции \`User\` — отдельная связь, а не место хранения её методов экземпляра.`
    ]
  },
  {
    id: "fe-1.4-info-lookup-shadow",
    type: "info",
    readMoreUrl: feSection1_4ReadMoreUrls.q9,
    pages: [
      `## Первое совпадение побеждает

Чтение проверяет собственное свойство, затем прототипы до \`null\`. Найденное значение \`undefined\` останавливает поиск: свойство существует, хотя значения не видно.`,
      `## undefined тоже затеняет

~~~js
const base = { theme: "light" };
const child = Object.create(base);
child.theme = undefined;
console.log(child.theme);
// undefined
delete child.theme;
console.log(child.theme);
// "light"
~~~`,
      `## Наличие проверяют отдельно

\`Object.hasOwn(child, "theme")\` проверяет собственное свойство; \`"theme" in child\` — всю цепочку. Они различают отсутствие и присутствующее \`undefined\`, чего не делает простое сравнение значения.`
    ]
  },
  {
    id: "fe-1.4-info-writable-shadow",
    type: "info",
    readMoreUrl: feSection1_4ReadMoreUrls.q10,
    pages: [
      `## Запись не равна поиску

Унаследованное изменяемое свойство с данными при обычном присваивании обычно порождает собственное свойство у получателя. Исходное значение прототипа сохраняется.`,
      `## Значение остаётся в базе

~~~js
const base = { count: 1 };
const child = Object.create(base);
child.count = 2;
console.log(base.count); // 1
console.log(child.count); // 2
~~~`,
      `## Проверяйте дескриптор

Унаследованное \`writable: false\` отклоняет обычную запись; getter без setter тоже её не разрешает. В строгом режиме возникает \`TypeError\`. Прямое определение собственного свойства — другая операция.`
    ]
  },
  {
    id: "fe-1.4-info-chain-checks",
    type: "info",
    readMoreUrl: feSection1_4ReadMoreUrls.q11,
    pages: [
      `## instanceof не доказывает new

В стандартном случае \`obj instanceof C\` ищет текущее \`C.prototype\` в цепочке объекта. Конструктор при этом мог вообще не выполняться.`,
      `## Цепочку можно создать напрямую

~~~js
function User() {}
const u =
  Object.create(User.prototype);
console.log(u instanceof User);
// true
~~~`,
      `## Знайте предел гарантии

\`.constructor\` — обычное изменяемое свойство, а \`instanceof\` зависит от прототипов, realms и возможного \`Symbol.hasInstance\`. Для массива между realms есть \`Array.isArray\`; внешние данные проверяют по нужной структуре.`
    ]
  },
  {
    id: "fe-1.4-info-null-dictionary",
    type: "info",
    readMoreUrl: feSection1_4ReadMoreUrls.q12,
    pages: [
      `## Словарь без наследства

\`Object.create(null)\` создаёт объект без \`Object.prototype\`. У него нет унаследованных \`toString\`, \`hasOwnProperty\` и accessor-свойства \`__proto__\`.`,
      `## Имя становится обычным ключом

~~~js
const dict = Object.create(null);
dict["__proto__"] = "value";
console.log(dict["__proto__"]);
// "value"
console.log(
  Object.getPrototypeOf(dict)
); // null
~~~`,
      `## Проверка без метода объекта

Используйте \`Object.hasOwn(dict, key)\`. Словарь не становится универсальной защитой при объединении недоверенных данных. Полная защита от prototype pollution и сравнение с Map — отдельные темы.`
    ]
  },
  {
    id: "fe-1.4-info-prototype-changes",
    type: "info",
    readMoreUrl: feSection1_4ReadMoreUrls.q12,
    pages: [
      `## Старые объекты не переподключаются

Замена \`C.prototype\` влияет на будущие обычные экземпляры. Уже созданные объекты сохраняют старый \`[[Prototype]]\` и могут перестать проходить \`instanceof C\`.`,
      `## Менять цепочку осознанно

\`Object.setPrototypeOf\` меняет связь, но не копирует свойства и не вызывает конструктор. Лучше создать нужную цепочку сразу. Цикл обычных прототипов запрещён; у нерасширяемого объекта нельзя установить другой прототип.`,
      `## Три смысла похожего имени

\`__proto__\` на Object.prototype — legacy accessor. \`{ __proto__: p }\` — специальный синтаксис литерала. \`{ ["__proto__"]: p }\` создаёт обычное собственное свойство. Это не имя внутреннего слота.`
    ]
  },
  {
    id: "fe-1.4-info-class-contract",
    type: "info",
    readMoreUrl: feSection1_4ReadMoreUrls.q13,
    pages: [
      `## Класс сохраняет прототипы

Класс (class) организует создание объектов и общие методы, но добавляет собственные правила: требует \`new\`, имеет строгое тело и лексическое имя с TDZ.`,
      `## Где хранится метод?

~~~js
class User { greet() {} }
const u = new User();
console.log(
  Object.hasOwn(u, "greet")
); // false
console.log(
  Object.getOwnPropertyDescriptor(
    User.prototype, "greet"
  ).enumerable
); // false
~~~`,
      `## Класс — не авто-binding

Обычный метод находится в прототипе и неперечислим. Он общий, но вызов всё ещё определяет \`this\`. Именованное выражение класса также может иметь внутреннее имя, которое не создаёт внешней привязки.`
    ]
  },
  {
    id: "fe-1.4-info-methods-fields",
    type: "info",
    readMoreUrl: feSection1_4ReadMoreUrls.q14,
    pages: [
      `## Три похожие записи

\`method() {}\` создаёт общий метод прототипа. \`field = () => ...\` создаёт отдельную функцию экземпляра с лексическим \`this\`. \`field = function () {}\` тоже собственная, но получает \`this\` по вызову.`,
      `## Идентичность функций

~~~js
class C {
  method() {}
  callback = () => {};
}
const a = new C(), b = new C();
console.log(
  a.method === b.method
); // true
console.log(
  a.callback === b.callback
); // false
~~~`,
      `## Что даёт отдельное поле

Публичное поле собственное и перечислимое. Стрелочное поле удобно как колбэк, но означает отдельную функцию на экземпляр. Выбор влияет на память, идентичность и переопределение поведения; измеряйте стоимость при реальной необходимости.`
    ]
  },
  {
    id: "fe-1.4-info-field-vs-assignment",
    type: "info",
    readMoreUrl: feSection1_4ReadMoreUrls.q14,
    pages: [
      `## Поле определяет свойство

Стандартное публичное поле класса использует определение собственного свойства. Запись \`this.value = 1\` использует присваивание и может вызвать унаследованный setter.`,
      `## Setter базы не вызывается

~~~js
class Base {
  set value(n) { this.seen = n; }
}
class Child extends Base {
  value = 1;
}
console.log(new Child().seen);
// undefined
~~~`,
      `## Важно для старой сборки

Если заменить поле присваиванием после \`super()\`, setter базы получит значение. Старый режим транспиляции мог делать такую замену; при расследовании проверяйте скомпилированный JavaScript, а не только исходный синтаксис.`
    ]
  },
  {
    id: "fe-1.4-info-inheritance-chains",
    type: "info",
    readMoreUrl: feSection1_4ReadMoreUrls.q15,
    pages: [
      `## extends связывает две цепочки

У \`class Child extends Base\` экземпляр наследует через \`Child.prototype → Base.prototype\`. Сам объект класса \`Child\` наследует от \`Base\`, что позволяет находить публичные статические элементы.`,
      `## Классы тоже объекты

~~~js
class Base {}
class Child extends Base {}
console.log(
  Object.getPrototypeOf(Child)
  === Base
); // true
console.log(
  Object.getPrototypeOf(
    Child.prototype)
  === Base.prototype
); // true
~~~`,
      `## Один экземпляр

Наследование не создаёт отдельного родительского экземпляра внутри дочернего. Базовый и производный код работают с создаваемым объектом; расположение метода и получатель операции различаются.`
    ]
  },
  {
    id: "fe-1.4-info-super-receiver",
    type: "info",
    readMoreUrl: feSection1_4ReadMoreUrls.q15,
    pages: [
      `## super меняет начало поиска

\`super.method()\` ищет метод от прототипа базы, но вызывает его с текущим \`this\`. Это не вызов метода на отдельном «родительском объекте».`,
      `## Получатель остаётся дочерним

~~~js
class Base {
  read() { return this.name; }
}
class Child extends Base {
  name = "child";
  read() { return super.read(); }
}
console.log(new Child().read());
// "child"
~~~`,
      `## Заимствование не переносит super

Начальная точка поиска связана с местом определения метода через \`[[HomeObject]]\`. Вызов через \`call(other)\` меняет \`this\`, но не переносит исходную связь \`super\` на прототип \`other\`.`
    ]
  },
  {
    id: "fe-1.4-info-initialization-order",
    type: "info",
    readMoreUrl: feSection1_4ReadMoreUrls.q15,
    pages: [
      `## Когда готовы поля?

Поля базы инициализируются до тела её конструктора. Затем выполняется базовый конструктор; после \`super()\` готовы поля наследника, и продолжается тело производного конструктора.`,
      `## Не вызывайте наследника слишком рано

Если база вызывает переопределяемый метод, метод наследника уже может быть найден, а его поля ещё не готовы. Это источник чтений \`undefined\` и нарушенных инвариантов.`,
      `## До super нет this

В обычном производном конструкторе \`this\` не инициализирован до \`super()\`: ранний доступ бросает \`ReferenceError\`. Есть редкие исключения с явным возвратом объекта; они не делают такой стиль хорошим рабочим контрактом.`
    ]
  },
  {
    id: "fe-1.4-info-static-placement",
    type: "info",
    readMoreUrl: feSection1_4ReadMoreUrls.q16,
    pages: [
      `## static живёт на классе

Статические методы и публичные статические поля принадлежат объекту-конструктору. Экземпляр не находит их через свою цепочку. Публичный статический метод обычно неперечислим; поле перечислимо.`,
      `## Наследование и получатель

~~~js
class Base {
  static version = 1;
  static read() {
    return this.version;
  }
}
class Child extends Base {}
Child.version = 2;
console.log(Child.read()); // 2
~~~`,
      `## Найдено выше, вызвано ниже

\`Child.read()\` может найти функцию в \`Base\`, но передать \`Child\` как \`this\`. Это та же модель получателя. Закрытые статические элементы требуют приватной метки конкретного класса и ведут себя иначе.`
    ]
  },
  {
    id: "fe-1.4-info-private-brand",
    type: "info",
    readMoreUrl: feSection1_4ReadMoreUrls.q16,
    pages: [
      `## Прототип не даёт private

Приватное поле (private field) \`#value\` не является обычным свойством с особым именем. Доступ проверяет приватную метку (private brand) получателя; одного нужного прототипа недостаточно.`,
      `## Имитация не становится экземпляром

~~~js
class C {
  #value = 1;
  read() { return this.#value; }
}
const fake =
  Object.create(C.prototype);
fake.read();
~~~`,
      `## Два разных вида ошибки

Необъявленное доступное имя \`#field\` даёт \`SyntaxError\` при разборе. Объявленное имя с неверным получателем даёт \`TypeError\` во время выполнения. Ключи и дескрипторы не показывают приватные элементы.`
    ]
  },
  {
    id: "fe-1.4-info-private-inheritance",
    type: "info",
    readMoreUrl: feSection1_4ReadMoreUrls.q16,
    pages: [
      `## Одинаковое имя, разные поля

База и наследник могут объявить \`#value\`, но это два разных приватных имени. Методы базы работают с её полем на том же экземпляре; наследник не получает лексический доступ к приватному имени базы.`,
      `## Закрытое static не наследуется как поле

Публичный статический метод базы может быть найден через наследника. Но \`this.#value\` внутри него требует метку класса, объявившего приватное static-поле. У объекта наследника её нет.`,
      `## Явное обращение меняет контракт

\`Base.#value\` внутри доступного кода базы читает состояние именно \`Base\`; \`this.#value\` зависит от получателя. Это осознанный выбор, а не взаимозаменяемые записи.`
    ]
  },
  {
    id: "fe-1.4-info-composition-contract",
    type: "info",
    readMoreUrl: feSection1_4ReadMoreUrls.q17,
    pages: [
      `## Наследование требует контракта

Наследник должен сохранять обещания базы. Если независимые возможности требуют всё новых сочетаний подклассов, полезнее композиция (composition) с явно переданными зависимостями.`,
      `## Независимые стратегии

~~~js
function service(format) {
  return {
    run(value) {
      return format(value);
    }
  };
}
const s = service(n => n * 2);
console.log(s.run(3)); // 6
~~~`,
      `## Обоснуйте выбор

Класс удобен для множества экземпляров с общим поведением и инвариантами. Фабрика удобна для малого API и закрытых привязок. Композиция помогает независимо заменять операции; ни один подход не выигрывает во всех задачах.`
    ]
  },
  {
    id: "fe-1.4-info-property-axes",
    type: "info",
    readMoreUrl: feSection1_4ReadMoreUrls.q18,
    pages: [
      `## Две независимые оси

Свойство бывает собственным (own) или унаследованным (inherited), перечислимым (enumerable) или неперечислимым (non-enumerable). Место хранения и участие в переборе — разные признаки.`,
      `## Найти не значит перечислить

\`Object.hasOwn\` проверяет собственность, а \`in\` — всю цепочку. Оба видят присутствующее \`undefined\` и неперечислимые свойства. \`Object.keys\` выбирает только собственные перечислимые строковые ключи.`,
      `## Прямой вызов ненадёжен

\`obj.hasOwnProperty(key)\` может быть затенён данными; у объекта без прототипа метода нет. Используйте \`Object.hasOwn(obj, key)\`. Legacy-вариант — заимствовать \`hasOwnProperty\` из \`Object.prototype\` через \`call\`.`
    ],
    visual: {
      motif: "descriptor"
    }
  },
  {
    id: "fe-1.4-info-enumeration-choice",
    type: "info",
    readMoreUrl: feSection1_4ReadMoreUrls.q19,
    pages: [
      `## Сначала три вопроса

Нужны собственные свойства или вся цепочка? Только перечислимые или все? Только строки, только Symbol или оба вида ключей? Эти ответы определяют API.`,
      `## Ключи без значений

\`Object.keys\` — собственные перечислимые строки. \`Object.getOwnPropertyNames\` — все собственные строки. \`Object.getOwnPropertySymbols\` — собственные Symbol. \`Reflect.ownKeys\` — все собственные ключи.`,
      `## Перебор по цепочке

\`for...in\` рассматривает перечислимые строковые ключи по цепочке. Собственный неперечислимый ключ может скрыть одноимённый ключ прототипа. Для только собственных данных выберите \`keys\`/\`entries\` или фильтр \`Object.hasOwn\`.`
    ],
    visual: {
      motif: "descriptor"
    }
  },
  {
    id: "fe-1.4-info-symbols-not-private",
    type: "info",
    readMoreUrl: feSection1_4ReadMoreUrls.q18,
    pages: [
      `## Symbol — вид ключа

Ключ Symbol помогает избежать столкновения со строковым именем, но не даёт секретности. Перечисляемость тоже не является приватностью.`,
      `## Средство отражения видит ключ

~~~js
const key = Symbol("id");
const obj = { [key]: 7 };
console.log(Object.keys(obj));
// []
console.log(
  Reflect.ownKeys(obj).length
); // 1
~~~`,
      `## Приватный элемент устроен иначе

\`#field\` не является строковым или Symbol-свойством. Он не появляется в \`Reflect.ownKeys\`. Здесь Symbol нужен только как ключ; протоколы и well-known symbols изучаются отдельно.`
    ],
    visual: {
      motif: "descriptor"
    }
  },
  {
    id: "fe-1.4-info-enumeration-getters",
    type: "info",
    readMoreUrl: feSection1_4ReadMoreUrls.q19,
    pages: [
      `## Ключи и значения — разные операции

У обычного объекта \`Object.keys\` собирает ключи без вызова getter значений. \`Object.values\` и \`Object.entries\` читают значения, поэтому могут выполнить getter.`,
      `## Невидимый вызов кода

~~~js
let reads = 0;
const obj = {
  get x() { return ++reads; }
};
Object.keys(obj);
console.log(reads); // 0
Object.values(obj);
console.log(reads); // 1
~~~`,
      `## Обёртка добавляет операции

Proxy может выполнить перехватчики ключей и дескрипторов даже без чтения значения. Поэтому обещание «любой перебор свободен от побочных эффектов» слишком сильное. Проверяйте конкретный тип объекта и API.`
    ],
    visual: {
      motif: "descriptor"
    }
  },
  {
    id: "fe-1.4-info-descriptor-kinds",
    type: "info",
    readMoreUrl: feSection1_4ReadMoreUrls.q20,
    pages: [
      `## Данные или accessor

Дескриптор свойства (property descriptor) бывает с данными: \`value\` и \`writable\`, либо accessor: \`get\` и \`set\`. Общие атрибуты — \`enumerable\` и \`configurable\`.`,
      `## Не смешивайте виды

Один дескриптор не может содержать \`value\`/\`writable\` вместе с \`get\`/\`set\`: это \`TypeError\`. Getter и setter должны быть функциями или \`undefined\`, даже если свойство пока не читают.`,
      `## Посмотреть без вызова getter

\`Object.getOwnPropertyDescriptor(obj, key)\` возвращает один собственный дескриптор. \`Object.getOwnPropertyDescriptors\` — все собственные строковые и Symbol-дескрипторы. Для обычного accessor-свойства getter при этом не выполняется.`
    ],
    visual: {
      motif: "descriptor"
    }
  },
  {
    id: "fe-1.4-info-descriptor-defaults",
    type: "info",
    readMoreUrl: feSection1_4ReadMoreUrls.q20,
    pages: [
      `## Новое свойство закрыто по умолчанию

При создании свойства через \`Object.defineProperty\` пропущенные \`writable\`, \`enumerable\` и \`configurable\` равны \`false\`; пропущенный \`value\` равен \`undefined\`.`,
      `## Явно задайте нужные флаги

~~~js
const obj = {};
Object.defineProperty(obj, "id", {
  value: 7,
  writable: true,
  enumerable: true,
  configurable: true
});
console.log(Object.keys(obj));
// ["id"]
~~~`,
      `## Сравните способы создания

Обычное поле литерала и новая собственная запись обычно получают эти флаги \`true\`. У методов класса перечисляемость \`false\`. Выбирайте дескриптор по контракту, а не рассчитывайте на одинаковые значения по умолчанию.`
    ],
    visual: {
      motif: "descriptor"
    }
  },
  {
    id: "fe-1.4-info-descriptor-redefinition",
    type: "info",
    readMoreUrl: feSection1_4ReadMoreUrls.q20,
    pages: [
      `## Пропущенное не сбрасывается

Правило «флаги по умолчанию false» относится к новому свойству. При переопределении существующего свойства пропущенные атрибуты сохраняют прежние значения.`,
      `## Неконфигурируемое ещё бывает изменяемым

У свойства данных с \`configurable: false\` и \`writable: true\` можно менять значение и один раз выключить запись. Включить её обратно или сменить вид свойства уже нельзя.`,
      `## Отказ не означает откат всего

\`Object.defineProperty\` бросает при недопустимом определении. \`Reflect.defineProperty\` возвращает \`false\` при обычном отказе. Несколько последовательных определений не являются общей транзакцией: ранее внесённые изменения могут сохраниться.`
    ],
    visual: {
      motif: "descriptor"
    }
  },
  {
    id: "fe-1.4-info-accessor-receiver",
    type: "info",
    readMoreUrl: feSection1_4ReadMoreUrls.q21,
    pages: [
      `## Getter найден здесь, this оттуда

У getter/setter получатель операции может отличаться от объекта с дескриптором. \`Reflect.get(target, key, receiver)\` явно разделяет начало поиска и получателя.`,
      `## Получателя передали явно

~~~js
const base = {
  get label() {
    return this.name;
  }
};
const receiver = { name: "Ada" };
console.log(
  Reflect.get(
    base, "label", receiver)
); // "Ada"
~~~`,
      `## Синтаксис свойства не делает код дешёвым

Getter может бросить ошибку или выполнить эффект. Для длительной работы, параметров или сложного результата обычно понятнее именованный метод. \`Reflect.set\` возвращает успех записи, но исключение из setter продолжает распространяться.`
    ],
    visual: {
      motif: "descriptor"
    }
  },
  {
    id: "fe-1.4-info-integrity-levels",
    type: "info",
    readMoreUrl: feSection1_4ReadMoreUrls.q22,
    pages: [
      `## Три уровня ограничений

\`preventExtensions\` запрещает новые собственные свойства. \`seal\` дополнительно делает собственные свойства неконфигурируемыми. \`freeze\` ещё выключает запись для собственных свойств с данными.`,
      `## Что остаётся после seal?

Изменяемое значение существующего свойства данных можно менять. Удалять его нельзя. Прежнее \`writable: false\` не превращается в \`true\`. Существующий setter остаётся исполняемым кодом.`,
      `## Проверка и отказ

\`Object.isExtensible\`, \`isSealed\` и \`isFrozen\` проверяют состояние. Ограничения действуют на тот же объект; методы не создают копию. Отклонённое обычное присваивание в strict mode бросает \`TypeError\`; в sloppy mode часто молча не меняет данные.`
    ],
    visual: {
      motif: "descriptor"
    }
  },
  {
    id: "fe-1.4-info-shallow-integrity",
    type: "info",
    readMoreUrl: feSection1_4ReadMoreUrls.q22,
    pages: [
      `## Заморожен один объект

\`Object.freeze\` ограничивает собственные свойства одного объекта. Вложенная ссылка остаётся той же, а её содержимое может меняться, если не защищено отдельно.`,
      `## Вложенное состояние изменяемо

~~~js
const config = Object.freeze({
  nested: { count: 0 }
});
config.nested.count++;
console.log(config.nested.count);
// 1
console.log(
  Object.isFrozen(config.nested)
); // false
~~~`,
      `## Три разных обещания

\`const\` фиксирует привязку имени. \`freeze\` фиксирует допустимые операции со свойствами объекта. Глубокая неизменяемость требует отдельного контракта о всём графе и владении данными; копирование здесь не изучается.`
    ],
    visual: {
      motif: "descriptor"
    }
  },
  {
    id: "fe-1.4-info-frozen-accessors",
    type: "info",
    readMoreUrl: feSection1_4ReadMoreUrls.q23,
    pages: [
      `## Setter не выключается

Заморозка фиксирует дескриптор accessor-свойства, но не запрещает вызывать его setter. Тот может менять внешнюю привязку или другой объект.`,
      `## Значение всё ещё меняется

~~~js
let saved = 0;
const obj = Object.freeze({
  get value() { return saved; },
  set value(n) { saved = n; }
});
obj.value = 7;
console.log(obj.value); // 7
console.log(Object.isFrozen(obj));
// true
~~~`,
      `## Уточняйте контракт API

\`Object.isFrozen(obj)\` не обещает, что повторные чтения дадут одинаковое значение. При ревью уточняйте, что именно ограничено: дескрипторы, вложенные данные, вычисления или все наблюдаемые эффекты.`
    ],
    visual: {
      motif: "descriptor"
    }
  },
  {
    id: "fe-1.4-info-frozen-private-state",
    type: "info",
    readMoreUrl: feSection1_4ReadMoreUrls.q23,
    pages: [
      `## Приватное поле вне дескрипторов

\`freeze\` не делает приватные поля класса неизменяемыми. Они не являются обычными свойствами, на которые распространяются эти атрибуты.`,
      `## Замороженный счётчик работает

~~~js
class Counter {
  #value = 0;
  next() { return ++this.#value; }
}
const c =
  Object.freeze(new Counter());
console.log(c.next()); // 1
~~~`,
      `## Учитывайте тип объекта

Встроенное состояние Map и других объектов может жить во внутренних слотах. Заморозка обёртки не запрещает их методы. Гарантия неизменяемости должна учитывать публичные операции конкретного типа.`
    ],
    visual: {
      motif: "descriptor"
    }
  },
  {
    id: "fe-1.4-info-proxy-operations",
    type: "info",
    readMoreUrl: feSection1_4ReadMoreUrls.q24,
    pages: [
      `## Перехватывают операции

Proxy создаёт обёртку над исходным объектом (target). Обработчик (handler) содержит перехватчики (traps): \`get\` для чтения, \`set\` для записи, \`has\` для проверки и другие — для своих операций.`,
      `## Reflect перенаправляет

\`Reflect.get(target, key, receiver)\` и \`Reflect.set(target, key, value, receiver)\` сохраняют получателя. Отсутствующий trap делегирует операцию исходному объекту; один \`get\` не наблюдает все взаимодействия.`,
      `## Возвращайте успех записи

Trap \`set\` должен сообщить об успехе. Если он изменил target и вернул \`undefined\`, строгая запись может бросить \`TypeError\` после изменения. Автоматического отката нет. Обращение из trap к той же операции Proxy может вызвать рекурсию.`
    ],
    visual: {
      motif: "interception"
    }
  },
  {
    id: "fe-1.4-info-proxy-receiver",
    type: "info",
    readMoreUrl: feSection1_4ReadMoreUrls.q25,
    pages: [
      `## Не теряйте receiver

Getter может находиться на target, а вызываться через объект, наследующий от Proxy. Прямое \`target[key]\` теряет этого получателя; корректное перенаправление передаёт receiver в Reflect.`,
      `## Приватная метка не переносится

Пустой Proxy над экземпляром класса не получает его приватные поля. \`proxy.read()\` передаёт Proxy как \`this\`, и доступ к \`#field\` может бросить \`TypeError\`. Аналогичны ограничения внутренних слотов встроенных объектов.`,
      `## Привязка метода — компромисс

Binding метода к target может обойти конкретную ошибку, но меняет получателя и ставит вопросы идентичности функции и наблюдения. Для нескольких известных операций явный адаптер часто даёт более честный контракт.`
    ],
    visual: {
      motif: "interception"
    }
  },
  {
    id: "fe-1.4-info-proxy-invariants",
    type: "info",
    readMoreUrl: feSection1_4ReadMoreUrls.q26,
    pages: [
      `## Перехватчики имеют пределы

Инварианты Proxy (Proxy invariants) запрещают противоречить некоторым гарантиям target. Например, \`get\` не может подменить значение собственного свойства данных с \`configurable: false\` и \`writable: false\`.`,
      `## Ключи тоже проверяются

\`ownKeys\` обязан включать неконфигурируемые собственные ключи без дубликатов. Для нерасширяемого target набор должен совпадать со всеми собственными ключами. Противоречие даёт \`TypeError\`.`,
      `## Модель важнее полного списка

Проверяйте, какие гарантии уже закреплены target, и что сообщает trap. Это обзор: все условия каждого перехватчика не нужно запоминать. Перед реализацией сложной обёртки сверяйтесь со спецификацией.`
    ],
    visual: {
      motif: "interception"
    }
  },
  {
    id: "fe-1.4-info-proxy-revocation",
    type: "info",
    readMoreUrl: feSection1_4ReadMoreUrls.q26,
    pages: [
      `## Доступ с ограниченным сроком

\`Proxy.revocable\` возвращает \`proxy\` и функцию \`revoke\`. После отзыва операции через внутренние методы обёртки бросают \`TypeError\`. Исходный объект продолжает существовать.`,
      `## typeof остаётся допустимым

~~~js
const { proxy, revoke } =
  Proxy.revocable({ x: 1 }, {});
revoke();
console.log(typeof proxy);
// "object"
~~~`,
      `## Отзыв не забирает выданные ссылки

Сравнение идентичности тоже остаётся возможным. Уже полученные ссылки на target или его вложенные части не отзываются. Proxy сам по себе не является надёжной границей безопасности; выбирайте его для нужного общего перехвата.`
    ],
    visual: {
      motif: "interception"
    }
  },
  {
    id: "fe-1.4-info-object-diagnosis",
    type: "info",
    readMoreUrl: feSection1_4ReadMoreUrls.q28,
    pages: [
      `## Разберите операцию по шагам

Нарисуйте отдельные объекты и цепочки. Назовите операцию: вызов, \`new\`, чтение, присваивание, определение или перебор. Правило чтения не объясняет запись автоматически.`,
      `## Затем найдите получателя

Отметьте место хранения дескриптора, его вид и флаги. Разделите поля экземпляра, методы прототипа, static и private. Для Proxy проследите trap, Reflect и проверку инварианта.`,
      `## Закончите рабочим решением

После прогноза результата предложите минимальный ремонт: собственное состояние, правильный receiver, \`Object.hasOwn\`, явный дескриптор, композицию или адаптер. Объясните компромисс, а не только ответ задачи.`
    ]
  }
];
