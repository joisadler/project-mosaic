import type { QuizCardData } from "./card-types";
import { feSection1_7ReadMoreUrls } from "./fe-1.7-source-urls";

// MOS-43: owner-approved subsection 1.7 coverage and presentation.
export const feSection1_7QuizCards: QuizCardData[] = [
  {
    id: "fe-1.7-quiz-reviver-root",
    type: "quiz",
    question: `Что вернёт разбор?

~~~js
const result = JSON.parse(
  '{"n":2}',
  (key, value) => {
    if (key === "n") return 3;
  },
);
console.log(result);
~~~`,
    correctOptionId: "c",
    options: [
      {
        "id": "a",
        "text": "{\"n\":3}",
        "explanation": "Поле n изменилось, но для корня reviver ничего не вернул. Итогом стал undefined."
      },
      {
        "id": "b",
        "text": "{\"n\":2}",
        "explanation": "Reviver не оставляет все значения без изменений автоматически. Нужен общий return value."
      },
      {
        "id": "c",
        "text": "undefined",
        "explanation": "Последний вызов относится к корню с ключом \"\". Отсутствующий return заменяет весь результат на undefined."
      },
      {
        "id": "d",
        "text": "SyntaxError",
        "explanation": "Текст корректен. Отсутствие return у reviver не является синтаксической ошибкой."
      }
    ],
    visual: {
      "motif": "payload"
    },
    readMoreUrl: feSection1_7ReadMoreUrls.q22,
  },
  {
    id: "fe-1.7-quiz-module-this",
    type: "quiz",
    question: `Node.js, файл main.mjs. Что выведется?

~~~js
console.log(this);
~~~`,
    correctOptionId: "a",
    options: [
      {
        "id": "a",
        "text": "undefined",
        "explanation": "Верхнеуровневый this в ESM равен undefined."
      },
      {
        "id": "b",
        "text": "globalThis",
        "explanation": "В ESM верхнеуровневый this не указывает на глобальный объект."
      },
      {
        "id": "c",
        "text": "{}",
        "explanation": "Это не CommonJS-обёртка с module.exports."
      },
      {
        "id": "d",
        "text": "ReferenceError",
        "explanation": "Чтение this здесь разрешено и не выбрасывает ошибку."
      }
    ],
    readMoreUrl: feSection1_7ReadMoreUrls.q1,
  },
  {
    id: "fe-1.7-quiz-namespace-default",
    type: "quiz",
    question: `ESM: math.mjs экспортирует default-функцию и step=2. Что выведется?

~~~js
import * as api from "./math.mjs";
console.log(typeof api.default);
~~~`,
    correctOptionId: "d",
    options: [
      {
        "id": "a",
        "text": "\"object\"",
        "explanation": "Пространство имён — объект, но его свойство default содержит функцию."
      },
      {
        "id": "b",
        "text": "\"undefined\"",
        "explanation": "Default входит в пространство имён."
      },
      {
        "id": "c",
        "text": "TypeError",
        "explanation": "Чтение существующего свойства не вызывает ошибку."
      },
      {
        "id": "d",
        "text": "\"function\"",
        "explanation": "Пространство имён включает экспорт default; здесь это функция."
      }
    ],
    readMoreUrl: feSection1_7ReadMoreUrls.q2,
  },
  {
    id: "fe-1.7-quiz-named-alias",
    type: "quiz",
    question: `ESM: math.mjs экспортирует step=2. Что выведется?

~~~js
import { step as local }
  from "./math.mjs";
console.log(local);
~~~`,
    correctOptionId: "c",
    options: [
      {
        "id": "a",
        "text": "\"step\"",
        "explanation": "as не возвращает строку с именем экспорта."
      },
      {
        "id": "b",
        "text": "undefined",
        "explanation": "Имя step действительно экспортируется."
      },
      {
        "id": "c",
        "text": "2",
        "explanation": "as меняет локальное имя импортируемой привязки."
      },
      {
        "id": "d",
        "text": "ReferenceError",
        "explanation": "Локальная привязка называется local и существует."
      }
    ],
    readMoreUrl: feSection1_7ReadMoreUrls.q2,
  },
  {
    id: "fe-1.7-quiz-dependency-order",
    type: "quiz",
    question: `ESM: dep.mjs выводит "dep". Каков порядок?

~~~js
console.log("main");
import "./dep.mjs";
~~~`,
    correctOptionId: "b",
    options: [
      {
        "id": "a",
        "text": "\"main\" / \"dep\"",
        "explanation": "Положение статического импорта не откладывает выполнение зависимости."
      },
      {
        "id": "b",
        "text": "\"dep\" / \"main\"",
        "explanation": "Зависимость выполняется перед телом этого ациклического потребителя."
      },
      {
        "id": "c",
        "text": "\"main\"",
        "explanation": "Побочный эффект зависимости выполняется."
      },
      {
        "id": "d",
        "text": "SyntaxError",
        "explanation": "Статический импорт разрешён ниже других инструкций на верхнем уровне."
      }
    ],
    readMoreUrl: feSection1_7ReadMoreUrls.q3,
  },
  {
    id: "fe-1.7-quiz-live-snapshot",
    type: "quiz",
    question: `ESM: counter.mjs экспортирует count=0 и inc(), увеличивающую count. Что выведется?

~~~js
import { count, inc }
  from "./counter.mjs";
const copy = count;
inc();
console.log(count, copy);
~~~`,
    correctOptionId: "a",
    options: [
      {
        "id": "a",
        "text": "1 / 0",
        "explanation": "Импорт видит 1; сохранённый до изменения снимок остаётся 0."
      },
      {
        "id": "b",
        "text": "1 / 1",
        "explanation": "Локальное число copy не становится живым импортом."
      },
      {
        "id": "c",
        "text": "0 / 0",
        "explanation": "Импорт читает обновлённую привязку count."
      },
      {
        "id": "d",
        "text": "0 / 1",
        "explanation": "Изменяется исходная привязка, а не ранее сохранённое число."
      }
    ],
    readMoreUrl: feSection1_7ReadMoreUrls.q4,
  },
  {
    id: "fe-1.7-quiz-import-assignment",
    type: "quiz",
    question: `ESM: counter.mjs экспортирует let count=0. Чем закончится код?

~~~js
import { count }
  from "./counter.mjs";
count = 3;
~~~`,
    correctOptionId: "d",
    options: [
      {
        "id": "a",
        "text": "3",
        "explanation": "Потребитель не имеет права переназначать импортированное имя."
      },
      {
        "id": "b",
        "text": "ReferenceError",
        "explanation": "Привязка найдена и инициализирована; проблема в присваивании."
      },
      {
        "id": "c",
        "text": "SyntaxError",
        "explanation": "Сам синтаксис присваивания допускает разбор; ошибка возникает при выполнении."
      },
      {
        "id": "d",
        "text": "TypeError",
        "explanation": "Присваивание импортированной привязке приводит к TypeError."
      }
    ],
    readMoreUrl: feSection1_7ReadMoreUrls.q4,
  },
  {
    id: "fe-1.7-quiz-default-expression",
    type: "quiz",
    question: `ESM: source.mjs задаёт n=1, export default n, экспортирует n как current и меняет n на 2.

~~~js
import first, { current }
  from "./source.mjs";
console.log(first, current);
~~~`,
    correctOptionId: "c",
    options: [
      {
        "id": "a",
        "text": "2 / 2",
        "explanation": "Export default n сохраняет результат выражения, а не эту привязку n."
      },
      {
        "id": "b",
        "text": "1 / 1",
        "explanation": "Именованный current остаётся живой привязкой."
      },
      {
        "id": "c",
        "text": "1 / 2",
        "explanation": "Default-выражение сохраняет 1; current читает обновлённое 2."
      },
      {
        "id": "d",
        "text": "undefined / 2",
        "explanation": "В модуле есть действительный экспорт default."
      }
    ],
    readMoreUrl: feSection1_7ReadMoreUrls.q5,
  },
  {
    id: "fe-1.7-quiz-reexport-local",
    type: "quiz",
    question: `ESM: math.mjs экспортирует step. Чем закончится этот модуль?

~~~js
export { step }
  from "./math.mjs";
console.log(step);
~~~`,
    correctOptionId: "b",
    options: [
      {
        "id": "a",
        "text": "2",
        "explanation": "Переэкспорт сам не создаёт локального step."
      },
      {
        "id": "b",
        "text": "ReferenceError",
        "explanation": "У переэкспорта нет локальной привязки step; её чтение даёт ReferenceError."
      },
      {
        "id": "c",
        "text": "undefined",
        "explanation": "Отсутствующее локальное имя не читается как undefined."
      },
      {
        "id": "d",
        "text": "TypeError",
        "explanation": "Ошибка возникает при поиске имени, а не при вызове значения."
      }
    ],
    readMoreUrl: feSection1_7ReadMoreUrls.q2,
  },
  {
    id: "fe-1.7-quiz-cycle-repair",
    type: "quiz",
    question: "Цикл ESM падает при раннем чтении const из зависимости. Что устраняет сам цикл?",
    correctOptionId: "b",
    options: [
      {
        "id": "a",
        "text": "Переставить строки import",
        "explanation": "Связи графа существуют до выполнения тела."
      },
      {
        "id": "b",
        "text": "Вынести общий договор в третий модуль",
        "explanation": "Оба модуля зависят от общего договора, а не друг от друга."
      },
      {
        "id": "c",
        "text": "Заменить let на const везде",
        "explanation": "Это не удаляет ребро графа и может сохранить TDZ."
      },
      {
        "id": "d",
        "text": "Добавить export default",
        "explanation": "Форма экспорта сама не исправляет зависимость."
      }
    ],
    readMoreUrl: feSection1_7ReadMoreUrls.q6,
  },
  {
    id: "fe-1.7-quiz-import-failure",
    type: "quiz",
    question: `Node.js ESM: missing.mjs отсутствует. Что выведется?

~~~js
try {
  await import("./missing.mjs");
} catch (e) {
  console.log(e.code);
}
~~~`,
    correctOptionId: "d",
    options: [
      {
        "id": "a",
        "text": "\"SyntaxError\"",
        "explanation": "Это код отсутствующего файла, а не ошибка синтаксиса найденного модуля."
      },
      {
        "id": "b",
        "text": "undefined",
        "explanation": "Код ошибки наблюдается внутри catch."
      },
      {
        "id": "c",
        "text": "\"ok\"",
        "explanation": "Неуспешная загрузка не возвращает успешный результат."
      },
      {
        "id": "d",
        "text": "\"ERR_MODULE_NOT_FOUND\"",
        "explanation": "Promise динамического импорта отклоняется; await позволяет обработать отказ."
      }
    ],
    readMoreUrl: feSection1_7ReadMoreUrls.q7,
  },
  {
    id: "fe-1.7-quiz-import-cache",
    type: "quiz",
    question: `ESM: оба пути ведут к одному feature.mjs. Что выведется?

~~~js
const a = await import(
  "./feature.mjs");
const b = await import(
  "./feature.mjs");
console.log(a === b);
~~~`,
    correctOptionId: "c",
    options: [
      {
        "id": "a",
        "text": "false",
        "explanation": "В этом процессе одинаково разрешённый модуль использует тот же экземпляр."
      },
      {
        "id": "b",
        "text": "undefined",
        "explanation": "Оба успешных импорта возвращают пространства имён."
      },
      {
        "id": "c",
        "text": "true",
        "explanation": "Один и тот же разрешённый модуль возвращает то же пространство имён."
      },
      {
        "id": "d",
        "text": "TypeError",
        "explanation": "Сравнение этих объектов разрешено."
      }
    ],
    readMoreUrl: feSection1_7ReadMoreUrls.q7,
  },
  {
    id: "fe-1.7-quiz-conditional-load",
    type: "quiz",
    question: "Модуль нужен только после выбора режима. Какая форма допускает условную загрузку во время работы?",
    correctOptionId: "c",
    options: [
      {
        "id": "a",
        "text": "Статический import внутри if",
        "explanation": "Статический import не размещают внутри блока if."
      },
      {
        "id": "b",
        "text": "Переименовать импорт через as",
        "explanation": "Переименование не откладывает загрузку."
      },
      {
        "id": "c",
        "text": "Вызвать import() в нужной ветке",
        "explanation": "Динамический импорт — выражение; его Promise нужно наблюдать."
      },
      {
        "id": "d",
        "text": "Написать import ниже условия",
        "explanation": "Положение статической связи не превращает её в условную."
      }
    ],
    readMoreUrl: feSection1_7ReadMoreUrls.q7,
  },
  {
    id: "fe-1.7-quiz-tla-value",
    type: "quiz",
    question: `ESM: config.mjs экспортирует config = await Promise.resolve(7). Что выведется?

~~~js
import { config }
  from "./config.mjs";
console.log(config);
~~~`,
    correctOptionId: "a",
    options: [
      {
        "id": "a",
        "text": "7",
        "explanation": "Потребитель выполняется после готовности асинхронной зависимости."
      },
      {
        "id": "b",
        "text": "\"Promise\"",
        "explanation": "Зависимый модуль ждёт завершения TLA, а не получает строку Promise."
      },
      {
        "id": "c",
        "text": "undefined",
        "explanation": "Экспорт готов до выполнения тела этого потребителя."
      },
      {
        "id": "d",
        "text": "ReferenceError",
        "explanation": "Это ациклическая успешно завершившаяся зависимость."
      }
    ],
    readMoreUrl: feSection1_7ReadMoreUrls.q8,
  },
  {
    id: "fe-1.7-quiz-cjs-top-await",
    type: "quiz",
    question: `Node.js: код находится в main.cjs. Чем закончится загрузка?

~~~js
const p = Promise.resolve(7);
const value = await p;
console.log(value);
~~~`,
    correctOptionId: "d",
    options: [
      {
        "id": "a",
        "text": "7",
        "explanation": "Top-level await не разрешён в обычном CommonJS-файле."
      },
      {
        "id": "b",
        "text": "undefined",
        "explanation": "Код не доходит до console.log."
      },
      {
        "id": "c",
        "text": "TypeError",
        "explanation": "Ошибка относится к синтаксису await в этом формате."
      },
      {
        "id": "d",
        "text": "SyntaxError",
        "explanation": "В main.cjs top-level await является SyntaxError."
      }
    ],
    readMoreUrl: feSection1_7ReadMoreUrls.q8,
  },
  {
    id: "fe-1.7-quiz-shake-side-effect",
    type: "quiz",
    question: "После tree shaking пропала регистрация обработчика. Пакет ошибочно помечен sideEffects: false. Что проверять?",
    correctOptionId: "b",
    options: [
      {
        "id": "a",
        "text": "Только размер bundle",
        "explanation": "Маленький bundle может содержать сломанную программу."
      },
      {
        "id": "b",
        "text": "Нужные побочные файлы и результат сборки",
        "explanation": "Метаданные должны сохранять инициализацию; поведение проверяют вместе с удалением лишнего кода."
      },
      {
        "id": "c",
        "text": "Только имя default-экспорта",
        "explanation": "Форма имени не описывает эффект регистрации."
      },
      {
        "id": "d",
        "text": "Только порядок строк import",
        "explanation": "Проблема связана с разрешением исключить модуль из сборки."
      }
    ],
    readMoreUrl: feSection1_7ReadMoreUrls.q9,
  },
  {
    id: "fe-1.7-quiz-file-format",
    type: "quiz",
    question: "Нужно однозначно указать ESM в примере Node.js без зависимости от соседнего package.json. Что выбрать?",
    correctOptionId: "d",
    options: [
      {
        "id": "a",
        "text": "main.cjs",
        "explanation": "Расширение .cjs однозначно выбирает CommonJS."
      },
      {
        "id": "b",
        "text": "main.json",
        "explanation": "Это формат данных, а не обычный ESM-файл JavaScript."
      },
      {
        "id": "c",
        "text": "Произвольный main.js без договора",
        "explanation": "Для .js важны настройки пакета и правила версии Node."
      },
      {
        "id": "d",
        "text": "main.mjs",
        "explanation": "Расширение .mjs явно указывает ESM."
      }
    ],
    readMoreUrl: feSection1_7ReadMoreUrls.q10,
  },
  {
    id: "fe-1.7-quiz-exports-rebind",
    type: "quiz",
    question: `Node.js, файл main.cjs. Что выведется?

~~~js
exports.ready = false;
exports = { ready: true };
console.log(module.exports.ready);
~~~`,
    correctOptionId: "a",
    options: [
      {
        "id": "a",
        "text": "false",
        "explanation": "Изменена локальная ссылка exports; возвращаемый объект сохранился."
      },
      {
        "id": "b",
        "text": "true",
        "explanation": "Переназначение exports не заменило module.exports."
      },
      {
        "id": "c",
        "text": "undefined",
        "explanation": "У исходного экспортируемого объекта осталось ready=false."
      },
      {
        "id": "d",
        "text": "TypeError",
        "explanation": "Локальную переменную exports можно переназначать."
      }
    ],
    readMoreUrl: feSection1_7ReadMoreUrls.q11,
  },
  {
    id: "fe-1.7-quiz-cjs-destructure",
    type: "quiz",
    question: `CJS: api.cjs экспортирует {n:0}; повторный require даёт тот же объект. Что выведется?

~~~js
const api = require("./api.cjs");
const { n } = api;
api.n = 2;
console.log(n, api.n);
~~~`,
    correctOptionId: "d",
    options: [
      {
        "id": "a",
        "text": "2 / 2",
        "explanation": "Деструктуризация сохранила числовой снимок n."
      },
      {
        "id": "b",
        "text": "0 / 0",
        "explanation": "Свойство общего объекта было изменено."
      },
      {
        "id": "c",
        "text": "2 / 0",
        "explanation": "Снимок не обновляется, а объект получает 2."
      },
      {
        "id": "d",
        "text": "0 / 2",
        "explanation": "Обычная деструктуризация не создаёт живой импорт."
      }
    ],
    readMoreUrl: feSection1_7ReadMoreUrls.q11,
  },
  {
    id: "fe-1.7-quiz-cjs-default",
    type: "quiz",
    question: `Node.js ESM: legacy.cjs задаёт module.exports={ready:true}. Что выведется?

~~~js
import api from "./legacy.cjs";
console.log(api.ready);
~~~`,
    correctOptionId: "c",
    options: [
      {
        "id": "a",
        "text": "undefined",
        "explanation": "Default соответствует module.exports, а не пустому объекту."
      },
      {
        "id": "b",
        "text": "\"true\"",
        "explanation": "Значение свойства — boolean, не строка."
      },
      {
        "id": "c",
        "text": "true",
        "explanation": "Default-импорт CommonJS даёт экспортируемый объект."
      },
      {
        "id": "d",
        "text": "SyntaxError",
        "explanation": "Такой default-импорт CJS поддерживается нативным Node."
      }
    ],
    readMoreUrl: feSection1_7ReadMoreUrls.q12,
  },
  {
    id: "fe-1.7-quiz-cjs-named-snapshot",
    type: "quiz",
    question: `Node 24.21.0: legacy.cjs задаёт exports.count=0 и inc(), увеличивающую его. Что выведется?

~~~js
import api, { count }
  from "./legacy.cjs";
api.inc();
console.log(count, api.count);
~~~`,
    correctOptionId: "b",
    options: [
      {
        "id": "a",
        "text": "1 / 1",
        "explanation": "Выделенное CJS-имя не обновляется как живая ESM-привязка."
      },
      {
        "id": "b",
        "text": "0 / 1",
        "explanation": "Обнаруженное имя остаётся снимком; свойство default-объекта стало 1."
      },
      {
        "id": "c",
        "text": "0 / 0",
        "explanation": "Объект module.exports изменён вызовом inc()."
      },
      {
        "id": "d",
        "text": "1 / 0",
        "explanation": "Обновляется свойство объекта, а не выделенное имя."
      }
    ],
    readMoreUrl: feSection1_7ReadMoreUrls.q12,
  },
  {
    id: "fe-1.7-quiz-require-sync-esm",
    type: "quiz",
    question: `Node 24.21.0: value.mjs экспортирует n=7 и не имеет TLA в графе. Что выведется?

~~~js
const api =
  require("./value.mjs");
console.log(api.n);
~~~`,
    correctOptionId: "a",
    options: [
      {
        "id": "a",
        "text": "7",
        "explanation": "На указанной версии require возвращает пространство имён синхронного ESM."
      },
      {
        "id": "b",
        "text": "ERR_REQUIRE_ESM",
        "explanation": "На указанной сборке синхронный ESM-граф допускает require."
      },
      {
        "id": "c",
        "text": "undefined",
        "explanation": "Пространство имён содержит именованный экспорт n."
      },
      {
        "id": "d",
        "text": "\"Promise\"",
        "explanation": "require остаётся синхронным вызовом, а не import()."
      }
    ],
    readMoreUrl: feSection1_7ReadMoreUrls.q13,
  },
  {
    id: "fe-1.7-quiz-require-transitive-tla",
    type: "quiz",
    question: `Node 24.21.0: entry.mjs импортирует dep.mjs с top-level await. Что произойдёт?

~~~js
try {
  require("./entry.mjs");
} catch (e) {
  console.log(e.code);
}
~~~`,
    correctOptionId: "d",
    options: [
      {
        "id": "a",
        "text": "\"ERR_REQUIRE_ESM\"",
        "explanation": "На этой сборке причина — асинхронный граф, а не любой ESM."
      },
      {
        "id": "b",
        "text": "undefined",
        "explanation": "Наличие TLA в зависимости тоже проверяется."
      },
      {
        "id": "c",
        "text": "7",
        "explanation": "Синхронная загрузка не может пропустить TLA зависимости."
      },
      {
        "id": "d",
        "text": "\"ERR_REQUIRE_ASYNC_MODULE\"",
        "explanation": "Ограничение относится ко всему загружаемому графу."
      }
    ],
    readMoreUrl: feSection1_7ReadMoreUrls.q13,
  },
  {
    id: "fe-1.7-quiz-throw-value",
    type: "quiz",
    question: `Что получает catch?

~~~js
try { throw 7; }
catch (e) { console.log(e); }
~~~`,
    correctOptionId: "c",
    options: [
      {
        "id": "a",
        "text": "\"7\"",
        "explanation": "Числовой выброс не превращается автоматически в строку."
      },
      {
        "id": "b",
        "text": "Error",
        "explanation": "Движок не оборачивает каждый выброс в Error."
      },
      {
        "id": "c",
        "text": "7",
        "explanation": "Catch получает то же значение, которое было передано throw."
      },
      {
        "id": "d",
        "text": "undefined",
        "explanation": "Catch получает само выброшенное значение."
      }
    ],
    visual: {
      "motif": "causes"
    },
    readMoreUrl: feSection1_7ReadMoreUrls.q15,
  },
  {
    id: "fe-1.7-quiz-throw-skips",
    type: "quiz",
    question: `Каков журнал?

~~~js
const log = [];
try {
  log.push(1);
  throw 7;
  log.push(2);
} catch { log.push(3); }
finally { log.push(4); }
console.log(log);
~~~`,
    correctOptionId: "b",
    options: [
      {
        "id": "a",
        "text": "[1, 2, 3, 4]",
        "explanation": "После throw инструкция push(2) не выполняется."
      },
      {
        "id": "b",
        "text": "[1, 3, 4]",
        "explanation": "Throw пропускает остаток try; затем выполняются catch и finally."
      },
      {
        "id": "c",
        "text": "[1, 3]",
        "explanation": "Finally выполняется и после перехвата."
      },
      {
        "id": "d",
        "text": "[3, 4]",
        "explanation": "Push(1) произошёл до выброса."
      }
    ],
    visual: {
      "motif": "causes"
    },
    readMoreUrl: feSection1_7ReadMoreUrls.q15,
  },
  {
    id: "fe-1.7-quiz-finally-hides-throw",
    type: "quiz",
    question: `Что вернёт вызов?

~~~js
function f() {
  try { throw 9; }
  finally { return 7; }
}
console.log(f());
~~~`,
    correctOptionId: "a",
    options: [
      {
        "id": "a",
        "text": "7",
        "explanation": "Return в finally заменяет прежний выброс."
      },
      {
        "id": "b",
        "text": "9",
        "explanation": "Возврат в finally заменяет ожидавшийся выброс."
      },
      {
        "id": "c",
        "text": "undefined",
        "explanation": "В finally есть явный return 7."
      },
      {
        "id": "d",
        "text": "SyntaxError",
        "explanation": "Конструкция синтаксически допустима, хотя скрывает отказ."
      }
    ],
    visual: {
      "motif": "causes"
    },
    readMoreUrl: feSection1_7ReadMoreUrls.q16,
  },
  {
    id: "fe-1.7-quiz-finally-primitive",
    type: "quiz",
    question: `Что выведется?

~~~js
function f() {
  let n = 1;
  try { return n; }
  finally { n = 2; }
}
console.log(f());
~~~`,
    correctOptionId: "d",
    options: [
      {
        "id": "a",
        "text": "2",
        "explanation": "Return уже вычислил числовое значение до finally."
      },
      {
        "id": "b",
        "text": "undefined",
        "explanation": "Обычное завершение finally не стирает return."
      },
      {
        "id": "c",
        "text": "TypeError",
        "explanation": "Переменная n объявлена через let, менять её разрешено."
      },
      {
        "id": "d",
        "text": "1",
        "explanation": "Finally меняет локальную переменную, но не уже вычисленное число возврата."
      }
    ],
    visual: {
      "motif": "causes"
    },
    readMoreUrl: feSection1_7ReadMoreUrls.q16,
  },
  {
    id: "fe-1.7-quiz-finally-object",
    type: "quiz",
    question: `Что выведется?

~~~js
function f() {
  const x = { n: 1 };
  try { return x; }
  finally { x.n = 2; }
}
console.log(f().n);
~~~`,
    correctOptionId: "c",
    options: [
      {
        "id": "a",
        "text": "1",
        "explanation": "Возвращается общая ссылка, и её объект изменён в finally."
      },
      {
        "id": "b",
        "text": "undefined",
        "explanation": "Объект содержит собственное свойство n."
      },
      {
        "id": "c",
        "text": "2",
        "explanation": "Свойство того же возвращаемого объекта изменилось до выхода."
      },
      {
        "id": "d",
        "text": "TypeError",
        "explanation": "Const запрещает переназначение x, но не эту запись свойства."
      }
    ],
    visual: {
      "motif": "causes"
    },
    readMoreUrl: feSection1_7ReadMoreUrls.q16,
  },
  {
    id: "fe-1.7-quiz-return-rejection",
    type: "quiz",
    question: `Кто увидит отклонение? Что выведется?

~~~js
async function f() {
  try {
    return Promise.reject(7);
  }
  catch { return "inner"; }
}
try { await f(); }
catch (e) { console.log(e); }
~~~`,
    correctOptionId: "b",
    options: [
      {
        "id": "a",
        "text": "\"inner\"",
        "explanation": "Локальный try не ожидает Promise и не ловит его отклонение."
      },
      {
        "id": "b",
        "text": "7",
        "explanation": "Отклонение наблюдает внешний await; локальный catch не выполняется."
      },
      {
        "id": "c",
        "text": "undefined",
        "explanation": "Внешний await получает отклонение и передаёт 7 в catch."
      },
      {
        "id": "d",
        "text": "SyntaxError",
        "explanation": "В асинхронной функции такой возврат синтаксически допустим."
      }
    ],
    visual: {
      "motif": "causes"
    },
    readMoreUrl: feSection1_7ReadMoreUrls.q17,
  },
  {
    id: "fe-1.7-quiz-cause-identity",
    type: "quiz",
    question: `Что выведется?

~~~js
const source = new Error("bad");
const outer = new Error("read",
  { cause: source });
console.log(
  outer.cause === source);
~~~`,
    correctOptionId: "a",
    options: [
      {
        "id": "a",
        "text": "true",
        "explanation": "Cause хранит ссылку на тот же исходный объект."
      },
      {
        "id": "b",
        "text": "false",
        "explanation": "Cause сохраняет исходный объект, не клонирует его."
      },
      {
        "id": "c",
        "text": "\"bad\"",
        "explanation": "Проверяется идентичность, а не чтение сообщения."
      },
      {
        "id": "d",
        "text": "undefined",
        "explanation": "Опция cause была явно передана."
      }
    ],
    visual: {
      "motif": "causes"
    },
    readMoreUrl: feSection1_7ReadMoreUrls.q18,
  },
  {
    id: "fe-1.7-quiz-cause-presence",
    type: "quiz",
    question: `Что выведется?

~~~js
const a = new Error("x");
const b = new Error("x",
  { cause: undefined });
console.log(
  Object.hasOwn(a, "cause"),
  Object.hasOwn(b, "cause"));
~~~`,
    correctOptionId: "d",
    options: [
      {
        "id": "a",
        "text": "false / false",
        "explanation": "Явная опция cause создаёт поле даже при значении undefined."
      },
      {
        "id": "b",
        "text": "true / true",
        "explanation": "Без опции cause это поле не создаётся."
      },
      {
        "id": "c",
        "text": "true / false",
        "explanation": "Наличие зависит от передачи опции, а не от truthiness значения."
      },
      {
        "id": "d",
        "text": "false / true",
        "explanation": "Отсутствующее поле отличается от собственного поля со значением undefined."
      }
    ],
    visual: {
      "motif": "causes"
    },
    readMoreUrl: feSection1_7ReadMoreUrls.q18,
  },
  {
    id: "fe-1.7-quiz-rethrow-identity",
    type: "quiz",
    question: `Что выведется?

~~~js
const source = new Error("x");
try {
  try { throw source; }
  catch (e) { throw e; }
} catch (e) {
  console.log(e === source);
}
~~~`,
    correctOptionId: "c",
    options: [
      {
        "id": "a",
        "text": "false",
        "explanation": "Повторный throw не создаёт новый Error автоматически."
      },
      {
        "id": "b",
        "text": "\"x\"",
        "explanation": "Печатается сравнение объектов, а не сообщение."
      },
      {
        "id": "c",
        "text": "true",
        "explanation": "Throw того же значения сохраняет его идентичность."
      },
      {
        "id": "d",
        "text": "undefined",
        "explanation": "Внешний catch получает исходный объект."
      }
    ],
    visual: {
      "motif": "causes"
    },
    readMoreUrl: feSection1_7ReadMoreUrls.q18,
  },
  {
    id: "fe-1.7-quiz-unknown-error",
    type: "quiz",
    question: "Слой обрабатывает только подтверждённый код INVALID_CONFIG. Как поступить с неизвестной ошибкой?",
    correctOptionId: "c",
    options: [
      {
        "id": "a",
        "text": "Вернуть {}",
        "explanation": "Это может скрыть отказ обязательной операции."
      },
      {
        "id": "b",
        "text": "Проверить подстроку сообщения",
        "explanation": "Текст сообщения не является устойчивым договором о типе."
      },
      {
        "id": "c",
        "text": "Передать ошибку выше",
        "explanation": "Если здесь нет осмысленного обработчика, нужно сохранить отказ."
      },
      {
        "id": "d",
        "text": "Всегда заменить новым Error без cause",
        "explanation": "Так потеряется исходная причина без полезного контекста."
      }
    ],
    visual: {
      "motif": "causes"
    },
    readMoreUrl: feSection1_7ReadMoreUrls.q19,
  },
  {
    id: "fe-1.7-quiz-json-number-root",
    type: "quiz",
    question: `Что выведется?

~~~js
console.log(
  typeof JSON.parse("42")
);
~~~`,
    correctOptionId: "a",
    options: [
      {
        "id": "a",
        "text": "\"number\"",
        "explanation": "JSON допускает числовое корневое значение."
      },
      {
        "id": "b",
        "text": "\"object\"",
        "explanation": "Корневое JSON-значение не обязано быть объектом."
      },
      {
        "id": "c",
        "text": "\"string\"",
        "explanation": "Разбор возвращает число, описанное текстом."
      },
      {
        "id": "d",
        "text": "SyntaxError",
        "explanation": "42 — корректный JSON-текст."
      }
    ],
    visual: {
      "motif": "payload"
    },
    readMoreUrl: feSection1_7ReadMoreUrls.q20,
  },
  {
    id: "fe-1.7-quiz-json-position",
    type: "quiz",
    question: `Что выведется?

~~~js
console.log(JSON.stringify(
  { x: undefined, a: [undefined] }
));
~~~`,
    correctOptionId: "d",
    options: [
      {
        "id": "a",
        "text": "\"{\\\"x\\\":null,\\\"a\\\":[null]}\"",
        "explanation": "Непредставимое поле объекта пропускается, а не становится null."
      },
      {
        "id": "b",
        "text": "\"{\\\"a\\\":[]}\"",
        "explanation": "Позиция массива сохраняется через null."
      },
      {
        "id": "c",
        "text": "undefined",
        "explanation": "Корень здесь — представимый объект, а не undefined."
      },
      {
        "id": "d",
        "text": "\"{\\\"a\\\":[null]}\"",
        "explanation": "Поле x пропущено, позиция массива a сохранена через null."
      }
    ],
    visual: {
      "motif": "payload"
    },
    readMoreUrl: feSection1_7ReadMoreUrls.q20,
  },
  {
    id: "fe-1.7-quiz-json-bigint",
    type: "quiz",
    question: `Чем закончится обычная сериализация без hooks?

~~~js
console.log(JSON.stringify(7n));
~~~`,
    correctOptionId: "c",
    options: [
      {
        "id": "a",
        "text": "\"7\"",
        "explanation": "BigInt без явного преобразования не сериализуется как число."
      },
      {
        "id": "b",
        "text": "\"\\\"7\\\"\"",
        "explanation": "Строковое представление нужно задать явно."
      },
      {
        "id": "c",
        "text": "TypeError",
        "explanation": "Без пользовательского преобразования BigInt вызывает TypeError."
      },
      {
        "id": "d",
        "text": "undefined",
        "explanation": "BigInt вызывает ошибку, а не правило корневого undefined."
      }
    ],
    visual: {
      "motif": "payload"
    },
    readMoreUrl: feSection1_7ReadMoreUrls.q20,
  },
  {
    id: "fe-1.7-quiz-json-cycle",
    type: "quiz",
    question: `Чем закончится обычная сериализация?

~~~js
const value = {};
value.self = value;
const s = JSON.stringify(value);
console.log(s);
~~~`,
    correctOptionId: "b",
    options: [
      {
        "id": "a",
        "text": "\"{}\"",
        "explanation": "Собственная перечисляемая циклическая ссылка не пропускается молча."
      },
      {
        "id": "b",
        "text": "TypeError",
        "explanation": "Обычный stringify не умеет представить циклический граф и выбрасывает TypeError."
      },
      {
        "id": "c",
        "text": "\"{\\\"self\\\":null}\"",
        "explanation": "Цикл не превращается автоматически в null."
      },
      {
        "id": "d",
        "text": "undefined",
        "explanation": "Корень не является undefined; проблема в цикле."
      }
    ],
    visual: {
      "motif": "payload"
    },
    readMoreUrl: feSection1_7ReadMoreUrls.q20,
  },
  {
    id: "fe-1.7-quiz-replacer-root",
    type: "quiz",
    question: `Что вернёт stringify?

~~~js
const text = JSON.stringify(
  { n: 2 },
  (key, value) => key === ""
    ? undefined : value,
);
console.log(text);
~~~`,
    correctOptionId: "a",
    options: [
      {
        "id": "a",
        "text": "undefined",
        "explanation": "Замена корня на undefined означает отсутствие JSON-строки."
      },
      {
        "id": "b",
        "text": "\"{}\"",
        "explanation": "Replacer удаляет корневой результат целиком, а не только поле."
      },
      {
        "id": "c",
        "text": "\"{\\\"n\\\":2}\"",
        "explanation": "Первый вызов с пустым ключом относится к корню."
      },
      {
        "id": "d",
        "text": "\"null\"",
        "explanation": "Undefined для корня не преобразуется в JSON null."
      }
    ],
    visual: {
      "motif": "payload"
    },
    readMoreUrl: feSection1_7ReadMoreUrls.q21,
  },
  {
    id: "fe-1.7-quiz-tojson-before-replacer",
    type: "quiz",
    question: `Что выведется?

~~~js
const x = {
  toJSON() { return 7; },
};
console.log(JSON.stringify(
  x, (key, value) => value + 1
));
~~~`,
    correctOptionId: "d",
    options: [
      {
        "id": "a",
        "text": "\"7\"",
        "explanation": "Replacer вызывается после toJSON и добавляет 1."
      },
      {
        "id": "b",
        "text": "8",
        "explanation": "JSON.stringify возвращает строку, не число 8."
      },
      {
        "id": "c",
        "text": "TypeError",
        "explanation": "Оба преобразования допустимы."
      },
      {
        "id": "d",
        "text": "\"8\"",
        "explanation": "ToJSON возвращает 7, replacer меняет его на 8, stringify выдаёт строку."
      }
    ],
    visual: {
      "motif": "payload"
    },
    readMoreUrl: feSection1_7ReadMoreUrls.q21,
  },
  {
    id: "fe-1.7-quiz-reviver-hole",
    type: "quiz",
    question: `Что выведется?

~~~js
const a = JSON.parse("[1,2]",
  (key, value) => key === "0"
    ? undefined : value);
console.log(a.length);
console.log(Object.hasOwn(a, 0));
~~~`,
    correctOptionId: "c",
    options: [
      {
        "id": "a",
        "text": "1 / true",
        "explanation": "Удаление позиции не сдвигает остальные элементы."
      },
      {
        "id": "b",
        "text": "2 / true",
        "explanation": "Reviver удалил собственное свойство с индексом 0."
      },
      {
        "id": "c",
        "text": "2 / false",
        "explanation": "Undefined из reviver оставляет пустой слот при прежней длине массива."
      },
      {
        "id": "d",
        "text": "1 / false",
        "explanation": "Длина не сокращается автоматически при удалении элемента."
      }
    ],
    visual: {
      "motif": "payload"
    },
    readMoreUrl: feSection1_7ReadMoreUrls.q22,
  },
  {
    id: "fe-1.7-quiz-large-id-string",
    type: "quiz",
    question: `Что выведется?

~~~js
const x = JSON.parse(
  '{"id":"9007199254740993"}'
);
console.log(x.id);
~~~`,
    correctOptionId: "b",
    options: [
      {
        "id": "a",
        "text": "9007199254740992",
        "explanation": "ID передан строкой и не округляется как Number."
      },
      {
        "id": "b",
        "text": "\"9007199254740993\"",
        "explanation": "Строковый договор сохраняет цифры внешнего ID без преобразования в Number."
      },
      {
        "id": "c",
        "text": "9007199254740993",
        "explanation": "Результат остаётся строкой, а не числом."
      },
      {
        "id": "d",
        "text": "TypeError",
        "explanation": "JSON-строка с таким содержимым допустима."
      }
    ],
    visual: {
      "motif": "payload"
    },
    readMoreUrl: feSection1_7ReadMoreUrls.q22,
  },
  {
    id: "fe-1.7-quiz-valid-shape",
    type: "quiz",
    question: "Схема требует объект ровно с version:1 и theme:\"light\"|\"dark\". Какой JSON подходит?",
    correctOptionId: "c",
    options: [
      {
        "id": "a",
        "text": "null",
        "explanation": "Синтаксис корректен, но корень не является нужным объектом."
      },
      {
        "id": "b",
        "text": "[1,\"dark\"]",
        "explanation": "Массив не соответствует требуемой форме полей."
      },
      {
        "id": "c",
        "text": "{\"version\":1,\"theme\":\"dark\"}",
        "explanation": "Имена, типы, версия и набор полей соответствуют договору."
      },
      {
        "id": "d",
        "text": "{\"version\":\"1\",\"theme\":\"dark\"}",
        "explanation": "Версия передана строкой; схема требует число 1."
      }
    ],
    visual: {
      "motif": "payload"
    },
    readMoreUrl: feSection1_7ReadMoreUrls.q23,
  },
  {
    id: "fe-1.7-quiz-schema-no-coercion",
    type: "quiz",
    question: `Что выведется при строгой проверке версии?

~~~js
const x = JSON.parse(
  '{"version":"1"}'
);
console.log(x.version === 1);
~~~`,
    correctOptionId: "d",
    options: [
      {
        "id": "a",
        "text": "true",
        "explanation": "Успешный JSON.parse не преобразует строковую версию в число."
      },
      {
        "id": "b",
        "text": "\"false\"",
        "explanation": "Сравнение возвращает boolean, не строку."
      },
      {
        "id": "c",
        "text": "SyntaxError",
        "explanation": "Исходный текст синтаксически корректен."
      },
      {
        "id": "d",
        "text": "false",
        "explanation": "Версия остаётся строкой; === не выполняет числовую коэрсию."
      }
    ],
    visual: {
      "motif": "payload"
    },
    readMoreUrl: feSection1_7ReadMoreUrls.q23,
  },
  {
    id: "fe-1.7-quiz-own-required",
    type: "quiz",
    question: `Что выведется?

~~~js
const x = Object.create(
  { version: 1 });
console.log("version" in x);
console.log(Object.hasOwn(
  x, "version"));
~~~`,
    correctOptionId: "c",
    options: [
      {
        "id": "a",
        "text": "true / true",
        "explanation": "In видит унаследованное поле, Object.hasOwn — нет."
      },
      {
        "id": "b",
        "text": "false / false",
        "explanation": "В цепочке прототипов version действительно существует."
      },
      {
        "id": "c",
        "text": "true / false",
        "explanation": "Наследуемое свойство не выполняет требование собственного поля."
      },
      {
        "id": "d",
        "text": "false / true",
        "explanation": "Собственного version у x нет; оно у прототипа."
      }
    ],
    visual: {
      "motif": "payload"
    },
    readMoreUrl: feSection1_7ReadMoreUrls.q23,
  },
  {
    id: "fe-1.7-quiz-syntaxerror-source",
    type: "quiz",
    question: "Catch получил SyntaxError после JSON.parse(text, reviver). Что можно заключить без других данных?",
    correctOptionId: "b",
    options: [
      {
        "id": "a",
        "text": "Исходный JSON обязательно неверен",
        "explanation": "SyntaxError мог выбросить пользовательский reviver."
      },
      {
        "id": "b",
        "text": "Нужно различить разбор и reviver",
        "explanation": "Один класс исключения не доказывает этап; разделённые стадии дают ясную причину."
      },
      {
        "id": "c",
        "text": "Это всегда ошибка схемы",
        "explanation": "Схема могла вообще ещё не проверяться."
      },
      {
        "id": "d",
        "text": "Можно безопасно вернуть {}",
        "explanation": "Это зависит от договора; обязательный отказ нельзя скрывать."
      }
    ],
    visual: {
      "motif": "payload"
    },
    readMoreUrl: feSection1_7ReadMoreUrls.q23,
  },
  {
    id: "fe-1.7-quiz-mandatory-import",
    type: "quiz",
    question: "Модуль загрузился, JSON корректен, но обязательная схема неверна. Какой результат сохраняет договор?",
    correctOptionId: "d",
    options: [
      {
        "id": "a",
        "text": "Успешный пустой объект",
        "explanation": "Он скрывает потерю обязательных данных."
      },
      {
        "id": "b",
        "text": "Повторить загрузку модуля",
        "explanation": "Успешная загрузка не исправляет несоответствие схеме."
      },
      {
        "id": "c",
        "text": "Использовать данные без проверки",
        "explanation": "Так обходится сама граница формата."
      },
      {
        "id": "d",
        "text": "Передать отказ с кодом и причиной",
        "explanation": "Слой сообщает этап и сохраняет контекст для обработчика."
      }
    ],
    visual: {
      "motif": "payload"
    },
    readMoreUrl: feSection1_7ReadMoreUrls.q24,
  },
];
