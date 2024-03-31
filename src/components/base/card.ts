import { Product } from "../../types";

export class ProductRenderer {
  renderProduct(product: Product): HTMLElement {
      // Получаем шаблон карточки из HTML
      const template = document.getElementById("card-catalog") as HTMLTemplateElement;
      
      // Создаем копию содержимого шаблона
      const card = document.importNode(template.content, true).querySelector(".card") as HTMLElement;

      card.dataset.productId = product.id;
        card.dataset.productCategory = product.category;
        card.dataset.productTitle = product.title;
        card.dataset.productImage = product.image;
        card.dataset.productDescription = product.description;
        card.dataset.productPrice = product.price === null ? "0" : String(product.price);

      // Находим нужные элементы в карточке и заполняем их данными о продукте
      const categoryElement = card.querySelector(".card__category") as HTMLElement;
      categoryElement.textContent = product.category;

      const titleElement = card.querySelector(".card__title") as HTMLElement;
      titleElement.textContent = product.title;

      const imageElement = card.querySelector(".card__image") as HTMLImageElement;
      imageElement.src = product.image;
      imageElement.alt = product.title;

      const priceElement = card.querySelector(".card__price") as HTMLElement;
      if (product.price === null) {
          priceElement.textContent = `Бесценно`;
      } else {
          priceElement.textContent = `${product.price} синапсов`;
      }

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

      return card;
  }
}