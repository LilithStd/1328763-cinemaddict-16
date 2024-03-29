import AbstractView from './abstract-view.js';

const createFilmExtraContainerTemplate = () => (`<section class="films-list films-list--extra">
      <h2 class="films-list__title">Most commented</h2>
      <div class="films-list__container">
  </div>
</section>
`);
export default class FilmExtraMostCommentedView extends AbstractView {
  get template() {
    return createFilmExtraContainerTemplate();
  }
}
