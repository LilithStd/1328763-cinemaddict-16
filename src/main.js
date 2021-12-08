import {
  RenderPosition,
  render,
  remove
} from './utils/render.js';
import UserRankView from './view/user-rank-view.js';
import MenuContainerView from './view/menu-container-view.js';
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

  filmCardComponent.setFilmClickHandler(popUpOpenClickHandler);

  filmCardInformationComponent.setFilmPopupCloseClickHandler(() => {
    bodyElement.removeChild(filmCardInformationComponent.element);
    bodyElement.classList.remove('hide-overflow');
    document.removeEventListener('keydown', escKeyDownHandler);
  });

  render(filmContainer, filmCardComponent, RenderPosition.BEFOREEND);
};


const renderMenu = (menuContainer) => {
  const menuContainerComponent = new MenuContainerView();

  render(menuContainer, menuContainerComponent, RenderPosition.BEFOREEND);
  render(menuContainerComponent, new MenuItemView(filters), RenderPosition.BEFOREEND);
  render(menuContainerComponent, new MenuStatsView(), RenderPosition.BEFOREEND);

};

const renderBoardFilms = (boardContainer, boardFilms) => {
  const boardFilmComponent = new FilmsBoardView();
  const filmListComponent = new FilmListView();
  const filmContainerComponent = new FilmContainerView();


  render(boardContainer, boardFilmComponent, RenderPosition.BEFOREEND);

  if (boardFilms.length === 0) {
    render(boardFilmComponent, new FilmListEmptyView(), RenderPosition.BEFOREEND);
  } else {
    render(headerElement, new UserRankView(), RenderPosition.BEFOREEND);
    render(boardFilmComponent, new SortView(), RenderPosition.BEFOREBEGIN);
    render(boardFilmComponent, filmListComponent, RenderPosition.BEFOREEND);
    render(filmListComponent, filmContainerComponent, RenderPosition.BEFOREEND);

    for (let i = 0; i < FILM_COUNT_PER_STEP; i++) {
      renderFilm(filmContainerComponent, films[i]);
    }

    const topRatedElement = new FilmExtraView(TOP_RATED);
    const mostCommentedElement = new FilmExtraView(MOST_COMMENTED);

    render(boardFilmComponent, topRatedElement, RenderPosition.BEFOREEND);
    render(boardFilmComponent, mostCommentedElement, RenderPosition.BEFOREEND);

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

      render(filmListComponent, loadMoreButton, RenderPosition.BEFOREEND);

      loadMoreButton.setClickHandler(() => {
        films
          .slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP)
          .forEach((film) => renderFilm(filmContainerComponent, film));
        renderedFilmCount += FILM_COUNT_PER_STEP;

        if (renderedFilmCount >= films.length) {
          remove(loadMoreButton);
        }
      });
    }
  }
};


render(footerStatisticsElement, new FooterStatisticsView(films), RenderPosition.BEFOREEND);

renderMenu(mainElement);

renderBoardFilms(mainElement, films);


