import { Component } from "./base/copmonent";
import { ensureElement } from "../utils/utils";
import { SuccessType, SuccessClick } from "../types";

export class Success extends Component<SuccessType> {
  protected _close: HTMLElement;
  protected _descriptionTotl: HTMLElement;

  constructor(container: HTMLElement, actions: SuccessClick) {
      super(container);
      this._close = ensureElement<HTMLElement>('.order-success__close', this.container);
      this._descriptionTotl = ensureElement<HTMLElement>('.order-success__description', this.container);
      if (actions?.onClick) {
          this._close.addEventListener('click', actions.onClick);
      }
  }

  set descriptionTotl(value:string){
      this._descriptionTotl.textContent=`Списано ${value} синапсов`;
  }
}