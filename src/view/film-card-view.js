import {
  addFilmStatusControls
} from '../utils/film-status-control.js';
import dayjs from 'dayjs';
import AbstractView from './abstract-view.js';
import {formatDurationFilm} from '../utils/date.js';

const createFilmCardtemplate = (film) => {
  const {
    comments,
    filmInfo,
    userDetails
  } = film;
  const {
    title,
    alternativeTitle,
    totalRating,
    poster,
    description,
    release,
    runtime,
    genre,
  } = filmInfo;
  const {
    date,
  } = release;
  const {
    watchlist,
    alreadyWatched,
    favorite
  } = userDetails;

  const getDescription = () => {
    if (description.length > 139) {
      return `${description.slice(0, 139)}...`;

    }
    return `${description}`;
  };

  const year = dayjs(date).format('YYYY');

  const classControls = 'film-card__controls-item--active';
  return `<article class="film-card">
  <a class="film-card__link">
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${totalRating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${year}</span>
      <span class="film-card__duration">${formatDurationFilm(runtime)}</span>
      <span class="film-card__genre">${genre[0]}</span>
    </p>
    <img src="${poster}" alt="${alternativeTitle}" class="film-card__poster">
    <p class="film-card__description">${getDescription()}</p>
    <span class="film-card__comments">${comments.length} comments</span>
  </a>
  <div class="film-card__controls">
    <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${addFilmStatusControls(watchlist,classControls)}" type="button">Add to watchlist</button>
    <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${addFilmStatusControls(alreadyWatched,classControls)}" type="button">Mark as watched</button>
    <button class="film-card__controls-item film-card__controls-item--favorite ${addFilmStatusControls(favorite,classControls)}" type="button">Mark as favorite</button>
  </div>
  </article>`;
};
export default class FilmCardView extends AbstractView{
  #film = null;

  constructor(film) {
    super();
    this.#film = film;
  }

  get template() {
    return createFilmCardtemplate(this.#film);
  }

  setFilmClickHandler = (callback) => {
    this._callback.filmClick = callback;
    this.element.querySelector('.film-card__link').addEventListener('click', this.#filmClickHandler);
  }

  setFilmControlWatchlistClickHandler = (callback) => {
    this._callback.watchlistClick = callback;
    this.element.querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this.#watchListClickHandler);
  }

  setFilmControlAlreadyWatchedClickHandler = (callback) => {
    this._callback.alreadyWatchedClick = callback;
    this.element.querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this.#alreadyWatchedClickHandler);
  }

  setFilmControlFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.film-card__controls-item--favorite').addEventListener('click', this.#favoriteClickHandler);
  }


  #filmClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.filmClick();
  }

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  #alreadyWatchedClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.alreadyWatchedClick();
  }

  #watchListClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchlistClick();
  }
}

