// import FilmExtraMostCommentedView from '../view/film-extra-most-commented.js';
// import FilmExtraTopRatedView from '../view/film-extra-top-rated.js';
import FilmCardView from '../view/film-card-view.js';
import FilmPopupInfoView from '../view/film-popup-info-view.js';
import {render, RenderPosition, replace, remove} from '../utils/render.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  POPUPOPEN: 'POPUPOPEN',
};

const bodyElement = document.querySelector('body');


export default class FilmPresenter {
  #filmCardContainerComponent = null;
  #changeData = null;
  #changeMode = null;
  #filmCardComponent = null;
  #filmPopupComponent = null;

  #film = null;
  #mode = Mode.DEFAULT

  constructor(filmCardContainer, changeData, changeMode) {
    this.#filmCardContainerComponent = filmCardContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (container, film) => {
    this.#film = film;

    const prevFilmComponent = this.#filmCardComponent;
    const prevFilmPopupComponent = this.#filmPopupComponent;

    this.#filmCardContainerComponent = container;
    this.#filmCardComponent = new FilmCardView(this.#film);
    this.#filmPopupComponent = new FilmPopupInfoView(this.#film);

    // this.#filmCardComponent.setFilmClickHandler(() => {
    //   this.#openFilmPopUp();
    // });

    this.#filmCardComponent.setFilmClickHandler(this.#openFilmPopUp);

    this.#filmCardComponent.setFilmControlAlreadyWatchedClickHandler(this.#handleAlreadyWatchedClick);
    this.#filmCardComponent.setFilmControlWatchlistClickHandler(this.#handleWatchlistClick);
    this.#filmCardComponent.setFilmControlFavoriteClickHandler(this.#handleFavoriteClick);
    // this.#filmPopupComponent.setFilmPopupCloseClickHandler(this.#closeFilmPopUp);
    // this.#filmPopupComponent.setFilmPopupControlAlreadyWatchedClickHandler(this.#handleAlreadyWatchedClick);
    // this.#filmPopupComponent.setFilmPopupControlWatchlistClickHandler(this.#handleWatchlistClick);
    // this.#filmPopupComponent.setFilmPopupControlFavoriteClickHandler(this.#handleFavoriteClick);

    if (prevFilmComponent === null || prevFilmPopupComponent === null) {
      render(this.#filmCardContainerComponent, this.#filmCardComponent, RenderPosition.BEFOREEND);
      return;
    }
    if (this.#mode === Mode.DEFAULT) {
      replace(this.#filmCardComponent, prevFilmComponent);
    }
    if (this.#mode === Mode.POPUPOPEN) {
      replace(this.#filmPopupComponent, prevFilmPopupComponent);
    }


  }


  #handleFavoriteClick = () => {
    this.#changeData(this.#filmCardContainerComponent, {...this.#film, userDetails: {...this.#film.userDetails, favorite: !this.#film.userDetails.favorite}});
  }

  #handleAlreadyWatchedClick = () => {
    this.#changeData(this.#filmCardContainerComponent, {...this.#film, userDetails: {...this.#film.userDetails, alreadyWatched: !this.#film.userDetails.alreadyWatched}});
  }

  #handleWatchlistClick = () => {
    // console.log({...this.#film, userDetails: {...this.#film.userDetails, alreadyWatched: !this.#film.userDetails.alreadyWatched}});
    this.#changeData(this.#filmCardContainerComponent, {...this.#film, userDetails: {...this.#film.userDetails, watchlist: !this.#film.userDetails.watchlist}});
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
    remove(this.#filmPopupComponent);
    this.#mode = Mode.DEFAULT;
  }

  #openFilmPopUp = () => {
    // if (this.#mode !== Mode.DEFAULT) {
    //   this.#closeFilmPopUp();
    // }
    this.#changeMode();
    this.#mode = Mode.POPUPOPEN;
    // this.#filmPopupComponent = new FilmPopupInfoView(this.#film);

    bodyElement.classList.add('hide-overflow');
    render(bodyElement, this.#filmPopupComponent, RenderPosition.BEFOREEND);
    document.addEventListener('keydown', this.#onEscKeyDown);

    this.#filmPopupComponent.setFilmPopupCloseClickHandler(this.#closeFilmPopUp);
    // this.#filmPopupComponent.setFilmPopupControlAlreadyWatchedClickHandler(this.#handleAlreadyWatchedClick);
    // this.#filmPopupComponent.setFilmPopupControlWatchlistClickHandler(this.#handleWatchlistClick);
    // this.#filmPopupComponent.setFilmPopupControlFavoriteClickHandler(this.#handleFavoriteClick);
  }

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#closeFilmPopUp();
    }
  }
  // #renderFilmExtra = () => {
  //   const topRatedContainer = this.#filmExtraTopRatedComponent.element.querySelector('.films-list__container');
  //   const mostCommentedContainer = this.#filmExtraMostCommentedComponent.element.querySelector('.films-list__container');

  //   const topRatedResult = this.#films.slice().sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating);
  //   const mostCommentedResult = this.#films.slice().sort((a, b) => b.comments.length - a.comments.length);
  //   for (let i = 0; i < this.#filmExtraCount; i++) {
  //     this.#renderFilm(topRatedContainer, topRatedResult[i]);
  //     this.#renderFilm(mostCommentedContainer, mostCommentedResult[i]);
  //   }

  // };

  destroy = () => {
    remove(this.#filmCardComponent);
    remove(this.#filmPopupComponent);
  }

}
