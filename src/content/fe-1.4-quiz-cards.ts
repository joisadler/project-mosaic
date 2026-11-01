import type { QuizCardData } from "./card-types";
import { feSection1_4ReadMoreUrls } from "./fe-1.4-source-urls";

// MOS-40: owner-approved subsection 1.4 coverage and presentation.
export const feSection1_4QuizCards: QuizCardData[] = [
  {
    id: "fe-1.4-quiz-descriptor-defaults",
    type: "quiz",
    readMoreUrl: feSection1_4ReadMoreUrls.q20,
    question: `## Какие ключи вернутся?

~~~js
const obj = {};
Object.defineProperty(obj,
  "id", { value: 7 });
console.log(Object.keys(obj));
~~~`,
    options: [
      {
        id: "a",
        text: "[\"id\"]",
        explanation: "Ключ id собственный, но неперечислимый: новый defineProperty не включает enumerable."
      },
      {
        id: "b",
        text: "[]",
        explanation: "У нового свойства пропущенный enumerable равен false. Object.keys пропускает такой ключ."
      },
      {
        id: "c",
        text: "[7]",
        explanation: "Object.keys возвращает ключи, а не значения. Значение 7 не становится ключом."
      },
      {
        id: "d",
        text: "TypeError",
        explanation: "Дескриптор только с value допустим. Остальные атрибуты получают значения по умолчанию."
      }
    ],
    correctOptionId: "b",
    visual: {
      motif: "descriptor"
    }
  },
  {
    id: "fe-1.4-quiz-inherited-call",
    type: "quiz",
    readMoreUrl: feSection1_4ReadMoreUrls.q1,
    question: `## Что вернёт вызов?

~~~js
const p = {
  name: "base",
  read() { return this.name; }
};
const c = Object.create(p);
c.name = "child";
console.log(c.read());
~~~`,
    options: [
      {
        id: "a",
        text: "\"base\"",
        explanation: "Метод найден в p, но это не закрепляет p как this."
      },
      {
        id: "b",
        text: "undefined",
        explanation: "У получателя c есть собственное name, поэтому значение определено."
      },
      {
        id: "c",
        text: "\"child\"",
        explanation: "Вызов c.read() передаёт c как this, хотя функция найдена в прототипе."
      },
      {
        id: "d",
        text: "TypeError",
        explanation: "Метод вызывается с корректным получателем c; потери контекста нет."
      }
    ],
    correctOptionId: "c"
  },
  {
    id: "fe-1.4-quiz-class-detached",
    type: "quiz",
    readMoreUrl: feSection1_4ReadMoreUrls.q2,
    question: `## Что произойдёт?

~~~js
class C {
  value = 3;
  read() { return this.value; }
}
const read = new C().read;
console.log(read());
~~~`,
    options: [
      {
        id: "a",
        text: "3",
        explanation: "Сохранённая функция не хранит экземпляр как постоянный this."
      },
      {
        id: "b",
        text: "undefined",
        explanation: "Чтение value у undefined бросает, а не возвращает undefined."
      },
      {
        id: "c",
        text: "ReferenceError",
        explanation: "Привязка read существует; ошибка связана с получателем вызова."
      },
      {
        id: "d",
        text: "TypeError",
        explanation: "Метод класса строгий. Обычный вызов получает undefined как this и бросает при чтении value."
      }
    ],
    correctOptionId: "d"
  },
  {
    id: "fe-1.4-quiz-class-arrow-owner",
    type: "quiz",
    readMoreUrl: feSection1_4ReadMoreUrls.q14,
    question: `## Что выведет поле?

~~~js
class C {
  name = "own";
  read = () => this.name;
}
const c = new C();
console.log(
  c.read.call({ name: "other" })
);
~~~`,
    options: [
      {
        id: "a",
        text: "\"own\"",
        explanation: "Стрелочное поле захватило this экземпляра; call его не меняет."
      },
      {
        id: "b",
        text: "\"other\"",
        explanation: "Так получил бы this обычный метод, но read здесь стрелочная функция."
      },
      {
        id: "c",
        text: "undefined",
        explanation: "На экземпляре есть name; лексический this определён при инициализации поля."
      },
      {
        id: "d",
        text: "TypeError",
        explanation: "Вызов стрелки через call допустим, хотя новый thisArg игнорируется."
      }
    ],
    correctOptionId: "a"
  },
  {
    id: "fe-1.4-quiz-create-no-constructor",
    type: "quiz",
    readMoreUrl: feSection1_4ReadMoreUrls.q5,
    question: `## Запустится ли конструктор?

~~~js
let calls = 0;
function C() { calls++; }
Object.create(C.prototype);
console.log(calls);
~~~`,
    options: [
      {
        id: "a",
        text: "1",
        explanation: "Object.create не вызывает C; передан только объект прототипа."
      },
      {
        id: "b",
        text: "0",
        explanation: "Object.create задаёт цепочку нового объекта без выполнения конструктора."
      },
      {
        id: "c",
        text: "undefined",
        explanation: "calls явно инициализирован числом 0 и не изменился."
      },
      {
        id: "d",
        text: "TypeError",
        explanation: "C.prototype — допустимый объект для Object.create."
      }
    ],
    correctOptionId: "b"
  },
  {
    id: "fe-1.4-quiz-shared-method",
    type: "quiz",
    readMoreUrl: feSection1_4ReadMoreUrls.q5,
    question: `## Одна ли это функция?

~~~js
function C() {}
C.prototype.read = function() {};
const a = new C(), b = new C();
console.log(a.read === b.read);
~~~`,
    options: [
      {
        id: "a",
        text: "false",
        explanation: "Методы здесь не создаются отдельно при каждом new."
      },
      {
        id: "b",
        text: "undefined",
        explanation: "Оба чтения находят функцию в C.prototype."
      },
      {
        id: "c",
        text: "true",
        explanation: "Экземпляры делегируют одному прототипу и находят один объект-функцию."
      },
      {
        id: "d",
        text: "TypeError",
        explanation: "Сравнение двух найденных методов допустимо."
      }
    ],
    correctOptionId: "c"
  },
  {
    id: "fe-1.4-quiz-replacement-topology",
    type: "quiz",
    readMoreUrl: feSection1_4ReadMoreUrls.q6,
    question: `## Что покажет проверка?

~~~js
function C() {
  return { ready: true };
}
const c = new C();
console.log(c instanceof C);
~~~`,
    options: [
      {
        id: "a",
        text: "true",
        explanation: "Возвращённый литерал заменил экземпляр с C.prototype."
      },
      {
        id: "b",
        text: "TypeError",
        explanation: "C — обычный конструктор, возврат объекта разрешён."
      },
      {
        id: "c",
        text: "undefined",
        explanation: "instanceof возвращает boolean, а не undefined."
      },
      {
        id: "d",
        text: "false",
        explanation: "Явно возвращённый объект стал результатом new и не наследует от C.prototype."
      }
    ],
    correctOptionId: "d"
  },
  {
    id: "fe-1.4-quiz-new-target-derived",
    type: "quiz",
    readMoreUrl: feSection1_4ReadMoreUrls.q7,
    question: `## Какой тип видит база?

~~~js
class B {
  constructor() {
    this.kind = new.target;
  }
}
class D extends B {}
console.log(new D().kind === D);
~~~`,
    options: [
      {
        id: "a",
        text: "true",
        explanation: "Конструирование начато как new D(), поэтому база видит D в new.target."
      },
      {
        id: "b",
        text: "false",
        explanation: "Выполнение кода B не заменяет фактическую цель конструирования."
      },
      {
        id: "c",
        text: "undefined",
        explanation: "new.target определён при конструировании и сохранён в kind."
      },
      {
        id: "d",
        text: "ReferenceError",
        explanation: "Неявный конструктор D корректно вызывает super; раннего доступа к this нет."
      }
    ],
    correctOptionId: "a"
  },
  {
    id: "fe-1.4-quiz-prototype-two-links",
    type: "quiz",
    readMoreUrl: feSection1_4ReadMoreUrls.q8,
    question: `## Где искать метод экземпляра?

У обычного конструктора \`User\` метод \`greet\` должен разделяться экземплярами. Где его разместить?`,
    options: [
      {
        id: "a",
        text: "В Object.getPrototypeOf(User)",
        explanation: "Это прототип объекта-функции, обычно Function.prototype, а не прототип экземпляров User."
      },
      {
        id: "b",
        text: "В User.prototype",
        explanation: "Экземпляры User ищут общие методы через User.prototype."
      },
      {
        id: "c",
        text: "В каждом user.greet заново",
        explanation: "Это создаёт собственный метод вместо общей функции."
      },
      {
        id: "d",
        text: "В user.constructor.name",
        explanation: "name — строка для диагностики, а не объект общего поведения."
      }
    ],
    correctOptionId: "b"
  },
  {
    id: "fe-1.4-quiz-own-undefined",
    type: "quiz",
    readMoreUrl: feSection1_4ReadMoreUrls.q9,
    question: `## Продолжится ли поиск?

~~~js
const p = { x: 7 };
const c = Object.create(p);
c.x = undefined;
console.log(c.x);
~~~`,
    options: [
      {
        id: "a",
        text: "7",
        explanation: "Собственное x найдено раньше свойства прототипа."
      },
      {
        id: "b",
        text: "null",
        explanation: "undefined не преобразуется в null при поиске свойства."
      },
      {
        id: "c",
        text: "undefined",
        explanation: "Присутствующее собственное undefined останавливает поиск по цепочке."
      },
      {
        id: "d",
        text: "ReferenceError",
        explanation: "И c, и свойство существуют; чтение значения undefined допустимо."
      }
    ],
    correctOptionId: "c"
  },
  {
    id: "fe-1.4-quiz-delete-shadow",
    type: "quiz",
    readMoreUrl: feSection1_4ReadMoreUrls.q9,
    question: `## Что откроет удаление?

~~~js
const p = { x: "base" };
const c = Object.create(p);
c.x = "own";
delete c.x;
console.log(c.x);
~~~`,
    options: [
      {
        id: "a",
        text: "undefined",
        explanation: "Удалено только собственное свойство; в прототипе x остаётся."
      },
      {
        id: "b",
        text: "\"own\"",
        explanation: "Собственное x было конфигурируемым и удалилось."
      },
      {
        id: "c",
        text: "TypeError",
        explanation: "Новое свойство от обычного присваивания можно удалить."
      },
      {
        id: "d",
        text: "\"base\"",
        explanation: "После удаления затенения чтение снова находит x в p."
      }
    ],
    correctOptionId: "d"
  },
  {
    id: "fe-1.4-quiz-writable-own",
    type: "quiz",
    readMoreUrl: feSection1_4ReadMoreUrls.q10,
    question: `## Где изменится значение?

~~~js
const p = { x: 1 };
const c = Object.create(p);
c.x = 4;
console.log(p.x, c.x);
~~~`,
    options: [
      {
        id: "a",
        text: "1 / 4",
        explanation: "Запись создаёт собственное x у c; изменяемое свойство p остаётся равным 1."
      },
      {
        id: "b",
        text: "4 / 4",
        explanation: "Присваивание не меняет найденное свойство прототипа на месте."
      },
      {
        id: "c",
        text: "1 / 1",
        explanation: "Объект c расширяемый, а унаследованное x изменяемо: запись разрешена."
      },
      {
        id: "d",
        text: "TypeError",
        explanation: "Ограничений записи в этом примере нет."
      }
    ],
    correctOptionId: "a"
  },
  {
    id: "fe-1.4-quiz-inherited-readonly",
    type: "quiz",
    readMoreUrl: feSection1_4ReadMoreUrls.q10,
    question: `## Строгий режим: результат?

~~~js
const p = {};
Object.defineProperty(p, "x", {
  value: 1, writable: false
});
const c = Object.create(p);
c.x = 4;
~~~`,
    options: [
      {
        id: "a",
        text: "Собственное x = 4",
        explanation: "Унаследованное неизменяемое свойство блокирует обычное присваивание."
      },
      {
        id: "b",
        text: "TypeError",
        explanation: "Отклонённое обычное присваивание в strict mode бросает TypeError."
      },
      {
        id: "c",
        text: "Меняется p.x",
        explanation: "Унаследованное x неизменяемо; присваивание не обходит этот флаг."
      },
      {
        id: "d",
        text: "Тихий отказ",
        explanation: "Тихий отказ характерен для такой записи в sloppy mode, но здесь режим строгий."
      }
    ],
    correctOptionId: "b"
  },
  {
    id: "fe-1.4-quiz-setter-receiver",
    type: "quiz",
    readMoreUrl: feSection1_4ReadMoreUrls.q10,
    question: `## Кому setter записал x?

~~~js
const p = {
  set value(n) { this.x = n; }
};
const c = Object.create(p);
c.value = 5;
console.log(c.x, p.x);
~~~`,
    options: [
      {
        id: "a",
        text: "5 / 5",
        explanation: "Setter не дублирует запись на прототип и экземпляр."
      },
      {
        id: "b",
        text: "undefined / 5",
        explanation: "Расположение setter на p не делает p получателем."
      },
      {
        id: "c",
        text: "5 / undefined",
        explanation: "Запись начата через c; this в setter равен c, поэтому p.x не появляется."
      },
      {
        id: "d",
        text: "TypeError",
        explanation: "Setter существует и принимает значение без ограничений."
      }
    ],
    correctOptionId: "c"
  },
  {
    id: "fe-1.4-quiz-instanceof-without-call",
    type: "quiz",
    readMoreUrl: feSection1_4ReadMoreUrls.q11,
    question: `## Доказывает ли это new?

~~~js
function C() {}
const c = Object.create(
  C.prototype
);
console.log(c instanceof C);
~~~`,
    options: [
      {
        id: "a",
        text: "false",
        explanation: "Стандартный instanceof проверяет цепочку, а не историю вызова конструктора."
      },
      {
        id: "b",
        text: "undefined",
        explanation: "Результат проверки — boolean."
      },
      {
        id: "c",
        text: "TypeError",
        explanation: "C — допустимая правая сторона, а C.prototype является объектом."
      },
      {
        id: "d",
        text: "true",
        explanation: "C.prototype есть в цепочке c, хотя тело C не выполнялось."
      }
    ],
    correctOptionId: "d"
  },
  {
    id: "fe-1.4-quiz-prototype-replacement",
    type: "quiz",
    readMoreUrl: feSection1_4ReadMoreUrls.q11,
    question: `## Что со старым экземпляром?

~~~js
function C() {}
const old = new C();
C.prototype = {};
console.log(old instanceof C);
~~~`,
    options: [
      {
        id: "a",
        text: "false",
        explanation: "Старая цепочка не меняется; новое C.prototype в ней отсутствует."
      },
      {
        id: "b",
        text: "true",
        explanation: "Замена C.prototype не переподключает уже созданные объекты."
      },
      {
        id: "c",
        text: "undefined",
        explanation: "instanceof возвращает boolean, даже после замены прототипа."
      },
      {
        id: "d",
        text: "TypeError",
        explanation: "Новое C.prototype — допустимый объект; проверка просто даёт false."
      }
    ],
    correctOptionId: "a"
  },
  {
    id: "fe-1.4-quiz-null-proto-key",
    type: "quiz",
    readMoreUrl: feSection1_4ReadMoreUrls.q12,
    question: `## Какой прототип у словаря?

~~~js
const d = Object.create(null);
d["__proto__"] = { x: 1 };
console.log(
  Object.getPrototypeOf(d)
);
~~~`,
    options: [
      {
        id: "a",
        text: "{ x: 1 }",
        explanation: "Без унаследованного accessor имя __proto__ — обычный собственный ключ."
      },
      {
        id: "b",
        text: "null",
        explanation: "Присваивание обычному ключу не меняет внутренний прототип словаря."
      },
      {
        id: "c",
        text: "Object.prototype",
        explanation: "Object.create(null) не добавляет Object.prototype."
      },
      {
        id: "d",
        text: "TypeError",
        explanation: "Расширяемый словарь допускает собственное свойство с таким именем."
      }
    ],
    correctOptionId: "b"
  },
  {
    id: "fe-1.4-quiz-class-method-enumerability",
    type: "quiz",
    readMoreUrl: feSection1_4ReadMoreUrls.q13,
    question: `## Перечислим ли метод класса?

~~~js
class C { run() {} }
const d =
  Object.getOwnPropertyDescriptor(
    C.prototype, "run");
console.log(d.enumerable);
~~~`,
    options: [
      {
        id: "a",
        text: "true",
        explanation: "Публичное поле перечислимо, но run — обычный метод прототипа класса."
      },
      {
        id: "b",
        text: "undefined",
        explanation: "Дескриптор найден и имеет атрибут enumerable."
      },
      {
        id: "c",
        text: "false",
        explanation: "Обычные методы класса по умолчанию неперечислимы."
      },
      {
        id: "d",
        text: "TypeError",
        explanation: "Метод является собственным свойством C.prototype; дескриптор существует."
      }
    ],
    correctOptionId: "c"
  },
  {
    id: "fe-1.4-quiz-class-call",
    type: "quiz",
    readMoreUrl: feSection1_4ReadMoreUrls.q13,
    question: `## Можно вызвать без new?

~~~js
class Model {}
Model();
~~~`,
    options: [
      {
        id: "a",
        text: "undefined",
        explanation: "Класс отклоняет обычный вызов, а не возвращает undefined."
      },
      {
        id: "b",
        text: "Новый экземпляр",
        explanation: "Экземпляр класса создаётся через конструирование, а не обычный вызов."
      },
      {
        id: "c",
        text: "ReferenceError",
        explanation: "Имя Model уже инициализировано, TDZ закончилась."
      },
      {
        id: "d",
        text: "TypeError",
        explanation: "Class constructor требует new; обычный вызов бросает TypeError."
      }
    ],
    correctOptionId: "d"
  },
  {
    id: "fe-1.4-quiz-class-tdz",
    type: "quiz",
    readMoreUrl: feSection1_4ReadMoreUrls.q13,
    question: `## Что будет при раннем чтении?

~~~js
console.log(typeof Model);
class Model {}
~~~`,
    options: [
      {
        id: "a",
        text: "ReferenceError",
        explanation: "Имя класса находится в TDZ до инициализации; typeof не обходит эту проверку."
      },
      {
        id: "b",
        text: "\"undefined\"",
        explanation: "Так typeof ведёт себя для необъявленного имени, но Model имеет лексическую привязку в TDZ."
      },
      {
        id: "c",
        text: "\"function\"",
        explanation: "После инициализации typeof класса даёт \"function\", но здесь чтение раньше."
      },
      {
        id: "d",
        text: "TypeError",
        explanation: "Ошибка вызвана доступом к неинициализированной привязке, а не неверным типом операции."
      }
    ],
    correctOptionId: "a"
  },
  {
    id: "fe-1.4-quiz-field-identity",
    type: "quiz",
    readMoreUrl: feSection1_4ReadMoreUrls.q14,
    question: `## Общая ли стрелочная функция?

~~~js
class C {
  run = () => 1;
}
const a = new C(), b = new C();
console.log(a.run === b.run);
~~~`,
    options: [
      {
        id: "a",
        text: "true",
        explanation: "У методов прототипа может быть одна функция, но run — поле экземпляра."
      },
      {
        id: "b",
        text: "false",
        explanation: "Инициализатор поля создаёт отдельную стрелочную функцию для каждого экземпляра."
      },
      {
        id: "c",
        text: "undefined",
        explanation: "Оба поля содержат функции; сравнение даёт boolean."
      },
      {
        id: "d",
        text: "TypeError",
        explanation: "Стрелочные поля и сравнение их идентичности допустимы."
      }
    ],
    correctOptionId: "b"
  },
  {
    id: "fe-1.4-quiz-field-bypasses-setter",
    type: "quiz",
    readMoreUrl: feSection1_4ReadMoreUrls.q14,
    question: `## Что сохранит setter базы?

~~~js
class B {
  set x(n) { this.seen = n; }
}
class D extends B { x = 2; }
console.log(new D().seen);
~~~`,
    options: [
      {
        id: "a",
        text: "2",
        explanation: "Поле определяется напрямую, поэтому унаследованный setter не срабатывает."
      },
      {
        id: "b",
        text: "null",
        explanation: "Ничто не присваивает seen значение null."
      },
      {
        id: "c",
        text: "undefined",
        explanation: "Стандартная инициализация поля создаёт собственное x без setter базы."
      },
      {
        id: "d",
        text: "TypeError",
        explanation: "Определение нового собственного поля разрешено."
      }
    ],
    correctOptionId: "c"
  },
  {
    id: "fe-1.4-quiz-super-call-receiver",
    type: "quiz",
    readMoreUrl: feSection1_4ReadMoreUrls.q15,
    question: `## Какой x читает super?

~~~js
class B {
  read() { return this.x; }
}
class D extends B {
  x = 9;
  read() { return super.read(); }
}
console.log(new D().read());
~~~`,
    options: [
      {
        id: "a",
        text: "undefined",
        explanation: "super меняет начало поиска, но this остаётся экземпляром D с полем x."
      },
      {
        id: "b",
        text: "TypeError",
        explanation: "Вызов базового метода с текущим получателем корректен."
      },
      {
        id: "c",
        text: "0",
        explanation: "В коде нет значения 0; отдельный базовый экземпляр не создаётся."
      },
      {
        id: "d",
        text: "9",
        explanation: "Базовый read вызывается с this экземпляра D и читает его собственное x."
      }
    ],
    correctOptionId: "d"
  },
  {
    id: "fe-1.4-quiz-this-before-super",
    type: "quiz",
    readMoreUrl: feSection1_4ReadMoreUrls.q15,
    question: `## Что сломается первым?

~~~js
class B {}
class D extends B {
  constructor() {
    this.x = 1;
    super();
  }
}
new D();
~~~`,
    options: [
      {
        id: "a",
        text: "ReferenceError",
        explanation: "В производном конструкторе this не инициализирован до super()."
      },
      {
        id: "b",
        text: "TypeError",
        explanation: "Ошибка связана с неинициализированным this, а не типом записываемого значения."
      },
      {
        id: "c",
        text: "Создастся x = 1",
        explanation: "Ранний доступ к this прерывает конструктор до записи и super()."
      },
      {
        id: "d",
        text: "SyntaxError",
        explanation: "Код синтаксически допустим; ошибка возникает во время выполнения."
      }
    ],
    correctOptionId: "a"
  },
  {
    id: "fe-1.4-quiz-field-init-order",
    type: "quiz",
    readMoreUrl: feSection1_4ReadMoreUrls.q15,
    question: `## Что увидит базовый конструктор?

~~~js
class B {
  constructor() {
    console.log(this.ready);
  }
}
class D extends B { ready = true; }
new D();
~~~`,
    options: [
      {
        id: "a",
        text: "true",
        explanation: "Поля наследника ещё не инициализированы во время тела конструктора базы."
      },
      {
        id: "b",
        text: "undefined",
        explanation: "Поле ready появится после возвращения из super(), а сейчас свойства нет."
      },
      {
        id: "c",
        text: "false",
        explanation: "Отсутствующее свойство читается как undefined, а не false."
      },
      {
        id: "d",
        text: "ReferenceError",
        explanation: "Базовый конструктор уже имеет this; проблема здесь в готовности поля наследника."
      }
    ],
    correctOptionId: "b"
  },
  {
    id: "fe-1.4-quiz-borrowed-super",
    type: "quiz",
    readMoreUrl: feSection1_4ReadMoreUrls.q15,
    question: `## Заимствование меняет что?

~~~js
const base = {
  read() { return this.name; }
};
const obj = { __proto__: base,
  read() { return super.read(); }
};
console.log(
  obj.read.call({ name: "other" })
);
~~~`,
    options: [
      {
        id: "a",
        text: "undefined",
        explanation: "Поиск super найдёт read в base, а получатель имеет name."
      },
      {
        id: "b",
        text: "\"base\"",
        explanation: "Имя переменной base не является значением поля name."
      },
      {
        id: "c",
        text: "\"other\"",
        explanation: "Начало поиска super осталось связано с obj, но call передал другой this."
      },
      {
        id: "d",
        text: "TypeError",
        explanation: "Метод можно заимствовать; наличие super не запрещает call."
      }
    ],
    correctOptionId: "c"
  },
  {
    id: "fe-1.4-quiz-static-inherited",
    type: "quiz",
    readMoreUrl: feSection1_4ReadMoreUrls.q16,
    question: `## Чьё static-поле прочитано?

~~~js
class B {
  static x = 1;
  static read() { return this.x; }
}
class D extends B {}
D.x = 4;
console.log(D.read());
~~~`,
    options: [
      {
        id: "a",
        text: "1",
        explanation: "Метод найден в B, но вызов D.read() передаёт D как this."
      },
      {
        id: "b",
        text: "undefined",
        explanation: "На D явно создано собственное статическое x."
      },
      {
        id: "c",
        text: "TypeError",
        explanation: "Здесь публичное static-поле, проверка приватной метки не нужна."
      },
      {
        id: "d",
        text: "4",
        explanation: "Унаследованный метод получает D и читает его собственное x."
      }
    ],
    correctOptionId: "d"
  },
  {
    id: "fe-1.4-quiz-private-imitation",
    type: "quiz",
    readMoreUrl: feSection1_4ReadMoreUrls.q16,
    question: `## Достаточно ли прототипа?

~~~js
class C {
  #x = 1;
  read() { return this.#x; }
}
const fake =
  Object.create(C.prototype);
fake.read();
~~~`,
    options: [
      {
        id: "a",
        text: "TypeError",
        explanation: "У fake есть цепочка, но нет приватной метки C. Доступ к #x бросает TypeError."
      },
      {
        id: "b",
        text: "1",
        explanation: "Object.create не выполняет конструктор и не создаёт приватные элементы C."
      },
      {
        id: "c",
        text: "undefined",
        explanation: "Неудачная проверка приватной метки бросает, а не возвращает undefined."
      },
      {
        id: "d",
        text: "SyntaxError",
        explanation: "Имя #x корректно объявлено; ошибка связана с получателем во время выполнения."
      }
    ],
    correctOptionId: "a"
  },
  {
    id: "fe-1.4-quiz-private-inherited",
    type: "quiz",
    readMoreUrl: feSection1_4ReadMoreUrls.q16,
    question: `## Совпадают ли приватные имена?

~~~js
class B { #x = 1;
  a() { return this.#x; }
}
class D extends B {
  #x = 2;
  b() { return this.#x; }
}
const d = new D();
console.log(d.a(), d.b());
~~~`,
    options: [
      {
        id: "a",
        text: "2 / 2",
        explanation: "Приватное имя наследника не переопределяет приватное имя базы."
      },
      {
        id: "b",
        text: "1 / 2",
        explanation: "У одного экземпляра два разных приватных элемента, каждый доступен коду своего класса."
      },
      {
        id: "c",
        text: "1 / 1",
        explanation: "Метод b обращается к приватному полю D, инициализированному значением 2."
      },
      {
        id: "d",
        text: "SyntaxError",
        explanation: "Разные классы могут объявлять одинаково написанные приватные имена."
      }
    ],
    correctOptionId: "b"
  },
  {
    id: "fe-1.4-quiz-private-static",
    type: "quiz",
    readMoreUrl: feSection1_4ReadMoreUrls.q16,
    question: `## Что случится с this.#x?

~~~js
class B {
  static #x = 1;
  static read() {
    return this.#x;
  }
}
class D extends B {}
D.read();
~~~`,
    options: [
      {
        id: "a",
        text: "1",
        explanation: "D наследует публичный метод, но не приватную метку статического поля B."
      },
      {
        id: "b",
        text: "undefined",
        explanation: "Неудачная проверка метки бросает исключение вместо undefined."
      },
      {
        id: "c",
        text: "TypeError",
        explanation: "Вызов передаёт D как this, а приватный static-элемент принадлежит B."
      },
      {
        id: "d",
        text: "ReferenceError",
        explanation: "Приватное имя объявлено; это ошибка получателя, а не необъявленного имени."
      }
    ],
    correctOptionId: "c"
  },
  {
    id: "fe-1.4-quiz-composition-choice",
    type: "quiz",
    readMoreUrl: feSection1_4ReadMoreUrls.q17,
    question: `## Как выразить независимые стратегии?

Сервис должен независимо заменять форматирование и сохранение. Общего жизненного цикла подклассов нет. Какой стартовый подход яснее?`,
    options: [
      {
        id: "a",
        text: "Подкласс на каждую комбинацию",
        explanation: "Комбинации стратегий множат подклассы."
      },
      {
        id: "b",
        text: "Общий изменяемый объект",
        explanation: "Общее состояние мешает изоляции разных конфигураций."
      },
      {
        id: "c",
        text: "Менять прототип перед вызовом",
        explanation: "Смена цепочки скрывает контракт операций."
      },
      {
        id: "d",
        text: "Передать операции зависимостями",
        explanation: "Композиция разделяет операции и упрощает их проверку."
      }
    ],
    correctOptionId: "d"
  },
  {
    id: "fe-1.4-quiz-hasown-in",
    type: "quiz",
    readMoreUrl: feSection1_4ReadMoreUrls.q18,
    question: `## Как различаются проверки?

~~~js
const p = { x: undefined };
const c = Object.create(p);
console.log(
  Object.hasOwn(c, "x"),
  "x" in c
);
~~~`,
    options: [
      {
        id: "a",
        text: "false / true",
        explanation: "x унаследован, поэтому hasOwn даёт false, а проверка всей цепочки in — true."
      },
      {
        id: "b",
        text: "true / true",
        explanation: "Наследование не делает свойство собственным."
      },
      {
        id: "c",
        text: "false / false",
        explanation: "Значение undefined не означает отсутствия свойства."
      },
      {
        id: "d",
        text: "true / false",
        explanation: "in видит как собственные, так и унаследованные свойства: такой результат здесь невозможен."
      }
    ],
    correctOptionId: "a",
    visual: {
      motif: "descriptor"
    }
  },
  {
    id: "fe-1.4-quiz-hidden-key",
    type: "quiz",
    readMoreUrl: feSection1_4ReadMoreUrls.q18,
    question: `## Что выберет Object.keys?

~~~js
const obj = {};
Object.defineProperty(obj, "x", {
  value: 1, enumerable: false
});
console.log(Object.keys(obj));
~~~`,
    options: [
      {
        id: "a",
        text: "[\"x\"]",
        explanation: "x собственное, но Object.keys пропускает неперечислимые свойства."
      },
      {
        id: "b",
        text: "[]",
        explanation: "Неперечислимый строковый ключ не входит в Object.keys."
      },
      {
        id: "c",
        text: "[1]",
        explanation: "Object.keys возвращает ключи, а не значения."
      },
      {
        id: "d",
        text: "undefined",
        explanation: "API возвращает массив ключей, в этом случае пустой."
      }
    ],
    correctOptionId: "b",
    visual: {
      motif: "descriptor"
    }
  },
  {
    id: "fe-1.4-quiz-symbol-ownkeys",
    type: "quiz",
    readMoreUrl: feSection1_4ReadMoreUrls.q18,
    question: `## Сколько собственных ключей?

~~~js
const s = Symbol("x");
const obj = { [s]: 1 };
console.log(
  Reflect.ownKeys(obj).length
);
~~~`,
    options: [
      {
        id: "a",
        text: "0",
        explanation: "Reflect.ownKeys включает ключи Symbol, даже если Object.keys их пропускает."
      },
      {
        id: "b",
        text: "2",
        explanation: "Описание Symbol не создаёт отдельный строковый ключ x."
      },
      {
        id: "c",
        text: "1",
        explanation: "Свойство с ключом s собственное; Reflect.ownKeys возвращает этот единственный ключ."
      },
      {
        id: "d",
        text: "TypeError",
        explanation: "Symbol — допустимый ключ свойства и результата Reflect.ownKeys."
      }
    ],
    correctOptionId: "c",
    visual: {
      motif: "descriptor"
    }
  },
  {
    id: "fe-1.4-quiz-enumeration-match",
    type: "quiz",
    readMoreUrl: feSection1_4ReadMoreUrls.q19,
    question: `## Какой API нужен?

Нужны все собственные ключи объекта: строки и Symbol, включая неперечислимые. Значения читать не требуется.`,
    options: [
      {
        id: "a",
        text: "Object.keys(obj)",
        explanation: "Object.keys выбирает только собственные перечислимые строковые ключи."
      },
      {
        id: "b",
        text: "Object.getOwnPropertyNames(obj)",
        explanation: "Этот API включает неперечислимые строки, но не Symbol."
      },
      {
        id: "c",
        text: "for...in",
        explanation: "for...in рассматривает строковые перечислимые ключи по цепочке, а не все собственные."
      },
      {
        id: "d",
        text: "Reflect.ownKeys(obj)",
        explanation: "Reflect.ownKeys включает все собственные строки и Symbol независимо от enumerable."
      }
    ],
    correctOptionId: "d",
    visual: {
      motif: "descriptor"
    }
  },
  {
    id: "fe-1.4-quiz-forin-shadow",
    type: "quiz",
    readMoreUrl: feSection1_4ReadMoreUrls.q19,
    question: `## Какие ключи соберутся?

~~~js
const p = { x: 1 };
const c = Object.create(p);
Object.defineProperty(c, "x", {
  value: 2, enumerable: false
});
const keys = [];
for (const k in c) keys.push(k);
console.log(keys);
~~~`,
    options: [
      {
        id: "a",
        text: "[]",
        explanation: "Собственный неперечислимый x скрывает одноимённый перечислимый ключ прототипа."
      },
      {
        id: "b",
        text: "[\"x\"]",
        explanation: "for...in не является простым объединением перечислимых ключей всех уровней."
      },
      {
        id: "c",
        text: "[\"x\", \"x\"]",
        explanation: "Один и тот же строковый ключ не добавляется дважды из-за разных уровней цепочки."
      },
      {
        id: "d",
        text: "[2]",
        explanation: "Цикл добавляет имена ключей, а не значения свойств."
      }
    ],
    correctOptionId: "a",
    visual: {
      motif: "descriptor"
    }
  },
  {
    id: "fe-1.4-quiz-keys-vs-values",
    type: "quiz",
    readMoreUrl: feSection1_4ReadMoreUrls.q19,
    question: `## Когда выполнится getter?

~~~js
let n = 0;
const obj = { get x() { ++n; } };
Object.keys(obj);
console.log(n);
Object.values(obj);
console.log(n);
~~~`,
    options: [
      {
        id: "a",
        text: "1 / 2",
        explanation: "У обычного объекта keys не читает значение accessor-свойства."
      },
      {
        id: "b",
        text: "0 / 1",
        explanation: "keys перечисляет имена, а values читает значение и вызывает getter один раз."
      },
      {
        id: "c",
        text: "0 / 0",
        explanation: "Object.values должен получить значение собственного перечислимого x."
      },
      {
        id: "d",
        text: "1 / 1",
        explanation: "Первый getter ещё не вызывался во время Object.keys."
      }
    ],
    correctOptionId: "b",
    visual: {
      motif: "descriptor"
    }
  },
  {
    id: "fe-1.4-quiz-mixed-descriptor",
    type: "quiz",
    readMoreUrl: feSection1_4ReadMoreUrls.q20,
    question: `## Допустим ли дескриптор?

~~~js
Object.defineProperty({}, "x", {
  value: 1,
  get() { return 2; }
});
~~~`,
    options: [
      {
        id: "a",
        text: "Свойство со значением 1",
        explanation: "Язык не выбирает value при конфликте видов дескриптора."
      },
      {
        id: "b",
        text: "Свойство со значением 2",
        explanation: "Getter не имеет приоритета над value в смешанном дескрипторе."
      },
      {
        id: "c",
        text: "TypeError",
        explanation: "Нельзя смешивать value/writable с get/set в одном дескрипторе."
      },
      {
        id: "d",
        text: "SyntaxError",
        explanation: "Синтаксис объекта допустим; отказ происходит при преобразовании дескриптора."
      }
    ],
    correctOptionId: "c",
    visual: {
      motif: "descriptor"
    }
  },
  {
    id: "fe-1.4-quiz-redefine-flags",
    type: "quiz",
    readMoreUrl: feSection1_4ReadMoreUrls.q20,
    question: `## Сбросится ли writable?

~~~js
const obj = { x: 1 };
Object.defineProperty(obj, "x", {
  value: 2
});
console.log(
  Object.getOwnPropertyDescriptor(
    obj, "x").writable
);
~~~`,
    options: [
      {
        id: "a",
        text: "false",
        explanation: "У нового свойства пропущенные флаги false, но здесь переопределяется существующее."
      },
      {
        id: "b",
        text: "undefined",
        explanation: "writable является атрибутом найденного дескриптора данных."
      },
      {
        id: "c",
        text: "TypeError",
        explanation: "Исходное свойство конфигурируемое, изменение value разрешено."
      },
      {
        id: "d",
        text: "true",
        explanation: "Пропущенный writable сохраняется от существующего свойства литерала: true."
      }
    ],
    correctOptionId: "d",
    visual: {
      motif: "descriptor"
    }
  },
  {
    id: "fe-1.4-quiz-immutable-back",
    type: "quiz",
    readMoreUrl: feSection1_4ReadMoreUrls.q20,
    question: `## Можно вернуть writable?

~~~js
const obj = {};
Object.defineProperty(obj, "x", {
  value: 1, writable: true
});
Object.defineProperty(obj, "x",
  { writable: false });
Object.defineProperty(obj, "x",
  { writable: true });
~~~`,
    options: [
      {
        id: "a",
        text: "TypeError",
        explanation: "configurable остался false. После выключения writable включить его обратно нельзя."
      },
      {
        id: "b",
        text: "Запись снова включится",
        explanation: "Переход writable true → false допустим, обратный для неконфигурируемого свойства — нет."
      },
      {
        id: "c",
        text: "Изменится enumerable",
        explanation: "Ни одно определение не запрашивает изменение enumerable."
      },
      {
        id: "d",
        text: "Тихий отказ",
        explanation: "Object.defineProperty при недопустимом определении бросает независимо от strict mode."
      }
    ],
    correctOptionId: "a",
    visual: {
      motif: "descriptor"
    }
  },
  {
    id: "fe-1.4-quiz-reflect-getter",
    type: "quiz",
    readMoreUrl: feSection1_4ReadMoreUrls.q21,
    question: `## Кто получатель getter?

~~~js
const base = {
  get x() { return this.value; }
};
const r = { value: 8 };
console.log(
  Reflect.get(base, "x", r)
);
~~~`,
    options: [
      {
        id: "a",
        text: "undefined",
        explanation: "Getter получит переданный receiver r, у которого есть value."
      },
      {
        id: "b",
        text: "8",
        explanation: "Reflect начинает поиск в base и вызывает найденный getter с this === r."
      },
      {
        id: "c",
        text: "\"x\"",
        explanation: "Ключ x выбирает свойство, но результат getter — значение r.value."
      },
      {
        id: "d",
        text: "TypeError",
        explanation: "Getter не требует приватной метки; объект r подходит как получатель."
      }
    ],
    correctOptionId: "b",
    visual: {
      motif: "descriptor"
    }
  },
  {
    id: "fe-1.4-quiz-getteronly-write",
    type: "quiz",
    readMoreUrl: feSection1_4ReadMoreUrls.q21,
    question: `## Строгая запись: что будет?

~~~js
const p = { get x() { return 1; } };
const c = Object.create(p);
c.x = 2;
~~~`,
    options: [
      {
        id: "a",
        text: "Создастся собственное x",
        explanation: "Унаследованный accessor без setter не разрешает обычное присваивание."
      },
      {
        id: "b",
        text: "Изменится getter",
        explanation: "Присваивание не заменяет функцию getter новым значением."
      },
      {
        id: "c",
        text: "TypeError",
        explanation: "Accessor не имеет setter, поэтому обычная запись отклоняется и в strict mode бросает."
      },
      {
        id: "d",
        text: "Тихий отказ",
        explanation: "Здесь явно задан строгий режим; тихого отказа не будет."
      }
    ],
    correctOptionId: "c",
    visual: {
      motif: "descriptor"
    }
  },
  {
    id: "fe-1.4-quiz-prevent-delete",
    type: "quiz",
    readMoreUrl: feSection1_4ReadMoreUrls.q22,
    question: `## Можно ли удалить свойство?

~~~js
const obj = { x: 1 };
Object.preventExtensions(obj);
delete obj.x;
console.log(
  Object.hasOwn(obj, "x")
);
~~~`,
    options: [
      {
        id: "a",
        text: "true",
        explanation: "preventExtensions не запрещает удалять существующее конфигурируемое свойство."
      },
      {
        id: "b",
        text: "TypeError",
        explanation: "x осталось конфигурируемым, поэтому удаление допустимо даже в strict mode."
      },
      {
        id: "c",
        text: "undefined",
        explanation: "Object.hasOwn всегда возвращает boolean при таком аргументе."
      },
      {
        id: "d",
        text: "false",
        explanation: "Свойство удалено: запрет расширения касается добавления, а не этой операции."
      }
    ],
    correctOptionId: "d",
    visual: {
      motif: "descriptor"
    }
  },
  {
    id: "fe-1.4-quiz-sealed-write",
    type: "quiz",
    readMoreUrl: feSection1_4ReadMoreUrls.q22,
    question: `## Что разрешает seal?

~~~js
const obj = Object.seal({ x: 1 });
obj.x = 2;
console.log(obj.x);
~~~`,
    options: [
      {
        id: "a",
        text: "2",
        explanation: "seal не выключает writable у существующего изменяемого свойства данных."
      },
      {
        id: "b",
        text: "1",
        explanation: "Запись разрешена и меняет значение."
      },
      {
        id: "c",
        text: "TypeError",
        explanation: "Свойство x всё ещё writable: true; запрещены добавление и удаление."
      },
      {
        id: "d",
        text: "undefined",
        explanation: "Свойство не удалялось и получает числовое значение 2."
      }
    ],
    correctOptionId: "a",
    visual: {
      motif: "descriptor"
    }
  },
  {
    id: "fe-1.4-quiz-frozen-nested",
    type: "quiz",
    readMoreUrl: feSection1_4ReadMoreUrls.q22,
    question: `## Что с вложенным объектом?

~~~js
const obj = Object.freeze({
  nested: { x: 1 }
});
obj.nested.x = 2;
console.log(obj.nested.x);
~~~`,
    options: [
      {
        id: "a",
        text: "1",
        explanation: "freeze не обходит вложенный граф автоматически."
      },
      {
        id: "b",
        text: "2",
        explanation: "Вложенный объект остаётся изменяемым; неизменной стала ссылка obj.nested."
      },
      {
        id: "c",
        text: "TypeError",
        explanation: "Свойство nested не переназначается, меняется поле другого объекта."
      },
      {
        id: "d",
        text: "undefined",
        explanation: "Вложенное x существует и успешно изменено."
      }
    ],
    correctOptionId: "b",
    visual: {
      motif: "descriptor"
    }
  },
  {
    id: "fe-1.4-quiz-frozen-setter",
    type: "quiz",
    readMoreUrl: feSection1_4ReadMoreUrls.q23,
    question: `## Выполнится ли setter?

~~~js
let saved = 0;
const obj = Object.freeze({
  set x(n) { saved = n; }
});
obj.x = 7;
console.log(saved);
~~~`,
    options: [
      {
        id: "a",
        text: "TypeError",
        explanation: "Заморозка не удаляет существующий setter и не запрещает исполнять его код."
      },
      {
        id: "b",
        text: "0",
        explanation: "Setter выполняется и меняет внешнюю привязку saved."
      },
      {
        id: "c",
        text: "7",
        explanation: "Accessor-дескриптор фиксирован, но его setter продолжает менять saved."
      },
      {
        id: "d",
        text: "undefined",
        explanation: "saved инициализирован и получает число 7."
      }
    ],
    correctOptionId: "c",
    visual: {
      motif: "descriptor"
    }
  },
  {
    id: "fe-1.4-quiz-frozen-private",
    type: "quiz",
    readMoreUrl: feSection1_4ReadMoreUrls.q23,
    question: `## Остановит ли freeze счётчик?

~~~js
class C {
  #x = 0;
  next() { return ++this.#x; }
}
const c = Object.freeze(new C());
console.log(c.next());
~~~`,
    options: [
      {
        id: "a",
        text: "0",
        explanation: "Приватное поле не входит в обычные дескрипторы, ограничиваемые freeze."
      },
      {
        id: "b",
        text: "TypeError",
        explanation: "Получатель — настоящий экземпляр C; приватная метка присутствует."
      },
      {
        id: "c",
        text: "undefined",
        explanation: "Метод возвращает результат предынкремента числа."
      },
      {
        id: "d",
        text: "1",
        explanation: "Заморозка обычных свойств не делает приватное поле неизменяемым."
      }
    ],
    correctOptionId: "d",
    visual: {
      motif: "descriptor"
    }
  },
  {
    id: "fe-1.4-quiz-reflect-frozen",
    type: "quiz",
    readMoreUrl: feSection1_4ReadMoreUrls.q22,
    question: `## Как Reflect сообщает отказ?

~~~js
const obj = Object.freeze({ x: 1 });
console.log(
  Reflect.set(obj, "x", 2)
);
~~~`,
    options: [
      {
        id: "a",
        text: "false",
        explanation: "Обычная запись не разрешена; Reflect.set сообщает false вместо ошибки строгого присваивания."
      },
      {
        id: "b",
        text: "TypeError",
        explanation: "Здесь прямой вызов Reflect.set, а не синтаксис строгого присваивания obj.x = 2."
      },
      {
        id: "c",
        text: "true",
        explanation: "Собственное x неизменяемо, так что успех не может быть объявлен."
      },
      {
        id: "d",
        text: "2",
        explanation: "Reflect.set возвращает boolean успеха, а не записанное значение."
      }
    ],
    correctOptionId: "a",
    visual: {
      motif: "descriptor"
    }
  },
  {
    id: "fe-1.4-quiz-proxy-getreceiver",
    type: "quiz",
    readMoreUrl: feSection1_4ReadMoreUrls.q25,
    question: `## Чьё name прочитает getter?

~~~js
const t = {
  get x() { return this.name; }
};
const p = new Proxy(t, {
  get: (t,k,r) => Reflect.get(t,k,r)
});
const c = Object.create(p);
c.name = "child";
console.log(c.x);
~~~`,
    options: [
      {
        id: "a",
        text: "undefined",
        explanation: "Перехватчик сохранил c как receiver, поэтому getter найдёт c.name."
      },
      {
        id: "b",
        text: "\"child\"",
        explanation: "Reflect.get сохраняет исходного получателя c через цепочку Proxy и getter."
      },
      {
        id: "c",
        text: "\"target\"",
        explanation: "На t нет поля name со значением \"target\"; getter не закреплён за t."
      },
      {
        id: "d",
        text: "TypeError",
        explanation: "Приватных полей и ограничивающих инвариантов здесь нет."
      }
    ],
    correctOptionId: "b",
    visual: {
      motif: "interception"
    }
  },
  {
    id: "fe-1.4-quiz-set-forgot-return",
    type: "quiz",
    readMoreUrl: feSection1_4ReadMoreUrls.q24,
    question: `## Строгий режим: итог записи?

~~~js
const t = {};
const p = new Proxy(t, {
  set(t,k,v) { t[k] = v; }
});
p.x = 7;
~~~`,
    options: [
      {
        id: "a",
        text: "Успех, t.x равно 7",
        explanation: "Изменение состоялось, но trap вернул undefined, что означает неуспех."
      },
      {
        id: "b",
        text: "Тихий отказ, t.x нет",
        explanation: "Код trap выполнился, а строгий синтаксис присваивания не допускает тихого отказа."
      },
      {
        id: "c",
        text: "TypeError, но t.x равно 7",
        explanation: "После изменения trap сообщил неуспех через undefined; strict mode бросает без отката."
      },
      {
        id: "d",
        text: "TypeError, t.x нет",
        explanation: "Ошибка после возврата trap не откатывает уже выполненное t[k] = v."
      }
    ],
    correctOptionId: "c",
    visual: {
      motif: "interception"
    }
  },
  {
    id: "fe-1.4-quiz-proxy-invariant",
    type: "quiz",
    readMoreUrl: feSection1_4ReadMoreUrls.q26,
    question: `## Может ли get вернуть другое?

~~~js
const t = {};
Object.defineProperty(t, "x",
  { value: 1 });
const p = new Proxy(t, {
  get() { return 9; }
});
console.log(p.x);
~~~`,
    options: [
      {
        id: "a",
        text: "9",
        explanation: "Trap не может подменить значение такого фиксированного собственного свойства."
      },
      {
        id: "b",
        text: "1",
        explanation: "Язык не исправляет результат trap на значение target: он отклоняет противоречие."
      },
      {
        id: "c",
        text: "undefined",
        explanation: "Нарушение инварианта бросает исключение, а не возвращает undefined."
      },
      {
        id: "d",
        text: "TypeError",
        explanation: "Новый дескриптор имеет writable: false и configurable: false; get нарушает инвариант."
      }
    ],
    correctOptionId: "d",
    visual: {
      motif: "interception"
    }
  },
  {
    id: "fe-1.4-quiz-revoked-typeof",
    type: "quiz",
    readMoreUrl: feSection1_4ReadMoreUrls.q26,
    question: `## Что после revoke?

~~~js
const { proxy, revoke } =
  Proxy.revocable({ x: 1 }, {});
revoke();
console.log(typeof proxy);
~~~`,
    options: [
      {
        id: "a",
        text: "\"object\"",
        explanation: "typeof не обращается к отозванным внутренним методам этого объектного Proxy."
      },
      {
        id: "b",
        text: "TypeError",
        explanation: "Чтение proxy.x бросило бы, но здесь выполняется typeof."
      },
      {
        id: "c",
        text: "\"undefined\"",
        explanation: "Отзыв не удаляет переменную и не превращает Proxy в undefined."
      },
      {
        id: "d",
        text: "null",
        explanation: "typeof возвращает строку, а объект не заменяется на null."
      }
    ],
    correctOptionId: "a",
    visual: {
      motif: "interception"
    }
  },
  {
    id: "fe-1.4-quiz-proxy-choice",
    type: "quiz",
    readMoreUrl: feSection1_4ReadMoreUrls.q27,
    question: `## Нужен ли общий перехват?

Требуется проверить аргументы двух известных операций и логировать их ошибки. Произвольные операции со свойствами перехватывать не нужно. С чего начать?`,
    options: [
      {
        id: "a",
        text: "Proxy для всего объекта",
        explanation: "Общий перехват добавляет вопросы receiver, идентичности и инвариантов без требования задачи."
      },
      {
        id: "b",
        text: "С явных методов или адаптера",
        explanation: "Явный API выражает две известные операции, их проверку и ошибки напрямую."
      },
      {
        id: "c",
        text: "С приватного static-поля",
        explanation: "Место хранения одного поля само по себе не определяет нужные операции и обработку ошибок."
      },
      {
        id: "d",
        text: "Менять prototype при ошибке",
        explanation: "Динамическая цепочка не решает проверку аргументов и делает контракт менее предсказуемым."
      }
    ],
    correctOptionId: "b",
    visual: {
      motif: "interception"
    }
  },
  {
    id: "fe-1.4-quiz-diagnose-shared-state",
    type: "quiz",
    readMoreUrl: feSection1_4ReadMoreUrls.q28,
    question: `## Где исправить общее состояние?

~~~js
const base = { state: { n: 0 } };
const a = Object.create(base);
const b = Object.create(base);
a.state.n++;
console.log(b.state.n);
~~~`,
    options: [
      {
        id: "a",
        text: "Создавать state на каждом экземпляре",
        explanation: "Оба объекта находят одну изменяемую ссылку base.state. Собственное состояние изолирует их."
      },
      {
        id: "b",
        text: "Сделать base неперечислимым",
        explanation: "Перечисляемость не меняет чтение общей вложенной ссылки."
      },
      {
        id: "c",
        text: "Заменить const на let",
        explanation: "Вид привязки имени не меняет прототипы и владение объектом state."
      },
      {
        id: "d",
        text: "Привязать методы через bind",
        explanation: "Здесь нет потери this; проблема в общем месте хранения данных."
      }
    ],
    correctOptionId: "a"
  },
  {
    id: "fe-1.4-quiz-choose-property-operation",
    type: "quiz",
    readMoreUrl: feSection1_4ReadMoreUrls.q28,
    question: `## Какая операция нужна?

Расширяемый объект наследует getter \`x\` без setter. Нужно намеренно создать собственное свойство данных \`x\`, не вызывая код прототипа.`,
    options: [
      {
        id: "a",
        text: "obj.x = 1 в строгом режиме",
        explanation: "Обычное присваивание встретит accessor без setter и будет отклонено."
      },
      {
        id: "b",
        text: "Object.assign(obj, { x: 1 })",
        explanation: "assign не обходит accessor без setter."
      },
      {
        id: "c",
        text: "Object.defineProperty: value",
        explanation: "defineProperty создаёт своё свойство без поиска setter."
      },
      {
        id: "d",
        text: "Reflect.set(obj, \"x\", 1)",
        explanation: "Reflect.set повторит запись и сообщит отказ."
      }
    ],
    correctOptionId: "c",
    visual: {
      motif: "descriptor"
    }
  },
  {
    id: "fe-1.4-quiz-validate-before-write",
    type: "quiz",
    readMoreUrl: feSection1_4ReadMoreUrls.q21,
    question: `## Как сохранить старое значение?

~~~js
let saved = 1;
const obj = {
  set x(n) {
    saved = n;
    if (n < 0) throw RangeError();
  }
};
try { obj.x = -1; } catch {}
console.log(saved);
~~~`,
    options: [
      {
        id: "a",
        text: "Проверить n до изменения saved",
        explanation: "Сначала проверьте вход, затем меняйте состояние. При отклонении прежнее значение останется."
      },
      {
        id: "b",
        text: "После throw присвоить saved = 1",
        explanation: "После throw код недостижим; 1 не всегда прежнее значение."
      },
      {
        id: "c",
        text: "Перенести saved в прототип",
        explanation: "Место хранения не исправляет порядок проверки и изменения."
      },
      {
        id: "d",
        text: "Заморозить obj с тем же setter",
        explanation: "freeze не запрещает выполнять код существующего setter."
      }
    ],
    correctOptionId: "a",
    visual: {
      motif: "descriptor"
    }
  },
  {
    id: "fe-1.4-quiz-proxy-validation-rule",
    type: "quiz",
    readMoreUrl: feSection1_4ReadMoreUrls.q24,
    question: `## Как отклонить неверный count?

Trap set должен принимать только неотрицательные целые числа. Какое условие выявляет недопустимое значение \`n\` до передачи записи в Reflect.set?`,
    options: [
      {
        id: "a",
        text: "n < 0",
        explanation: "Это пропускает дроби, NaN и некоторые значения другого типа."
      },
      {
        id: "b",
        text: "!Number.isInteger(n) || n < 0",
        explanation: "Условие отклоняет нецелые значения любого типа и отрицательные целые; 0 остаётся допустимым."
      },
      {
        id: "c",
        text: "typeof n !== \"number\" && n < 0",
        explanation: "Нужен ||: достаточно любого неверного признака."
      },
      {
        id: "d",
        text: "!n",
        explanation: "Так допустимый 0 будет отклонён, а многие неподходящие значения останутся допустимыми."
      }
    ],
    correctOptionId: "b",
    visual: {
      motif: "interception"
    }
  }
];
