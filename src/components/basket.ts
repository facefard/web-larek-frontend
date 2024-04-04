import { EventEmitter } from "./base/events";
import { Component } from "./base/copmonent";
import { createElement, ensureElement } from "../utils/utils";
import { BasketModalView } from "../types";

export class Basket extends Component<BasketModalView> {
  protected _list: HTMLElement;
  protected _price: HTMLElement;
  protected _button: HTMLButtonElement;

  constructor(container: HTMLElement, protected events: EventEmitter) {
      super(container);
      this._list = ensureElement<HTMLElement>('.basket__list', this.container);
      this._price = this.container.querySelector('.basket__price');
      this._button = this.container.querySelector('.basket__button');
      this.items = [];
      this._button.disabled = true;

      if (this._button) {
          this._button.addEventListener('click', () => {
              events.emit('order:open');
          });
      }
  }

  set items(items: HTMLElement[]) {
      if (items.length) {
          this._list.replaceChildren(...items);
      } else {
          this._list.replaceChildren(createElement<HTMLParagraphElement>('p', {
              textContent: 'Корзина пуста'
          }));
      }
  }

  set total(price: number) {
      this.setText(this._price, `${price.toString()} синапсов`);;
  }

  buttonBlocked(isDisabled:boolean){
      this._button.disabled = isDisabled;
  }
}