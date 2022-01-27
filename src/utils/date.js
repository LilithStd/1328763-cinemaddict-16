import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration.js';
import relativeTime from 'dayjs/plugin/relativeTime.js';
dayjs.extend(relativeTime);
dayjs.extend(duration);

export const formatDurationFilm = (runtimeFilm)  => {
  if (runtimeFilm < 60) {
    return `${dayjs.duration(runtimeFilm, 'm').format('m[m]')}`;
  }
  return `${dayjs.duration(runtimeFilm, 'm').format('H[h] mm[m]')}`;
};

export const formatCommentDate = (commentDate) => {
  dayjs(commentDate).fromNow();

};
