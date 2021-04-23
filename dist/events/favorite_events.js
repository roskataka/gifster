import { addFavorite, removeFavorite, getAllFavorites} from '../data/favorites.js';
import { q } from '../utilities/constants.js';
import {renderFavoriteStatus} from '../utilities/navigation_help.js'

export const toggleFavoriteStatus = (gifId) => {
  const favorites = getAllFavorites();

  if (favorites.includes(gifId)) {
    removeFavorite(gifId);
  } else {
    addFavorite(gifId);
  }

  q(`span[gif-id="${gifId}"]`).innerHTML = renderFavoriteStatus(gifId);
};  