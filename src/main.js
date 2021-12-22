import {
  RenderPosition,
  render,
} from './utils/render.js';
import MenuContainerView from './view/menu-container-view.js';
import MenuItemView from './view/menu-item-view.js';
import FooterStatisticsView from './view/footer-statistics-view.js';
import MenuStatsView from './view/menu-stats-view.js';
import MoviePresenter from './presenter/movie-presenter.js';
import {
  generateFilmModelMock
} from './mock/film-card-mock.js';
import {
  generateFilters
} from './utils/film-filters.js';

const FILM_COUNT = 20;


const films = Array.from({
  length: FILM_COUNT
}, generateFilmModelMock);
const filters = generateFilters(films);


const mainElement = document.querySelector('.main');
const footerStatisticsElement = document.querySelector('.footer__statistics');

const renderMenu = (menuContainer) => {
  const menuContainerComponent = new MenuContainerView();

  render(menuContainer, menuContainerComponent, RenderPosition.BEFOREEND);
  render(menuContainerComponent, new MenuItemView(filters), RenderPosition.BEFOREEND);
  render(menuContainerComponent, new MenuStatsView(), RenderPosition.BEFOREEND);

};

const moviePresenter = new MoviePresenter(mainElement);

render(footerStatisticsElement, new FooterStatisticsView(films), RenderPosition.BEFOREEND);

renderMenu(mainElement);


moviePresenter.init(films);

