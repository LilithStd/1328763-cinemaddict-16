import {
  createElement
} from '../utils/render.js';

const createFilmExtraContainerTemplate = (title) => (`<section class="films-list films-list--extra">
      <h2 class="films-list__title">${title}</h2>
      <div class="films-list__container">
  </div>
</section>
`);
export default class FilmExtraView {
  #element = null;
  #title = null;

  constructor(title) {
    this.#title = title;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createFilmExtraContainerTemplate(this.#title);
  }

  removeElement() {
    this.#element = null;
  }
}
