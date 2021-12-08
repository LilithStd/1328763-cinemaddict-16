import AbstractView from './abstract-view.js';
const createFilmContainerTemplate = () =>  (`<div class="films-list__container"></div>
`);
export default class FilmContainerView extends AbstractView {
  get template() {
    return createFilmContainerTemplate();
  }
}
