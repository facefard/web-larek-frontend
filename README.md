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

# Описание базовых классов, их предназначение и функции:
## Слой отображения (View)

### Класс Component<T>

#### Описание

`Component<T>` представляет собой абстрактный класс, предназначенный для создания компонентов пользовательского интерфейса. Он содержит методы для управления DOM-элементами, такими как переключение классов, установка текстового содержимого, блокировка/разблокировка элементов, скрытие и отображение элементов, установка изображений с альтернативным текстом, а также метод для рендеринга компонента с частичными данными.

#### Методы

- `toggleClass(element: HTMLElement, className: string, force?: boolean)`: Переключает класс у элемента.
- `setText(element: HTMLElement, value: unknown)`: Устанавливает текстовое содержимое элемента.
- `setDisabled(element: HTMLElement, state: boolean)`: Устанавливает состояние блокировки элемента.
- `setHidden(element: HTMLElement)`: Скрывает элемент.
- `setVisible(element: HTMLElement)`: Отображает элемент.
- `setImage(element: HTMLImageElement, src: string, alt?: string)`: Устанавливает изображение с альтернативным текстом.
- `render(data?: Partial<T>): HTMLElement`: Рендерит компонент с частичными данными и возвращает контейнер DOM-элемента.

#### Примечания

- Данный класс предоставляет базовые методы для работы с DOM-элементами и рендеринга компонентов. Он может быть использован в качестве основы для создания конкретных компонентов пользовательского интерфейса.
- Подходит для работы на уровне представления (View) в архитектуре приложения.

### Класс ProductRenderer

#### Описание

`ProductRenderer` представляет собой класс, который отвечает за отображение информации о продукте в интерфейсе. Он расширяет абстрактный класс `Component<CardType>`, предоставляя специфичные методы и свойства для работы с отдельным продуктом.

#### Конструктор

- `constructor(container: HTMLElement, actions?: CardClick)`: Создает экземпляр класса `ProductRenderer` с заданным контейнером и возможными действиями при клике на карточку продукта.

#### Свойства

- `_title: HTMLElement`: DOM-элемент заголовка продукта.
- `_image?: HTMLImageElement`: DOM-элемент изображения продукта.
- `_description?: HTMLElement`: DOM-элемент описания продукта.
- `_button?: HTMLButtonElement`: DOM-элемент кнопки продукта.
- `_category?: HTMLElement`: DOM-элемент категории продукта.
- `_price: HTMLElement`: DOM-элемент цены продукта.
- `_index?: HTMLElement`: DOM-элемент индекса продукта.
- `_titleBtn?: string`: Заголовок кнопки продукта.

#### Методы

- `set titleBtn(value: string)`: Устанавливает заголовок кнопки продукта.
- `disableBtn(value: number | null)`: Отключает кнопку продукта, если значение равно нулю.
- `set id(value: string)`: Устанавливает идентификатор продукта.
- `get id(): string`: Получает идентификатор продукта.
- `set title(value: string)`: Устанавливает заголовок продукта.
- `get title(): string`: Получает заголовок продукта.
- `set image(value: string)`: Устанавливает изображение продукта.
- `set description(value: string | string[])`: Устанавливает описание продукта.
- `set category(value: string)`: Устанавливает категорию продукта.
- `get category(): string`: Получает категорию продукта.
- `set price(value: number | null)`: Устанавливает цену продукта.
- `get price(): number`: Получает цену продукта.
- `set index(value: string)`: Устанавливает индекс продукта.
- `get index(): string`: Получает индекс продукта.

#### Примечания

- `ProductRenderer` является компонентом пользовательского интерфейса, который отображает информацию о продукте. Он использует методы базового класса `Component` для управления DOM-элементами.
- Этот класс может быть использован для рендеринга карточек продуктов на веб-странице.

### Класс Modal

#### Описание

