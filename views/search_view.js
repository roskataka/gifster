import {toSingleGif} from './trending_view.js'

/**
 * @author Rosen Boyanov <rosen.boyanov.a29@learn.telerikacademy.com>
 * @param {string} searchWord the word that it's searched for 
 * @param {Array} gif_arr the array of the the gifs for the page
 * @param {number} page the page that is currently on 
 * @returns {string} html template
 */
export const toSearchView = (searchWord="", gif_arr, page) =>`
  <div class="zoom_content">
      <div id="zoom_header">
        <h1>Results for "${searchWord}"</h1><br>
        <span class="close">&times;</span>
      </div>

      <div id="grid">
        ${gif_arr.map(toSingleGif).join('\n')}
      </div>
      <div class="buttons_pagination" >
      <button id="${page-1}_number" class="previous_page1">Previous</button>
      <p>${page}</p>
      <button id="${page+1}_number" class="next_page1">Next</button>
      </div>
  </div>
` ;