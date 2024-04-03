import { IEvents } from "./events";

// Гарда для проверки на модель
export const isModel = (obj: unknown): obj is Model<any> => {
    return obj instanceof Model;
}

/**
 * Базовая модель, чтобы можно было отличить ее от простых объектов с данными
 */
export abstract class Model<T> {
    // Конструктор модели, принимает частичные данные и интерфейс событий
    constructor(data: Partial<T>, protected events: IEvents) {
        // Присваивание данных модели
        Object.assign(this, data);
    }

    // Метод для оповещения об изменениях в модели
    emitChanges(event: string, payload?: object) {
        // Эмитирование события с возможностью передать данные
        this.events.emit(event, payload ?? {});
    }
}