const filmToFilterMap = {
  Watchlist: (films) => films
    .filter((film) => film.userDetails.watchlist).length,
  History: (films) => films
    .filter((film) => film.userDetails.alreadyWatched).length,
  Favorites: (films) => films
    .filter((film) => film.userDetails.favorite).length,
};
export const generateFilters = (films) => Object.entries(filmToFilterMap).map(
  ([filterName, countFilms]) => ({
    name: filterName,
    count: countFilms(films),
  }),
);
