import { createElement } from '../utils/render.js';
const createFilmListTemplate = () => (`<section class="films-list">
  <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
</section>
`);
export default class FilmListView {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createFilmListTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
