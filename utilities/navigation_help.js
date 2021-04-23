import { q, qs } from "../utilities/constants.js";
import { getAllFavorites } from "../data/favorites.js";
import { EMPTY_HEART, FULL_HEART } from "../utilities/constants.js";

export const setActiveNav = (page) => {
  const navs = qs("a.nav-link");

  Array.from(navs).forEach((element) => {
    if (element.getAttribute("data-page") === page) {
      //q('.currentPage').id = `${page}_currentPage`
      element.classList.add("active");
    } else {
      element.classList.remove("active");
    }
  });
};

export const renderFavoriteStatus = (gifId) => {
  const favorites = getAllFavorites();

  return favorites.includes(gifId)
    ? `<span class="favorite active" gif-id="${gifId}">${FULL_HEART}</span>`
    : `<span class="favorite" gif-id="${gifId}">${EMPTY_HEART}</span>`;
};


