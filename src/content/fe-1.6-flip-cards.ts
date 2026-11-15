import { feSection1_6ReadMoreUrls } from "./fe-1.6-source-urls";
import type { FlipCardData } from "./card-types";

// MOS-42: owner-approved subsection 1.6 coverage and presentation.
export const feSection1_6FlipCards: FlipCardData[] = [
  {
    id: "fe-1.6-flip-source-cursor",
    type: "flip",
    readMoreUrl: feSection1_6ReadMoreUrls.q14,
    question: "Чем iterable отличается от iterator?",
    answer: "Итерируемый объект (iterable) открывает обход через `[Symbol.iterator]()`. Итератор (iterator) хранит позицию конкретного обхода. Его `next()` возвращает объект `{ value, done }`. Новый независимый проход требует нового курсора.",
    visual: {
      motif: "cursor"
    }
  },
  {
    id: "fe-1.6-flip-map-selection",
    type: "flip",
    readMoreUrl: feSection1_6ReadMoreUrls.q1,
    question: "Когда Map удобнее объекта?",
    answer: "Когда нужен динамический индекс с произвольными ключами, явными `has`, `size` и обходом пар в порядке вставки. Объект удобнее для записи известной формы. Выбор задаётся операциями и договором данных."
  },
  {
    id: "fe-1.6-flip-missing-undefined",
    type: "flip",
    readMoreUrl: feSection1_6ReadMoreUrls.q1,
    question: "Как отличить отсутствие ключа от сохранённого undefined в Map?",
    answer: "Вызвать `map.has(key)`. Один `get(key)` возвращает `undefined` в обоих случаях. Проверка truthiness дополнительно теряет допустимые значения `0`, `false` и `\"\"`."
  },
  {
    id: "fe-1.6-flip-map-reinsert",
    type: "flip",
    readMoreUrl: feSection1_6ReadMoreUrls.q3,
    question: "Когда ключ Map перемещается в конец?",
    answer: "После удаления и новой вставки. Повторный `set()` для существующего ключа только обновляет значение. Живой обход может увидеть повторно вставленную запись ещё раз."
  },
  {
    id: "fe-1.6-flip-map-access-cost",
    type: "flip",
    readMoreUrl: feSection1_6ReadMoreUrls.q2,
    question: "Гарантирует ли Map точное O(1) для каждой операции?",
    answer: "Нет. Спецификация требует в среднем сублинейного времени доступа. Она не фиксирует одну реализацию и точную стоимость каждой операции. Скорость относительно объекта зависит от задачи и среды."
  },
  {
    id: "fe-1.6-flip-set-identity",
    type: "flip",
    readMoreUrl: feSection1_6ReadMoreUrls.q6,
    question: "Удалит ли new Set(rows) повторы разных объектов с одним id?",
    answer: "Нет. `Set` сравнивает объекты по идентичности. Для уникальности по `id` храните сами ID и определите победителя: первое или последнее совпадение. Две ссылки на один объект объединяются."
  },
  {
    id: "fe-1.6-flip-setlike",
    type: "flip",
    readMoreUrl: feSection1_6ReadMoreUrls.q7,
    question: "Почему Map подходит справа в операциях Set, а массив обычно нет?",
    answer: "Правому операнду нужен set-like договор: `size`, `has()` и `keys()`. У `Map` они описывают набор ключей. Массив можно явно преобразовать через `new Set(values)`; одной итерируемости недостаточно."
  },
  {
    id: "fe-1.6-flip-grouping-key",
    type: "flip",
    readMoreUrl: feSection1_6ReadMoreUrls.q7,
    question: "Когда выбирать Map.groupBy вместо Object.groupBy?",
    answer: "Когда ключ группы должен сохранить произвольный тип или объектную идентичность. `Object.groupBy` использует ключи свойств и возвращает объект без прототипа. Элементы внутри групп остаются исходными ссылками."
  },
  {
    id: "fe-1.6-flip-weak-no-size",
    type: "flip",
    readMoreUrl: feSection1_6ReadMoreUrls.q9,
    question: "Почему у слабых коллекций нет обхода и size?",
    answer: "Перечисление и размер сделали бы наблюдаемым исчезновение недостижимых ключей из-за недетерминированной сборки. Для списка активных данных и строгого лимита нужно явно управляемое хранилище."
  },
  {
    id: "fe-1.6-flip-weak-symbol",
    type: "flip",
    readMoreUrl: feSection1_6ReadMoreUrls.q10,
    question: "Какие символы допустимы как слабые цели в современном стандарте?",
    answer: "Незарегистрированные, например `Symbol(\"row\")`. Символ из `Symbol.for(\"row\")` недопустим. Проверяйте поддержку точной среды: наличие WeakMap само по себе не гарантирует поддержку символов как слабых ключей."
  },
  {
    id: "fe-1.6-flip-weak-cycle",
    type: "flip",
    readMoreUrl: feSection1_6ReadMoreUrls.q10,
    question: "Удержит ли значение WeakMap ключ одной обратной ссылкой?",
    answer: "Если значение доступно только условно через эту запись — такой цикл сам по себе не создаёт внешний сильный корень. Если значение удерживается снаружи и ссылается на ключ, сильная цепочка уже может удерживать ключ. Момент сборки не гарантирован."
  },
  {
    id: "fe-1.6-flip-weakref-index",
    type: "flip",
    readMoreUrl: feSection1_6ReadMoreUrls.q11,
    question: "Ограничивает ли Map<Id, WeakRef<Value>> размер индекса?",
    answer: "Нет. Сам `Map` продолжает удерживать ID и обёртки. Для предела размера нужны явное удаление или вытеснение. `deref()` требует рабочего пути восстановления при `undefined`; тестируйте промах без ожидания GC."
  },
  {
    id: "fe-1.6-flip-symbol-registry",
    type: "flip",
    readMoreUrl: feSection1_6ReadMoreUrls.q12,
    question: "Чем Symbol() отличается от Symbol.for()?",
    answer: "`Symbol()` создаёт новую идентичность. `Symbol.for(key)` ищет или создаёт общий символ по ключу реестра. Описание локального символа не является регистрацией. `Symbol.keyFor()` возвращает ключ только для зарегистрированного символа.",
    visual: {
      motif: "tokens"
    }
  },
  {
    id: "fe-1.6-flip-symbol-privacy",
    type: "flip",
    readMoreUrl: feSection1_6ReadMoreUrls.q13,
    question: "Почему символьный ключ не делает свойство приватным?",
    answer: "Символьные свойства доступны через рефлексию, например `Reflect.ownKeys()`. Собственные перечисляемые символьные свойства копируются объектным spread. Для ограничения доступа нужен отдельный механизм инкапсуляции.",
    visual: {
      motif: "tokens"
    }
  },
  {
    id: "fe-1.6-flip-known-symbol",
    type: "flip",
    readMoreUrl: feSection1_6ReadMoreUrls.q12,
    question: "Можно заменить Symbol.iterator на Symbol.for(\"Symbol.iterator\")?",
    answer: "Нет. Это разные идентичности. Движок ищет метод с точным ключом `Symbol.iterator`. Похожая строка, описание или ключ общего реестра не выполняют протокол.",
    visual: {
      motif: "tokens"
    }
  },
  {
    id: "fe-1.6-flip-done-contract",
    type: "flip",
    readMoreUrl: feSection1_6ReadMoreUrls.q14,
    question: "Как отличить элемент undefined от конца итератора?",
    answer: "По `done` в объекте результата `next()`. `{ value: undefined, done: false }` — элемент. При `done: true` обход окончен, даже если есть значение. Проверка truthiness `value` для этого непригодна.",
    visual: {
      motif: "cursor"
    }
  },
  {
    id: "fe-1.6-flip-arraylike",
    type: "flip",
    readMoreUrl: feSection1_6ReadMoreUrls.q15,
    question: "Чем array-like без итератора отличается от iterable?",
    answer: "Array-like может предоставлять индексы и `length`. Iterable предоставляет `[Symbol.iterator]()`. `Array.from()` умеет читать оба договора, а spread в массиве требует iterable. Объектный spread работает со свойствами.",
    visual: {
      motif: "cursor"
    }
  },
  {
    id: "fe-1.6-flip-independent-traversal",
    type: "flip",
    readMoreUrl: feSection1_6ReadMoreUrls.q16,
    question: "Как дать двум потребителям независимый обход?",
    answer: "Создавать новое состояние в каждом вызове `[Symbol.iterator]()`. Например, генераторный метод создаёт отдельный курсор для каждого читателя. Возврат одного общего итератора заставит читателей делить позицию.",
    visual: {
      motif: "cursor"
    }
  },
  {
    id: "fe-1.6-flip-generator-once",
    type: "flip",
    readMoreUrl: feSection1_6ReadMoreUrls.q17,
    question: "Можно ли повторно пройти уже потреблённый генератор?",
    answer: "Тот же курсор не начинается заново. Вызовите функцию генератора ещё раз для нового обхода. Вызов функции только создаёт курсор; тело начинает выполняться при первом `next()`.",
    visual: {
      motif: "cursor"
    }
  },
  {
    id: "fe-1.6-flip-generator-return",
    type: "flip",
    readMoreUrl: feSection1_6ReadMoreUrls.q18,
    question: "Попадает ли return value генератора в for...of?",
    answer: "Нет. `return value` даёт результат с `done: true`, и обычный цикл не выдаёт это значение как элемент. Для выдачи используется `yield`; `yield*` делегирует элементы другого источника.",
    visual: {
      motif: "cursor"
    }
  },
  {
    id: "fe-1.6-flip-next-input",
    type: "flip",
    readMoreUrl: feSection1_6ReadMoreUrls.q18,
    question: "Куда попадает аргумент next(value) генератора?",
    answer: "В результат приостановленного выражения `yield` внутри тела. Первый аргумент `next()` пропускается: приостановленного `yield` ещё нет. Метод `throw(error)` вводит исключение в точку приостановки.",
    visual: {
      motif: "cursor"
    }
  },
  {
    id: "fe-1.6-flip-manual-cleanup",
    type: "flip",
    readMoreUrl: feSection1_6ReadMoreUrls.q19,
    question: "Кто закрывает итератор при ручном прекращении next()?",
    answer: "Вызывающий код должен организовать закрытие через `return()`, если оно нужно. `for...of` делает это при раннем выходе из тела. При ошибке самого `next()` общей гарантии нет: источник отвечает за собственную уборку.",
    visual: {
      motif: "cursor"
    }
  },
  {
    id: "fe-1.6-flip-lazy-bound",
    type: "flip",
    readMoreUrl: feSection1_6ReadMoreUrls.q20,
    question: "Почему take(n) нужно применить до toArray()?",
    answer: "`toArray()` материализует весь остаток. Для бесконечного источника это может не завершиться. Сначала задайте отбор и конечную границу. Даже `filter().take(n)` не завершится, если нужные совпадения никогда не появятся.",
    visual: {
      motif: "cursor"
    }
  },
  {
    id: "fe-1.6-flip-async-close",
    type: "flip",
    readMoreUrl: feSection1_6ReadMoreUrls.q21,
    question: "Что добавляет for await...of к раннему закрытию?",
    answer: "Он ждёт и шаги асинхронного итератора, и результат `return()` при раннем выходе, если метод есть. Async generator может освобождать ресурс в `finally`. Уже запущенная работа не отменяется одним выбором цикла.",
    visual: {
      motif: "cursor"
    }
  },
  {
    id: "fe-1.6-flip-paged-limit",
    type: "flip",
    readMoreUrl: feSection1_6ReadMoreUrls.q21,
    question: "Что проверить у ограниченной выдачи уникальных строк из async-страниц?",
    answer: "Правило первого совпадения по ID, порядок и исходные ссылки, повторы между страницами, пустую страницу, недобор, нулевой лимит без открытия, отсутствие лишнего запроса после лимита, ошибку загрузки и закрытие источника.",
    visual: {
      motif: "cursor"
    }
  }
];
