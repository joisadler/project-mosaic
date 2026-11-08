import type { FlipCardData } from "./card-types";
import { feSection1_5ReadMoreUrls } from "./fe-1.5-source-urls";

// MOS-41: owner-approved subsection 1.5 coverage and presentation.
export const feSection1_5FlipCards: FlipCardData[] = [
  {
    id: "fe-1.5-flip-shallow-alias",
    type: "flip",
    readMoreUrl: feSection1_5ReadMoreUrls.q24,
    question: `Почему после \`[...items]\` изменение вложенного объекта видно в исходнике?`,
    answer: `Spread создаёт поверхностную копию (shallow copy): внешний массив новый, а вложенные объекты общие. Запись свойства такого объекта видна через обе ссылки. Для независимого изменения копируйте изменяемый путь.`,
    visual: {
      motif: "sharing"
    }
  },
  {
    id: "fe-1.5-flip-array-brand",
    type: "flip",
    readMoreUrl: feSection1_5ReadMoreUrls.q1,
    question: `Как проверить настоящий массив, включая массив из другой среды выполнения?`,
    answer: `Используйте \`Array.isArray(value)\`. \`typeof\` не отличает массив от объекта, а \`instanceof Array\` зависит от локального прототипа. TypedArray и объект с Array.prototype в цепочке не становятся обычными массивами.`
  },
  {
    id: "fe-1.5-flip-length-boundary",
    type: "flip",
    readMoreUrl: feSection1_5ReadMoreUrls.q2,
    question: `Что означает length у разреженного массива?`,
    answer: `Границу диапазона индексов, а не число существующих элементов. \`const a = []; a[3] = "x"\` даёт длину 4 при одном собственном индексном свойстве. Увеличение length создаёт пустые позиции, а не значения.`
  },
  {
    id: "fe-1.5-flip-hole-presence",
    type: "flip",
    readMoreUrl: feSection1_5ReadMoreUrls.q3,
    question: `Как отличить пустой слот от собственного свойства со значением undefined?`,
    answer: `Проверьте \`Object.hasOwn(array, index)\`: у пустого слота собственного свойства нет. Одно чтение значения недостаточно. Оператор \`in\` видит также свойства прототипов и отвечает на другой вопрос.`
  },
  {
    id: "fe-1.5-flip-delete-splice",
    type: "flip",
    readMoreUrl: feSection1_5ReadMoreUrls.q4,
    question: `Чем delete a[i] отличается от splice(i, 1)?`,
    answer: `delete удаляет свойство без сдвига и изменения length. splice удаляет позицию, сдвигает элементы, меняет длину и возвращает массив удалённых значений. toSpliced возвращает изменённую копию, сохраняя вход.`,
    visual: {
      motif: "transformation"
    }
  },
  {
    id: "fe-1.5-flip-map-filter-holes",
    type: "flip",
    readMoreUrl: feSection1_5ReadMoreUrls.q5,
    question: `Как map и filter ведут себя с пустыми слотами обычного массива?`,
    answer: `Без унаследованных индексных свойств оба пропускают callback для пустого слота. map сохраняет его позицию без свойства; filter записывает выбранные существующие значения подряд в плотный результат.`
  },
  {
    id: "fe-1.5-flip-slice-spread-holes",
    type: "flip",
    readMoreUrl: feSection1_5ReadMoreUrls.q5,
    question: `Чем slice() и [...array] отличаются при копировании пустых слотов?`,
    answer: `slice сохраняет пустые слоты обычного массива без унаследованных индексов. Spread использует встроенную итерацию: читает такие позиции как undefined и создаёт собственные свойства. Обе копии поверхностны.`,
    visual: {
      motif: "transformation"
    }
  },
  {
    id: "fe-1.5-flip-mutator-returns",
    type: "flip",
    readMoreUrl: feSection1_5ReadMoreUrls.q8,
    question: `Что возвращают push, pop, splice и reverse?`,
    answer: `push — новую длину; pop — удалённый последний элемент либо undefined; splice — массив удалённых значений; reverse — ту же ссылку на уже изменённый массив. Сначала уточняйте мутацию входа, затем возвращаемое значение.`
  },
  {
    id: "fe-1.5-flip-slice-splice-copy",
    type: "flip",
    readMoreUrl: feSection1_5ReadMoreUrls.q9,
    question: `Сравните результаты slice, splice и toSpliced.`,
    answer: `slice возвращает копию диапазона, не меняя вход. splice меняет вход и возвращает удалённые значения. toSpliced возвращает итоговую изменённую копию. У slice второй аргумент — исключённая граница, у splice/toSpliced — число удаляемых позиций.`,
    visual: {
      motif: "transformation"
    }
  },
  {
    id: "fe-1.5-flip-with-range",
    type: "flip",
    readMoreUrl: feSection1_5ReadMoreUrls.q11,
    question: `Можно ли расширить массив с помощью with(index, value)?`,
    answer: `Нет. with заменяет существующую позицию в новой копии. Отрицательный индекс считается с конца; выход за допустимый диапазон вызывает RangeError. В отличие от присваивания array[index], метод не увеличивает length.`,
    visual: {
      motif: "transformation"
    }
  },
  {
    id: "fe-1.5-flip-map-foreach",
    type: "flip",
    readMoreUrl: feSection1_5ReadMoreUrls.q13,
    question: `Когда выбирать map, а когда forEach?`,
    answer: `map — когда нужен новый массив результатов callback. forEach — для эффекта; значения callback игнорируются, результат метода undefined. В теле стрелки с фигурными скобками для результата нужен явный return.`,
    visual: {
      motif: "transformation"
    }
  },
  {
    id: "fe-1.5-flip-filter-boolean",
    type: "flip",
    readMoreUrl: feSection1_5ReadMoreUrls.q14,
    question: `Почему filter(Boolean) может терять нужные данные?`,
    answer: `Он удаляет все ложные значения, включая допустимые 0, false и пустую строку. Для удаления только null и undefined задайте точный предикат, например \`x => x != null\`. Сначала определите, какие значения считаются отсутствующими.`,
    visual: {
      motif: "transformation"
    }
  },
  {
    id: "fe-1.5-flip-find-undefined",
    type: "flip",
    readMoreUrl: feSection1_5ReadMoreUrls.q14,
    question: `Почему undefined от find не доказывает отсутствие совпадения?`,
    answer: `Совпавший элемент может сам быть undefined. find также читает пустые позиции как undefined. Чтобы отличить совпадение от отсутствия результата, используйте findIndex и проверку на -1; собственное наличие проверяйте отдельно.`
  },
  {
    id: "fe-1.5-flip-empty-every",
    type: "flip",
    readMoreUrl: feSection1_5ReadMoreUrls.q14,
    question: `Почему every у пустого массива даёт true, а some — false?`,
    answer: `every не находит нарушителя, some не находит подходящего элемента. Callback не вызывается. Если условие требует хотя бы один элемент и валидность всех, проверьте непустоту отдельно.`
  },
  {
    id: "fe-1.5-flip-reduce-initial",
    type: "flip",
    readMoreUrl: feSection1_5ReadMoreUrls.q15,
    question: `Что меняет initialValue в reduce?`,
    answer: `Он задаёт начальный аккумулятор и пустой случай. Без него reduce берёт первый существующий элемент; если такого элемента нет, вызывает TypeError. Явное initialValue помогает закрепить форму аккумулятора.`,
    visual: {
      motif: "transformation"
    }
  },
  {
    id: "fe-1.5-flip-async-foreach",
    type: "flip",
    readMoreUrl: feSection1_5ReadMoreUrls.q16,
    question: `Почему forEach(async callback) не ждёт завершения работы?`,
    answer: `forEach синхронно вызывает callback и игнорирует его возвращённый Promise. Сам метод возвращает undefined. map(async ...) даст массив Promise; ожидание результатов и обработка ошибок требуют отдельной координации.`,
    visual: {
      motif: "transformation"
    }
  },
  {
    id: "fe-1.5-flip-traversal-change",
    type: "flip",
    readMoreUrl: feSection1_5ReadMoreUrls.q17,
    question: `Что фиксирует forEach до обхода и что читает при достижении индекса?`,
    answer: `Исходную длину фиксирует заранее; существование свойства и значение читает при достижении позиции. Добавленное за исходной границей не посещается. Удалённое будущее свойство может пропустить callback, а изменение значения будет видно.`
  },
  {
    id: "fe-1.5-flip-comparator-sign",
    type: "flip",
    readMoreUrl: feSection1_5ReadMoreUrls.q19,
    question: `Каким должен быть результат корректного comparator?`,
    answer: `Отрицательное число для «раньше», 0 при равенстве по ключу, положительное для «позже». Нужны согласованность, противоположные знаки при перестановке и транзитивность. Boolean-компаратор не описывает оба направления.`,
    visual: {
      motif: "transformation"
    }
  },
  {
    id: "fe-1.5-flip-stable-sort",
    type: "flip",
    readMoreUrl: feSection1_5ReadMoreUrls.q19,
    question: `Что гарантирует стабильная сортировка при корректном comparator?`,
    answer: `Элементы, для которых сравнение возвращает 0, сохраняют взаимный порядок. Для нескольких полей сравнивайте следующий при равенстве предыдущего. Стабильность не обещает конкретный алгоритм или универсальную сложность.`,
    visual: {
      motif: "transformation"
    }
  },
  {
    id: "fe-1.5-flip-sort-copy",
    type: "flip",
    readMoreUrl: feSection1_5ReadMoreUrls.q20,
    question: `Что сохраняет toSorted, чего не сохраняет sort?`,
    answer: `toSorted сохраняет исходный контейнер, возвращая новый отсортированный массив. sort меняет вход и возвращает его же. Оба сохраняют ссылки на объекты-элементы; toSorted дополнительно материализует пустые слоты как undefined.`,
    visual: {
      motif: "transformation"
    }
  },
  {
    id: "fe-1.5-flip-destructure-default",
    type: "flip",
    readMoreUrl: feSection1_5ReadMoreUrls.q21,
    question: `Для каких извлечённых значений срабатывает default в деструктуризации?`,
    answer: `Только для undefined: отсутствующая позиция, пустой слот или явное undefined включают default. null, 0, false и пустая строка остаются собственными значениями. Это не проверка truthiness.`
  },
  {
    id: "fe-1.5-flip-spread-contexts",
    type: "flip",
    readMoreUrl: feSection1_5ReadMoreUrls.q22,
    question: `Что разворачивает spread в массиве, вызове и объектном литерале?`,
    answer: `В массиве и вызове — значения iterable. В объектном литерале — собственные перечисляемые строковые и Symbol-свойства. Эти операции поверхностны. Огромный spread в аргументы может превысить лимит движка.`,
    visual: {
      motif: "transformation"
    }
  },
  {
    id: "fe-1.5-flip-sharing-path",
    type: "flip",
    readMoreUrl: feSection1_5ReadMoreUrls.q25,
    question: `Какие ссылки должны измениться при обновлении со structural sharing?`,
    answer: `Новые контейнеры создаются вдоль изменяемого пути; неизменившиеся ветви остаются общими. Проверьте и значение, и идентичности. Общие ветви нельзя позже мутировать, если старые версии должны сохраняться.`,
    visual: {
      motif: "sharing"
    }
  },
  {
    id: "fe-1.5-flip-deep-contract",
    type: "flip",
    readMoreUrl: feSection1_5ReadMoreUrls.q27,
    question: `Что уточнить до выбора способа глубокой копии?`,
    answer: `Поддерживаемые типы, циклы, повторные ссылки, прототипы, дескрипторы и внешние ресурсы. Затем выберите явное копирование схемы, structuredClone или иной подход с нужным договором. «Клонировать всё» не задаёт достаточного контракта.`,
    visual: {
      motif: "transformation"
    }
  },
  {
    id: "fe-1.5-flip-clone-limits",
    type: "flip",
    readMoreUrl: feSection1_5ReadMoreUrls.q29,
    question: `Почему structuredClone не подходит для сохранения поведения экземпляра класса?`,
    answer: `Он не воспроизводит пользовательский прототип, методы, закрытые поля и исходные дескрипторы. Собственная функция в графе вызывает DataCloneError. Это алгоритм переноса поддерживаемых данных, а не копия поведения объекта.`,
    visual: {
      motif: "transformation"
    }
  },
  {
    id: "fe-1.5-flip-transfer-ownership",
    type: "flip",
    readMoreUrl: feSection1_5ReadMoreUrls.q30,
    question: `Что происходит с исходным ArrayBuffer после успешного transfer?`,
    answer: `Он отсоединён: byteLength равен 0. Данные доступны через новый буфер результата. Transfer меняет владельца ресурса, поэтому это наблюдаемое изменение, а не бесплатный способ получить ещё одну независимую копию.`,
    visual: {
      motif: "transformation"
    }
  },
  {
    id: "fe-1.5-flip-json-losses",
    type: "flip",
    readMoreUrl: feSection1_5ReadMoreUrls.q31,
    question: `Почему JSON round-trip не является универсальной глубокой копией?`,
    answer: `Он теряет типы и идентичности: undefined в объекте пропадает, в массиве становится null; Date становится строкой. Циклы и BigInt без специального преобразования вызывают TypeError. Используйте только для намеренно совместимого представления.`,
    visual: {
      motif: "transformation"
    }
  },
  {
    id: "fe-1.5-flip-review-checklist",
    type: "flip",
    readMoreUrl: feSection1_5ReadMoreUrls.q26,
    question: `В каком порядке проводить ревью преобразования массива?`,
    answer: `Проверьте наличие индексов и length, мутацию входа и возвращаемое значение, вызовы callback, порядок сортировки и общие ссылки. Затем — поддержку типов при клонировании, договор владения и измеренную стоимость.`,
    visual: {
      motif: "transformation"
    }
  }
];
