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

const FILM_COUNT = 5;
const FILM_EXTRA_COUNT = 2;
const MOST_COMMENTED = 'Most commented';
const TOP_RATED = 'Top rated';

const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');
const footerStatisticsElement = document.querySelector('.footer__statistics');
const bodyElement = document.querySelector('body');


renderTemplate(headerElement, createUserRankTemplate(), RenderPosition.BEFOREEND);
renderTemplate(mainElement, createMenuContainerTemplate(), RenderPosition.AFTERBEGIN);

const navigationContainerElement = mainElement.querySelector('.main-navigation');

renderTemplate(navigationContainerElement, createMenuListTemplate(), RenderPosition.BEFOREEND);

const navigationListElement = navigationContainerElement.querySelector('.main-navigation__items');

renderTemplate(navigationListElement, createMenuItemTemplate(), RenderPosition.BEFOREEND);
renderTemplate(navigationContainerElement, createStatsTemplate(), RenderPosition.BEFOREEND);
renderTemplate(mainElement, createSortTemplate(), RenderPosition.BEFOREEND);

renderTemplate(mainElement, createFilmsBoardTemplate(), RenderPosition.BEFOREEND);

const filmsBoardElement = mainElement.querySelector('.films');

renderTemplate(filmsBoardElement, createFilmListTemplate(), RenderPosition.BEFOREEND);

const filmsListElement = filmsBoardElement.querySelector('.films-list');

renderTemplate(filmsListElement, createFilmContainerTemplate(), RenderPosition.BEFOREEND);

const filmsListContainerElement = filmsListElement.querySelector('.films-list__container');

for (let i = 0; i < FILM_COUNT; i++) {
  renderTemplate(filmsListContainerElement, createFilmCardtemplate(), RenderPosition.BEFOREEND);
}

renderTemplate(filmsListElement, createButtonShowMore(), RenderPosition.BEFOREEND);

renderTemplate(filmsBoardElement, createFilmExtraContainerTemplate(TOP_RATED), RenderPosition.BEFOREEND);
renderTemplate(filmsBoardElement, createFilmExtraContainerTemplate(MOST_COMMENTED), RenderPosition.BEFOREEND);


const filmExtraListElement = filmsBoardElement.querySelectorAll('.films-list--extra');


filmExtraListElement.forEach((element) => {
  renderTemplate(element, createFilmContainerTemplate(), RenderPosition.BEFOREEND);
  const filmListContainerElement = element.querySelector('.films-list__container');
  for (let i = 0; i < FILM_EXTRA_COUNT; i++) {
    renderTemplate(filmListContainerElement, createFilmCardtemplate(), RenderPosition.BEFOREEND);
  }
});

renderTemplate(footerStatisticsElement, createFooterStatisticsTemplate(), RenderPosition.BEFOREEND);

renderTemplate(bodyElement, createFilmPopupInfoTemplate(), RenderPosition.BEFOREEND);
