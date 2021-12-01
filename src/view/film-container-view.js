import { createElement } from '../utils/render.js';
const createFilmContainerTemplate = () =>  (`<div class="films-list__container"></div>
`);
export default class FilmContainerView {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createFilmContainerTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
