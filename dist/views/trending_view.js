import {renderFavoriteStatus} from '../utilities/navigation_help.js'

export const toTrendingView = (trendingGifs, page=1) => `
    <div class="trending">
        <h1> Trending: </h1>
        <div id="grid">
            ${trendingGifs.map(toSingleGif).join('\n')}
        </div>
    </div>
    <div class="buttons_pagination" >
    <button id="${page-1}_number" class="previous_page">Previous</button>
    <p>${page}</p>
    <button id="${page+1}_number" class="next_page">Next</button>
    </div>
`;

export const toSingleGif = currentGif => `
    <div class="singleGif-box">
        <img src="${currentGif.images.downsized.url}" class="detailed_view" id="${currentGif.id}">
        <br>
        <div class="inner_info">
            <span class="favorites">${renderFavoriteStatus(currentGif.id)}</span><br>
        </div>
        
    </div>
`;