import { HOME, FAVORITES, q } from "./utilities/constants.js";
import {
  loadPage,
  renderDetailedView,
  renderSearchResults,
  searchAreaHome,
  searchAreaNavBar,
  renderUploads
} from "./events/navigation.js";
import { searchSamples } from "./services/request_service.js";
import { toggleFavoriteStatus } from "./events/favorite_events.js";

document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("click", (e) => {

    if (e.target.id === "submit_btn") {
        const form = q("#registerUpload");
        renderUploads(form);
        form.reset();
      }
      if (e.target.classList.contains("nav-link")) {
        /**checks if the page loading is home, if it is,
         * then remove the top search and logo, if it's not - wait for the page to load
         * and place them in the navigation bar*/
  
        if (e.target.getAttribute("data-page") === HOME) {
          q("#search_area_header").style.display = "none";
          q("#header_logo").style.display = "none";
          loadPage(HOME);
          searchAreaHome();
        } else {
          loadPage(e.target.getAttribute("data-page"));
          q("#search_area_header").style.display = "flex";
          q("#header_logo").style.display = "flex";
        }
      }

    // show gif details
    if (e.target.classList.contains("detailed_view")) {
      
      renderDetailedView(e.target.getAttribute("id"));
      searchAreaNavBar();
      document.getElementById("zoom_page").style.display = "none";
    }

    // toggle favorite event
    if (e.target.classList.contains("favorite")) {
      toggleFavoriteStatus(e.target.getAttribute("gif-id"));

      //if we're on the favorites page and we update a gif's favorite status => refresh the page
      if (q("#favorites_page")) {
        loadPage(FAVORITES,parseInt(q(".previous_page").id)+1);
      }
    }

      //show zoom popup with search results
        if (e.target.classList.contains("zoom_navigation1")) {
              document.getElementById("zoom_page").style.display = "block";

              renderSearchResults(q("input#search").value);
        }

        if (e.target.classList.contains("zoom_navigation")) {
          document.getElementById("zoom_page").style.display = "block";

          renderSearchResults(q("input#search_header").value);
        }
        
        if(e.target.classList.contains("close")){
          document.getElementById("zoom_page").style.display = "none";
        }
        //for changing pages

          
    //     document.getElementById("zoom_page").style.display = "block";
    //   }
    // }
  });
  loadPage(HOME);
  q("#search_area_header").style.display = "none";

  //HOME SEARCH BAR
  searchAreaHome();

  //NAVIGATION SEARCH BAR
  searchAreaNavBar();

});