`Modal` представляет собой класс для создания модального окна в пользовательском интерфейсе. Он расширяет абстрактный класс `Component<ModalType>`, предоставляя методы и свойства для работы с модальным окном.

#### Конструктор

- `constructor(container: HTMLElement, events: IEvents)`: Создает экземпляр класса `Modal` с заданным контейнером и интерфейсом событий.

#### Свойства

- `_closeButton: HTMLButtonElement`: DOM-элемент кнопки закрытия модального окна.
- `_content: HTMLElement`: DOM-элемент содержимого модального окна.

#### Методы

- `set content(value: HTMLElement)`: Устанавливает содержимое модального окна.
- `open()`: Открывает модальное окно.
- `close()`: Закрывает модальное окно.
- `render(data: ModalType): HTMLElement`: Рендерит модальное окно с заданными данными.

#### Примечания

- `Modal` является компонентом пользовательского интерфейса для отображения модальных окон. Он использует методы базового класса `Component` для управления DOM-элементами.
- Этот класс может быть использован для создания и управления модальными окнами на веб-странице.

### Класс Page

#### Описание

`Page` представляет собой класс для управления содержимым веб-страницы. Он расширяет абстрактный класс `Component<PageType>`, предоставляя методы и свойства для работы с элементами страницы.

#### Конструктор

- `constructor(container: HTMLElement, events: IEvents)`: Создает экземпляр класса `Page` с заданным контейнером и интерфейсом событий.

#### Свойства

- `_counter: HTMLElement`: DOM-элемент счетчика корзины.
- `_catalog: HTMLElement`: DOM-элемент каталога товаров.
- `_wrapper: HTMLElement`: DOM-элемент обертки страницы.
- `_basket: HTMLElement`: DOM-элемент корзины.

#### Методы

- `set counter(value: number)`: Устанавливает значение счетчика корзины.
- `set catalog(items: HTMLElement[])`: Устанавливает содержимое каталога товаров.
- `set locked(value: boolean)`: Устанавливает состояние блокировки страницы.

#### Примечания

- `Page` является компонентом пользовательского интерфейса для управления содержимым веб-страницы. Он использует методы базового класса `Component` для управления DOM-элементами.
- Этот класс может быть использован для управления различными частями веб-страницы, такими как каталог товаров и корзина покупок.

### Класс Basket

#### Описание

`Basket` представляет собой класс для управления содержимым корзины покупок на веб-странице. Он расширяет абстрактный класс `Component<BasketModalView>`, предоставляя методы и свойства для работы с элементами корзины.

#### Конструктор

- `constructor(container: HTMLElement, events: EventEmitter)`: Создает экземпляр класса `Basket` с заданным контейнером и объектом событий.

#### Свойства

- `_list: HTMLElement`: DOM-элемент списка товаров в корзине.
- `_price: HTMLElement`: DOM-элемент отображения общей стоимости товаров в корзине.
- `_button: HTMLButtonElement`: DOM-элемент кнопки для оформления заказа.

#### Методы

- `set items(items: HTMLElement[])`: Устанавливает список товаров в корзине.
- `set total(price: number)`: Устанавливает общую стоимость товаров в корзине.
- `buttonBlocked(isDisabled: boolean)`: Блокирует или разблокирует кнопку оформления заказа.

#### Примечания

- `Basket` является компонентом пользовательского интерфейса для управления содержимым корзины покупок на веб-странице. Он использует методы базового класса `Component` для управления DOM-элементами.
- Этот класс может быть использован для отображения содержимого корзины покупок и взаимодействия с ней пользователем.

### Класс Form

#### Описание

`Form` представляет собой класс для управления формой на веб-странице. Он расширяет абстрактный класс `Component<FormModalView>`, предоставляя методы и свойства для работы с элементами формы.

#### Конструктор

- `constructor(container: HTMLFormElement, events: IEvents)`: Создает экземпляр класса `Form` с заданным контейнером формы и объектом событий.

#### Свойства

