import { Product } from "../../types";
import { validateAddressInput, validateBasketItems, validateFormInputs } from "./validation";

export class Modal {
  private modalElement: HTMLElement;
  private basketModal: BasketModal;
  private orderModal: OrderModal;
  private contactsModal: ContactsModal;
  private successModal: SuccessModal;
  private cardPreviewModal: CardPreviewModal;

  constructor() {
      this.modalElement = document.getElementById("modal-container")!;
      this.basketModal = new BasketModal(this.modalElement);
      this.orderModal = new OrderModal(this.modalElement);
      this.contactsModal = new ContactsModal(this.modalElement);
      this.successModal = new SuccessModal(this.modalElement);
      this.cardPreviewModal = new CardPreviewModal(this.modalElement, this.basketModal);
      this.initEventListeners();
      // Привязываем контекст к методу handleOverlayClick
      this.handleOverlayClick = this.handleOverlayClick.bind(this);
      // Добавляем обработчик клика на оверлей
      this.modalElement.addEventListener("click", this.handleOverlayClick);
  }

  private initEventListeners(): void {
      const basketButton = document.querySelector(".header__basket");
      if (basketButton) {
          basketButton.addEventListener("click", this.handleBasketClick.bind(this));
      }
      document.body.addEventListener("click", this.handleBodyClick.bind(this));
      const gallery = document.querySelector(".gallery");
      if (gallery) {
          gallery.addEventListener("click", this.handleGalleryItemClick.bind(this));
      }
  }

  

  private handleBasketClick(event: MouseEvent): void {
      this.openModal();
      this.basketModal.showBasket();
  }

  private handleGalleryItemClick(event: MouseEvent): void {
      const target = event.target as HTMLElement;
      const productElement = target.closest('.card') as HTMLElement;
      if (productElement) {
          // Получаем информацию о продукте
          const product: Product = {
              id: productElement.dataset.productId || '',
              category: productElement.dataset.productCategory || '',
              title: productElement.dataset.productTitle || '',
              image: (productElement.querySelector('.card__image') as HTMLImageElement).src || '',
              description: productElement.dataset.productDescription || '',
              price: parseInt(productElement.dataset.productPrice || '0')
          };
          this.openModal();
          this.cardPreviewModal.openCardPreview(product);
      }
  }

  private handleBodyClick(event: MouseEvent): void {
      const target = event.target as HTMLElement;
      if (target && target.classList.contains("modal__close")) {
          this.closeModal();
      } else if (target && target.classList.contains("basket__button")) {
          this.basketModal.hideBasket();
          this.orderModal.showOrder();
      } else if (target && target.classList.contains("button_alt")) {
          const buttons = document.querySelectorAll(".button_alt");
          buttons.forEach(button => {
              button.classList.remove("button_alt-active");
          });
          target.classList.add("button_alt-active");
      } else if (target && target.classList.contains("order__button")) {
          this.orderModal.hideOrder();
          this.contactsModal.showContacts();
      } else if (target && target.classList.contains("contacts__button")) {
         const totalPrice = this.basketModal.getTotalPrice();
          this.contactsModal.hideContacts();
          this.successModal.showSuccess(totalPrice);
          this.basketModal.updateBasketCounter('decrement');
          const basketList = this.basketModal.getBasketList();
          if (basketList) {
              basketList.innerHTML = ''; // Очищаем содержимое корзины
              this.basketModal.updateBasketPrice(); // Обновляем сумму в корзине
          }
      } else if (target && target.classList.contains("order-success__close")) {
          this.closeModal();
      }
  }

  private handleOverlayClick(event: MouseEvent): void {
    if (event.target === this.modalElement) {
        this.closeModal();
    }
  }

  private openModal(): void {
      this.modalElement.classList.add("modal_active");
  }

  private closeModal(): void {
      this.modalElement.classList.remove("modal_active");
      this.basketModal.hideBasket();
      this.orderModal.hideOrder();
      this.contactsModal.hideContacts();
      this.successModal.hideSuccess();
      this.cardPreviewModal.closeCardPreview();
  }
}

export class BasketModal {
  private modalElement: HTMLElement;
  private basketElement: HTMLElement | null;
  private basketCounterElement: HTMLElement | null;
  private basketCounter: number;

