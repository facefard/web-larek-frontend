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
## Слой отображения (View)

### ProductView (Просмотр товара)

Класс `ProductView` отображает детальную информацию о товаре.

#### Методы:

- `displayProduct(product: Product)`: Отображает информацию о товаре на странице.
- `showErrorMessage(message: string)`: Отображает сообщение об ошибке.

### CartView (Корзина)

Класс `CartView` отображает содержимое корзины и предоставляет возможность управления товарами.

#### Методы:

- `displayCartItems(cartItems: OrderedProduct[])`: Отображает товары в корзине.
- `updateCartItemQuantity(id: number, quantity: number)`: Обновляет количество товара в корзине.
- `removeCartItem(id: number)`: Удаляет товар из корзины.
- `showErrorMessage(message: string)`: Отображает сообщение об ошибке.

### CheckoutView (Оформление заказа)

Класс `CheckoutView` предоставляет формы для ввода информации о покупателе и способа оплаты.

#### Методы:

- `displayCheckoutForm()`: Отображает форму оформления заказа.
- `validateCheckoutForm()`: Проверяет заполнение формы оформления заказа.
- `showSuccessMessage(message: string)`: Отображает сообщение об успешном оформлении заказа.
- `showErrorMessage(message: string)`: Отображает сообщение об ошибке.

### ModalView (Модальное окно)

Класс `ModalView` управляет отображением модальных окон.

#### Методы:

- `openModal(content: HTMLElement)`: Открывает модальное окно с заданным содержимым.
- `closeModal()`: Закрывает текущее модальное окно.

### MainView (Главная страница)

Класс `MainView` отображает главную страницу магазина с каталогом товаров.

#### Методы:

- `displayCatalog(products: Product[])`: Отображает каталог товаров.
- `showErrorMessage(message: string)`: Отображает сообщение об ошибке.



## Слой данных (Model)
### Product (Товар)

Класс `Product` представляет собой товар в нашем онлайн магазине.

#### Свойства:

- `id`: number - уникальный идентификатор товара.
- `name`: string - название товара.
- `description`: string - описание товара.
- `price`: number - цена товара.
- `image`: string - ссылка на изображение товара.

### OrderedProduct (Заказанный товар)

Класс `OrderedProduct` представляет собой товар, добавленный в корзину.

#### Свойства:

- `id`: number - уникальный идентификатор товара.
- `name`: string - название товара.
- `description`: string - описание товара.
- `price`: number - цена товара.
- `image`: string - ссылка на изображение товара.
- `quantity`: number - количество товара.
- `total`: number - общая стоимость товара (цена * количество).

### Cart (Корзина)

Класс `Cart` представляет собой корзину с товарами.

#### Свойства:

- `items`: OrderedProduct[] - массив заказанных товаров.

### Order (Заказ)

Класс `Order` представляет собой информацию о заказе.

#### Свойства:

- `id`: number - уникальный идентификатор заказа.
- `items`: OrderedProduct[] - массив заказанных товаров.
- `shippingAddress`: ShippingAddress - информация о адресе доставки.
- `paymentMethod`: PaymentMethod - способ оплаты.
- `contactInfo`: ContactInfo - контактная информация клиента.

### PaymentMethod (Способ оплаты)

Перечисление `PaymentMethod` содержит возможные способы оплаты.

#### Значения:

- `CREDIT_CARD`: 'Credit Card' - оплата кредитной картой.
- `CASH`: 'Cash on Delivery' - оплата наличными при получении.

### ShippingAddress (Адрес доставки)

Класс `ShippingAddress` представляет собой информацию о адресе доставки.

#### Свойства:

- `street`: string - улица.
- `city`: string - город.
- `postalCode`: string - почтовый индекс.
- `country`: string (optional) - страна (необязательное поле).

### ContactInfo (Контактная информация)

Класс `ContactInfo` представляет собой контактную информацию клиента.

#### Свойства:

- `email`: string - адрес электронной почты.
- `phone`: string - номер телефона.

## Слой коммуникации (Presenter):

## Api (Абстракция для работы с внешним API)

Класс `Api` обеспечивает удобный интерфейс для выполнения HTTP-запросов к внешнему API.

### Свойства:

- `baseUrl`: string - базовый URL для формирования полного URL запросов.
- `options`: RequestInit - объект с опциями для настройки запросов.

### Методы:

- `constructor(baseUrl: string, options: RequestInit = {})`: инициализирует класс Api с базовым URL и опциями запроса.
- `get(uri: string): Promise<object>`: выполняет GET-запрос по указанному URI и возвращает Promise с объектом ответа от сервера.
- `post(uri: string, data: object, method: ApiPostMethods = 'POST'): Promise<object>`: выполняет POST-запрос по указанному URI с переданными данными и возвращает Promise с ответом от сервера.
- `handleResponse(response: Response): Promise<object>`: обрабатывает ответ от сервера.
- `setBaseUrl(baseUrl: string)`: устанавливает базовый URL для запросов.
- `setOptions(options: RequestInit)`: устанавливает опции для запросов.

## EventEmitter (Работа с событиями)

Класс `EventEmitter` обеспечивает возможность работы с событиями и управления подписчиками на них.

### Свойства:

- `_events`: Map<EventName, Set<Subscriber>> - карта для хранения событий и их подписчиков.

### Методы:

- `constructor()`: инициализирует пустую карту для хранения событий и подписчиков.
- `on(eventName: EventName, callback: (event: T) => void)`: добавляет обработчика на определенное событие.
- `off(eventName: EventName, callback: Subscriber)`: удаляет обработчика с определенного события.
- `emit(eventName: string, data?: T)`: инициирует событие и передает данные всем подписчикам.
- `onAll(callback: (event: EmitterEvent) => void)`: добавляет обработчика для всех событий.
- `offAll()`: удаляет всех обработчиков для всех событий.
- `trigger(eventName: string, context?: Partial<T>)`: возвращает функцию-триггер для определенного события.


