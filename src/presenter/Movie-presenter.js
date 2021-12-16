import SortView from '../view/sort-view.js';
import FilmsBoardView from '../view/films-board-view.js';
import FilmListView from '../view/film-list-view.js';
import FilmContainerView from '../view/film-container-view.js';
import FilmListEmptyView from '../view/film-list-empty-view.js';
import UserRankView from '../view/user-rank-view.js';
import FilmExtraView from '../view/film-extra-container-view.js';
import FilmCardView from '../view/film-card-view.js';
import FilmPopupInfoView from '../view/film-popup-info-view.js';
import ButtonShowMoreView from '../view/button-show-more-view.js';
import {
  render,
  RenderPosition,
  remove
} from '../utils/render.js';

const FILM_COUNT_PER_STEP = 5;
const FILM_EXTRA_COUNT = 2;
const MOST_COMMENTED = 'Most commented';
const TOP_RATED = 'Top rated';

export default class MoviePresenter {
  #filmsBoardContainer = null;

  #filmsBoardComponent = new FilmsBoardView();
  #filmListComponent = new FilmListView();
  #filmContainerComponent = new FilmContainerView();
  #sortComponent = new SortView();
  #filmsListEmptyComponent = new FilmListEmptyView();
  // #filmsExtraComponent = new filmExtraView();
  #filmCardComponent = new FilmCardView();
  #userRankComponent = new UserRankView();
  #loadMoreButton = new ButtonShowMoreView();


  #films = [];

  constructor(filmsBoardContainer) {
    this.#filmsBoardContainer = filmsBoardContainer;
  }

  init = (films) => {
    this.#films = [...films];

    render(this.#filmsBoardContainer, this.#filmsBoardComponent, RenderPosition.BEFOREEND);

    this.#renderFilmsBoard();
  }

  #renderUserRank = () => {
    //Метод для рендеринга Ранга пользователя в хедере

  }

  #renderSort = () => {
    // Метод для рендеринга сортировки
  }

  #renderFilm = (film) => {
    // Метод, куда уйдёт логика созданию и рендерингу компонетов задачи,
    // текущая функция renderTask в main.js
    const filmCardComponent = new FilmCardView(film);
    const filmCardInformationComponent = new FilmPopupInfoView(film);
    const bodyElement = document.querySelector('body');

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

    render(this.#filmContainerComponent, filmCardComponent, RenderPosition.BEFOREEND);
  }

  #renderFilmsList = () =>  {
    render(this.#filmsBoardComponent, this.#filmListComponent, RenderPosition.BEFOREEND);
  }

  #renderFilmContainer = () => {
    render(this.#filmListComponent, this.#filmContainerComponent, RenderPosition.BEFOREEND);
  }

  #renderFilms = (from, to) => {
    // Метод для рендеринга N-задач за раз
    this.#films
      .slice(from, to)
      .forEach((film) => this.#renderFilm(film));
  }

  #renderFilmExtra = () => {
    const topRatedElement = new FilmExtraView(TOP_RATED);
    const mostCommentedElement = new FilmExtraView(MOST_COMMENTED);

    render(this.#filmsBoardComponent, topRatedElement, RenderPosition.BEFOREEND);
    render(this.#filmsBoardComponent, mostCommentedElement, RenderPosition.BEFOREEND);

    const filmTopRatedContainer = topRatedElement.element.querySelector('.films-list--extra .films-list__container');
    const filmMostCommentedContainer = mostCommentedElement.element.querySelector('.films-list--extra .films-list__container');
    const topRatedResult = this.#films.slice().sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating);
    const mostCommentedResult = this.#films.slice().sort((a, b) => b.comments.length - a.comments.length);
    console.log(topRatedResult[0]);
    for (let i = 0; i < FILM_EXTRA_COUNT; i++) {
      render(filmTopRatedContainer, topRatedResult[i], RenderPosition.BEFOREEND);
      render(filmMostCommentedContainer, mostCommentedResult[i], RenderPosition.BEFOREEND);
    }

  };

  #renderNoFilms = () => {
    // Метод для рендеринга заглушки
    render(this.#filmsBoardComponent, this.#filmsListEmptyComponent, RenderPosition.BEFOREEND);
  }

  #renderFilmsListMore = () => {
    this.#renderFilms(0, Math.min(this.#films.length, FILM_COUNT_PER_STEP));

    if (this.#films.length > FILM_COUNT_PER_STEP) {
      this.#renderLoadMoreButton();
    }
  }

  #renderLoadMoreButton = () => {
    // Метод, куда уйдёт логика по отрисовке кнопки допоказа задач,
    // сейчас в main.js является частью renderBoard
    let renderedFilmCount = FILM_COUNT_PER_STEP;

    const loadMoreButton = new ButtonShowMoreView();

    render(this.#filmListComponent, loadMoreButton, RenderPosition.BEFOREEND);

    loadMoreButton.setClickHandler(() => {
      this.#films
        .slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP)
        .forEach((film) => this.#renderFilm(film));
      renderedFilmCount += FILM_COUNT_PER_STEP;

      if (renderedFilmCount >= this.#films.length) {
        remove(loadMoreButton);
      }
    });

  }

  #renderFilmsBoard = () => {
    // Метод для инициализации (начала работы) модуля,
    // бОльшая часть текущей функции renderBoard в main.js
    if (this.#films.length === 0) {
      this.#renderNoFilms();
      return;
    }
    this.#renderUserRank();
    this.#renderSort();
    this.#renderFilmsList();
    this.#renderFilmContainer();
    this.#renderFilmsListMore();
    this.#renderFilmExtra();

  }
}
