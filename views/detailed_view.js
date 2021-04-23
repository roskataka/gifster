import { toSingleGif } from "../views/trending_view.js";

export const toSingleDetailedView = (data, randomGifs) => `
<div class="detailed_view">
    <img src=${data.images.downsized.url} id="img">
    <div class="gif_info">
        <div class="title">
            <span class="detailed_view_form">Title: </span>
            <span class="detailed_view_data"> ${data.title} </span>
        </div>

        <div class="author">
            <span class="detailed_view_form">Author: </span>
            ${
              data.username
                ? `<span class="detailed_view_data">${data.username}</span>`
                : `<span class="detailed_view_data">unknown</span>`
            }
        </div>

        <div class="date">
            <span class="detailed_view_form">Created on: </span>
            <span class="detailed_view_data"> ${data.import_datetime}</span>
        </div>

        <div class="gif_source">
            <a href="${
              data.url
            }" target="_blank">Click here for original source</a>
        </div>
            
        </div>
    </div>

    <h2>Explore some more GIFs:</h2><br>
        <div class="random_gifs">
            ${randomGifs.map(toSingleGif).join("\n")}
        </div>
`;
