
import {
  addFilmStatusControls
} from '../utils/film-status-control.js';
export const createFilmCardtemplate = (film) => {
  const {
    title,
    poster,
    rating,
    year,
    runtime,
    description,
    genre,
    comments,
    isAddWatchlist,
    isAlreadyWatched,
    isAddFavorites
  } = film;
  const getDescription = () => {
    if (description.length > 139) {
      return `${description.slice(0, 139)}...`;

    }
    return `${description}`;
  };
  const classControls = 'film-card__controls-item--active';
  return `<article class="film-card">
<a class="film-card__link">
  <h3 class="film-card__title">${title}</h3>
  <p class="film-card__rating">${rating}</p>
  <p class="film-card__info">
    <span class="film-card__year">${year}</span>
    <span class="film-card__duration">${runtime}</span>
    <span class="film-card__genre">${genre[0]}</span>
  </p>
  <img src="./images/posters/${poster}" alt="" class="film-card__poster">
  <p class="film-card__description">${getDescription()}</p>
  <span class="film-card__comments">${comments.length} comments</span>
</a>
<div class="film-card__controls">
  <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${addFilmStatusControls(isAddWatchlist,classControls)}" type="button">Add to watchlist</button>
  <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${addFilmStatusControls(isAlreadyWatched,classControls)}" type="button">Mark as watched</button>
  <button class="film-card__controls-item film-card__controls-item--favorite ${addFilmStatusControls(isAddFavorites,classControls)}" type="button">Mark as favorite</button>
</div>
</article>`;

};
