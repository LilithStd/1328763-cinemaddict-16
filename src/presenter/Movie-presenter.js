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
  remove,
} from '../utils/render.js';
import {
  updateItem
} from '../utils/common.js';

const FILM_COUNT_PER_STEP = 5;
const FILM_EXTRA_COUNT = 2;
const bodyElement = document.querySelector('body');
export default class MoviePresenter {
  #filmsBoardContainer = null;
  #filmCardComponent = null;
  #filmCardPopUpComponent = null;
  #filmCardContainerComponent = null;


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
  #renderedFilms = new Map;

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
  }

  #renderFilm = (container, film) => {
    this.#filmCardContainerComponent = container;

    this.#filmCardComponent =  new FilmCardView(film);

    render(this.#filmCardContainerComponent, this.#filmCardComponent, RenderPosition.BEFOREEND);

    this.#filmCardComponent.setFilmClickHandler(() => {
      this.#openFilmPopUp(film);
    });
    // this.#filmCardComponent.setFilmControlClickHandler();
    // this.#filmCardComponent.setFilmControlWatchlictClickHandler();
    // this.#filmCardComponent.setFilmControlFavoriteClickHandler();
  }

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#closeFilmPopUp();
    }
  }

  #closeFilmPopUp = () => {
    bodyElement.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this.#onEscKeyDown);
    remove(this.#filmCardPopUpComponent);
  }

  #openFilmPopUp = (film) => {
    if (this.#filmCardPopUpComponent !== null) {
      this.#closeFilmPopUp();
    }

    this.#filmCardPopUpComponent = new FilmPopupInfoView(film);

    bodyElement.classList.add('hide-overflow');
    render(bodyElement, this.#filmCardPopUpComponent, RenderPosition.BEFOREEND);
    document.addEventListener('keydown', this.#onEscKeyDown);

    this.#filmCardPopUpComponent.setFilmPopupCloseClickHandler(this.#closeFilmPopUp);
  }

  #clearFilmsList = () => {
    this.#renderedFilms.forEach((film) => film.destroy());
    this.#renderedFilmCount.clear();
    this.#renderedFilmCount = FILM_COUNT_PER_STEP;
    remove(this.#loadMoreButtonComponent);
  }

  // #handleFilmChange = (updatedFilm, filmControlType) => {
  //   this.#films = updateItem(this.#films, updatedFilm);
  //   const filmCard = this.#renderedFilms.get(updatedFilm.id);

  //   if (filmCard) {
  //     filmCard.filmData = updatedFilm;
  //     filmCard.updateControl(filmControlType);
  //   }

  //   if (this.#filmCardPopUpComponent !== null && this.#filmCardPopUpComponent.filmData.id === updatedFilm.id) {
  //     this.#filmCardPopUpComponent.filmData = updatedFilm;
  //     this.#filmCardPopUpComponent.updateControl(filmControlType);
  //   }

  //   this.#updateFilmCardExtra();
  // }

  // #updateFilmCardExtra = () => {
  //   remove(this.#filmExtraTopRatedComponent);
  //   remove(this.#filmExtraMostCommentedComponent);

  //   this.#renderFilmListExtra();
  // }

  // #handleControlClick = (film, controlType) => {
  //   let updatedFilm = null;

  //   if (controlType === 'watchlist') {
  //     updatedFilm = {...film, userDetails: {...film.userDetails, watchlist: !film.userDetails.watchlist}
  //     };
  //   }

  //   if (controlType === 'watched') {
  //     updatedFilm = {
  //       ...film, userDetails: {...film.userDetails, alreadyWatched: !film.userDetails.alreadyWatched, watchingDate: new Date()
  //       }
  //     };
  //   }

  //   if (controlType === 'favorite') {
  //     updatedFilm = {...film, userDetails: {...film.userDetails, favorite: !film.userDetails.favorite}
  //     };
  //   }

  //   this.#handleFilmChange(updatedFilm, controlType);
  // }


  destroy = () => {
    remove(this.#filmCardComponent);
    remove(this.#filmCardPopUpComponent);
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
      .forEach((film) => {
        const filmCardsRendered = this.#renderFilm(this.#filmContainerComponent, film);
        this.#renderedFilms.set(film.id, filmCardsRendered);
      });
  }

  #renderFilmListExtra = () => {
    render(this.#filmsBoardComponent, this.#filmExtraTopRatedComponent, RenderPosition.BEFOREEND);
    render(this.#filmsBoardComponent, this.#filmExtraMostCommentedComponent, RenderPosition.BEFOREEND);
    this.#renderFilmExtra();
  }

  #renderFilmExtra = () => {
    const topRatedContainer = this.#filmExtraTopRatedComponent.element.querySelector('.films-list__container');
    const mostCommentedContainer = this.#filmExtraMostCommentedComponent.element.querySelector('.films-list__container');

    const topRatedResult = this.#films.slice().sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating);
    const mostCommentedResult = this.#films.slice().sort((a, b) => b.comments.length - a.comments.length);
    for (let i = 0; i < this.#filmExtraCount; i++) {
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

  #handleLoadMoreButtonClick = () => {
    this.#renderFilms(this.#renderedFilmCount, this.#renderedFilmCount + FILM_COUNT_PER_STEP);
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
    this.#renderSort();
    this.#renderFilmsList();
    this.#renderFilmContainer();
    this.#renderFilmsListMore();
    this.#renderFilmListExtra();

  }
}
