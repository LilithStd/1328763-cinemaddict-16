import AbstractView from './abstract-view.js';

const createFooterStatisticsTemplate = (countAllFilms) => (`<p>${countAllFilms.length} movies inside</p>
`);
export default class FooterStatisticsView extends AbstractView{
  #countAllFilms = null;

  constructor(countAllFilms) {
    super();
    this.#countAllFilms = countAllFilms;
  }

  get template() {
    return createFooterStatisticsTemplate(this.#countAllFilms);
  }

}