  constructor(modalElement: HTMLElement) {
      this.modalElement = modalElement;
      this.basketCounter = 0; // Начальное значение счетчика
      this.createBasket();
      this.basketCounterElement = document.querySelector('.header__basket-counter');
      if (this.basketCounterElement) {
          this.basketCounterElement.textContent = `${this.basketCounter}`;
      }
  }

  private createBasket(): void {
      const modalContent = this.modalElement.querySelector(".modal__content");
      if (modalContent) {
          // Создаем элемент корзины
          this.basketElement = document.createElement("div");
          this.basketElement.classList.add("basket");
          this.basketElement.innerHTML = `
          <div class="basket">
              <h2 class="modal__title">Корзина</h2>
              <ul class="basket__list"></ul>
              <div class="modal__actions">
                  <button class="button basket__button" disabled>Оформить</button>
                  <span class="basket__price">0 синапсов</span>
              </div>
      </div>
          `;
          modalContent.appendChild(this.basketElement);
          // По умолчанию скрываем корзину
          this.hideBasket();
      }
  }

  public showBasket(): void {
      if (this.basketElement) {
          // Показываем корзину только если она существует
          this.basketElement.style.display = "block";
      }
  }

  public hideBasket(): void {
      if (this.basketElement) {
          // Прячем корзину только если она существует
          this.basketElement.style.display = "none";
      }
  }

  public updateBasketPrice(): void {
      // Находим элемент суммы синапсов в корзине
      const priceElement = this.basketElement?.querySelector('.basket__price');
      if (!priceElement) return;

      // Получаем все элементы карточек продуктов в корзине
      const items = this.basketElement?.querySelectorAll('.basket__item');
      if (!items) return;

      // Вычисляем сумму синапсов всех товаров в корзине
      let totalPrice = 0;
      items.forEach(item => {
          const price = parseInt(item.querySelector('.card__price')?.textContent?.split(' ')[0] || '0');
          totalPrice += price;
      });

      // Обновляем текст элемента суммы синапсов
      priceElement.textContent = `${totalPrice} синапсов`;
  }

  public getTotalPrice(): number {
    // Получаем все элементы карточек продуктов в корзине
    const items = this.basketElement?.querySelectorAll('.basket__item');
    if (!items) return 0;

    // Вычисляем сумму синапсов всех товаров в корзине
    let totalPrice = 0;
    items.forEach(item => {
        const price = parseInt(item.querySelector('.card__price')?.textContent?.split(' ')[0] || '0');
        totalPrice += price;
    });

    return totalPrice;
}

  public updateBasketCounter(action: 'increment' | 'decrement'): void {
      if (action === 'increment') {
          this.basketCounter++;
      } else {
          this.basketCounter--;
      }
      if (this.basketCounterElement) {
          this.basketCounterElement.textContent = `${this.basketCounter}`;
          validateBasketItems(this.basketCounter, document.querySelector('.basket__button') as HTMLButtonElement);
      }
}

  public getBasketList(): HTMLElement | null {
      // Возвращаем список корзины для возможности добавления в него карточек продуктов
      return this.basketElement?.querySelector('.basket__list') || null;
  }
}

export class OrderModal {
  private modalElement: HTMLElement;
  private orderTemplate: HTMLTemplateElement;
  private orderElement: HTMLElement | null;

  constructor(modalElement: HTMLElement) {
      this.modalElement = modalElement;
      this.orderTemplate = document.getElementById("order") as HTMLTemplateElement;
      this.orderElement = null;
  }

  public showOrder(): void {
      if (!this.orderElement) {
          const modalContent = this.modalElement.querySelector(".modal__content");
          if (modalContent && this.orderTemplate.content) {
              this.orderElement = this.orderTemplate.content.firstElementChild!.cloneNode(true) as HTMLElement;
              modalContent.appendChild(this.orderElement);
              const addressInput = this.orderElement.querySelector(".form__input[name='address']") as HTMLInputElement;
              const nextButton = this.modalElement.querySelector(".order__button") as HTMLButtonElement;
              validateAddressInput(addressInput, nextButton); // Вызываем функцию валидации
          }
      }
  }

  public hideOrder(): void {
      if (this.orderElement && this.orderElement.parentNode) {
          this.orderElement.parentNode.removeChild(this.orderElement);
          this.orderElement = null;
      }
  }
}

