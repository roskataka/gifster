/**
 * @author Rosen Boyanov <rosen.boyanov.a29@learn.telerikacademy.com>
 * @returns {string} A html template for home
 */
export const homeView = () => `
    <div id="homes_page"></div>
    <div id="home">
        <img id ="logo" src="./utilities/pictures/logo2.png">
        <div id = "search_area">
            <div id="search_bar">
                <input type="text" id="search" placeholder="Search">
                <button class="zoom_navigation1" type="submit" id="zoom_button">🔎</button>
            </div>
            
            <div id="results_preview"></div>
            <div id="results_button">
                <button class="zoom_navigation" type="submit" id="more_results">View more results</button>
            </div>
        </div>

    </div>`