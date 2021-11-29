const filmToFilterMap = {
  Watchlist: (films) => films
    .filter((film) => film.isAddWatchlist).length,
  History: (films) => films
    .filter((film) => film.isAlreadyWatched).length,
  Favorites: (films) => films
    .filter((film) => film.isAddFavorites).length,
};
export const generateFilters = (films) => Object.entries(filmToFilterMap).map(
  ([filterName, countFilms]) => ({
    name: filterName,
    count: countFilms(films),
  }),
);
