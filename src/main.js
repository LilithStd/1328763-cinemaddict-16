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
import FilmPopupInfoView from './view/film-popup-info-view.js';
import {
  generateFilmCardMock
} from './mock/film-card-mock.js';
import {
  generateFilters
} from './utils/film-filters.js';

const FILM_COUNT = 20;
const FILM_EXTRA_COUNT = 2;
const FILM_COUNT_PER_STEP = 5;
const MOST_COMMENTED = 'Most commented';
const TOP_RATED = 'Top rated';

const films = Array.from({
  length: FILM_COUNT
}, generateFilmCardMock);

const filters = generateFilters(films);

const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');
const footerStatisticsElement = document.querySelector('.footer__statistics');
const bodyElement = document.querySelector('body');

const renderFilm = (filmContainer, film) => {
  const filmCardComponent = new FilmCardView(film);

  render(filmContainer, filmCardComponent.element, RenderPosition.BEFOREEND);
};

render(headerElement, new UserRankView().element, RenderPosition.BEFOREEND);
render(mainElement, new MenuContainerView().element, RenderPosition.AFTERBEGIN);

const navigationContainerElement = mainElement.querySelector('.main-navigation');

render(navigationContainerElement, new MenuListView().element, RenderPosition.BEFOREEND);

const navigationListElement = navigationContainerElement.querySelector('.main-navigation__items');

render(navigationListElement,new MenuItemView(filters).element, RenderPosition.BEFOREEND);
render(navigationContainerElement, new MenuStatsView().element, RenderPosition.BEFOREEND);
render(mainElement, new SortView().element, RenderPosition.BEFOREEND);

render(mainElement, new FilmsBoardView().element, RenderPosition.BEFOREEND);

const filmsBoardElement = mainElement.querySelector('.films');


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
const topRatedResult = films.slice().sort((a, b) => b.rating - a.rating);
const mostCommentedResult = films.slice().sort((a, b) => b.comments.length - a.comments.length);

for (let i = 0; i < FILM_EXTRA_COUNT; i++) {
  renderFilm(filmTopRatedContainer, topRatedResult[i]);
  renderFilm(filmMostCommentedContainer, mostCommentedResult[i]);
}

render(footerStatisticsElement, new FooterStatisticsView(films).element, RenderPosition.BEFOREEND);

render(bodyElement,new FilmPopupInfoView(films[0]).element, RenderPosition.BEFOREEND);

if (films.length > FILM_COUNT_PER_STEP) {
  let renderedFilmCount = FILM_COUNT_PER_STEP;

  render(filmsListElement, new ButtonShowMoreView().element, RenderPosition.BEFOREEND);

  const loadMoreButton = filmsListElement.querySelector('.films-list__show-more');

  loadMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    films
      .slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP)
      .forEach((film) => renderFilm(filmsListContainerElement, film));
    renderedFilmCount += FILM_COUNT_PER_STEP;

    if (renderedFilmCount >= films.length) {
      loadMoreButton.remove();
    }
  });
}