- `_submit: HTMLButtonElement`: DOM-элемент кнопки отправки формы.
- `_errors: HTMLElement`: DOM-элемент для отображения ошибок валидации формы.

#### Методы

- `set valid(value: boolean)`: Устанавливает доступность кнопки отправки формы в зависимости от ее валидности.
- `set errors(value: string)`: Устанавливает текст ошибок валидации формы.
- `render(state: Partial<T> & FormModalView)`: Рендерит форму с заданным состоянием.

#### Примечания

- `Form` является компонентом пользовательского интерфейса для управления формой на веб-странице. Он использует методы базового класса `Component` для управления DOM-элементами формы и обработки событий.
- Этот класс может быть использован для создания и управления различными формами на веб-странице, а также для валидации и отправки данных.


### Класс Success

#### Описание

`Success` представляет собой класс для отображения сообщения об успешном завершении операции на веб-странице. Он расширяет абстрактный класс `Component<SuccessType>`, предоставляя методы и свойства для работы с элементами сообщения.

#### Конструктор

- `constructor(container: HTMLElement, actions: SuccessClick)`: Создает экземпляр класса `Success` с заданным контейнером и действиями при успешном завершении операции.

#### Свойства

- `_close: HTMLElement`: DOM-элемент для закрытия сообщения об успешном завершении операции.
- `_descriptionTotl: HTMLElement`: DOM-элемент для отображения описания успешно завершенной операции.

#### Методы

- `set descriptionTotl(value: string)`: Устанавливает описание успешно завершенной операции.

#### Примечания

- `Success` является компонентом пользовательского интерфейса для отображения сообщения об успешном завершении операции. Он использует методы базового класса `Component` для управления DOM-элементами сообщения.
- Этот класс может быть использован для отображения сообщений об успешном завершении различных операций на веб-странице.

### Класс Contacts

#### Описание

`Contacts` представляет собой класс для управления контактной формой на веб-странице. Он расширяет класс `Form<ContactInfo>`, который в свою очередь расширяет абстрактный класс `Component<FormModalView>`. `Contacts` добавляет специфичные методы и свойства для работы с контактной информацией.

#### Конструктор

- `constructor(container: HTMLFormElement, events: IEvents)`: Создает экземпляр класса `Contacts` с заданным контейнером формы и объектом событий.

#### Методы

- `set phone(value: string)`: Устанавливает значение телефона в поле формы.
- `set email(value: string)`: Устанавливает значение электронной почты в поле формы.

#### Примечания

- `Contacts` является специализированным компонентом пользовательского интерфейса для управления контактной формой на веб-странице. Он наследует функционал управления формой от класса `Form` и дополняет его специфичными методами для установки контактной информации.
- Этот класс может быть использован для создания и управления контактной формой, например, для сбора информации о телефоне и электронной почте пользователей.

### Класс Shipping

#### Описание

`Shipping` представляет собой класс для управления формой доставки на веб-странице. Он расширяет класс `Form<ShippingAddress>`, который в свою очередь расширяет абстрактный класс `Component<FormModalView>`. `Shipping` добавляет специфичные методы и свойства для работы с формой доставки.

#### Конструктор

- `constructor(container: HTMLFormElement, events: IEvents, actions?: CardClick)`: Создает экземпляр класса `Shipping` с заданным контейнером формы, объектом событий и действиями при нажатии на кнопку оплаты.

#### Свойства

- `_cardBtn: HTMLButtonElement`: DOM-элемент кнопки оплаты картой.
- `_cashBtn: HTMLButtonElement`: DOM-элемент кнопки оплаты наличными.

#### Методы

- `toggleButton(target: HTMLElement)`: Переключает активность кнопок оплаты.
- `set address(value: string)`: Устанавливает значение адреса доставки в соответствующем поле формы.

#### Примечания

