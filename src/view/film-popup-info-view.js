import {
  addFilmStatusControls
} from '../utils/film-status-control.js';
// import AbstractView from './abstract-view.js';
import SmartView from './smart-view.js';
import {EMOJI} from '../const.js';
// import dayjs from 'dayjs';
import {formatDurationFilm} from '../utils/date.js';


const createFilmPopupInfoTemplate = (film) => {
  const {
    comments,
    filmInfo,
    userDetails,
    commentEmotion,
    commentText
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
  // console.log(comments.emotion);

  // const runtimeDateFormat = (runtimeFilm)  => {
  //   if (runtimeFilm < 60) {
  //     return `${dayjs.duration(runtimeFilm, 'm').format('mm[m]')}`;
  //   }
  //   return `${dayjs.duration(runtimeFilm, 'm').format('H[h] mm[m]')}`;
  // };

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

  const createEmojisListTemplate = (currentEmoji) => (
    EMOJI.map((emoji) => `<input
        class="film-details__emoji-item visually-hidden"
        name="comment-emoji"
        type="radio"
        id="emoji-${emoji}"
        value="${emoji}"
        ${currentEmoji === emoji ? 'checked' : ''}
      />
      <label
        class="film-details__emoji-label"
        for="emoji-${emoji}"
      >
        <img src="./images/emoji/${emoji}.png" width="30" height="30" alt="emoji">
      </label
      >`).join('')

  );

  const createEmojiLabelTemplate = (currentEmoji) => `<img src="images/emoji/${currentEmoji}.png" width="55" height="55" alt="emoji-${currentEmoji}">`;
  const emojiLabelTemplate = createEmojiLabelTemplate(commentEmotion);

  const emojisListTemplate = createEmojisListTemplate();

  const emojiLabel = () => {
    if(commentEmotion)  {
      return emojiLabelTemplate;
    }
    return '';
  };

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
            <td class="film-details__cell">${formatDurationFilm(runtime)}</td>
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
          ${emojiLabel()}
        </div>

        <label class="film-details__comment-label">
          <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${commentText}</textarea>
        </label>

        <div class="film-details__emoji-list">
          ${emojisListTemplate}
        </div>
      </div>
    </section>
  </div>
</form>
</section>
  `;
};
export default class FilmPopupInfoView extends SmartView{
  #film = null;

  constructor(film) {
    super();
    this.#film = film;

    this._data = FilmPopupInfoView.parseFilmToData(this.#film);

    this.#setInnerHandlers();
  }

  get template() {
    return createFilmPopupInfoTemplate(this._data);
  }


  setFilmPopupCloseClickHandler = (callback) => {
    this._callback.filmPopupCloseClick = callback;
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#filmPopupCloseClickHandler);
  }

  setFilmPopupControlWatchlistClickHandler = (callback) => {
    this._callback.watchlistClick = callback;
    this.element.querySelector('#watchlist').addEventListener('click', this.#popupWatchListClickHandler);
  }

  setFilmPopupControlAlreadyWatchedClickHandler = (callback) => {
    this._callback.alreadyWatchedClick = callback;
    this.element.querySelector('#watched').addEventListener('click', this.#popupAlreadyWatchedClickHandler);
  }

  setFilmPopupControlFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('#favorite').addEventListener('click', this.#popupFavoriteClickHandler);
  }

  setFilmPopupFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  }

  #popupFavoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
    this.updateData({userDetails: {...this._data.userDetails, favorite: !this._data.userDetails.favorite}});
  }

  #popupAlreadyWatchedClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.alreadyWatchedClick();
    this.updateData({userDetails: {...this._data.userDetails, alreadyWatched: !this._data.userDetails.alreadyWatched}});
  }

  #popupWatchListClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchlistClick();
    this.updateData({userDetails: {...this._data.userDetails, watchlist: !this._data.userDetails.watchlist}});
  }

  #filmPopupCloseClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.filmPopupCloseClick();
  }

  #commentTextInputHandler = (evt) => {
    evt.preventDefault();
    this.updateData({
      commentText: evt.target.value,
    }, true);
  }

  #emojiChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateData({
      commentEmotion: evt.target.value,
    });
  }

  #setInnerHandlers = () => {
    this.element.querySelector('.film-details__comment-input')
      .addEventListener('input', this.#commentTextInputHandler);
    this.element.querySelector('.film-details__emoji-list')
      .addEventListener('change', this.#emojiChangeHandler);
    this.element.addEventListener('scroll', this.#scrollPositionHandler);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(FilmPopupInfoView.parseDataToFilm(this._data));
  }

  #scrollPositionHandler = () => {
    this.updateData({
      scrollPosition: this.element.scrollTop,
    }, true);
  }

  restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setFilmPopupCloseClickHandler(this._callback.filmPopupCloseClick);
    this.setFilmPopupFormSubmitHandler(this._callback.formSubmit);
    this.setFilmPopupControlWatchlistClickHandler(this._callback.watchlistClick);
    this.setFilmPopupControlAlreadyWatchedClickHandler(this._callback.alreadyWatchedClick);
    this.setFilmPopupControlFavoriteClickHandler(this._callback.favoriteClick);
  }

  reset = (film) => {
    this.updateData(
      FilmPopupInfoView.parseFilmToData(film),
    );
  }


  static parseFilmToData = (film) => ({...film,
    commentEmotion: film.commentEmotion !== undefined,
    commentText: '',
    scrollPosition: 0,
  });

  static parseDataToFilm = (data) => {
    const film = {...data};

    delete film.commentEmotion;
    delete film.scrollPosition;
    delete film.commentText;

    return film;
  }
}
