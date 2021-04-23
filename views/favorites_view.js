import { toSingleGif } from '../views/trending_view.js';


export const toFavoritesView = (favoriteGifs=[],page=1,randomGif) => `
    <div id="favorites_page"></div>
    <h1>Favorites:</h1>
    <div id="grid">
        ${favoriteGifs.map(toSingleGif).join('\n') ||
        `<p>Explore more GIFs:</p><br>
        <div class="random_gifs">
        ${toSingleGif(randomGif)}
        </div>
        `
        }
    </div>
    <div class="buttons_pagination" >
        <button id="${page-1}_number" class="previous_page">Previous</button>
        <p>${page}</p>
        <button id="${page+1}_number" class="next_page">Next</button>
    </div>
`;
