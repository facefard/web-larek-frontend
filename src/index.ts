import './scss/styles.scss';

import { WebApi } from './components/WebApi';
import { API_URL, CDN_URL } from "./utils/constants";
import { EventEmitter } from "./components/base/events";
import { OtherFunctions, PayChange } from './components/other';
import { ProductRenderer } from './components/card';
import { cloneTemplate, ensureElement } from "./utils/utils";
import { Product, ShippingAddress, ContactInfo, Order, CatalogChangeEvent } from "./types";
import { Contacts, Shipping } from './components/order';
import { Modal, Page, Basket, Success } from './components/modals';

// Создание экземпляра событий
const events = new EventEmitter();
const api = new WebApi(CDN_URL, API_URL);

// Получение шаблонов из DOM
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');

// Создание экземпляра модели данных
const appData = new OtherFunctions({}, events);

// Создание экземпляров глобальных компонентов
const page = new Page(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
const shipping = new Shipping(cloneTemplate(orderTemplate), events, {
    onClick: function (ev: Event) {
        events.emit('payment:toggle', ev.target);
    }
});
const contact = new Contacts(cloneTemplate(contactsTemplate), events);
const basket = new Basket(cloneTemplate(basketTemplate), events);

// Подписка на изменения в корзине
events.on('basket:changed', (items: Product[]) => {
    // Обновление отображения корзины
    basket.items = items.map((item, index) => {
        const card = new ProductRenderer(cloneTemplate(cardBasketTemplate), {
            onClick: () => {
                events.emit('product:delete', item);
            },
        });
        return card.render({
            index: (index + 1).toString(),
            title: item.title,
            price: item.price,
        });
    });

    // Пересчет общей суммы в корзине
    const total = items.reduce((total, item) => total + item.price, 0);
    appData.order.total = total;
    basket.total = total;
    basket.buttonBlocked(total === 0);
});

// Подписка на изменение счетчика элементов в корзине
events.on('counter:changed', (item: string[]) => {
    page.counter = appData.basket.length;
});

// Подписка на выбор товара из каталога
events.on('card:select', (item: Product) => {
    appData.setPreview(item);
});

// Подписка на изменение выбранного товара
events.on('preview:changed', (item: Product) => {
    // Отображение выбранного товара в модальном окне
    const card = new ProductRenderer(cloneTemplate(cardPreviewTemplate), {
        onClick: () => {
            events.emit('product:toggle', item);
            card.titleBtn = appData.basket.indexOf(item) < 0 ? 'В корзину' : 'Убрать'
        }
    });

    modal.render({
        content: card.render({
            category: item.category,
            title: item.title,
            image: item.image,
            price: item.price,
            description: item.description,
            titleBtn: appData.basket.indexOf(item) < 0 ? 'В корзину' : 'Убрать',
        })
    });
});

// Подписка на добавление/удаление товара из корзины
events.on('product:toggle', (item: Product) => {
    if (appData.basket.indexOf(item) < 0) {
        events.emit('product:add', item);
    } else {
        events.emit('product:delete', item)
    };
});
events.on('product:delete', (item: Product) => appData.removeItem(item));
events.on('product:add', (item: Product) => appData.addItem(item));

// Подписка на изменение способа оплаты
events.on('payment:toggle', (target: HTMLElement) => {
    if (!target.classList.contains('button_alt-active')) {
        shipping.toggleButton(target);
        appData.order.payment = PayChange[target.getAttribute('name')];
        console.log(appData.order);
    }
});

// Подписка на открытие формы заказа
events.on('order:submit', () => {
    modal.render({
        content: contact.render({
            email: '',
            phone: '',
            valid: false,
            errors: [],
        }),
    });
});

// Подписка на открытие формы заказа
events.on('order:open', () => {
    modal.render({
        content: shipping.render({
            payment: '',
            address: '',
            valid: false,
            errors: []
        })
    });
    appData.order.items = appData.basket.map((item) => {
        return item.id;
    });
});

// Подписка на открытие корзины
events.on('basket:open', () => {
    modal.render({
        content: basket.render({})
    });
});

// Подписка на событие "Контакты заполнены"
events.on('contacts:ok', () => {
    contact.valid = true;
});

// Подписка на событие "Доставка заполнена"
events.on('shipping:ok', () => {
    shipping.valid = true;
});

// Получение списка товаров с сервера
api.getProductList()
    .then(appData.setItems.bind(appData))
    .catch(err => {
        console.error(err);
    });

// Подписка на изменение списка товаров в каталоге
events.on<CatalogChangeEvent>('items:changed', () => {
    page.catalog = appData.catalog.map(item => {
        const card = new ProductRenderer(cloneTemplate(cardCatalogTemplate), {
            onClick: () => events.emit('card:select', item)
        });
        return card.render({
            title: item.title,
            image: item.image,
            category: item.category,
            price: item.price
        });
    });
});

// Подписка на отправку формы заказа
events.on('contacts:submit', () => {
    api.orderProduct(appData.order)
        .then((result) => {
            const success = new Success(cloneTemplate(successTemplate), {
                onClick: () => {
                    modal.close();
                }
            });

            appData.cleanBasket();
            appData.cleanOrder();

            success.descriptionTotl = result.total.toString();

            modal.render({
                content: success.render({})
            });
        })
        .catch(err => {
            console.error(err);
        });
});

// Подписка на изменение ошибок в форме
events.on('formErrors:change', (errors: Partial<Order>) => {
    const { payment, address, email, phone } = errors;
    contact.valid = !email && !phone;
    contact.errors = Object.values({ phone, email }).filter(i => !!i).join('; ');
    shipping.valid = !payment && !address;
    shipping.errors = Object.values({ payment, address }).filter(i => !!i).join('; ');
});

// Подписка на изменение данных о доставке
events.on(/^order\..*:change/, (data: { field: keyof ShippingAddress, value: string }) => {
    appData.setShipping(data.field, data.value);
});

// Подписка на изменение контактной информации
events.on(/^contacts\..*:change/, (data: { field: keyof ContactInfo, value: string }) => {
    appData.setContacts(data.field, data.value);
});