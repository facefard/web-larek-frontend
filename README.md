# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Описание базовых классов, их предназначение и функции:
## Слой коммуникации (Presenter):

Класс Api представляет собой абстракцию для работы с внешним API и предоставляет методы для выполнения HTTP-запросов.

Конструктор класса Api принимает два аргумента:

baseUrl: string - базовый URL, к которому будут добавляться относительные URI для формирования полного URL для запросов.
options: RequestInit - объект с опциями для настройки запросов. По умолчанию это пустой объект, но пользователь может передать свои опции, такие как заголовки запроса и т.д.
У класса Api есть методы для выполнения различных типов HTTP-запросов:

get(uri: string): Promise<object> - выполняет GET-запрос по указанному URI и возвращает Promise, который разрешится с объектом ответа от сервера.
post(uri: string, data: object, method: ApiPostMethods = 'POST'): Promise<object> - выполняет POST-запрос по указанному URI с переданными данными и возвращает Promise с ответом от сервера.
Также класс Api содержит метод handleResponse для обработки ответа от сервера и методы для настройки базового URL и опций запроса.

Класс Api обеспечивает удобный интерфейс для взаимодействия с внешним API и позволяет работать с данными с использованием соответствующих методов.


## Слой отображения (View)
Класс EventEmitter обеспечивает работу событий. Его функции: возможность установить и снять слушателей событий, вызвать слушателей при возникновении события.

Основные элементы класса:

_events: Map<EventName, Set<Subscriber>>; - это приватное свойство, которое представляет собой отображение (Map), где ключом является имя события (EventName), а значением - множество подписчиков на это событие (Set<Subscriber>).

constructor() - конструктор класса, который инициализирует пустую карту для хранения событий и их подписчиков.

on(eventName: EventName, callback: (event: T) => void) - метод для добавления обработчика (callback) на определенное событие (eventName).

off(eventName: EventName, callback: Subscriber) - метод для удаления обработчика (callback) с определенного события (eventName).

emit(eventName: string, data?: T) - метод для инициирования события с передачей данных (data) всем его подписчикам.

onAll(callback: (event: EmitterEvent) => void) - метод для добавления обработчика, который будет вызываться для всех событий.

offAll() - метод для удаления всех обработчиков для всех событий.

trigger(eventName: string, context?: Partial<T>) - метод, который возвращает функцию-триггер для определенного события (eventName), которая инициирует событие при вызове.

Класс EventEmitter предоставляет удобный интерфейс для работы с событиями и управления подписчиками на них в приложении.