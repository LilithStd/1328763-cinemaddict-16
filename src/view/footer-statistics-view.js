import { createElement } from '../utils/render.js';

const createFooterStatisticsTemplate = (countAllFilms) => (`<p>${countAllFilms.length} movies inside</p>
`);
export default class FooterStatisticsView {
  #element = null;
  #countAllFilms = null;

  constructor(countAllFilms) {
    this.#countAllFilms = countAllFilms;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createFooterStatisticsTemplate(this.#countAllFilms);
  }

  removeElement() {
    this.#element = null;
  }
}
