import type { FlipCardData } from "./card-types";

export const flipCards: FlipCardData[] = [
  {
    id: "closure-live-binding-flip",
    type: "flip",
    question: `## Замыкание хранит копию значения или доступ к переменной?`,
    answer: `## Доступ к переменной

Замыкание сохраняет связь с переменной из **лексического окружения (lexical environment)**, а не снимок её значения.

~~~js
let value = 1;
const read = () => value;
value = 2;
read(); // 2
~~~`,
  },
  {
    id: "where-specificity-flip",
    type: "flip",
    question: `## Какую specificity получает селектор внутри \`:where()\`?`,
    answer: `## Всегда нулевую

Содержимое \`:where()\` не добавляет specificity — даже class или ID внутри.

~~~css
:where(.card #title) { /* 0-0-0 */ }
~~~`,
  },
  {
    id: "effect-cleanup-timing-flip",
    type: "flip",
    question: `## Когда React вызывает cleanup функции из \`useEffect\`?`,
    answer: `## Перед повторной синхронизацией и unmount

Cleanup запускается перед следующим выполнением effect с изменившимися dependencies и при удалении компонента.

В development Strict Mode React также делает дополнительный цикл setup → cleanup → setup, чтобы находить ошибки синхронизации.`,
  },
];
