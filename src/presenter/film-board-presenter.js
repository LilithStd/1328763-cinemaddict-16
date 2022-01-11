import SortView from '../view/sort-view.js';
import FilmsBoardView from '../view/films-board-view.js';
import FilmListView from '../view/film-list-view.js';
import FilmContainerView from '../view/film-container-view.js';
import FilmListEmptyView from '../view/film-list-empty-view.js';
import UserRankView from '../view/user-rank-view.js';
import FilmExtraMostCommentedView from '../view/film-extra-most-commented.js';
import FilmExtraTopRatedView from '../view/film-extra-top-rated.js';
import ButtonShowMoreView from '../view/button-show-more-view.js';
import FilmPresenter from '../presenter/film-presenter.js';
import {
  render,
  RenderPosition,
  remove,
} from '../utils/render.js';
import {
  updateItem
} from '../utils/common.js';

const FILM_COUNT_PER_STEP = 5;
const FILM_EXTRA_COUNT = 2;

export default class FilmBoardPresenter {
  #filmsBoardContainer = null;

  #filmsBoardComponent = new FilmsBoardView();
  #filmListComponent = new FilmListView();
  #filmContainerComponent = new FilmContainerView();
  #sortComponent = new SortView();
  #filmsListEmptyComponent = new FilmListEmptyView();
  #filmExtraMostCommentedComponent = new FilmExtraMostCommentedView();
  #filmExtraTopRatedComponent = new FilmExtraTopRatedView();
  #userRankComponent = new UserRankView();
  #loadMoreButtonComponent = new ButtonShowMoreView();


  #films = [];
  #renderedFilmCount = FILM_COUNT_PER_STEP;
  #filmExtraCount = FILM_EXTRA_COUNT;
  #filmPresenter = new Map;
  #filmTopRatedPresenter = new Map;
  #filmMostCommentedPresenter = new Map;

  constructor(filmsBoardContainer) {
    this.#filmsBoardContainer = filmsBoardContainer;
  }

  init = (film) => {
    this.#films = [...film];

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
    render(this.#filmsBoardComponent,this.#sortComponent, RenderPosition.BEFOREBEGIN);
  }

  #handleModeChange = () => {
    this.#filmPresenter.forEach((presenter) => presenter.resetView());
    this.#filmTopRatedPresenter.forEach((presenter) => presenter.resetView());
    this.#filmMostCommentedPresenter.forEach((presenter) => presenter.resetView());
  }

  #handleFilmChange = (container, updatedFilm) => {
    this.#films = updateItem(this.#films, updatedFilm);

    if(this.#filmTopRatedPresenter.has(updatedFilm.id) && this.#filmPresenter.has(updatedFilm.id)) {
      this.#filmTopRatedPresenter.get(updatedFilm.id).init(container, updatedFilm);
      this.#filmPresenter.get(updatedFilm.id).init(container, updatedFilm);
    }
    if(this.#filmTopRatedPresenter.has(updatedFilm.id) && !this.#filmPresenter.has(updatedFilm.id)) {
      this.#filmTopRatedPresenter.get(updatedFilm.id).init(container, updatedFilm);
    }

    if(this.#filmMostCommentedPresenter.has(updatedFilm.id) && this.#filmPresenter.has(updatedFilm.id)) {
      this.#filmMostCommentedPresenter.get(updatedFilm.id).init(container, updatedFilm);
      this.#filmPresenter.get(updatedFilm.id).init(container, updatedFilm);
    }
    if(this.#filmMostCommentedPresenter.has(updatedFilm.id) && !this.#filmPresenter.has(updatedFilm.id)) {
      this.#filmMostCommentedPresenter.get(updatedFilm.id).init(container, updatedFilm);
    }

    if(this.#filmPresenter.has(updatedFilm.id)) {
      this.#filmPresenter.get(updatedFilm.id).init(container, updatedFilm);
    }
  }


  #renderFilm = (presenter, container, film) => {
    const filmPresenter = new FilmPresenter(container, this.#handleFilmChange, this.#handleModeChange);
    filmPresenter.init(container, film);
    presenter.set(film.id, filmPresenter);
  }

  #clearFilmsList = () => {
    this.#filmPresenter.forEach((film) => film.destroy());
    this.#renderedFilmCount.clear();
    this.#renderedFilmCount = FILM_COUNT_PER_STEP;
    remove(this.#loadMoreButtonComponent);
  }

  #renderFilmsList = () =>  {
    render(this.#filmsBoardComponent, this.#filmListComponent, RenderPosition.BEFOREEND);
  }

  #renderFilmContainer = () => {
    render(this.#filmListComponent, this.#filmContainerComponent, RenderPosition.BEFOREEND);
  }

  #renderFilms = (from, to, presenter, container, films) => {
    films
      .slice(from, to)
      .forEach((film) => {
        this.#renderFilm(presenter, container, film);
      });
  }

  #renderFilmListExtra = () => {
    render(this.#filmsBoardComponent, this.#filmExtraTopRatedComponent, RenderPosition.BEFOREEND);
    render(this.#filmsBoardComponent, this.#filmExtraMostCommentedComponent, RenderPosition.BEFOREEND);
    this.#renderFilmExtraCard();
  }

  #renderFilmExtraCard = () => {
    const topRatedContainer = this.#filmExtraTopRatedComponent.element.querySelector('.films-list__container');
    const mostCommentedContainer = this.#filmExtraMostCommentedComponent.element.querySelector('.films-list__container');

    const topRatedResult = this.#films.slice().sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating);
    const mostCommentedResult = this.#films.slice().sort((a, b) => b.comments.length - a.comments.length);
    this.#renderFilms(0, this.#filmExtraCount,this.#filmTopRatedPresenter, topRatedContainer, topRatedResult);
    this.#renderFilms(0, this.#filmExtraCount,this.#filmMostCommentedPresenter, mostCommentedContainer, mostCommentedResult);
  };

  #renderNoFilms = () => {
    render(this.#filmsBoardComponent, this.#filmsListEmptyComponent, RenderPosition.BEFOREEND);
  }

  #renderFilmsListMore = () => {
    this.#renderFilms(0, Math.min(this.#films.length, FILM_COUNT_PER_STEP), this.#filmPresenter, this.#filmContainerComponent, this.#films);

    if (this.#films.length > FILM_COUNT_PER_STEP) {
      this.#renderLoadMoreButton();
    }
  }

  #handleLoadMoreButtonClick = () => {
    this.#renderFilms(this.#renderedFilmCount, this.#renderedFilmCount + FILM_COUNT_PER_STEP,this.#filmPresenter, this.#filmContainerComponent, this.#films);
    this.#renderedFilmCount += FILM_COUNT_PER_STEP;
    if (this.#renderedFilmCount >= this.#films.length) {
      remove(this.#loadMoreButtonComponent);
    }
  }

  #renderLoadMoreButton = () => {
    render(this.#filmListComponent,this.#loadMoreButtonComponent, RenderPosition.BEFOREEND);
    this.#loadMoreButtonComponent.setClickHandler(this.#handleLoadMoreButtonClick);
  }

  #renderFilmsBoard = () => {
    if (this.#films.length === 0) {
      this.#renderNoFilms();
      return;
    }
    this.#renderUserRank();
    this.#renderFilmsList();
    this.#renderSort();
    this.#renderFilmContainer();
    this.#renderFilmsListMore();
    this.#renderFilmListExtra();

  }
}
