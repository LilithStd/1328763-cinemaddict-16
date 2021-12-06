import { createElement } from '../utils/render.js';

const createFilmListEmptyView = () => `<section class="films-list">
<h2 class="films-list__title">There are no movies in our database</h2>
</section>`;

export default class FilmListEmptyView {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createFilmListEmptyView();
  }

  removeElement() {
    this.#element = null;
  }
}
