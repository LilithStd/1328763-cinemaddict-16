import dayjs from 'dayjs';

export const sortByRating = (films) => films.sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating);

export const sortByDate = (films) => films.sort((a, b) => dayjs(b.filmInfo.release.date).diff(dayjs(a.filmInfo.release.date)));

