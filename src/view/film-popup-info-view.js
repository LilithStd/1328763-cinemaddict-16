import {
  addFilmStatusControls
} from '../utils/film-status-control.js';
import {
  createElement
} from '../utils/render.js';


const createFilmPopupInfoTemplate = (film) => {
  // const {
  //   title,
  //   poster,
  //   rating,
  //   ageRating,
  //   director,
  //   writters,
  //   actor,
  //   releaseDate,
  //   country,
  //   runtime,
  //   description,
  //   genre,
  //   comments,
  //   isAddWatchlist,
  //   isAlreadyWatched,
  //   isAddFavorites
  // } = film;
  const {
    comments,
    filmInfo,
    userDetails
  } = film;
  const {
    title,
    alternativeTitle,
    totalRating,
    director,
    actors,
    writers,
    ageRating,
    poster,
    description,
    release,
    runtime,
    genre,
  } = filmInfo;
  const {
    date,
    releaseCountry
  } = release;
  const {
    watchlist,
    alreadyWatched,
    favorite
  } = userDetails;
  // const {
  //   author,
  //   comment,
  //   emotion
  // } = comments;
  const checkCountGenre = () => {
    if (genre.length > 1) {
      return 'Genres';
    }
    return 'Genre';
  };
  const generateGenres = () => {
    let genresList = '';

    genre.forEach((element) => {
      const genresItem = `<span class="film-details__genre">${element}</span>`;
      genresList += ` ${genresItem}`;
    });

    return genresList;
  };
  const generateComments = () => {
    let commentsList = '';
    comments.forEach((element) => {
      const commentsItem = `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${element.emotion}.png" width="55" height="55" alt="emoji-${element.emotion}">
      </span>
      <div>
        <p class="film-details__comment-text">${element.comment}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${element.author}</span>
          <span class="film-details__comment-day">${element.date}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`;
      commentsList += ` ${commentsItem}`;
    });

    return commentsList;
  };
  const classControlPopup = 'film-details__control-button--active';

  return `<section class="film-details">
<form class="film-details__inner" action="" method="get">
  <div class="film-details__top-container">
    <div class="film-details__close">
      <button class="film-details__close-btn" type="button">close</button>
    </div>
    <div class="film-details__info-wrap">
      <div class="film-details__poster">
        <img class="film-details__poster-img" src="${poster}" alt="${alternativeTitle}">

        <p class="film-details__age">${ageRating}</p>
      </div>

      <div class="film-details__info">
        <div class="film-details__info-head">
          <div class="film-details__title-wrap">
            <h3 class="film-details__title">${title}</h3>
            <p class="film-details__title-original">Original: ${title}</p>
          </div>

          <div class="film-details__rating">
            <p class="film-details__total-rating">${totalRating}</p>
          </div>
        </div>

        <table class="film-details__table">
          <tr class="film-details__row">
            <td class="film-details__term">Director</td>
            <td class="film-details__cell">${director}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Writers</td>
            <td class="film-details__cell">${writers}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Actors</td>
            <td class="film-details__cell">${actors}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Release Date</td>
            <td class="film-details__cell">${date}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Runtime</td>
            <td class="film-details__cell">${runtime}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Country</td>
            <td class="film-details__cell">${releaseCountry}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">${checkCountGenre()}</td>
            <td class="film-details__cell">
              ${generateGenres()}
          </tr>
        </table>

        <p class="film-details__film-description">
          ${description}
        </p>
      </div>
    </div>

    <section class="film-details__controls">
      <button type="button" class="film-details__control-button ${addFilmStatusControls(watchlist,classControlPopup)} film-details__control-button--watchlist" id="watchlist" name="watchlist">Add to watchlist</button>
      <button type="button" class="film-details__control-button ${addFilmStatusControls(alreadyWatched,classControlPopup)} film-details__control-button--watched" id="watched" name="watched">Already watched</button>
      <button type="button" class="film-details__control-button ${addFilmStatusControls(favorite,classControlPopup)} film-details__control-button--favorite" id="favorite" name="favorite">Add to favorites</button>
    </section>
  </div>

  <div class="film-details__bottom-container">
    <section class="film-details__comments-wrap">
      <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

      <ul class="film-details__comments-list">
        ${generateComments()}
      </ul>

      <div class="film-details__new-comment">
        <div class="film-details__add-emoji-label">
          <img src="images/emoji/smile.png" width="55" height="55" alt="emoji-smile">
        </div>

        <label class="film-details__comment-label">
          <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
        </label>

        <div class="film-details__emoji-list">
          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile" checked>
          <label class="film-details__emoji-label" for="emoji-smile">
            <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
          </label>

          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
          <label class="film-details__emoji-label" for="emoji-sleeping">
            <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
          </label>

          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
          <label class="film-details__emoji-label" for="emoji-puke">
            <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
          </label>

          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
          <label class="film-details__emoji-label" for="emoji-angry">
            <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
          </label>
        </div>
      </div>
    </section>
  </div>
</form>
</section>
  `;
};
export default class FilmPopupInfoView {
  #element = null;
  #film = null;

  constructor(film) {
    this.#film = film;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createFilmPopupInfoTemplate(this.#film);
  }

  removeElement() {
    this.#element = null;
  }
}