export class ContactsModal {
  private modalElement: HTMLElement;
  private contactsTemplate: HTMLTemplateElement;
  private contactsElement: HTMLElement | null;

  constructor(modalElement: HTMLElement) {
      this.modalElement = modalElement;
      this.contactsTemplate = document.getElementById("contacts") as HTMLTemplateElement;
      this.contactsElement = null;
  }

  public showContacts(): void {
      if (!this.contactsElement) {
          const modalContent = this.modalElement.querySelector(".modal__content");
          if (modalContent && this.contactsTemplate.content) {
              this.contactsElement = this.contactsTemplate.content.firstElementChild!.cloneNode(true) as HTMLElement;
              modalContent.appendChild(this.contactsElement);

              const form = this.contactsElement.querySelector(".form") as HTMLFormElement;
              form.addEventListener("submit", this.handleSubmit.bind(this));

              const emailInput = this.contactsElement.querySelector(".form__input[name='email']") as HTMLInputElement;
              const phoneInput = this.contactsElement.querySelector(".form__input[name='phone']") as HTMLInputElement;
              emailInput.addEventListener("input", this.handleInput.bind(this));
              phoneInput.addEventListener("input", this.handleInput.bind(this));
          }
      }
  }

  public hideContacts(): void {
      if (this.contactsElement && this.contactsElement.parentNode) {
          this.contactsElement.parentNode.removeChild(this.contactsElement);
          this.contactsElement = null;
      }
  }

  private handleInput(): void {
    const emailInput = this.contactsElement.querySelector(".form__input[name='email']") as HTMLInputElement;
    const phoneInput = this.contactsElement.querySelector(".form__input[name='phone']") as HTMLInputElement;
    const submitButton = this.contactsElement.querySelector(".contacts__button") as HTMLButtonElement;
    validateFormInputs(emailInput, phoneInput, submitButton);
}

  private handleSubmit(event: Event): void {
      event.preventDefault();
  }
}

export class SuccessModal {
  private modalElement: HTMLElement;
  private successTemplate: HTMLTemplateElement;
  private successElement: HTMLElement | null;

  constructor(modalElement: HTMLElement) {
      this.modalElement = modalElement;
      this.successTemplate = document.getElementById("success") as HTMLTemplateElement;
      this.successElement = null;
  }

  public showSuccess(totalPrice: number): void {
    if (!this.successElement) {
        const modalContent = this.modalElement.querySelector(".modal__content");
        if (modalContent && this.successTemplate.content) {
            this.successElement = this.successTemplate.content.firstElementChild!.cloneNode(true) as HTMLElement;
            // Отображаем сумму списанных синапсов
            const descriptionElement = this.successElement.querySelector(".order-success__description") as HTMLElement;
            descriptionElement.textContent = `Списано ${totalPrice} синапсов`;
            modalContent.appendChild(this.successElement);
        }
    }
}

  public hideSuccess(): void {
      if (this.successElement && this.successElement.parentNode) {
          this.successElement.parentNode.removeChild(this.successElement);
          this.successElement = null;
      }
  }
}

export class CardPreviewModal {
  private modalElement: HTMLElement;
  private basketCounter: number;
  private basketModal: BasketModal;

  constructor(modalElement: HTMLElement, basketModal: BasketModal) {
      this.modalElement = modalElement;
      this.basketCounter = 1; // Начальное значение счетчика
      this.basketModal = basketModal; // Сохраняем ссылку на экземпляр корзины
  }

