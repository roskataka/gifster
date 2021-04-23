/**
 * @author Rosen Boyanov <rosen.boyanov.a29@learn.telerikacademy.com>
 * @param {Object} element the gif that is going to be inputted in a template
 * @returns {string} an html template
 */
export const gif_template = (element) => `
    <div class="gif_template">
        <img src="${element.images.downsized.url}" title="To detailed view "class="detailed_view" id="${element.id}" width="130vw" height="120vw"></img><br>
        <input type="checkbox" class="favorite_check" id="${element.id}" >Add to favorites</input>
    </div>
`