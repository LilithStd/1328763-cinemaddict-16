import {
  renderTemplate,
  RenderPosition
} from './utils/render.js';
import {
  createUserRankTemplate
} from './view/user-rank-view.js';
import {
  createMenuContainerTemplate
} from './view/menu-container-view.js';
import {
  createMenuListTemplate
} from './view/menu-list-view.js';
import {
  createMenuItemTemplate
} from './view/menu-item-view.js';
import {
  createSortTemplate
} from './view/sort-view.js';
import {
  createFilmsBoardTemplate
} from './view/films-board-view.js';
import {
  createFilmListTemplate
} from './view/film-list-view.js';
import {
  createFilmContainerTemplate
} from './view/film-container-view.js';
import {
  createFilmExtraContainerTemplate
} from './view/film-extra-container-view.js';
import {
  createFilmCardtemplate
} from './view/film-card-view.js';
import {
  createButtonShowMore
} from './view/button-show-more-view.js';
import {
  createFooterStatisticsTemplate
} from './view/footer-statistics-view.js';
import {
  createStatsTemplate
} from './view/menu-stats-view.js';
import {
  createFilmPopupInfoTemplate
} from './view/film-popup-info-view.js';
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


renderTemplate(headerElement, createUserRankTemplate(), RenderPosition.BEFOREEND);
renderTemplate(mainElement, createMenuContainerTemplate(), RenderPosition.AFTERBEGIN);

const navigationContainerElement = mainElement.querySelector('.main-navigation');

renderTemplate(navigationContainerElement, createMenuListTemplate(), RenderPosition.BEFOREEND);

const navigationListElement = navigationContainerElement.querySelector('.main-navigation__items');

renderTemplate(navigationListElement, createMenuItemTemplate(filters), RenderPosition.BEFOREEND);
renderTemplate(navigationContainerElement, createStatsTemplate(), RenderPosition.BEFOREEND);
renderTemplate(mainElement, createSortTemplate(), RenderPosition.BEFOREEND);

renderTemplate(mainElement, createFilmsBoardTemplate(), RenderPosition.BEFOREEND);

const filmsBoardElement = mainElement.querySelector('.films');

renderTemplate(filmsBoardElement, createFilmListTemplate(), RenderPosition.BEFOREEND);

const filmsListElement = filmsBoardElement.querySelector('.films-list');

renderTemplate(filmsListElement, createFilmContainerTemplate(), RenderPosition.BEFOREEND);

const filmsListContainerElement = filmsListElement.querySelector('.films-list__container');

for (let i = 0; i < FILM_COUNT_PER_STEP; i++) {
  renderTemplate(filmsListContainerElement, createFilmCardtemplate(films[i]), RenderPosition.BEFOREEND);
}


const topRatedResult = films.slice().sort((a, b) => b.rating - a.rating);
const mostCommentedResult = films.slice().sort((a, b) => b.comments.length - a.comments.length);

renderTemplate(filmsBoardElement, createFilmExtraContainerTemplate(TOP_RATED), RenderPosition.BEFOREEND);
renderTemplate(filmsBoardElement, createFilmExtraContainerTemplate(MOST_COMMENTED), RenderPosition.BEFOREEND);

const filmExtraListElement = filmsBoardElement.querySelectorAll('.films-list--extra');
filmExtraListElement.forEach((element) => {
  renderTemplate(element, createFilmContainerTemplate(), RenderPosition.BEFOREEND);
});

const contentExtraElement = mainElement.querySelectorAll('.films-list--extra .films-list__container');
const filmTopRatedElement = contentExtraElement[0];
const filmMostCommentedElement = contentExtraElement[1];

for (let i = 0; i < FILM_EXTRA_COUNT; i++) {
  renderTemplate(filmTopRatedElement, createFilmCardtemplate(topRatedResult[i]), RenderPosition.BEFOREEND);
  renderTemplate(filmMostCommentedElement, createFilmCardtemplate(mostCommentedResult[i]), RenderPosition.BEFOREEND);
}

renderTemplate(footerStatisticsElement, createFooterStatisticsTemplate(films), RenderPosition.BEFOREEND);

renderTemplate(bodyElement, createFilmPopupInfoTemplate(films[0]), RenderPosition.BEFOREEND);
if (films.length > FILM_COUNT_PER_STEP) {
  let renderedFilmCount = FILM_COUNT_PER_STEP;

  renderTemplate(filmsListElement, createButtonShowMore(), RenderPosition.BEFOREEND);

  const loadMoreButton = filmsListElement.querySelector('.films-list__show-more');

  loadMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    films
      .slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP)
      .forEach((film) => renderTemplate(filmsListContainerElement, createFilmCardtemplate(film), RenderPosition.BEFOREEND));
    renderedFilmCount += FILM_COUNT_PER_STEP;

    if (renderedFilmCount >= films.length) {
      loadMoreButton.remove();
    }
  });
}
