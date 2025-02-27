---
title: Настройки TypeScript о которых вам следует знать
created: 2024-11-20
modified: 2024-11-20
seo_description: Разберем основные настройки файла tsconfig.json
seo_tags:
  - TypeScript
tags:
  - TypeScript
---

Файл `tsconfig.json` в TypeScript — это больше, чем просто список настроек. Это инструмент для управления поведением вашего кода, его безопасностью и взаимодействием с другими системами. Независимо от того, являетесь ли вы опытным пользователем TypeScript или новичком в этом языке, понимание этих параметров конфигурации поможет вам создать надежную, эффективную и простую в обслуживании кодовую базу.

## Вкратце

Вот краткий обзор рекомендуемых наилучших настроек для вашего `tsconfig.json`. Эти параметры помогут улучшить скорость сборки, обеспечить безопасность кода, улучшить отладку и обеспечить совместимость:

```json
{
  "compilerOptions": {
    "incremental": true, // Включает инкрементальную компиляцию, сборку только измененного кода
    "strict": true, // Включает все параметры строгой проверки типов (рекомендуется)
    "rootDir": "./src", // Корневой каталог входных файлов
    "outDir": "./build", // Выходной каталог для скомпилированных файлов
    "allowJs": true, // Позволяет компилировать файлы JavaScript вместе с файлами TypeScript.
    "target": "es6", // Указывает целевую версию ECMAScript
    "module": "NodeNext", // Устанавливает используемую модульную систему (commonjs, nodenext, esnext)
    "lib": ["es2024"], // Указывает файлы библиотеки, которые будут включены в компиляцию.
    "sourceMap": true, // Создает source maps для отладки
    "skipLibCheck": true, // Пропускает проверку типов файлов деклараций
    "noUnusedParameters": false, // Запрещает неиспользуемые параметры в функциях.
    "noUnusedLocals": false, // Аналогично noUnusedParameters, но для локальных переменных.
    "noUncheckedIndexedAccess": true, // он гарантирует, что индексированные типы доступа проверяются на наличие undefined значений
    "esModuleInterop": true, // Обеспечивает совместимость с модулями CommonJS, позволяя импортировать по умолчанию модули без экспорта по умолчанию.
    "resolveJsonModule": true, // Позволяет импортировать файлы JSON как модули.
    "forceConsistentCasingInFileNames": true, // Гарантирует, что имена файлов обрабатываются с использованием единого регистра, что важно для кроссплатформенной совместимости.
    "noImplicitOverride": true, // Этот параметр требует, чтобы любой метод в подклассе, который переопределяет метод в суперклассе, явно использовал ключевое слово override.
    "noPropertyAccessFromIndexSignature": true, // Этот параметр требует, чтобы свойства, доступ к которым осуществляется с помощью точечной нотации, были явно определены в типе.
    "allowUnreachableCode": false, // Если установлено значение false, этот параметр вызывает ошибки для кода, который недоступен, то есть его невозможно выполнить.
    "noFallthroughCasesInSwitch": true, // Эта опция сообщает об ошибках в случаях, когда оператор switch не выполняется без оператора break, return или throw.
    "noErrorTruncation": true, // Если эта опция включена, TypeScript не будет обрезать сообщения об ошибках, предоставляя полную информацию об ошибке.
    "declaration": true // Создает соответствующий .d.ts файл
  },
  "include": ["src/**/*.ts"],
  "exclude": []
}
```

## Что такое tsconfig.json и почему он важен?

Файл `tsconfig.json` является ключевой частью любого проекта TypeScript. Он сообщает компилятору, как преобразовать ваш код TypeScript в JavaScript. Настроив этот файл, вы можете контролировать такие вещи, как строгость проверки ошибок и формат вывода. Это важно для эффективного управления реальными производственными проблемами.

### 1. Ускорение производительности: настройки для более быстрой компиляции

`incremental: true`

> Перекомпилируйте только то, что изменилось.

