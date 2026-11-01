import type { FlipCardData } from "./card-types";
import { feSection1_4ReadMoreUrls } from "./fe-1.4-source-urls";

// MOS-40: owner-approved subsection 1.4 coverage and presentation.
export const feSection1_4FlipCards: FlipCardData[] = [
  {
    id: "fe-1.4-flip-proxy-identity",
    type: "flip",
    readMoreUrl: feSection1_4ReadMoreUrls.q25,
    question: `## Proxy и target

Равны ли они через \`===\`? Как различаются как ключи Map?`,
    answer: `## Две идентичности

\`proxy === target\` даёт \`false\`. Обёртка — отдельный объект, даже без перехватчиков.

Запись в Map по ключу \`target\` не находится по ключу \`proxy\`. Приватные поля исходного объекта также не переходят к обёртке.`,
    visual: {
      motif: "interception"
    }
  },
  {
    id: "fe-1.4-flip-inherited-this",
    type: "flip",
    readMoreUrl: feSection1_4ReadMoreUrls.q1,
    question: "Метод найден в прототипе. Какой `this` у вызова `child.method()`?",
    answer: `## Получатель — child

Поиск функции может уйти в прототип, но форма вызова передаёт \`child\` как \`this\`. Отделённая функция не хранит этот получатель автоматически.`
  },
  {
    id: "fe-1.4-flip-creation-placement",
    type: "flip",
    readMoreUrl: feSection1_4ReadMoreUrls.q5,
    question: "Как сравнивать фабрику и класс по состоянию и размещению методов?",
    answer: `## Смотрите на реализацию

Класс обычно хранит состояние в экземпляре, методы — в прототипе. Фабрика может замкнуть состояние и создать отдельные функции, но также может использовать общий прототип или класс. Универсального правила о копировании методов фабрикой нет.`
  },
  {
    id: "fe-1.4-flip-new-vs-create",
    type: "flip",
    readMoreUrl: feSection1_4ReadMoreUrls.q6,
    question: "Что `Object.create(C.prototype)` не делает по сравнению с `new C()`?",
    answer: `## Не выполняет конструктор

Object.create задаёт прототип нового объекта, но не запускает C и не инициализирует его поля или приватные элементы. В обычном базовом new дополнительно выполняется конструктор и учитывается явно возвращённый объект.`
  },
  {
    id: "fe-1.4-flip-prototype-links",
    type: "flip",
    readMoreUrl: feSection1_4ReadMoreUrls.q8,
    question: "Чем `C.prototype` отличается от `Object.getPrototypeOf(C)`?",
    answer: `## Разные цепочки

C.prototype — свойство конструктора для прототипа будущих экземпляров. Object.getPrototypeOf(C) — прототип самой функции C, обычно Function.prototype. Внутренний прототип экземпляра читают отдельно: Object.getPrototypeOf(instance).`
  },
  {
    id: "fe-1.4-flip-undefined-shadow",
    type: "flip",
    readMoreUrl: feSection1_4ReadMoreUrls.q9,
    question: "Почему собственное `undefined` не даёт прочитать значение прототипа?",
    answer: `## Свойство уже найдено

Поиск останавливается на первом существующем свойстве, а не на первом полезном значении. Собственное undefined затеняет прототип. Проверяйте наличие через Object.hasOwn или in; удаление собственного свойства снова открывает унаследованное.`
  },
  {
    id: "fe-1.4-flip-inherited-write",
    type: "flip",
    readMoreUrl: feSection1_4ReadMoreUrls.q10,
    question: "Всегда ли `child.x = 1` меняет найденное в прототипе свойство?",
    answer: `## Зависит от дескриптора

Унаследованное изменяемое свойство данных обычно порождает собственное x у child. Унаследованный setter вызывается с child как this. Неизменяемое свойство или accessor без setter отклоняет запись. Прямое определение свойства — другая операция.`
  },
  {
    id: "fe-1.4-flip-instanceof-limits",
    type: "flip",
    readMoreUrl: feSection1_4ReadMoreUrls.q11,
    question: "Доказывают ли `instanceof C` и `.constructor === C` вызов конструктора?",
    answer: `## История не проверяется

Стандартный instanceof ищет текущее C.prototype в цепочке: Object.create(C.prototype) тоже может пройти. constructor — обычное изменяемое свойство. Между realms и при Symbol.hasInstance гарантии дополнительно различаются.`
  },
  {
    id: "fe-1.4-flip-method-vs-field",
    type: "flip",
    readMoreUrl: feSection1_4ReadMoreUrls.q14,
    question: "Чем метод класса отличается от стрелочной функции в поле экземпляра?",
    answer: `## Общая функция или собственная

Метод находится в прототипе, неперечислим и получает this по вызову. Стрелочное поле — собственная перечислимая функция каждого экземпляра, сохраняющая его this. Устойчивый колбэк имеет цену отдельной функции.`
  },
  {
    id: "fe-1.4-flip-super-receiver",
    type: "flip",
    readMoreUrl: feSection1_4ReadMoreUrls.q15,
    question: "Что меняет `super.method()`: начало поиска, получателя или оба?",
    answer: `## Меняется начало поиска

Метод ищется от прототипа базы, но this остаётся текущим получателем. Отдельного родительского экземпляра нет. Связь super с местом определения метода сохраняется даже при заимствовании этого метода через call.`
  },
  {
    id: "fe-1.4-flip-two-inheritance-chains",
    type: "flip",
    readMoreUrl: feSection1_4ReadMoreUrls.q15,
    question: "Какие две цепочки создаёт `class D extends B`?",
    answer: `## Экземпляры и классы

Экземпляр: d → D.prototype → B.prototype.

Объект класса: D → B. Первая цепочка даёт методы экземпляра, вторая — наследование публичных статических элементов. Private-элементы не следует считать обычными наследуемыми свойствами.`
  },
  {
    id: "fe-1.4-flip-initialization-order",
    type: "flip",
    readMoreUrl: feSection1_4ReadMoreUrls.q15,
    question: "Почему вызов метода наследника из конструктора базы может сломаться?",
    answer: `## Метод уже найден, поля ещё не готовы

Базовые поля готовы до тела конструктора базы. Поля наследника инициализируются после возвращения из super(). База может вызвать переопределённый метод раньше готовности нужного ему состояния. Избегайте такого скрытого контракта.`
  },
  {
    id: "fe-1.4-flip-static-placement",
    type: "flip",
    readMoreUrl: feSection1_4ReadMoreUrls.q16,
    question: "Где находятся public static-поле, метод экземпляра и private-поле?",
    answer: `## Разделите размещение

Public static-поле — собственное свойство объекта класса. Обычный метод экземпляра — в Class.prototype. Private-поле относится к экземпляру, но не является строковым или Symbol-свойством и не видно через обычные API ключей и дескрипторов.`
  },
  {
    id: "fe-1.4-flip-brand-vs-prototype",
    type: "flip",
    readMoreUrl: feSection1_4ReadMoreUrls.q16,
    question: "Почему `Object.create(C.prototype)` не даёт доступ к `#field` класса C?",
    answer: `## Не хватает приватной метки

Совпадение прототипа не создаёт приватные элементы. Доступ к объявленному #field с неверным получателем бросает TypeError. Необъявленное приватное имя — другая проблема: SyntaxError при разборе кода.`
  },
  {
    id: "fe-1.4-flip-composition-criteria",
    type: "flip",
    readMoreUrl: feSection1_4ReadMoreUrls.q17,
    question: "Когда композиция обычно яснее наследования?",
    answer: `## Независимые возможности

Если форматирование, сохранение и другие стратегии заменяются независимо, передайте их явно. Наследование уместно при устойчивом контракте базы и наследника. Повторное использование пары функций само по себе не требует иерархии.`
  },
  {
    id: "fe-1.4-flip-hasown-vs-in",
    type: "flip",
    readMoreUrl: feSection1_4ReadMoreUrls.q18,
    question: "Чем `Object.hasOwn(obj, key)` отличается от `key in obj`?",
    answer: `## Свой объект или вся цепочка

hasOwn проверяет только собственное свойство, in — также прототипы. Оба видят неперечислимое свойство и присутствующее undefined. Для проверки не вызывайте obj.hasOwnProperty напрямую: метод может отсутствовать или быть затенён.`,
    visual: {
      motif: "descriptor"
    }
  },
  {
    id: "fe-1.4-flip-enumeration-axes",
    type: "flip",
    readMoreUrl: feSection1_4ReadMoreUrls.q19,
    question: "Какие три вопроса задают перед выбором API перечисления свойств?",
    answer: `## Область, флаг, вид ключа

Нужны собственные свойства или вся цепочка? Только перечислимые или все? Строки, Symbol или оба вида? Object.keys даёт собственные перечислимые строки; Reflect.ownKeys — все собственные ключи. values/entries дополнительно читают значения.`,
    visual: {
      motif: "descriptor"
    }
  },
  {
    id: "fe-1.4-flip-hidden-not-private",
    type: "flip",
    readMoreUrl: feSection1_4ReadMoreUrls.q18,
    question: "Дают ли `enumerable: false` или ключ Symbol настоящую приватность?",
    answer: `## Нет, это обычные свойства

Неперечислимое свойство пропускают некоторые API. Symbol защищает от случайного столкновения имён. Reflect.ownKeys видит оба вида. Приватные элементы #field устроены отдельно и не представлены обычными ключами.`,
    visual: {
      motif: "descriptor"
    }
  },
  {
    id: "fe-1.4-flip-descriptor-kinds",
    type: "flip",
    readMoreUrl: feSection1_4ReadMoreUrls.q20,
    question: "Какие поля у data descriptor и accessor descriptor? Что у них общее?",
    answer: `## Два вида

Data: value и writable. Accessor: get и set. Общие флаги: enumerable и configurable. Смешивать value/writable с get/set в одном дескрипторе нельзя: TypeError. Getter и setter должны быть функциями либо undefined.`,
    visual: {
      motif: "descriptor"
    }
  },
  {
    id: "fe-1.4-flip-descriptor-defaults",
    type: "flip",
    readMoreUrl: feSection1_4ReadMoreUrls.q20,
    question: "Когда пропущенные флаги `Object.defineProperty` становятся `false`?",
    answer: `## При создании нового свойства

У нового свойства writable, enumerable и configurable по умолчанию false. При переопределении существующего свойства пропущенные поля сохраняют прежние атрибуты. Это различие важно: изменение только value не сбрасывает старый writable.`,
    visual: {
      motif: "descriptor"
    }
  },
  {
    id: "fe-1.4-flip-accessor-receiver",
    type: "flip",
    readMoreUrl: feSection1_4ReadMoreUrls.q21,
    question: "Как определить `this` у getter или setter в цепочке прототипов?",
    answer: `## Найдите получателя операции

Дескриптор может находиться в прототипе, а this быть объектом, начавшим чтение или запись. Reflect.get/Reflect.set позволяют передать receiver явно. Setter — исполняемый код: запись не обязательно создаёт одноимённое собственное свойство.`,
    visual: {
      motif: "descriptor"
    }
  },
  {
    id: "fe-1.4-flip-integrity-matrix",
    type: "flip",
    readMoreUrl: feSection1_4ReadMoreUrls.q22,
    question: "Что последовательно добавляют `preventExtensions`, `seal` и `freeze`?",
    answer: `## Усиление ограничений

preventExtensions запрещает новые собственные свойства. seal дополнительно делает собственные свойства неконфигурируемыми. freeze ещё выключает writable у собственных свойств данных. Прежний setter остаётся callable, вложенный объект отдельно не защищается.`,
    visual: {
      motif: "descriptor"
    }
  },
  {
    id: "fe-1.4-flip-shallow-freeze",
    type: "flip",
    readMoreUrl: feSection1_4ReadMoreUrls.q22,
    question: "Почему `const obj = Object.freeze({ nested: {} })` не даёт deep immutability?",
    answer: `## Разные границы

const фиксирует привязку obj. freeze ограничивает собственные свойства верхнего объекта. Вложенный объект остаётся тем же изменяемым объектом. Глубокая неизменяемость требует отдельного контракта владения и допустимых операций над всем графом.`,
    visual: {
      motif: "descriptor"
    }
  },
  {
    id: "fe-1.4-flip-frozen-state",
    type: "flip",
    readMoreUrl: feSection1_4ReadMoreUrls.q23,
    question: "Что может меняться у объекта после `Object.freeze`?",
    answer: `## Не только вложенные данные

Setter может менять внешнее состояние, методы класса — приватные поля, встроенные методы — внутренние слоты. freeze ограничивает обычные собственные свойства; Object.isFrozen не обещает постоянство всех наблюдаемых результатов.`,
    visual: {
      motif: "descriptor"
    }
  },
  {
    id: "fe-1.4-flip-reflect-receiver",
    type: "flip",
    readMoreUrl: feSection1_4ReadMoreUrls.q25,
    question: "Зачем в Proxy использовать `Reflect.get(target, key, receiver)`?",
    answer: `## Сохранить получателя

Getter может быть найден на target, но вызван через потомка Proxy. Переданный receiver сохраняет его this. Прямое target[key] делает получателем target. Reflect не снимает Proxy автоматически; повторная операция на той же обёртке может рекурсировать.`,
    visual: {
      motif: "interception"
    }
  },
  {
    id: "fe-1.4-flip-invariants-revocation",
    type: "flip",
    readMoreUrl: feSection1_4ReadMoreUrls.q26,
    question: "Что ограничивают инварианты Proxy и что прекращает `revoke()`?",
    answer: `## Гарантии и срок доступа

Инварианты не дают trap противоречить закреплённым гарантиям target; нарушение даёт TypeError. revoke отключает операции через внутренние методы Proxy, но не уничтожает target и не отзывает уже выданные ссылки. typeof и сравнение идентичности остаются допустимыми.`,
    visual: {
      motif: "interception"
    }
  },
  {
    id: "fe-1.4-flip-diagnosis-sequence",
    type: "flip",
    readMoreUrl: feSection1_4ReadMoreUrls.q28,
    question: "Как начать разбор задачи на объектную модель вместо угадывания вывода?",
    answer: `## Идентичность → операция → правила

Нарисуйте объекты и цепочки. Назовите операцию, получателя и дескриптор. Разместите поля, методы, static/private. Для Proxy проверьте trap и инвариант. Затем предскажите результат или первую ошибку и предложите минимальное исправление.`
  }
];
