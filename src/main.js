import {
  RenderPosition,
  render
} from './utils/render.js';
import UserRankView from './view/user-rank-view.js';
import MenuContainerView from './view/menu-container-view.js';
import MenuListView from './view/menu-list-view.js';
import MenuItemView from './view/menu-item-view.js';
import SortView from './view/sort-view.js';
import FilmsBoardView from './view/films-board-view.js';
import FilmListView from './view/film-list-view.js';
import FilmContainerView from './view/film-container-view.js';
import FilmExtraView from './view/film-extra-container-view.js';
import FilmCardView from './view/film-card-view.js';
import ButtonShowMoreView from './view/button-show-more-view.js';
import FooterStatisticsView from './view/footer-statistics-view.js';
import MenuStatsView from './view/menu-stats-view.js';
import FilmListEmptyView from './view/film-list-empty-view.js';
import FilmPopupInfoView from './view/film-popup-info-view.js';
import {
  generateFilmModelMock
} from './mock/film-card-mock.js';
import {
  generateFilters
} from './utils/film-filters.js';

const FILM_COUNT = 20;
const FILM_EXTRA_COUNT = 2;
const FILM_COUNT_PER_STEP = 5;
const MOST_COMMENTED = 'Most commented';
const TOP_RATED = 'Top rated';

// const films = Array.from({
//   length: FILM_COUNT
// }, generateFilmCardMock);
const films = Array.from({
  length: FILM_COUNT
}, generateFilmModelMock);
const filters = generateFilters(films);

const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');
const footerStatisticsElement = document.querySelector('.footer__statistics');
const bodyElement = document.querySelector('body');

const renderFilm = (filmContainer, film) => {
  const filmCardComponent = new FilmCardView(film);
  const filmCardInformationComponent = new FilmPopupInfoView(film);
  const filmCardPreviewPoster = filmCardComponent.element.querySelector('.film-card__poster');
  const filmCardPreviewTitle = filmCardComponent.element.querySelector('.film-card__title');
  const filmCardPreviewComments = filmCardComponent.element.querySelector('.film-card__comments');
  const filmCardInformationElement = filmCardInformationComponent.element.querySelector('.film-details__close-btn');

  const escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      bodyElement.removeChild(filmCardInformationComponent.element);
      bodyElement.classList.remove('hide-overflow');
      document.removeEventListener('keydown', escKeyDownHandler);
    }
  };

  const popUpOpenClickHandler = () => {
    const filmDetailsElement = bodyElement.querySelector('.film-details');
    if(filmDetailsElement)  {
      filmDetailsElement.remove();
    }
    bodyElement.classList.add('hide-overflow');
    bodyElement.appendChild(filmCardInformationComponent.element);
    document.addEventListener('keydown', escKeyDownHandler);
  };

  filmCardPreviewPoster.addEventListener('click', popUpOpenClickHandler);
  filmCardPreviewTitle.addEventListener('click', popUpOpenClickHandler);
  filmCardPreviewComments.addEventListener('click', popUpOpenClickHandler);

  filmCardInformationElement.addEventListener('click', () => {
    bodyElement.removeChild(filmCardInformationComponent.element);
    bodyElement.classList.remove('hide-overflow');
    document.removeEventListener('keydown', escKeyDownHandler);
  });
  render(filmContainer, filmCardComponent.element, RenderPosition.BEFOREEND);
};


render(mainElement, new FilmsBoardView().element, RenderPosition.BEFOREEND);

render(footerStatisticsElement, new FooterStatisticsView(films).element, RenderPosition.BEFOREEND);

const filmsBoardElement = mainElement.querySelector('.films');

render(mainElement, new MenuContainerView().element, RenderPosition.AFTERBEGIN);

const navigationContainerElement = mainElement.querySelector('.main-navigation');

render(navigationContainerElement, new MenuListView().element, RenderPosition.BEFOREEND);

const navigationListElement = navigationContainerElement.querySelector('.main-navigation__items');

render(navigationListElement,new MenuItemView(filters).element, RenderPosition.BEFOREEND);
render(navigationContainerElement, new MenuStatsView().element, RenderPosition.BEFOREEND);


if (films.length === 0) {
  render(filmsBoardElement, new FilmListEmptyView().element, RenderPosition.BEFOREEND);
} else {
  render(headerElement, new UserRankView().element, RenderPosition.BEFOREEND);

  render(navigationContainerElement, new SortView().element, RenderPosition.AFTEREND);

  render(filmsBoardElement, new FilmListView().element, RenderPosition.BEFOREEND);

  const filmsListElement = filmsBoardElement.querySelector('.films-list');

  render(filmsListElement, new FilmContainerView().element, RenderPosition.BEFOREEND);

  const filmsListContainerElement = filmsListElement.querySelector('.films-list__container');

  for (let i = 0; i < FILM_COUNT_PER_STEP; i++) {
    renderFilm(filmsListContainerElement, films[i]);
  }


  const topRatedElement = new FilmExtraView(TOP_RATED);
  const mostCommentedElement = new FilmExtraView(MOST_COMMENTED);

  render(filmsBoardElement, topRatedElement.element, RenderPosition.BEFOREEND);
  render(filmsBoardElement, mostCommentedElement.element, RenderPosition.BEFOREEND);

  const filmTopRatedContainer = topRatedElement.element.querySelector('.films-list--extra .films-list__container');
  const filmMostCommentedContainer = mostCommentedElement.element.querySelector('.films-list--extra .films-list__container');
  const topRatedResult = films.slice().sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating);
  const mostCommentedResult = films.slice().sort((a, b) => b.comments.length - a.comments.length);

  for (let i = 0; i < FILM_EXTRA_COUNT; i++) {
    renderFilm(filmTopRatedContainer, topRatedResult[i]);
    renderFilm(filmMostCommentedContainer, mostCommentedResult[i]);
  }


  if (films.length > FILM_COUNT_PER_STEP) {
    let renderedFilmCount = FILM_COUNT_PER_STEP;

    const loadMoreButton = new ButtonShowMoreView();

    render(filmsListElement, loadMoreButton.element, RenderPosition.BEFOREEND);


    loadMoreButton.element.addEventListener('click', (evt) => {
      evt.preventDefault();
      films
        .slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP)
        .forEach((film) => renderFilm(filmsListContainerElement, film));
      renderedFilmCount += FILM_COUNT_PER_STEP;

      if (renderedFilmCount >= films.length) {
        loadMoreButton.element.remove();
        loadMoreButton.removeElement();
      }
    });
  }
}