  public openCardPreview(product: Product): void {
      const cardPreviewTemplate = document.getElementById("card-preview") as HTMLTemplateElement;
      const modalContent = this.modalElement.querySelector(".modal__content");
      if (cardPreviewTemplate && modalContent) {
          const cardPreviewElement = cardPreviewTemplate.content.firstElementChild!.cloneNode(true) as HTMLElement;
          
          // Находим нужные элементы в карточке и заполняем их данными о продукте
          const categoryElement = cardPreviewElement.querySelector(".card__category") as HTMLElement;
          categoryElement.textContent = product.category;

          const titleElement = cardPreviewElement.querySelector(".card__title") as HTMLElement;
          titleElement.textContent = product.title;

          const DescriptionElement = cardPreviewElement.querySelector(".card__text") as HTMLElement;
          DescriptionElement.textContent = product.description;

          const imageElement = cardPreviewElement.querySelector(".card__image") as HTMLImageElement;
          imageElement.src = product.image;
          imageElement.alt = product.title;

          const priceElement = cardPreviewElement.querySelector(".card__price") as HTMLElement;
          if (product.price === 0) {
              priceElement.textContent = `Бесценно`;
          } else {
              priceElement.textContent = `${product.price} синапсов`;
          }

          // Добавляем обработчик события на кнопку "В корзину"
          const basketButton = cardPreviewElement.querySelector(".button") as HTMLButtonElement;
          basketButton.addEventListener("click", () => {
              this.handleBasketButtonClick(product);
          });

          

          

          // Добавляем класс категории в зависимости от значения свойства category продукта
          switch (product.category) {
              case 'софт-скил':
                  categoryElement.classList.add('card__category_soft');
                  break;
              case 'хард-скил':
                  categoryElement.classList.add('card__category_hard');
                  break;
              case 'другое':
                  categoryElement.classList.add('card__category_other');
                  break;
              case 'дополнительное':
                  categoryElement.classList.add('card__category_additional');
                  break;
              case 'кнопка':
                  categoryElement.classList.add('card__category_button');
                  break;
              default:
                  // Если категория не определена, присваиваем класс по умолчанию
                  categoryElement.classList.add('card__category_soft');
                  break;
          }

          

          modalContent.appendChild(cardPreviewElement);
          this.modalElement.classList.add("modal_active");
      }
  }

  private handleBasketButtonClick(product: Product): void {
      // Добавляем карточку продукта в список корзины с порядковым номером
      const basketList = this.basketModal.getBasketList(); // Получаем список корзины
      if (basketList) {
          const basketItem = this.createBasketItem(product);
          basketList.appendChild(basketItem);
          // После добавления товара вызываем метод обновления суммы в корзине
          this.basketModal.updateBasketPrice();
          // После добавления товара вызываем метод обновления счетчика товаров в корзине
          this.basketModal.updateBasketCounter('increment');
      }
  }

  private createBasketItem(product: Product): HTMLElement {
      // Получаем шаблон карточки из HTML
      const basketTemplate = document.getElementById("card-basket") as HTMLTemplateElement;
    
      // Создаем копию содержимого шаблона
      const basketItem = document.importNode(basketTemplate.content, true).querySelector(".basket__item") as HTMLElement;
  
      // Находим кнопку удаления в карточке
      const deleteButton = basketItem.querySelector(".basket__item-delete") as HTMLButtonElement;
  
      // Добавляем обработчик события на кнопку удаления
      deleteButton.addEventListener("click", () => {
          this.removeBasketItem(basketItem);
          this.basketModal.updateBasketPrice();
      });
  
      // Находим нужные элементы в карточке и заполняем их данными о продукте
      const indexElement = basketItem.querySelector(".basket__item-index") as HTMLElement;
      indexElement.textContent = `${this.basketCounter++}`; // Инкрементируем счетчик и присваиваем значение
      const titleElement = basketItem.querySelector(".card__title") as HTMLElement;
      titleElement.textContent = product.title;
  
      const priceElement = basketItem.querySelector(".card__price") as HTMLElement;
      priceElement.textContent = `${product.price} синапсов`;
      
      this.closeCardPreview();
      return basketItem;
  }
  
  private removeBasketItem(item: HTMLElement): void {
      // Находим родительский элемент, то есть список корзины
      const basketList = document.querySelector('.basket__list') as HTMLElement;
  
      // Удаляем элемент из списка корзины
      if (basketList && item.parentNode) {
          basketList.removeChild(item);
          // После удаления товара вызываем метод обновления суммы в корзине
          this.basketModal.updateBasketPrice();
          // После удаления товара вызываем метод обновления счетчика товаров в корзине
          this.basketModal.updateBasketCounter('decrement');
      }
  }

  public closeCardPreview(): void {
      const cardPreviewElement = this.modalElement.querySelector(".card_full");
      if (cardPreviewElement && cardPreviewElement.parentNode) {
          cardPreviewElement.parentNode.removeChild(cardPreviewElement);
          this.modalElement.classList.remove("modal_active");
      }
  }
}