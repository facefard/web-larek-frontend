export abstract class Component<T> {
  // Конструктор класса, принимает контейнер DOM-элемента, в котором будет размещаться компонент
  protected constructor(protected readonly container: HTMLElement) {
  }

  // Метод для переключения класса у элемента
  toggleClass(element: HTMLElement, className: string, force?: boolean) {
      element.classList.toggle(className, force);
  }

  // Метод для установки текстового содержимого элемента
  protected setText(element: HTMLElement, value: unknown) {
      if (element) {
          element.textContent = String(value);
      }
  }

  // Метод для установки состояния блокировки элемента
  setDisabled(element: HTMLElement, state: boolean) {
      if (element) {
          if (state) element.setAttribute('disabled', 'disabled');
          else element.removeAttribute('disabled');
      }
  }

  // Метод для скрытия элемента
  protected setHidden(element: HTMLElement) {
      element.style.display = 'none';
  }

  // Метод для отображения элемента
  protected setVisible(element: HTMLElement) {
      element.style.removeProperty('display');
  }

  // Метод для установки изображения с альтернативным текстом
  protected setImage(element: HTMLImageElement, src: string, alt?: string): void {
      if (element) {
          element.src = src;
          if (alt) {
              element.alt = alt;
          }
      }
  }

  // Метод для рендеринга компонента
  // Принимает частичные данные (Partial<T>) и присваивает их текущему объекту,
  // затем возвращает контейнер DOM-элемента
  render(data?: Partial<T>): HTMLElement {
      Object.assign(this as object, data ?? {});
      return this.container;
  }
}