- `Shipping` является специализированным компонентом пользовательского интерфейса для управления формой доставки на веб-странице. Он наследует функционал управления формой от класса `Form` и дополняет его специфичными методами для управления кнопками оплаты и адресом доставки.
- Этот класс может быть использован для создания и управления формой доставки товаров, например, для сбора информации о способе оплаты и адресе доставки.

## Слой данных (Model)

### Класс Model

#### Описание

`Model` - это абстрактный класс, который представляет собой базовую модель. Он используется для отличия моделей от простых объектов с данными. Класс содержит метод для оповещения о изменениях в модели.

#### Методы

- `constructor(data: Partial<T>, events: IEvents)`: Конструктор модели, принимающий частичные данные и интерфейс событий.
- `emitChanges(event: string, payload?: object)`: Метод для оповещения об изменениях в модели.

#### Примечания

- Этот класс предоставляет базовую функциональность для создания моделей данных. Он может быть расширен для реализации конкретных моделей в приложении.

### Класс OtherFunctions

#### Описание

`OtherFunctions` представляет собой класс для управления различными функциями и данными приложения. Он расширяет класс `Model<AllInfo>`, который предоставляет базовый функционал для работы с данными. `OtherFunctions` добавляет специфичные методы для управления корзиной, каталогом товаров, заказами и другими функциями.

#### Свойства

- `basket: Product[]`: Массив товаров в корзине.
- `catalog: Product[]`: Массив товаров в каталоге.
- `loading: boolean`: Флаг состояния загрузки данных.
- `order: Order`: Данные заказа.
- `preview: string | null`: Идентификатор превью товара.
- `formErrors: FormError`: Объект с ошибками валидации формы.

#### Методы

- `setPreview(item: Product)`: Устанавливает превью для товара.
- `setItems(items: Product[])`: Устанавливает товары в каталоге.
- `addItem(item: Product)`: Добавляет товар в корзину.
- `removeItem(item: Product)`: Удаляет товар из корзины.
- `updateBasket()`: Обновляет состояние корзины и счетчик товаров.
- `cleanBasket()`: Очищает корзину.
- `cleanOrder()`: Очищает данные заказа.
- `setShipping(field: keyof ShippingAddress, value: string)`: Устанавливает данные доставки и выполняет их валидацию.
- `setContacts(field: keyof ContactInfo, value: string)`: Устанавливает контактные данные и выполняет их валидацию.
- `getTotal()`: Вычисляет общую стоимость товаров в корзине.
- `validationContacts()`: Проверяет валидность контактных данных и обновляет ошибки формы.
- `validationShipping()`: Проверяет валидность данных доставки и обновляет ошибки формы.

#### Примечания

- `OtherFunctions` является классом, объединяющим различные функции и операции приложения. Он управляет данными, связанными с корзиной, каталогом, заказами и формами.
- Этот класс используется для выполнения операций с данными и управления состоянием приложения.

### Класс WebApi

#### Описание

`WebApi` представляет собой класс для взаимодействия с веб-API. Он расширяет класс `Api` и реализует интерфейс `ProductApiType`, предоставляя методы для получения информации о продуктах и выполнения заказов.

#### Конструктор

- `constructor(cdn: string, baseUrl: string, options?: RequestInit)`: Создает экземпляр класса `WebApi` с заданными параметрами CDN, базового URL и дополнительными опциями для запросов.

#### Свойства

- `cdn: string`: URL-адрес CDN для загрузки ресурсов.
  
#### Методы

- `getProductItem(id: string): Promise<Product>`: Получает информацию о продукте по его идентификатору.
- `getProductList(): Promise<Product[]>`: Получает список продуктов.
- `orderProduct(order: Order): Promise<OrderResult>`: Отправляет запрос на выполнение заказа.

#### Примечания

- `WebApi` предоставляет интерфейс для взаимодействия с веб-API, предоставляя методы для получения информации о продуктах и выполнения заказов.
- Он использует базовый класс `Api` для выполнения HTTP-запросов и дополняет его функционалом для работы с конкретным веб-API.
- Этот класс может быть использован в клиентском коде для взаимодействия с удаленным сервером, обрабатывая полученные данные и отправляя запросы на выполнение различных операций.