Опция `incremental` идеально подходит для больших кодовых баз или итеративных проектов, где между сборками меняется только часть кода. При включении TypeScript кэширует предыдущую сборку, что позволяет пропустить повторную компиляцию неизмененных файлов, экономя время.

**Пример:** Предположим, у вас большой проект и вы делаете небольшое обновление в одном файле. При включенном инкрементальном обновлении будет перекомпилирован только этот файл, что значительно сокращает время сборки.

### 2. Строгость прежде всего: настройки обеспечения безопасности кода

`strict: true`

> Включите все строгие параметры проверки типов для повышения надежности кода. Лучшая практика TypeScript.

Настройка `strict`: true включает полный спектр функций проверки типов TypeScript, разработанных для раннего обнаружения потенциальных ошибок и пограничных случаев. Этот всеобъемлющий флаг по сути является сокращением, которое включает несколько других важных опций:

- `noImplicitAny`: Запрещает неявное назначение переменным и параметрам любого типа. Этот параметр заставляет вас явно определять типы, снижая риск непредвиденного поведения.
- `strictNullChecks`: Гарантирует, что `null` и `undefined` рассматриваются как отдельные типы, что делает код более предсказуемым, предотвращая случайные операции с `null` или `undefined` значениями.
- `strictFunctionTypes`: Обеспечивает более строгую проверку типов функций, что особенно полезно для назначения функций и совместимости в различных областях действия.
- `strictBindCallApply`: Добавляет проверки типов для методов `bind`, `call` и `apply`, чтобы гарантировать совместимость аргументов с типами параметров функции.
- `strictPropertyInitialization`: Гарантирует, что свойства класса инициализируются перед использованием, как правило, путем установки их в конструкторе, что предотвращает потенциальные ошибки во время выполнения.
- `noImplicitThis`: Вызывает ошибку, если ключевое слово `this` неявно имеет тип `any`, требуя явного ввода и способствуя более безопасному использованию.
- `alwaysStrict`: Гарантирует, что все файлы анализируются в строгом режиме ECMAScript (к каждому файлу добавляется `"use strict"`), выявляя больше ошибок во время выполнения.
- `useUnknownInCatchVariables`: Изменяет тип переменной ошибки в блоках `catch` с `any` на `unknown`, способствуя лучшей обработке ошибок, требуя явных проверок типов ошибок.

`noUncheckedIndexedAccess: true`

> Защитите от неопределенных значений при поиске объектов.

Эта опция отлично подходит, когда вам нужен дополнительный уровень безопасности при динамическом доступе к свойствам объекта. При включении она проверяет, что любые индексированные типы доступа не являются `undefined`, что помогает избежать ошибок времени выполнения.

### 3. Управление выводом: опции настройки файлов сборки

`rootDir: "./src"`

> Указывает каталог входных файлов.

Эта опция указывает на каталог исходных файлов, что может помочь сохранить ваш проект чистым, организовав файлы логически. Устанавливая `rootDir`, вы гарантируете, что компилятор знает, где найти исходные файлы, необходимые для сборки.

`outDir: "./build"`

> Определяет выходной каталог для скомпилированных файлов JavaScript.

Это то место, где TypeScript выведет скомпилированные файлы. Указание `outDir` имеет решающее значение для хранения исходных файлов (`src/`) отдельно от сгенерированного JavaScript, что упрощает управление и очистку сборок.

**Совет:** для ясной структуры проекта лучше всего указать и `rootDir`, и `outDir`.

### 4. Контроль совместимости: параметры кроссплатформенной и модульной совместимости

`target: "es6"`

> Устанавливает версию ECMAScript для вывода.

TypeScript компилирует код в различные версии JavaScript, но какая версия зависит от вашей среды. Установка цели на `es6` обычно идеальна для современных приложений, поскольку она поддерживает `async/await` и множество новых функций JavaScript, оставаясь при этом совместимой с большинством браузеров и сред Node.js.

`module: "NodeNext"`

> Определяет модульную систему, например CommonJS, ESNext или NodeNext.

