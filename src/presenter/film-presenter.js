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

    this.#filmCardContainerComponent = container;
    this.#filmCardComponent = new FilmCardView(this.#film);
    // this.#filmPopupComponent = new FilmPopupInfoView(this.#film);


    this.#filmCardComponent.setFilmClickHandler(this.#openFilmPopUp);

    this.#filmCardComponent.setFilmControlAlreadyWatchedClickHandler(this.#handleAlreadyWatchedClick);
    this.#filmCardComponent.setFilmControlWatchlistClickHandler(this.#handleWatchlistClick);
    this.#filmCardComponent.setFilmControlFavoriteClickHandler(this.#handleFavoriteClick);

    if (prevFilmComponent === null) {
      render(this.#filmCardContainerComponent, this.#filmCardComponent, RenderPosition.BEFOREEND);
      return;
    }
    if (this.#mode === Mode.DEFAULT) {
      replace(this.#filmCardComponent, prevFilmComponent);
    }
    if (this.#mode === Mode.POPUPOPEN) {
      // replace(this.#filmPopupComponent, prevFilmPopupComponent);
      replace(this.#filmCardComponent, prevFilmComponent);
    }


  }


  #handleFavoriteClick = () => {
    this.#changeData(this.#filmCardContainerComponent, {...this.#film, userDetails: {...this.#film.userDetails, favorite: !this.#film.userDetails.favorite}});
  }

  #handleAlreadyWatchedClick = () => {
    this.#changeData(this.#filmCardContainerComponent, {...this.#film, userDetails: {...this.#film.userDetails, alreadyWatched: !this.#film.userDetails.alreadyWatched}});
  }

  #handleWatchlistClick = () => {
    this.#changeData(this.#filmCardContainerComponent, {...this.#film, userDetails: {...this.#film.userDetails, watchlist: !this.#film.userDetails.watchlist}});
  }


  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      // this.#filmPopupComponent.reset(this.#film);
      this.#closeFilmPopUp();
    }
  }

  // #ctrlEnterKeyDownHandler = (evt) => {
  //   if (evt.keyCode === 17 && evt.keyCode === 13) {
  //     evt.preventDefault();
  //     console.log(123);
  //   }
  // };

  #closeFilmPopUp = () => {
    bodyElement.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this.#onEscKeyDown);
    // this.#filmPopupComponent.reset(this.#film);
    this.#filmPopupComponent.element.remove();
    this.#mode = Mode.DEFAULT;
    this.#filmPopupComponent = null;
  }

  #openFilmPopUp = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#closeFilmPopUp();
    }
    this.#changeMode();
    this.#mode = Mode.POPUPOPEN;

    bodyElement.classList.add('hide-overflow');
    this.#filmPopupComponent = new FilmPopupInfoView(this.#film);
    this.#filmPopupComponent.setFilmPopupCloseClickHandler(this.#closeFilmPopUp);
    this.#filmPopupComponent.setFilmPopupControlAlreadyWatchedClickHandler(this.#handleAlreadyWatchedClick);
    this.#filmPopupComponent.setFilmPopupControlWatchlistClickHandler(this.#handleWatchlistClick);
    this.#filmPopupComponent.setFilmPopupControlFavoriteClickHandler(this.#handleFavoriteClick);
    render(bodyElement, this.#filmPopupComponent, RenderPosition.BEFOREEND);
    document.addEventListener('keydown', this.#onEscKeyDown);

  }

  #handleFormSubmit = () => {
    this.#changeData(this.#filmCardContainerComponent, this.#film);
  }

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#closeFilmPopUp();
    }
  }

  destroy = () => {
    remove(this.#filmCardComponent);
    remove(this.#filmPopupComponent);
  }

}
