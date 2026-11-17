import type { FlipCardData } from "./card-types";
import { feSection1_7ReadMoreUrls } from "./fe-1.7-source-urls";

// MOS-43: owner-approved subsection 1.7 coverage and presentation.
export const feSection1_7FlipCards: FlipCardData[] = [
  {
    id: "fe-1.7-flip-cause-value",
    type: "flip",
    question: "Обязательно ли Error.cause содержит объект Error?",
    answer: "Нет. `cause` сохраняет переданное значение: объект, строку, `null` или `undefined`. Сначала проверь его форму, прежде чем читать поля. Отсутствие свойства `cause` и собственное свойство со значением `undefined` — разные случаи. Для проверки наличия подходит Object.hasOwn(error, \"cause\").",
    visual: {
      "motif": "causes"
    },
    readMoreUrl: feSection1_7ReadMoreUrls.q18,
  },
  {
    id: "fe-1.7-flip-module-boundary",
    type: "flip",
    question: "Скрывает ли модуль встроенный в его код секрет?",
    answer: "Нет. Неэкспортируемое имя недоступно через обычный импорт, но модуль не создаёт защищённый процесс. Если секрет попал в клиентский код, модульная область сама по себе его не защищает.",
    readMoreUrl: feSection1_7ReadMoreUrls.q1,
  },
  {
    id: "fe-1.7-flip-namespace-call",
    type: "flip",
    question: "Почему import * as api не позволяет вызвать api()?",
    answer: "api — объект пространства имён, а не экспортируемая функция. Если функция экспортирована по умолчанию, она доступна как api.default. Именованную функцию вызывают через её экспортированное имя.",
    readMoreUrl: feSection1_7ReadMoreUrls.q2,
  },
  {
    id: "fe-1.7-flip-readonly-import",
    type: "flip",
    question: "Запрет присваивания импорту замораживает экспортируемый объект?",
    answer: "Нет. Импортированную привязку нельзя переназначить, но свойства объекта могут оставаться изменяемыми. Если модуль должен владеть состоянием, полезнее экспортировать операции, а не отдавать произвольную запись в общий объект.",
    readMoreUrl: feSection1_7ReadMoreUrls.q4,
  },
  {
    id: "fe-1.7-flip-default-form",
    type: "flip",
    question: "Чем export default value отличается от value as default?",
    answer: "export default value сохраняет вычисленный результат выражения. export { value as default } передаёт живую привязку. Не переносите правило выражения на любую форму default, например на объявление именованной функции.",
    readMoreUrl: feSection1_7ReadMoreUrls.q5,
  },
  {
    id: "fe-1.7-flip-cycle-validity",
    type: "flip",
    question: "Любой циклический импорт обязательно падает?",
    answer: "Нет. Опасно раннее чтение ещё не инициализированной привязки. Отложенное чтение может работать в конкретном графе. Удаление цикла и откладывание чтения — разные исправления; переставить строки import недостаточно.",
    readMoreUrl: feSection1_7ReadMoreUrls.q6,
  },
  {
    id: "fe-1.7-flip-dynamic-result",
    type: "flip",
    question: "Что получает потребитель от успешного import()?",
    answer: "Promise объекта пространства имён после загрузки и выполнения модуля. Default находится в свойстве default. Отказ поиска, синтаксиса или выполнения отклоняет Promise; его нужно наблюдать через await или обработчик.",
    readMoreUrl: feSection1_7ReadMoreUrls.q7,
  },
  {
    id: "fe-1.7-flip-tla-process",
    type: "flip",
    question: "Top-level await останавливает весь процесс?",
    answer: "Нет. Он задерживает готовность модуля и выполнение нуждающихся в нём зависимых модулей. Независимая работа может продолжаться. Для необязательной операции часто удобнее явный вызов функции загрузки.",
    readMoreUrl: feSection1_7ReadMoreUrls.q8,
  },
  {
    id: "fe-1.7-flip-shake-language",
    type: "flip",
    question: "ESM сам удаляет неиспользуемые экспорты при запуске Node?",
    answer: "Нет. Статический граф помогает сборщику анализировать использование, но tree shaking выполняет инструмент сборки. Нужные побочные эффекты должны сохраниться. Именованный импорт не гарантирует размер результата.",
    readMoreUrl: feSection1_7ReadMoreUrls.q9,
  },
  {
    id: "fe-1.7-flip-format-owner",
    type: "flip",
    question: "Кто определяет type в package.json и поиск node_modules?",
    answer: "Это правила загрузчика Node.js, а не синтаксис ECMAScript. ESM задаёт import/export и привязки; браузер разрешает URL и использует свои средства загрузки. Сборщик может применять отдельные условия и преобразования.",
    readMoreUrl: feSection1_7ReadMoreUrls.q10,
  },
  {
    id: "fe-1.7-flip-exports-result",
    type: "flip",
    question: "Какой объект возвращает require: exports или module.exports?",
    answer: "Возвращаемый экспорт задаёт module.exports. Изначально exports ссылается на тот же объект, поэтому запись свойства работает. Но exports = новыйОбъект меняет только локальную ссылку. Деструктуризация полученного объекта сохраняет обычный снимок свойства.",
    readMoreUrl: feSection1_7ReadMoreUrls.q11,
  },
  {
    id: "fe-1.7-flip-interop-default",
    type: "flip",
    question: "Именованные импорты из любого CJS-пакета гарантированы?",
    answer: "Нет. Нативный Node обнаруживает часть имён статически; эвристика подходит не любому пакету. Default даёт module.exports. Выделенные именованные значения не обновляются как живые ESM-привязки к его свойствам.",
    readMoreUrl: feSection1_7ReadMoreUrls.q12,
  },
  {
    id: "fe-1.7-flip-dual-state",
    type: "flip",
    question: "Почему import и require одного пакета могут дать разное состояние?",
    answer: "Условия exports могут выбрать независимые реализации. Тогда у каждой свой кеш или конструктор. Проверяйте оба пути в одном процессе. Общая реализация за оболочками может сохранить единое состояние; два формата сами по себе не доказывают ошибку.",
    readMoreUrl: feSection1_7ReadMoreUrls.q14,
  },
  {
    id: "fe-1.7-flip-throw-any",
    type: "flip",
    question: "Всегда ли catch получает Error с полем message?",
    answer: "Нет. JavaScript позволяет выбросить любое значение, включая null. Catch получает именно его. На внешней границе сначала проверь форму ошибки; безусловное чтение message может вызвать вторую ошибку.",
    visual: {
      "motif": "causes"
    },
    readMoreUrl: feSection1_7ReadMoreUrls.q15,
  },
  {
    id: "fe-1.7-flip-finally-preserve",
    type: "flip",
    question: "Когда finally сохраняет прежний return или throw?",
    answer: "Когда завершается обычно, без собственного return или throw. Новый исход finally заменяет прежний. Изменение свойств возвращаемого объекта при этом может быть видно через ту же ссылку — это отдельный механизм.",
    visual: {
      "motif": "causes"
    },
    readMoreUrl: feSection1_7ReadMoreUrls.q16,
  },
  {
    id: "fe-1.7-flip-try-future",
    type: "flip",
    question: "Почему try вокруг return Promise.reject не ловит отклонение?",
    answer: "Отклонение возвращённого Promise не является синхронным исключением в этом блоке. Для локального catch нужно await внутри try. Иначе результат должен наблюдать вызывающий код через await или обработчик Promise.",
    visual: {
      "motif": "causes"
    },
    readMoreUrl: feSection1_7ReadMoreUrls.q17,
  },
  {
    id: "fe-1.7-flip-rethrow-wrap",
    type: "flip",
    question: "Когда нужен throw error, а когда новая ошибка с cause?",
    answer: "Если слой не добавляет полезного контекста, повторный throw сохраняет исходное значение. Если может назвать операцию точнее, новая ошибка с cause сохраняет связь с причиной. Простая копия message этой связи не создаёт.",
    visual: {
      "motif": "causes"
    },
    readMoreUrl: feSection1_7ReadMoreUrls.q18,
  },
  {
    id: "fe-1.7-flip-json-representable",
    type: "flip",
    question: "Почему stringify(undefined) не даёт строку \"undefined\"?",
    answer: "Undefined не является JSON-значением. Для корня stringify возвращает само значение undefined, без строки. В поле объекта оно пропускается, а в позиции массива превращается в null. Нужно учитывать положение значения.",
    visual: {
      "motif": "payload"
    },
    readMoreUrl: feSection1_7ReadMoreUrls.q20,
  },
  {
    id: "fe-1.7-flip-replacer-root-call",
    type: "flip",
    question: "Вызов replacer с ключом \"\" относится только к полю с пустым именем?",
    answer: "Нет. Первый вызов относится к корню. Replacer может заменить весь корневой результат, в том числе на undefined. Пустое имя также допустимо у обычного поля, поэтому один такой ключ не является универсальным признаком корня во всех вызовах.",
    visual: {
      "motif": "payload"
    },
    readMoreUrl: feSection1_7ReadMoreUrls.q21,
  },
  {
    id: "fe-1.7-flip-reviver-order",
    type: "flip",
    question: "В каком порядке reviver посещает вложенные значения?",
    answer: "Сначала дочерние значения, затем родительское и в конце корень с ключом \"\". Возвращённое значение заменяет текущее; undefined удаляет свойство. Для сохраняемых случаев нужен общий return value, включая корневой вызов.",
    visual: {
      "motif": "payload"
    },
    readMoreUrl: feSection1_7ReadMoreUrls.q22,
  },
  {
    id: "fe-1.7-flip-number-precision",
    type: "flip",
    question: "Можно ли вернуть потерянные цифры через BigInt(parsedNumber)?",
    answer: "Нет. Если Number уже округлён, BigInt получает округлённое значение. Для больших внешних ID лучше договориться о строке. Context.source у reviver позволяет читать исходный примитив в поддерживаемой среде; поддержку нужно проверять отдельно.",
    visual: {
      "motif": "payload"
    },
    readMoreUrl: feSection1_7ReadMoreUrls.q22,
  },
  {
    id: "fe-1.7-flip-parse-validation",
    type: "flip",
    question: "Почему успешного JSON.parse недостаточно для использования данных?",
    answer: "Разбор проверяет синтаксис. Приложение отдельно проверяет форму корня, версию, обязательные и разрешённые поля, их типы и диапазоны. Null, массив или число могут быть корректным JSON и нарушать схему настроек.",
    visual: {
      "motif": "payload"
    },
    readMoreUrl: feSection1_7ReadMoreUrls.q23,
  },
  {
    id: "fe-1.7-flip-syntaxerror-stage",
    type: "flip",
    question: "Всегда ли SyntaxError после JSON.parse означает неверный текст?",
    answer: "Нет, если передан reviver: он тоже может выбросить SyntaxError. Для различения причин отделите чистый разбор от преобразования и проверки схемы, задайте коды этапов и сохраняйте исходную причину.",
    visual: {
      "motif": "payload"
    },
    readMoreUrl: feSection1_7ReadMoreUrls.q23,
  },
  {
    id: "fe-1.7-flip-format-boundary",
    type: "flip",
    question: "Как разделить обязанности модулей при импорте JSON-настроек?",
    answer: "Модуль формата разбирает текст, проверяет схему и создаёт DTO. Слой импорта добавляет контекст операции через cause. Интерфейс обрабатывает известные коды. Отказ загрузки модуля проверяют отдельно от синтаксиса и схемы данных.",
    visual: {
      "motif": "payload"
    },
    readMoreUrl: feSection1_7ReadMoreUrls.q24,
  },
];
