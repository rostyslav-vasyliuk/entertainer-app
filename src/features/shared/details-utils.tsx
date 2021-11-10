import { Linking } from 'react-native';
import { movieGenres } from '../movies/constants';
import { seriesGenres } from '../series/constants';

export const getMoneyUserFriendly = (current) => {
  let counter = 0;
  if (current / 1000 > 1) counter++;
  if (current / 1000000 > 1) counter++;
  if (current / 1000000000 > 1) counter++;

  if (counter === 0) return current;
  if (counter === 1) return `$ ${(current / 1000).toFixed(2)}k`;
  if (counter === 2) return `$ ${(current / 1000000).toFixed(2)}m`;
  if (counter === 3) return `$ ${(current / 1000000000).toFixed(2)}b`;
};

export const percent2color = (perc) => {
  let r, g, b = 0;
  if (perc < 50) {
    r = 255;
    g = Math.round(5.1 * perc);
  }
  else {
    g = 255;
    r = Math.round(510 - 5.10 * perc);
  }
  var h = r * 0x10000 + g * 0x100 + b * 0x1;
  return '#' + ('000000' + h.toString(16)).slice(-6);
};

// all the available types for video
const VIDEO_TYPES = {
  TRAILER: "Trailer",
  TEASER: "Teaser",
  BEHIND_THE_SCENES: "Behind the Scenes",
  CLIP: "Clip",
};

export const getVideoForDetailsScreen = (details) => {
  if (!details?.videos?.results?.length) {
    return null;
  }

  const { results } = details.videos;

  if (results.find(result => result.type === VIDEO_TYPES.TRAILER)) {
    return results.find(result => result.type === VIDEO_TYPES.TRAILER);
  }

  if (results.find(result => result.type === VIDEO_TYPES.TEASER)) {
    return results.find(result => result.type === VIDEO_TYPES.TEASER);
  }

  if (results.find(result => result.type === VIDEO_TYPES.BEHIND_THE_SCENES)) {
    return results.find(result => result.type === VIDEO_TYPES.BEHIND_THE_SCENES);
  }

  if (results.find(result => result.type === VIDEO_TYPES.CLIP)) {
    return results.find(result => result.type === VIDEO_TYPES.CLIP);
  }

  return null;

};

export const onTrailerNavigate = (details) => {
  const videoToDisplay = getVideoForDetailsScreen(details);
  if (videoToDisplay) {
    Linking.openURL(`https://youtube.com/watch?v=${videoToDisplay.key}`);
  }
};

export const getVideoBackground = (details) => {
  const videoToDisplay = getVideoForDetailsScreen(details);
  if (videoToDisplay) {
    return `https://i3.ytimg.com/vi/${videoToDisplay.key}/maxresdefault.jpg`;
  }
};

// method for getting of one genre of the movie
export const getMovieGenre = (genre_ids) => {
  if (movieGenres.find((item) => Number(item.movieDB_id) === genre_ids?.[0])?.genre) {
    return movieGenres.find((item) => Number(item.movieDB_id) === genre_ids?.[0]).genre;
  }

  return 'Unknown';
};

// method for getting of one genre of the movie
export const getTVGenre = (genre_ids) => {
  if (seriesGenres.find((item) => Number(item.movieDB_id) === genre_ids?.[0])?.genre) {
    return seriesGenres.find((item) => Number(item.movieDB_id) === genre_ids?.[0]).genre;
  }

  return 'Unknown';
};

// method for getting up to three genres for the elements (displayed only on details page)
export const getThreeGenres = (genres) => {
  let finalString = '';
  genres.map((elem, index) => { if (index < 3) finalString += `${elem.name}, ` });
  finalString = finalString.slice(0, finalString.length - 2);
  return finalString;
};

// method for slicing of year from date
export const getYear = (date) => {
  if (!date) {
    return '';
  }
  return date.slice(0, 4);
};