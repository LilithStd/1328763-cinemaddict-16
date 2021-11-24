import {
  renderTemplate,
  RenderPosition
} from './utils/render.js';
import {
  createUserProfileTemplate
} from './view/user-profile-view.js';
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
  createFooterTemplate
} from './view/footer-view.js';
import {
  createStatsTemplate
} from './view/menu-stats-view.js';
const FILM_COUNT = 5;
const FILM_EXTRA_COUNT = 2;
const MOST_COMMENTED = 'Most commented';
const TOP_RATED = 'Top rated';

const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');

renderTemplate(headerElement, createUserProfileTemplate(), RenderPosition.BEFOREEND);
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


const filmExtraListElement = filmsBoardElement.querySelector('.films-list--extra');

renderTemplate(filmExtraListElement, createFilmContainerTemplate(), RenderPosition.BEFOREEND);

renderTemplate(filmsBoardElement, createFilmExtraContainerTemplate(MOST_COMMENTED), RenderPosition.BEFOREEND);

for (let i = 0; i < FILM_EXTRA_COUNT; i++)  {

}