С `NodeNext` вы можете использовать модули `ES` вместе с TypeScript. Это особенно полезно, если вы работаете с библиотеками или модулями Node.js в новейшем формате. Для проектов, ориентированных на другие среды, рассмотрите `commonjs` или `esnext` в зависимости от требований.

### 5. Отладка и тестирование: настройки улучшения процесса разработки

`sourceMap: true`

> Создает source maps для облегчения отладки.

Файлы source maps сопоставляют ваш TypeScript с выходным JavaScript, что значительно упрощает отладку в таких инструментах, как Vscode debug, Chrome DevTools. Без source maps отладка становится обременительной, поскольку ошибки отслеживаются в сгенерированном JavaScript, а не в исходном коде TypeScript.

`skipLibCheck: true`

> Пропустить проверку типов для сторонних библиотек.

Если вы используете много сторонних библиотек, установка `skipLibCheck` в значение `true` может снизить нагрузку проверки типов. Это может ускорить процесс сборки, не ставя под угрозу безопасность кода, поскольку предполагается, что библиотеки уже хорошо протестированы.

### 6. Обеспечение качества кода: настройки для более чистого и предсказуемого кода

`noUnusedParameters and noUnusedLocals: false`

> Проверяет наличие неиспользуемых параметров и переменных.

Эти опции выдают предупреждения о неиспользуемых переменных и параметрах. Рекомендуется включать их для более чистого кода, хотя иногда полезно устанавливать их в `false` на этапах рефакторинга или экспериментов.

`noImplicitOverride: true`

Гарантирует, что методы, переопределяющие методы суперкласса, явно используют ключевое слово `override`.

При использовании `noImplicitOverride` любой переопределенный метод должен использовать ключевое слово `override`, что делает ваш код более читаемым и простым в отладке, особенно в крупных проектах.

### 7. Совместимость модулей и JSON: настройки улучшения взаимодействия

`esModuleInterop: true`

> Позволяет импортировать по умолчанию из модулей CommonJS.

В TypeScript некоторым модулям требуется обработка взаимодействия между модулями `ES` и `CommonJS`. С `esModuleInterop` вы можете чисто импортировать экспорты по умолчанию из модулей `CommonJS`, что упрощает интеграцию библиотек.

`resolveJsonModule: true`

> Позволяет импортировать файлы JSON как модули.

Импорт файлов JSON часто требуется для конфигурации, локализации или имитации данных. Включив `resolveJsonModule`, вы можете импортировать JSON напрямую, а TypeScript автоматически введет его как `any`.

### 8. Чувствительность к регистру и кроссплатформенная стабильность

`forceConsistentCasingInFileNames: true`

> Предотвращает проблемы, связанные с несогласованным наименованием файлов, которые могут нарушить кроссплатформенную совместимость.

Эта опция обеспечивает учет регистра в путях к файлам на разных платформах, предотвращая возникновение незначительных ошибок и кроссплатформенных проблем, особенно между Unix и Windows.

### 9. Предотвращение распространенных ошибок: проверки безопасности и случаи падений

`allowUnreachableCode: false`

> Вызывает ошибки для недостижимого кода.

Установите `allowUnreachableCode` на `false`, чтобы предотвратить проникновение недостижимого кода в производство, обеспечивая более чистые и продуманные пути кода.

`noFallthroughCasesInSwitch: true`

> Вызывает ошибки в случаях провала в операторах switch.

Эта опция предотвращает непредвиденное поведение в операторах `switch`, принудительно выдавая ошибку, если случай не выполняется без явного `break`, `return` или `throw`.

## Заключение

Понимание опций в `tsconfig.json` может значительно улучшить вашу разработку TypeScript за счет ускорения сборок, организации вывода, улучшения качества кода и упрощения отладки. Освойте эти настройки, чтобы эффективно настраивать свои проекты TypeScript, создавая эффективный, простой в обслуживании и безопасный код.

> Этот пост является переводом [https://tduyng.com/blog/tsconfig-options-you-should-use/](https://tduyng.com/blog/tsconfig-options-you-should-use/)