## Слой коммуникации (Presenter)

### Класс Api

Класс `Api` обеспечивает удобный интерфейс для выполнения HTTP-запросов к внешнему API.

#### Свойства:

- `baseUrl`: string - базовый URL для формирования полного URL запросов.
- `options`: RequestInit - объект с опциями для настройки запросов.

#### Конструктор:

- `constructor(baseUrl: string, options: RequestInit = {})`: Создает новый экземпляр класса `Api` с указанным базовым URL и опциями запроса. По умолчанию опции запроса пусты.

#### Методы:

- `get(uri: string): Promise<object>`: Выполняет GET-запрос по указанному URI и возвращает Promise с объектом ответа от сервера.
- `post(uri: string, data: object, method: ApiPostMethods = 'POST'): Promise<object>`: Выполняет POST-запрос по указанному URI с переданными данными и методом запроса. Возвращает Promise с ответом от сервера.
- `handleResponse(response: Response): Promise<object>`: Обрабатывает ответ от сервера. Если ответ успешен (код ответа 2xx), возвращает Promise с объектом JSON из тела ответа. В противном случае, возвращает Promise с объектом ошибки, либо с текстом статуса ответа.
- `setBaseUrl(baseUrl: string)`: Устанавливает новый базовый URL для запросов.
- `setOptions(options: RequestInit)`: Устанавливает новые опции для запросов.

Этот класс предоставляет универсальный способ взаимодействия с внешним API путем отправки GET и POST запросов, а также обработки ответов от сервера.

### Класс EventEmitter

#### Описание

`EventEmitter` представляет собой классическую реализацию брокера событий, который позволяет устанавливать обработчики на события, инициировать события с передачей данных и снимать обработчики с событий. В расширенных вариантах также предусмотрена возможность подписки на все события или слушания событий по шаблону.

#### Методы

- `on(eventName: EventName, callback: (event: T) => void)`: Устанавливает обработчик на определенное событие.
- `off(eventName: EventName, callback: Subscriber)`: Снимает обработчик с определенного события.
- `emit(eventName: string, data?: T)`: Инициирует событие с передачей опциональных данных.
- `onAll(callback: (event: EmitterEvent) => void)`: Подписывается на все события.
- `offAll()`: Снимает все установленные обработчики событий.
- `trigger(eventName: string, context?: Partial<T>)`: Создает коллбек-триггер, генерирующий событие при вызове.

#### Примечания

- Для подписки на все события используется специальный символ `"*"`.
- При использовании шаблонов событий поддерживается проверка на соответствие регулярному выражению.

## Основные события в приложении

- **Отображение детальной информации о товаре:** Пользователь нажимает на товар в каталоге для просмотра подробной информации о нем.
- **Добавление товара в корзину:** Пользователь выбирает товар, затем товар добавляется в корзину.
- **Удаление товара из корзины:** Пользователь удаляет выбранный товар из корзины.
- **Оформление заказа:** Пользователь заполняет форму оформления заказа, вводит информацию о доставке, выбирает способ оплаты и подтверждает заказ.
- **Просмотр каталога товаров:** Пользователь просматривает доступные товары в каталоге магазина.
- **Открытие и закрытие модальных окон:** Пользователь взаимодействует с модальными окнами, такими как окно с подтверждением заказа или окно с сообщением об ошибке.
- **Проверка заполнения формы оформления заказа:** При попытке оформления заказа пользователь проходит проверку правильности заполнения формы.
- **Отображение сообщений об успешном оформлении заказа или об ошибках:** Пользователь видит сообщения об успешном оформлении заказа или об ошибках, возникающих в процессе работы приложения.

Эти события представляют основные взаимодействия пользователя с приложением и его функциональностью.