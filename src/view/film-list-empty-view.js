import AbstractView from './abstract-view.js';

const createFilmListEmptyView = () => (`<section class="films-list">
<h2 class="films-list__title">There are no movies in our database</h2>
</section>`);

export default class FilmListEmptyView extends AbstractView{
  get template() {
    return createFilmListEmptyView();
  }
}
