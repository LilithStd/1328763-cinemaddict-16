import dayjs from 'dayjs';
import {nanoid} from 'nanoid';
import {
  EMOJI
} from '../const.js';
import {
  getRandomInteger,
  getRandomArrayElement
} from '../utils/common.js';


const generateDescription = () => {
  const DESCRIPTION = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.',
    'Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
    'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
    'Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.',
  ];
  const generateDescriptions = () => getRandomArrayElement(DESCRIPTION);
  const randomDescription = new Array(getRandomInteger(1, DESCRIPTION.length)).fill(null).map(generateDescriptions);
  return randomDescription.reduce((total, current) => total + current, '');
};

const generateWritters = () => {
  const WRITTERS = [
    'Anne Wigton',
    'Heinz Herald',
    'Richard Weil',
  ];
  const generateWritter = () => getRandomArrayElement(WRITTERS);
  const randomWritters = new Array(getRandomInteger(1, WRITTERS.length)).fill(null).map(generateWritter);
  return Array.from(new Set(randomWritters)).join(', ');
};

const generateActors = () => {
  const ACTORS = [
    'Humphrey Bogart',
    'Fred Astaire',
    'James Cagney',
    'Greta Garbo',
    'Joan Crawford',
    'Laurence Olivier',
    'Lillian Gish',
    'Sophia Loren',
  ];

  const generateActor = () => getRandomArrayElement(ACTORS);
  const randomActors = new Array(getRandomInteger(2, ACTORS.length)).fill(null).map(generateActor);
  // const arrayActors = new Set(randomActors);
  return Array.from(new Set(randomActors)).join(', ');
};

const generateReleaseDate = () => {
  const releaseDate = new Date(`${getRandomInteger(1, 31)}`, `${getRandomInteger(1, 12)}`, `${getRandomInteger(1921, 1983)}`);
  return dayjs(releaseDate).format('D MMMM YYYY');
};

const generateDirector = () => {
  const DIRECTORS = [
    'Robert Wise',
    'Richard Fleischer',
    'Allan Dwan',
    'George Cukor',
    'Anthony Mann',
  ];
  const randomPoster = getRandomInteger(0, DIRECTORS.length - 1);

  return DIRECTORS[randomPoster];
};

const generatePoster = () => {
  const POSTERS = [
    'made-for-each-other.png',
    'popeye-meets-sinbad.png',
    'sagebrush-trail.jpg',
    'santa-claus-conquers-the-martians.jpg',
    'the-dance-of-life.jpg',
    'the-great-flamarion.jpg',
    'the-man-with-the-golden-arm.jpg',
  ];
  const randomPoster = getRandomInteger(0, POSTERS.length - 1);

  return POSTERS[randomPoster];
};

const generateTitle = () => {
  const TITLES = [
    'Made for each other',
    'Popeye meets sinbad',
    'Sagebrush trail',
    'Santa claus conquers the martians',
    'The dance of life',
    'The great flamarion',
    'The man with the golden arm',
  ];
  const randomTitle = getRandomInteger(0, TITLES.length - 1);

  return TITLES[randomTitle];
};


const generateCountry = () => {
  const COUNTRY = [
    'USA',
    'Russia',
    'France',
    'Italy',
    'China',
    'Portugal',
    'Spain',
  ];
  const randomCountry = getRandomInteger(0, COUNTRY.length - 1);
  return COUNTRY[randomCountry];
};

const generateAgeRating = () => {
  const AGE_RATING = [
    '0+',
    '6+',
    '12+',
    '16+',
    '18+',
  ];
  const randomAgeRating = getRandomInteger(0, AGE_RATING.length - 1);
  return AGE_RATING[randomAgeRating];
};

const generateComments = () => {

  const commentDate = () => {
    const maxDaysGap = 7;
    const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);
    const commentDay = dayjs().add(daysGap, 'day').toDate();

    return dayjs(commentDay).format('YYYY/MM/DD HH:mm');
  };
  const COMMENTS = [
    'Booooooooooring',
    'Very very old. Meh',
    'Interesting setting and a good cast',
    'Almost two hours? Seriously?',
  ];
  const NAMES_AUTHORS = [
    'Brad Ellington',
    'Douglas Evans',
    'Tim Macoveev',
    'John Doe',
  ];
  const commentsUsers = () => ({
    //генерация id коммента
    idComment: nanoid(),
    textComment: COMMENTS[getRandomInteger(0, COMMENTS.length - 1)],
    emojiComment: EMOJI[getRandomInteger(0, EMOJI.length - 1)],
    authorComment: NAMES_AUTHORS[getRandomInteger(0, NAMES_AUTHORS.length - 1)],
    dateComment: commentDate(),
  });

  const randomComments = new Array(getRandomInteger(0, 5)).fill(null).map(commentsUsers);
  return randomComments;
};


const generateGenre = () => {
  const GENRES = [
    'Musical',
    'Western',
    'Drama',
    'Cartoon',
    'Comedy',
    'Detective',
    'Mystery',
  ];
  const randomIndex = () => GENRES[getRandomInteger(0, GENRES.length - 1)];
  const randomGenres = new Array(getRandomInteger(1, 3)).fill(null).map(randomIndex);
  return Array.from(new Set(randomGenres));
};

export const generateFilmCardMock = () => ({
  poster: generatePoster(),
  title: generateTitle(),
  director: generateDirector(),
  writters: generateWritters(),
  rating: `${(getRandomInteger(0, 9))}.${(getRandomInteger(0, 9))}`,
  country: generateCountry(),
  actor: generateActors(),
  releaseDate: generateReleaseDate(),
  ageRating: generateAgeRating(),
  year: `${getRandomInteger(1900, 1980)}`,
  runtime: `${getRandomInteger(0,3)}h ${getRandomInteger(0,60)}m`,
  genre: generateGenre(),
  description: generateDescription(),
  comments: generateComments(),
  isAddWatchlist: Boolean(getRandomInteger(0, 1)),
  isAlreadyWatched: Boolean(getRandomInteger(0, 1)),
  isAddFavorites: Boolean(getRandomInteger(0, 1)),
});
