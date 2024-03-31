// Ответ от API, содержащий список элементов
type ApiListResponse<Product> = {
  total: number,   // общее количество элементов
  items: Product[]    // массив элементов
};

// Допустимые методы для HTTP-запросов
type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

// Имя события может быть строкой или регулярным выражением
type EventName = string | RegExp;

// Тип функции-подписчика на событие
type Subscriber = Function;

// Структура события, генерируемого экземпляром EventEmitter
type EmitterEvent = {
  eventName: string,   // имя события
  data: unknown        // данные события
};

// Коллекция селекторов для выбора элементов
type SelectorCollection<T> = string | NodeListOf<Element> | T[];

// Элемент селектора, который может быть строкой или объектом
type SelectorElement<T> = T | string;

// Интерфейс для работы с событиями
interface IEvents {
  on<T extends object>(event: EventName, callback: (data: T) => void): void;  // метод подписки на событие
  emit<T extends object>(event: string, data?: T): void;                     // метод генерации события
  trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void;  // метод создания триггера события
}

// Интерфейс для товара
export interface Product {
  id: string;
  category: string;
  title: string;
  image: string;
  description: string;
  price: number;
}


// Интерфейс для заказанного товара
interface OrderedProduct extends Product {
  quantity: number;
  total: number;
}

// Интерфейс для корзины
interface Cart {
  items: OrderedProduct[];
}

// Перечисление для способов оплаты
enum PaymentMethod {
  CREDIT_CARD = 'Credit Card',
  CASH = 'Cash on Delivery'
}

// Интерфейс для адреса доставки
interface ShippingAddress {
  street: string;
  city: string;
  postalCode: string;
  country?: string; // Необязательное поле
}

// Интерфейс для контактной информации
interface ContactInfo {
  email: string;
  phone: string;
}

// Интерфейс для заказа
interface Order {
  items: OrderedProduct[];
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
  contactInfo: ContactInfo;
}