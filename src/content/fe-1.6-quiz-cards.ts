import { feSection1_6ReadMoreUrls } from "./fe-1.6-source-urls";
import type { QuizCardData } from "./card-types";

// MOS-42: owner-approved subsection 1.6 coverage and presentation.
export const feSection1_6QuizCards: QuizCardData[] = [
  {
    id: "fe-1.6-quiz-symbol-description",
    type: "quiz",
    readMoreUrl: feSection1_6ReadMoreUrls.q12,
    question: `## Что выведет код?

~~~js
const a = Symbol("id");
const b = Symbol("id");
console.log(a === b);
~~~`,
    options: [
      {
        id: "a",
        text: "true",
        explanation: "Описание помогает отладке, но не объединяет символы."
      },
      {
        id: "b",
        text: "false",
        explanation: "Каждый Symbol() создаёт новый символ, даже при одинаковом описании."
      },
      {
        id: "c",
        text: "undefined",
        explanation: "Сравнение === возвращает boolean."
      },
      {
        id: "d",
        text: "TypeError",
        explanation: "Сравнивать символы через === разрешено."
      }
    ],
    correctOptionId: "b",
    visual: {
      motif: "tokens"
    }
  },
  {
    id: "fe-1.6-quiz-presence",
    type: "quiz",
    readMoreUrl: feSection1_6ReadMoreUrls.q1,
    question: `## Что выведет код?

~~~js
const m = new Map([[1,
  undefined]]);
console.log(m.has(1), m.has(2));
~~~`,
    options: [
      {
        id: "a",
        text: "true / true",
        explanation: "Второго ключа нет."
      },
      {
        id: "b",
        text: "false / false",
        explanation: "Первый ключ сохранён, несмотря на undefined."
      },
      {
        id: "c",
        text: "true / false",
        explanation: "has проверяет наличие записи, а не её значение."
      },
      {
        id: "d",
        text: "false / true",
        explanation: "Ключ 1 есть, ключа 2 нет."
      }
    ],
    correctOptionId: "c"
  },
  {
    id: "fe-1.6-quiz-property-assignment",
    type: "quiz",
    readMoreUrl: feSection1_6ReadMoreUrls.q1,
    question: `## Что выведет код?

~~~js
const m = new Map();
m.ready = true;
console.log(m.size);
~~~`,
    options: [
      {
        id: "a",
        text: "1",
        explanation: "Обычное свойство не увеличивает коллекцию."
      },
      {
        id: "b",
        text: "0",
        explanation: "Запись через свойство не вызывает Map.set."
      },
      {
        id: "c",
        text: "undefined",
        explanation: "size возвращает число записей."
      },
      {
        id: "d",
        text: "TypeError",
        explanation: "Экземпляру Map разрешено добавлять свойства."
      }
    ],
    correctOptionId: "b"
  },
  {
    id: "fe-1.6-quiz-typed-keys",
    type: "quiz",
    readMoreUrl: feSection1_6ReadMoreUrls.q2,
    question: `## Что выведет код?

~~~js
const m = new Map([[7, "n"], [
  "7", "s"]]);
console.log(m.size);
~~~`,
    options: [
      {
        id: "a",
        text: "1",
        explanation: "Map не приводит ключи к строке."
      },
      {
        id: "b",
        text: "0",
        explanation: "Конструктор добавляет обе записи."
      },
      {
        id: "c",
        text: "2",
        explanation: "Число и строка являются разными ключами."
      },
      {
        id: "d",
        text: "TypeError",
        explanation: "Оба ключа допустимы."
      }
    ],
    correctOptionId: "c"
  },
  {
    id: "fe-1.6-quiz-nan-zero",
    type: "quiz",
    readMoreUrl: feSection1_6ReadMoreUrls.q2,
    question: `## Что выведет код?

~~~js
const m = new Map();
m.set(NaN, 1).set(NaN, 2);
m.set(-0, 3).set(+0, 4);
console.log(m.size);
~~~`,
    options: [
      {
        id: "a",
        text: "4",
        explanation: "Повторы NaN и обоих нулей объединяются."
      },
      {
        id: "b",
        text: "3",
        explanation: "Объединяются обе пары, а не только одна."
      },
      {
        id: "c",
        text: "0",
        explanation: "Коллекция содержит записи."
      },
      {
        id: "d",
        text: "2",
        explanation: "NaN совпадает с NaN, а оба нуля — друг с другом."
      }
    ],
    correctOptionId: "d"
  },
  {
    id: "fe-1.6-quiz-object-key",
    type: "quiz",
    readMoreUrl: feSection1_6ReadMoreUrls.q2,
    question: `## Что выведет код?

~~~js
const row = { id: 7 };
const m = new Map([[row, 1]]);
console.log(m.has({ id: 7 }));
~~~`,
    options: [
      {
        id: "a",
        text: "false",
        explanation: "Новый литерал создаёт другой объект-ключ."
      },
      {
        id: "b",
        text: "true",
        explanation: "Равные поля не объединяют объекты."
      },
      {
        id: "c",
        text: "undefined",
        explanation: "has возвращает boolean."
      },
      {
        id: "d",
        text: "TypeError",
        explanation: "Объект допустим как ключ."
      }
    ],
    correctOptionId: "a"
  },
  {
    id: "fe-1.6-quiz-update-order",
    type: "quiz",
    readMoreUrl: feSection1_6ReadMoreUrls.q3,
    question: `## Что выведет код?

~~~js
const m = new Map([["a", 1], [
  "b", 2]]);
m.set("a", 3);
console.log([...m.keys()]);
~~~`,
    options: [
      {
        id: "a",
        text: "[\"b\", \"a\"]",
        explanation: "Обновление не перемещает ключ."
      },
      {
        id: "b",
        text: "[\"a\", \"a\", \"b\"]",
        explanation: "Один ключ хранится только один раз."
      },
      {
        id: "c",
        text: "[\"a\", \"b\"]",
        explanation: "Повторный set меняет значение на прежнем месте."
      },
      {
        id: "d",
        text: "[\"a\"]",
        explanation: "Обновление не удаляет b."
      }
    ],
    correctOptionId: "c"
  },
  {
    id: "fe-1.6-quiz-live-delete",
    type: "quiz",
    readMoreUrl: feSection1_6ReadMoreUrls.q4,
    question: `## Что выведет код?

~~~js
const m = new Map([["a", 1], [
  "b", 2]]);
const it = m.keys();
it.next();
m.delete("b");
console.log([...it]);
~~~`,
    options: [
      {
        id: "a",
        text: "[\"b\"]",
        explanation: "Удалённая до посещения запись пропускается."
      },
      {
        id: "b",
        text: "[]",
        explanation: "Курсор уже прошёл a, а b удалён."
      },
      {
        id: "c",
        text: "[\"a\", \"b\"]",
        explanation: "Курсор не начинается заново."
      },
      {
        id: "d",
        text: "TypeError",
        explanation: "Менять Map во время обхода разрешено."
      }
    ],
    correctOptionId: "b"
  },
  {
    id: "fe-1.6-quiz-json-map",
    type: "quiz",
    readMoreUrl: feSection1_6ReadMoreUrls.q5,
    question: `## Что выведет код?

~~~js
console.log(JSON.stringify(
  new Map([["id", 7]])
));
~~~`,
    options: [
      {
        id: "a",
        text: "\"{}\"",
        explanation: "JSON.stringify не перечисляет внутренние записи обычного Map."
      },
      {
        id: "b",
        text: "\"[[\\\"id\\\",7]]\"",
        explanation: "Пары нужно получить явно через spread."
      },
      {
        id: "c",
        text: "{}",
        explanation: "Возвращается строка, а не объект."
      },
      {
        id: "d",
        text: "TypeError",
        explanation: "Сам обычный Map не вызывает ошибку сериализации."
      }
    ],
    correctOptionId: "a"
  },
  {
    id: "fe-1.6-quiz-set-objects",
    type: "quiz",
    readMoreUrl: feSection1_6ReadMoreUrls.q6,
    question: `## Что выведет код?

~~~js
const row = { id: 7 };
console.log(new Set([row, row, {
  id:7}]).size);
~~~`,
    options: [
      {
        id: "a",
        text: "1",
        explanation: "Два разных объекта не сливаются по id."
      },
      {
        id: "b",
        text: "3",
        explanation: "Повтор той же ссылки объединяется."
      },
      {
        id: "c",
        text: "2",
        explanation: "Один повтор ссылки и один новый объект дают две записи."
      },
      {
        id: "d",
        text: "0",
        explanation: "Set получает значения из массива."
      }
    ],
    correctOptionId: "c"
  },
  {
    id: "fe-1.6-quiz-set-zero",
    type: "quiz",
    readMoreUrl: feSection1_6ReadMoreUrls.q6,
    question: `## Что выведет код?

~~~js
console.log(new Set([-0, +0,
  "0"]).size);
~~~`,
    options: [
      {
        id: "a",
        text: "3",
        explanation: "Оба числовых нуля совпадают."
      },
      {
        id: "b",
        text: "2",
        explanation: "Числовые нули объединяются, строка остаётся отдельно."
      },
      {
        id: "c",
        text: "1",
        explanation: "Строка не совпадает с числом."
      },
      {
        id: "d",
        text: "TypeError",
        explanation: "Все эти значения допустимы."
      }
    ],
    correctOptionId: "b"
  },
  {
    id: "fe-1.6-quiz-first-winner",
    type: "quiz",
    readMoreUrl: feSection1_6ReadMoreUrls.q6,
    question: "## Как сохранить первую строку каждого id?",
    options: [
      {
        id: "a",
        text: "Проверять Set ID до добавления",
        explanation: "Проверка до добавления сохраняет первый исходный объект."
      },
      {
        id: "b",
        text: "Вызвать new Set(rows)",
        explanation: "Set объектов сравнивает их идентичности."
      },
      {
        id: "c",
        text: "Обновлять Map на каждой строке",
        explanation: "Так побеждает последняя запись по ID."
      },
      {
        id: "d",
        text: "Сортировать по id без удаления",
        explanation: "Сортировка сама не удаляет повтор ID."
      }
    ],
    correctOptionId: "a"
  },
  {
    id: "fe-1.6-quiz-last-winner-order",
    type: "quiz",
    readMoreUrl: feSection1_6ReadMoreUrls.q6,
    question: "## Map обновляют по id. Кто побеждает?",
    options: [
      {
        id: "a",
        text: "Первая строка; порядок первых ID",
        explanation: "Повторный set заменяет сохранённую строку."
      },
      {
        id: "b",
        text: "Последняя; порядок последних ID",
        explanation: "Обновление не перемещает существующий ключ."
      },
      {
        id: "c",
        text: "Случайная строка; порядок не задан",
        explanation: "Правило обновления и порядок заданы."
      },
      {
        id: "d",
        text: "Последняя; порядок первых ID",
        explanation: "Новое значение заменяет старое без перестановки ключа."
      }
    ],
    correctOptionId: "d"
  },
  {
    id: "fe-1.6-quiz-set-intersection",
    type: "quiz",
    readMoreUrl: feSection1_6ReadMoreUrls.q7,
    question: `## Среда с Set.intersection. Результат?

~~~js
const a = new Set([3, 1, 2]);
const b = new Set([2, 3]);
console.log([...a.intersection(
  b)]);
~~~`,
    options: [
      {
        id: "a",
        text: "[3, 2]",
        explanation: "Здесь меньший правый набор задаёт порядок."
      },
      {
        id: "b",
        text: "[2, 3]",
        explanation: "Пересечение следует порядку меньшего b."
      },
      {
        id: "c",
        text: "[3, 1, 2]",
        explanation: "Это не объединение наборов."
      },
      {
        id: "d",
        text: "[1]",
        explanation: "1 отсутствует в правом наборе."
      }
    ],
    correctOptionId: "b"
  },
  {
    id: "fe-1.6-quiz-group-key",
    type: "quiz",
    readMoreUrl: feSection1_6ReadMoreUrls.q7,
    question: "## Группировать по объекту команды. Что выбрать?",
    options: [
      {
        id: "a",
        text: "Object.groupBy с объектным ключом",
        explanation: "Объектный результат функции станет ключом свойства."
      },
      {
        id: "b",
        text: "JSON.stringify каждой команды",
        explanation: "Сериализация не сохраняет идентичность команды."
      },
      {
        id: "c",
        text: "Map.groupBy с исходным объектом",
        explanation: "Map.groupBy сохраняет объектный ключ по идентичности."
      },
      {
        id: "d",
        text: "Set всех строк без группировки",
        explanation: "Set не строит группы по ключу."
      }
    ],
    correctOptionId: "c"
  },
  {
    id: "fe-1.6-quiz-weak-metadata",
    type: "quiz",
    readMoreUrl: feSection1_6ReadMoreUrls.q9,
    question: "## Размеры временных объектов по экземпляру: что подходит?",
    options: [
      {
        id: "a",
        text: "WeakMap",
        explanation: "WeakMap связывает значение с экземпляром, не удерживая ключ самой записью."
      },
      {
        id: "b",
        text: "Set строковых ID",
        explanation: "Set ID не хранит размер по экземпляру."
      },
      {
        id: "c",
        text: "WeakRef без восстановления",
        explanation: "WeakRef даёт цель, а не таблицу метаданных."
      },
      {
        id: "d",
        text: "Обычный объект с ключом row",
        explanation: "Объектный ключ свойства приводится к строке."
      }
    ],
    correctOptionId: "a"
  },
  {
    id: "fe-1.6-quiz-weak-enumeration",
    type: "quiz",
    readMoreUrl: feSection1_6ReadMoreUrls.q9,
    question: "## Нужно перечислить все активные ID. Что выбрать?",
    options: [
      {
        id: "a",
        text: "WeakSet",
        explanation: "WeakSet нельзя перечислить, примитивные ID обычно не подходят."
      },
      {
        id: "b",
        text: "Явно управляемый Set ID",
        explanation: "Сильный Set перечисляем; удаление задаётся явно."
      },
      {
        id: "c",
        text: "WeakMap.keys()",
        explanation: "У WeakMap нет keys."
      },
      {
        id: "d",
        text: "WeakRef.size",
        explanation: "У WeakRef нет размера коллекции."
      }
    ],
    correctOptionId: "b"
  },
  {
    id: "fe-1.6-quiz-weak-invalid-read",
    type: "quiz",
    readMoreUrl: feSection1_6ReadMoreUrls.q10,
    question: `## Что выведет код?

~~~js
const w = new WeakMap();
console.log(w.has(7), w.get(7));
~~~`,
    options: [
      {
        id: "a",
        text: "TypeError",
        explanation: "Запрос с недопустимым ключом не равен операции записи."
      },
      {
        id: "b",
        text: "true / undefined",
        explanation: "Запись с таким ключом не могла быть добавлена."
      },
      {
        id: "c",
        text: "false / undefined",
        explanation: "has даёт false, get — undefined."
      },
      {
        id: "d",
        text: "false / null",
        explanation: "get возвращает undefined, а не null."
      }
    ],
    correctOptionId: "c"
  },
  {
    id: "fe-1.6-quiz-weak-invalid-write",
    type: "quiz",
    readMoreUrl: feSection1_6ReadMoreUrls.q10,
    question: `## Что выведет код?

~~~js
const w = new WeakMap();
w.set(Symbol.for("row"), 7);
~~~`,
    options: [
      {
        id: "a",
        text: "7",
        explanation: "Операция записи не принимает зарегистрированный символ."
      },
      {
        id: "b",
        text: "undefined",
        explanation: "Запись отклоняется исключением."
      },
      {
        id: "c",
        text: "false",
        explanation: "set не возвращает boolean."
      },
      {
        id: "d",
        text: "TypeError",
        explanation: "Символ из общего реестра нельзя держать как слабую цель."
      }
    ],
    correctOptionId: "d"
  },
  {
    id: "fe-1.6-quiz-weak-target",
    type: "quiz",
    readMoreUrl: feSection1_6ReadMoreUrls.q10,
    question: "## Какая цель допустима в современном WeakRef?",
    options: [
      {
        id: "a",
        text: "Symbol.for(\"row\")",
        explanation: "Зарегистрированные символы недопустимы."
      },
      {
        id: "b",
        text: "Число 7",
        explanation: "Числа недопустимы как слабая цель."
      },
      {
        id: "c",
        text: "Строка \"row\"",
        explanation: "Строки недопустимы как слабая цель."
      },
      {
        id: "d",
        text: "Незарегистрированный Symbol(\"row\")",
        explanation: "Современный стандарт допускает незарегистрированные символы."
      }
    ],
    correctOptionId: "d"
  },
  {
    id: "fe-1.6-quiz-external-root",
    type: "quiz",
    readMoreUrl: feSection1_6ReadMoreUrls.q10,
    question: "## Живой массив хранит value, а value ссылается на ключ WeakMap. Что верно?",
    options: [
      {
        id: "a",
        text: "WeakMap отменяет сильную цепочку",
        explanation: "Слабая запись не отменяет внешние сильные ссылки."
      },
      {
        id: "b",
        text: "Массив может удерживать ключ",
        explanation: "Массив → value → ключ образует сильную цепочку."
      },
      {
        id: "c",
        text: "Ключ соберётся в следующем tick",
        explanation: "Момент сборки не гарантирован."
      },
      {
        id: "d",
        text: "Значение WeakMap всегда слабое",
        explanation: "Значение доступно через карту при достижимом ключе."
      }
    ],
    correctOptionId: "b"
  },
  {
    id: "fe-1.6-quiz-weakref-test",
    type: "quiz",
    readMoreUrl: feSection1_6ReadMoreUrls.q11,
    question: "## Как проверить восстановление при промахе deref?",
    options: [
      {
        id: "a",
        text: "Сбросить ссылку и сразу ждать GC",
        explanation: "Обнуление ссылки не гарантирует сборку."
      },
      {
        id: "b",
        text: "Ждать фиксированные 100 ms",
        explanation: "Фиксированная задержка не гарантирует сборку."
      },
      {
        id: "c",
        text: "Подставить deref: () => undefined",
        explanation: "Подставной промах детерминированно проверяет ветку восстановления."
      },
      {
        id: "d",
        text: "Проверить размер WeakRef",
        explanation: "У WeakRef нет size."
      }
    ],
    correctOptionId: "c"
  },
  {
    id: "fe-1.6-quiz-symbol-registry",
    type: "quiz",
    readMoreUrl: feSection1_6ReadMoreUrls.q12,
    question: `## Что выведет код?

~~~js
console.log(
  Symbol.for("id") === Symbol
  .for("id")
);
~~~`,
    options: [
      {
        id: "a",
        text: "false",
        explanation: "Реестр возвращает один символ по этому ключу."
      },
      {
        id: "b",
        text: "true",
        explanation: "Одинаковый ключ Symbol.for даёт ту же идентичность."
      },
      {
        id: "c",
        text: "undefined",
        explanation: "=== возвращает boolean."
      },
      {
        id: "d",
        text: "TypeError",
        explanation: "Операции реестра допустимы."
      }
    ],
    correctOptionId: "b",
    visual: {
      motif: "tokens"
    }
  },
  {
    id: "fe-1.6-quiz-symbol-keyfor",
    type: "quiz",
    readMoreUrl: feSection1_6ReadMoreUrls.q12,
    question: `## Что выведет код?

~~~js
console.log(Symbol.keyFor(Symbol(
  "id")));
~~~`,
    options: [
      {
        id: "a",
        text: "\"id\"",
        explanation: "Описание локального символа не является ключом реестра."
      },
      {
        id: "b",
        text: "null",
        explanation: "Отсутствие регистрации обозначается undefined."
      },
      {
        id: "c",
        text: "undefined",
        explanation: "Локальный символ не зарегистрирован в общем реестре."
      },
      {
        id: "d",
        text: "TypeError",
        explanation: "Аргумент является символом, поэтому вызов допустим."
      }
    ],
    correctOptionId: "c",
    visual: {
      motif: "tokens"
    }
  },
  {
    id: "fe-1.6-quiz-symbol-private",
    type: "quiz",
    readMoreUrl: feSection1_6ReadMoreUrls.q13,
    question: "## Как найти собственный символьный ключ объекта?",
    options: [
      {
        id: "a",
        text: "Object.keys",
        explanation: "Object.keys перечисляет только строковые ключи."
      },
      {
        id: "b",
        text: "for...in",
        explanation: "for...in пропускает символы."
      },
      {
        id: "c",
        text: "Reflect.ownKeys",
        explanation: "Reflect.ownKeys включает строковые и символьные ключи."
      },
      {
        id: "d",
        text: "JSON.stringify",
        explanation: "JSON пропускает символьные ключи свойств."
      }
    ],
    correctOptionId: "c",
    visual: {
      motif: "tokens"
    }
  },
  {
    id: "fe-1.6-quiz-symbol-spread",
    type: "quiz",
    readMoreUrl: feSection1_6ReadMoreUrls.q13,
    question: `## Что выведет код?

~~~js
const key = Symbol("x");
const source = { [key]: 7 };
console.log(({ ...source })[
  key]);
~~~`,
    options: [
      {
        id: "a",
        text: "undefined",
        explanation: "Собственное перечисляемое символьное свойство копируется."
      },
      {
        id: "b",
        text: "7",
        explanation: "Spread переносит это свойство с тем же символом-ключом."
      },
      {
        id: "c",
        text: "\"7\"",
        explanation: "Значение не приводится к строке."
      },
      {
        id: "d",
        text: "TypeError",
        explanation: "Символьные ключи разрешены в объекте."
      }
    ],
    correctOptionId: "b",
    visual: {
      motif: "tokens"
    }
  },
  {
    id: "fe-1.6-quiz-exact-iterator-key",
    type: "quiz",
    readMoreUrl: feSection1_6ReadMoreUrls.q12,
    question: "## Метод обхода назван Symbol.for(\"Symbol.iterator\"). Как исправить?",
    options: [
      {
        id: "a",
        text: "Заменить на строку \"iterator\"",
        explanation: "Строковый ключ не является известным символом."
      },
      {
        id: "b",
        text: "Использовать Symbol.iterator",
        explanation: "Язык ищет точный well-known symbol."
      },
      {
        id: "c",
        text: "Добавить length",
        explanation: "length не создаёт протокол обхода."
      },
      {
        id: "d",
        text: "Переименовать в Symbol(\"iterator\")",
        explanation: "Новый локальный символ имеет другую идентичность."
      }
    ],
    correctOptionId: "b",
    visual: {
      motif: "tokens"
    }
  },
  {
    id: "fe-1.6-quiz-iterable-contract",
    type: "quiz",
    readMoreUrl: feSection1_6ReadMoreUrls.q14,
    question: "## Что должен вернуть вызов Symbol.iterator?",
    options: [
      {
        id: "a",
        text: "Массив значений обязательно",
        explanation: "Метод может вернуть итератор без массива."
      },
      {
        id: "b",
        text: "Следующий элемент напрямую",
        explanation: "Элементы выдаёт next итератора."
      },
      {
        id: "c",
        text: "Итератор с методом next",
        explanation: "Метод открывает конкретный обход."
      },
      {
        id: "d",
        text: "Число оставшихся элементов",
        explanation: "Размер не заменяет итератор."
      }
    ],
    correctOptionId: "c",
    visual: {
      motif: "cursor"
    }
  },
  {
    id: "fe-1.6-quiz-done-undefined",
    type: "quiz",
    readMoreUrl: feSection1_6ReadMoreUrls.q14,
    question: `## Что выведет код?

~~~js
function* g() {
  yield undefined; }
console.log(g().next().done);
~~~`,
    options: [
      {
        id: "a",
        text: "true",
        explanation: "undefined может быть обычным элементом."
      },
      {
        id: "b",
        text: "undefined",
        explanation: "У результата есть done: false."
      },
      {
        id: "c",
        text: "false",
        explanation: "Первый шаг выдаёт элемент и ещё не завершает обход."
      },
      {
        id: "d",
        text: "TypeError",
        explanation: "yield undefined допустим."
      }
    ],
    correctOptionId: "c",
    visual: {
      motif: "cursor"
    }
  },
  {
    id: "fe-1.6-quiz-arraylike-spread",
    type: "quiz",
    readMoreUrl: feSection1_6ReadMoreUrls.q15,
    question: `## Что выведет код?

~~~js
const x = { 0: "a", length: 1 };
console.log([...x]);
~~~`,
    options: [
      {
        id: "a",
        text: "[\"a\"]",
        explanation: "Массивоподобности без итератора недостаточно."
      },
      {
        id: "b",
        text: "[]",
        explanation: "Spread не читает такой вход как пустую коллекцию."
      },
      {
        id: "c",
        text: "[undefined]",
        explanation: "Spread не переключается на чтение индексов."
      },
      {
        id: "d",
        text: "TypeError",
        explanation: "У обычного объекта отсутствует Symbol.iterator."
      }
    ],
    correctOptionId: "d",
    visual: {
      motif: "cursor"
    }
  },
  {
    id: "fe-1.6-quiz-arrayfrom-like",
    type: "quiz",
    readMoreUrl: feSection1_6ReadMoreUrls.q15,
    question: `## Что выведет код?

~~~js
const x = { 0: "a", length: 1 };
console.log(Array.from(x));
~~~`,
    options: [
      {
        id: "a",
        text: "[\"a\"]",
        explanation: "Array.from поддерживает массивоподобный вход без итератора."
      },
      {
        id: "b",
        text: "[]",
        explanation: "Индекс 0 попадает в результат по length."
      },
      {
        id: "c",
        text: "TypeError",
        explanation: "Этот вход допустим для Array.from."
      },
      {
        id: "d",
        text: "[\"0\", \"length\"]",
        explanation: "Метод не перечисляет имена свойств."
      }
    ],
    correctOptionId: "a",
    visual: {
      motif: "cursor"
    }
  },
  {
    id: "fe-1.6-quiz-for-in",
    type: "quiz",
    readMoreUrl: feSection1_6ReadMoreUrls.q15,
    question: "## Что перечисляет for...in?",
    options: [
      {
        id: "a",
        text: "Значения через Symbol.iterator",
        explanation: "Итератор значений использует for...of."
      },
      {
        id: "b",
        text: "Только собственные строковые ключи",
        explanation: "Унаследованные перечисляемые ключи тоже входят."
      },
      {
        id: "c",
        text: "Все ключи, включая символы",
        explanation: "Символы пропускаются."
      },
      {
        id: "d",
        text: "Перечисляемые строковые ключи цепочки",
        explanation: "for...in проходит строковые перечисляемые свойства, включая унаследованные."
      }
    ],
    correctOptionId: "d",
    visual: {
      motif: "cursor"
    }
  },
  {
    id: "fe-1.6-quiz-independent-state",
    type: "quiz",
    readMoreUrl: feSection1_6ReadMoreUrls.q16,
    question: "## Где хранить позицию независимого ручного обхода?",
    options: [
      {
        id: "a",
        text: "В общем поле исходной коллекции",
        explanation: "Общее поле связывает два обхода."
      },
      {
        id: "b",
        text: "В каждом новом итераторе",
        explanation: "Каждый курсор получает своё состояние при открытии."
      },
      {
        id: "c",
        text: "В globalThis",
        explanation: "Глобальная позиция связывает всех потребителей."
      },
      {
        id: "d",
        text: "В Symbol.iterator как числе",
        explanation: "Symbol.iterator должен обозначать вызываемый метод."
      }
    ],
    correctOptionId: "b",
    visual: {
      motif: "cursor"
    }
  },
  {
    id: "fe-1.6-quiz-bad-next",
    type: "quiz",
    readMoreUrl: feSection1_6ReadMoreUrls.q16,
    question: `## Что выведет код?

~~~js
const x = {
  [Symbol.iterator]() {
  return this; },
  next() { return 7; },
};
console.log([...x]);
~~~`,
    options: [
      {
        id: "a",
        text: "[7]",
        explanation: "Результат next обязан быть объектом результата."
      },
      {
        id: "b",
        text: "[]",
        explanation: "Это нарушение протокола, а не конец обхода."
      },
      {
        id: "c",
        text: "TypeError",
        explanation: "Число вместо объекта результата приводит к TypeError."
      },
      {
        id: "d",
        text: "undefined",
        explanation: "Spread не возвращает undefined при нарушении протокола."
      }
    ],
    correctOptionId: "c",
    visual: {
      motif: "cursor"
    }
  },
  {
    id: "fe-1.6-quiz-generator-lazy",
    type: "quiz",
    readMoreUrl: feSection1_6ReadMoreUrls.q17,
    question: `## Что выведет код?

~~~js
let n = 0;
function* g() { n++; yield 1; }
g();
console.log(n);
~~~`,
    options: [
      {
        id: "a",
        text: "1",
        explanation: "Тело ещё не началось: next не вызывали."
      },
      {
        id: "b",
        text: "undefined",
        explanation: "Переменная инициализирована числом."
      },
      {
        id: "c",
        text: "0",
        explanation: "Вызов g создаёт курсор без исполнения тела."
      },
      {
        id: "d",
        text: "TypeError",
        explanation: "Вызвать генератор без next разрешено."
      }
    ],
    correctOptionId: "c",
    visual: {
      motif: "cursor"
    }
  },
  {
    id: "fe-1.6-quiz-generator-return",
    type: "quiz",
    readMoreUrl: feSection1_6ReadMoreUrls.q18,
    question: `## Что выведет код?

~~~js
function* g() {
  yield 1; return 2; }
console.log([...g()]);
~~~`,
    options: [
      {
        id: "a",
        text: "[1, 2]",
        explanation: "return даёт done: true и не является элементом."
      },
      {
        id: "b",
        text: "[2]",
        explanation: "Завершающее значение не заменяет yield."
      },
      {
        id: "c",
        text: "[]",
        explanation: "yield 1 создаёт один элемент."
      },
      {
        id: "d",
        text: "[1]",
        explanation: "Spread забирает yield и пропускает значение завершения."
      }
    ],
    correctOptionId: "d",
    visual: {
      motif: "cursor"
    }
  },
  {
    id: "fe-1.6-quiz-next-input",
    type: "quiz",
    readMoreUrl: feSection1_6ReadMoreUrls.q18,
    question: `## Что выведет код?

~~~js
function* g() {
  const x = yield 1;
  yield x;
}
const it = g();
it.next(9);
console.log(it.next(7).value);
~~~`,
    options: [
      {
        id: "a",
        text: "9",
        explanation: "Первый аргумент next не попадает в ещё не достигнутый yield."
      },
      {
        id: "b",
        text: "1",
        explanation: "Первое значение уже забрал предыдущий next."
      },
      {
        id: "c",
        text: "7",
        explanation: "Второй next передаёт 7 в приостановленный yield."
      },
      {
        id: "d",
        text: "undefined",
        explanation: "Аргумент второго next задан."
      }
    ],
    correctOptionId: "c",
    visual: {
      motif: "cursor"
    }
  },
  {
    id: "fe-1.6-quiz-yield-delegate",
    type: "quiz",
    readMoreUrl: feSection1_6ReadMoreUrls.q17,
    question: `## Что выведет код?

~~~js
function* g() { yield* [1, 2]; }
console.log([...g()]);
~~~`,
    options: [
      {
        id: "a",
        text: "[[1, 2]]",
        explanation: "yield* делегирует элементы, а не выдаёт массив целиком."
      },
      {
        id: "b",
        text: "[1, 2]",
        explanation: "Делегирование выдаёт оба элемента источника."
      },
      {
        id: "c",
        text: "[1]",
        explanation: "Потребитель запрашивает до завершения."
      },
      {
        id: "d",
        text: "TypeError",
        explanation: "Массив итерируем и подходит yield*."
      }
    ],
    correctOptionId: "b",
    visual: {
      motif: "cursor"
    }
  },
  {
    id: "fe-1.6-quiz-break-cleanup",
    type: "quiz",
    readMoreUrl: feSection1_6ReadMoreUrls.q19,
    question: "## Где генератору освобождать ресурс при break потребителя?",
    options: [
      {
        id: "a",
        text: "После yield вне try",
        explanation: "При закрытии код после yield может быть пропущен."
      },
      {
        id: "b",
        text: "В setTimeout без владельца",
        explanation: "Таймер не задаёт договор закрытия ресурса."
      },
      {
        id: "c",
        text: "В finally вокруг выдачи",
        explanation: "Закрытие через return позволяет выполнить finally."
      },
      {
        id: "d",
        text: "Только перед первым yield",
        explanation: "Это не освобождает ресурс после использования."
      }
    ],
    correctOptionId: "c",
    visual: {
      motif: "cursor"
    }
  },
  {
    id: "fe-1.6-quiz-next-error",
    type: "quiz",
    readMoreUrl: feSection1_6ReadMoreUrls.q19,
    question: "## Сам next() выбросил ошибку. Обязан ли for...of вызвать return()?",
    options: [
      {
        id: "a",
        text: "Да, всегда",
        explanation: "Общая гарантия закрытия не распространяется на любую ошибку next."
      },
      {
        id: "b",
        text: "Только при наличии size",
        explanation: "Размер не относится к IteratorClose."
      },
      {
        id: "c",
        text: "Нет общей гарантии",
        explanation: "Источник должен сам организовать уборку при собственной ошибке."
      },
      {
        id: "d",
        text: "Да, если значение truthy",
        explanation: "Truthiness элемента не определяет закрытие."
      }
    ],
    correctOptionId: "c",
    visual: {
      motif: "cursor"
    }
  },
  {
    id: "fe-1.6-quiz-lazy-order",
    type: "quiz",
    readMoreUrl: feSection1_6ReadMoreUrls.q20,
    question: "## Нужны первые 3 совпадения из бесконечного источника. Какой порядок?",
    options: [
      {
        id: "a",
        text: "toArray → filter → take",
        explanation: "Полная материализация бесконечного источника не завершится."
      },
      {
        id: "b",
        text: "filter → take → toArray",
        explanation: "Сначала отбор и ограничение, затем сбор результата."
      },
      {
        id: "c",
        text: "take → toArray → filter",
        explanation: "Ограничение до filter может дать меньше трёх совпадений."
      },
      {
        id: "d",
        text: "toArray → take → filter",
        explanation: "Полная материализация происходит до ограничения."
      }
    ],
    correctOptionId: "b",
    visual: {
      motif: "cursor"
    }
  },
  {
    id: "fe-1.6-quiz-async-next",
    type: "quiz",
    readMoreUrl: feSection1_6ReadMoreUrls.q21,
    question: "## Что возвращает next асинхронного итератора по протоколу?",
    options: [
      {
        id: "a",
        text: "Promise с объектом результата",
        explanation: "Потребитель ждёт Promise со следующим результатом."
      },
      {
        id: "b",
        text: "Готовый массив всех страниц",
        explanation: "Шаг не обязан собирать всю последовательность."
      },
      {
        id: "c",
        text: "Символ текущей страницы",
        explanation: "Symbol задаёт вход в протокол, а не результат шага."
      },
      {
        id: "d",
        text: "Только undefined при ожидании",
        explanation: "Ожидание выражается Promise, а не специальным undefined."
      }
    ],
    correctOptionId: "a",
    visual: {
      motif: "cursor"
    }
  },
  {
    id: "fe-1.6-quiz-async-break",
    type: "quiz",
    readMoreUrl: feSection1_6ReadMoreUrls.q21,
    question: "## Что делает for await...of при break, если return есть?",
    options: [
      {
        id: "a",
        text: "Запускает return и сразу забывает",
        explanation: "Асинхронное закрытие ожидается."
      },
      {
        id: "b",
        text: "Ждёт return перед выходом",
        explanation: "Цикл дожидается закрытия итератора."
      },
      {
        id: "c",
        text: "Всегда запрашивает ещё один next",
        explanation: "Ранний выход не требует ещё одного элемента."
      },
      {
        id: "d",
        text: "Удаляет все сильные ссылки",
        explanation: "Цикл не управляет всеми ссылками приложения."
      }
    ],
    correctOptionId: "b",
    visual: {
      motif: "cursor"
    }
  },
  {
    id: "fe-1.6-quiz-fromasync-memory",
    type: "quiz",
    readMoreUrl: feSection1_6ReadMoreUrls.q22,
    question: "## Нужен весь конечный async-источник как массив. Что подходит?",
    options: [
      {
        id: "a",
        text: "Обычный [...source]",
        explanation: "Обычный spread использует синхронный протокол."
      },
      {
        id: "b",
        text: "Object.keys(source)",
        explanation: "Ключи свойств не потребляют async-протокол."
      },
      {
        id: "c",
        text: "Array.fromAsync(source)",
        explanation: "Array.fromAsync собирает конечный источник в массив."
      },
      {
        id: "d",
        text: "WeakSet(source)",
        explanation: "WeakSet не адаптирует асинхронный источник."
      }
    ],
    correctOptionId: "c",
    visual: {
      motif: "cursor"
    }
  },
  {
    id: "fe-1.6-quiz-zero-limit",
    type: "quiz",
    readMoreUrl: feSection1_6ReadMoreUrls.q21,
    question: "## Лимит уникальных строк равен 0. Когда завершиться?",
    options: [
      {
        id: "a",
        text: "После открытия первой страницы",
        explanation: "Договор нулевого лимита не требует даже открытия."
      },
      {
        id: "b",
        text: "После первого уникального ID",
        explanation: "Не нужно получать ни одной строки."
      },
      {
        id: "c",
        text: "До открытия источника",
        explanation: "Ранняя проверка исключает лишнюю работу и запросы."
      },
      {
        id: "d",
        text: "После запроса всех страниц",
        explanation: "Материализация нарушает смысл лимита."
      }
    ],
    correctOptionId: "c",
    visual: {
      motif: "cursor"
    }
  },
  {
    id: "fe-1.6-quiz-started-promises",
    type: "quiz",
    readMoreUrl: feSection1_6ReadMoreUrls.q22,
    question: "## Массив уже содержит запущенные Promise. Что меняет for await?",
    options: [
      {
        id: "a",
        text: "Откладывает запуск каждой операции",
        explanation: "Способ потребления не отменяет прошлый запуск."
      },
      {
        id: "b",
        text: "Гарантирует отмену остальных",
        explanation: "Цикл сам не задаёт отмену запущенной работы."
      },
      {
        id: "c",
        text: "Обрабатывает результаты по очереди",
        explanation: "Последовательность ожидания не означает последовательный запуск."
      },
      {
        id: "d",
        text: "Делает работу синхронной",
        explanation: "Ожидание остаётся асинхронным."
      }
    ],
    correctOptionId: "c",
    visual: {
      motif: "cursor"
    }
  }
];
