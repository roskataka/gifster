import {DATA_KEY} from '../utilities/constants.js'
import { gif_template } from '../views/gif_icon_template_view.js'

export const trendingGifs = async (offset) => {
    const res = await fetch(`http://api.giphy.com/v1/gifs/trending?api_key=${DATA_KEY}&limit=18&offset=${offset}`);
    const jsonRes = await res.json();
    return jsonRes.data;
}

export const gifDetails = async (gifId) => {
    const res = await fetch(`https://api.giphy.com/v1/gifs/${gifId}?api_key=${DATA_KEY}`);
    const jsonRes = await res.json();
    return jsonRes.data;
}
/**
 * @description sets the html of the searchbar`s preview box with the three best findings
 * @author Rosen Boyanov <rosen.boyanov.a29@learn.telerikacademy.com>
 * @param {string} searchResult the word that's being searched
 * @param {string} searchBar the bar that's doing the searching
 * @param {number} numberLimit how many samples there are going to be
 */
export const searchSamples = async (searchResult, searchBar, numberLimit=3) => {
    const images = [];
    const result = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${DATA_KEY}&q=${searchResult}&limit=${numberLimit}`)
    const jsonResult = await result.json();
    if(jsonResult.data[0]!=undefined){
        jsonResult.data.forEach(element => images.push(gif_template(element)));
        document.body.querySelector(searchBar).style.height = "10vw"
        document.body.querySelector(searchBar).innerHTML = `${images.reduce((acc, val) => (acc+' '+val))}` 
    } else {
        document.body.querySelector(searchBar).style.height= "2vw"
        document.body.querySelector(searchBar).innerHTML = '<h3 id="no_results">No results were found</h3>'
    }
};
/**
 * @author Rosen Boyanov <rosen.boyanov.a29@learn.telerikacademy.com>
 * @param {string} searchWord the word that's being searched
 * @param {number} offset the offset that defines on which page we are
 * @returns {array} an array of all gifs
 */
export const searchResults = async (searchWord, offset) => {
    const res = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${DATA_KEY}&q=${searchWord}&limit=12&offset=${offset}`)
    const jsonRes = await res.json();
    return jsonRes.data;
}
/**
 * @author Rosen Boyanov <rosen.boyanov.a29@learn.telerikacademy.com>
 * @param {array} idArray an array of all the ids
 * @returns {array} array of gifs
 */
export const getGifsById = async(idArray) => {
    if(idArray==[]){
        console.log(idArray)
        return idArray;
    } else {
        let ids = idArray.reduce((acc, val) => (acc + ',' + val));
        const res = await fetch(`https://api.giphy.com/v1/gifs?api_key=${DATA_KEY}&ids=${ids}`)
        const jsonRes = await res.json();
        const arrayToReturn = [...jsonRes.data]
        return arrayToReturn;
    }

}

export const getRandomGif = async() => {
    const res = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${DATA_KEY}`);
    const jsonRes = await res.json();
    return jsonRes.data;
}
export const getRandomId = async() => {
    const res = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${DATA_KEY}`);
    const jsonRes = await res.json();
    return jsonRes.data.id;
}


export const uploadGif = async(formData) => {
    const res = await fetch(`https://upload.giphy.com/v1/gifs?api_key=${DATA_KEY}`, {
        method: 'POST',
        body: formData
    });
    const jsonRes = await res.json();

    return jsonRes.data.id;
}