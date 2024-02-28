// Ответ от API, содержащий список элементов
type ApiListResponse<Type> = {
  total: number,   // общее количество элементов
  items: Type[]    // массив элементов
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