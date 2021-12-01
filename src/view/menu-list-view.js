import { createElement } from '../utils/render.js';
const createMenuListTemplate = () => (`<div class="main-navigation__items">
</div>`);
export default class MenuListView {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createMenuListTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
