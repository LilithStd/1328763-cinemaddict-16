import SortView from '../view/sort-view.js';
import FilmsBoardView from '../view/films-board-view.js';
import FilmListView from '../view/film-list-view.js';
import FilmContainerView from '../view/film-container-view.js';
import FilmListEmptyView from '../view/film-list-empty-view.js';
import UserRankView from '../view/user-rank-view.js';
import FilmExtraMostCommentedView from '../view/film-extra-most-commented.js';
import FilmExtraTopRatedView from '../view/film-extra-top-rated.js';
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

export default class MoviePresenter {
  #filmsBoardContainer = null;

  #filmsBoardComponent = new FilmsBoardView();
  #filmListComponent = new FilmListView();
  #filmContainerComponent = new FilmContainerView();
  #sortComponent = new SortView();
  #filmsListEmptyComponent = new FilmListEmptyView();
  #filmExtraMostCommentedComponent = new FilmExtraMostCommentedView();
  #filmExtraTopRatedComponent = new FilmExtraTopRatedView();
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
    const headerElement = document.querySelector('.header');
    render(headerElement, this.#userRankComponent, RenderPosition.BEFOREEND);
  }

  #renderSort = () => {
    // Метод для рендеринга сортировки
  }

  #renderFilm = (container, film) => {
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

    render(container, filmCardComponent, RenderPosition.BEFOREEND);
  }

  #renderFilmsList = () =>  {
    render(this.#filmsBoardComponent, this.#filmListComponent, RenderPosition.BEFOREEND);
  }

  #renderFilmContainer = () => {
    render(this.#filmListComponent, this.#filmContainerComponent, RenderPosition.BEFOREEND);
  }

  #renderFilms = (from, to) => {
    this.#films
      .slice(from, to)
      .forEach((film) => this.#renderFilm(this.#filmContainerComponent, film));
  }

  #renderFilmListExtra = () => {
    render(this.#filmsBoardComponent, this.#filmExtraTopRatedComponent, RenderPosition.BEFOREEND);
    render(this.#filmsBoardComponent, this.#filmExtraMostCommentedComponent, RenderPosition.BEFOREEND);
  }

  #renderFilmExtra = () => {
    this.#renderFilmListExtra();
    const topRatedContainer = this.#filmExtraTopRatedComponent.element.querySelector('.films-list__container');
    const mostCommentedContainer = this.#filmExtraMostCommentedComponent.element.querySelector('.films-list__container');

    const topRatedResult = this.#films.slice().sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating);
    const mostCommentedResult = this.#films.slice().sort((a, b) => b.comments.length - a.comments.length);
    for (let i = 0; i < FILM_EXTRA_COUNT; i++) {
      this.#renderFilm(topRatedContainer, topRatedResult[i]);
      this.#renderFilm(mostCommentedContainer, mostCommentedResult[i]);
    }
  };

  #renderNoFilms = () => {
    render(this.#filmsBoardComponent, this.#filmsListEmptyComponent, RenderPosition.BEFOREEND);
  }

  #renderFilmsListMore = () => {
    this.#renderFilms(0, Math.min(this.#films.length, FILM_COUNT_PER_STEP));

    if (this.#films.length > FILM_COUNT_PER_STEP) {
      this.#renderLoadMoreButton();
    }
  }

  #renderLoadMoreButton = () => {
    let renderedFilmCount = FILM_COUNT_PER_STEP;

    const loadMoreButton = new ButtonShowMoreView();

    render(this.#filmListComponent, loadMoreButton, RenderPosition.BEFOREEND);

    loadMoreButton.setClickHandler(() => {
      this.#films
        .slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP)
        .forEach((film) => this.#renderFilm(this.#filmContainerComponent, film));
      renderedFilmCount += FILM_COUNT_PER_STEP;

      if (renderedFilmCount >= this.#films.length) {
        remove(loadMoreButton);
      }
    });

  }

  #renderFilmsBoard = () => {
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
