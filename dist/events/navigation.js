import {
  DATA_KEY,
  HOME,
  FAVORITES,
  UPLOADS,
  TRENDING,
  CH_CONTAINER,
  SEARCH_BAR,
  q,
  qs,
} from "../utilities/constants.js";
import { toFavoritesView } from "../views/favorites_view.js";
import { homeView } from "../views/home_view.js";
import { setActiveNav } from "../utilities/navigation_help.js";
import { toUploadsView } from "../views/uploads_view.js";
import { toTrendingView } from "../views/trending_view.js";
import { toSingleDetailedView } from "../views/detailed_view.js";
import {
  trendingGifs,
  gifDetails,
  getGifsById,
  uploadGif,
  getRandomId,
  getRandomGif
} from "../services/request_service.js";
import { toSearchView } from "../views/search_view.js";
import { getFavorites } from "../data/favorites.js";
import { searchSamples, searchResults } from "../services/request_service.js";
import { addToUploaded, getUploads } from "../data/upload.js";

export const loadPage = (page = "",curPage) => {
  switch (page) {
    case HOME:
      setActiveNav(HOME);
      return renderHome();

    case TRENDING:
      setActiveNav(TRENDING);
      return renderTrending();

    case FAVORITES:
      setActiveNav(FAVORITES);
      return renderFavorites(curPage);

    case UPLOADS:
      setActiveNav(UPLOADS);
      return renderUploads();

    default:
      return null;
  }
};

export const renderHome = () => {
  q(CH_CONTAINER).innerHTML = homeView();
};

export const renderUploads = async (form) => {
  if (form) {
    const formData = new FormData(form);
    formData.append("api_key", DATA_KEY);

    uploadGifStep(formData);
  }

  const uploadsIds = getUploads();
  if(uploadsIds==[]){
    const uploadedGifsToDisplay = await getGifsById(uploadsIds);
    q(CH_CONTAINER).innerHTML = toUploadsView(uploadedGifsToDisplay);
  } else {
    q(CH_CONTAINER).innerHTML = toUploadsView([])
  }
};

export const uploadGifStep = async (formData) => {
  const id = await uploadGif(formData);
  addToUploaded(id);
  
  loadPage(UPLOADS);
};

export const renderTrending = async (page=1) => {
  const loadTrendingGifs = await trendingGifs((page-1)*18);

  document.addEventListener("click", (e) => {
    if(e.target.classList.contains("previous_page")){
      renderTrending(parseInt(q(".previous_page").id))
    };
    if(e.target.classList.contains("next_page")){
      renderTrending(parseInt(q(".next_page").id))
      
    }
    
 });

 q(CH_CONTAINER).innerHTML = toTrendingView(loadTrendingGifs, page);
 previous_page_invisible();

};

export const renderDetailedView = async (id = null) => {
  const loadRequestedGif = await gifDetails(id);
  const random_gif_ids_arr = await load_random_ids(6);
  const randomGifsArr = await getGifsById(random_gif_ids_arr);

  q(CH_CONTAINER).innerHTML = toSingleDetailedView(
    loadRequestedGif,
    randomGifsArr
  );
};

export const renderFavorites = async (page=1) => {
  const gifIds = getFavorites((page-1)*12);
  if(gifIds[0]==undefined){
      const randomGif = await getRandomGif();
    q(CH_CONTAINER).innerHTML = toFavoritesView([],page,randomGif);
  } else {
    const favGifs = await getGifsById(gifIds);

    document.addEventListener("click", (e) => {
       if(e.target.classList.contains("previous_page")){
         renderFavorites(parseInt(q(".previous_page").id))
       };
       if(e.target.classList.contains("next_page")){
         renderFavorites(parseInt(q(".next_page").id))
         
       }
       
    });
  
    q(CH_CONTAINER).innerHTML = toFavoritesView(favGifs,page);
    previous_page_invisible();
  }

};

const load_random_ids = async (number) => {
  let randomGifsArr = Array.from({ length: number });

  randomGifsArr = await Promise.all(
    randomGifsArr.map((curGif) => getRandomId())
  );

  return randomGifsArr;
};

/**
 * @author Rosen Boyanov <rosen.boyanov.a29@learn.telerikacademy.com>
 * @description visualizes the search results in a modal window
 * @param {string} searchWord the word that's being searched
 * @param {page} page the page we're currently on
 */
export const renderSearchResults = async (searchWord = null, page=1) => {
  const results = await searchResults(searchWord, (page-1)*12);
  document.addEventListener("click", (e) => {
    if(e.target.classList.contains("previous_page1")){
      renderSearchResults(searchWord, parseInt(q(".previous_page1").id))
    };
    if(e.target.classList.contains("next_page1")){
      renderSearchResults(searchWord, parseInt(q(".next_page1").id))
      
    }
    
 });

  q("#zoom_page").innerHTML = toSearchView(searchWord, results, page);
  if(parseInt(q(".previous_page1").id)===0){
    q(".previous_page1").style.visibility = 'hidden'
  }
  if(parseInt(q(".previous_page1").id)>1){
    q(".previous_page1").style.visibility = 'visible';
  }
};

/**
 * @author Rosen Boyanov <rosen.boyanov.a29@learn.telerikacademy.com>
 * @description visualizes the samples for the navigation bar search 
 */
export const searchAreaHome = () => {
  document.getElementById("results_preview").style.display = "none";
  document.getElementById("more_results").style.display = "none";
  q("input#search").addEventListener("input", (e) => {
    let searchResult = "";
    searchResult = e.target.value;
    if (searchResult.length <= 2) {
      document.getElementById("results_preview").style.display = "none";
      document.getElementById("more_results").style.display = "none";
    }

    if (searchResult.length >= 3) {
      document.getElementById("results_preview").style.display = "flex";
      document.getElementById("more_results").style.display = "flex";
      searchSamples(searchResult, "#results_preview");
    }
  });
};
/**
 * @author Rosen Boyanov <rosen.boyanov.a29@learn.telerikacademy.com>
 * @description visualizes the samples for the home page search 
 */
export const searchAreaNavBar = () => {
  document.getElementById("results_preview_header").style.display = "none";
  document.getElementById("more_results_header").style.display = "none";
  q("input#search_header").addEventListener("input", (e) => {
    let searchResult = "";
    searchResult = e.target.value;
    if (searchResult.length <= 2) {
      document.getElementById("results_preview_header").style.display = "none";
      document.getElementById("more_results_header").style.display = "none";
    }

    if (searchResult.length >= 3) {
      document.getElementById("results_preview_header").style.display = "flex";
      document.getElementById("more_results_header").style.display = "flex";
      searchSamples(searchResult, "#results_preview_header");
    }
  });
};

const previous_page_invisible = () => {
  if(parseInt(q(".previous_page").id)===0){
    q(".previous_page").style.visibility = 'hidden'
  }
  if(parseInt(q(".previous_page").id)>1){
    q(".previous_page").style.visibility = 'visible';
  }
}
