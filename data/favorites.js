let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

export const addFavorite = (gifId) => {
  if (favorites.find(id => id === gifId)) {
    return;
  }

  favorites.push(gifId);
  localStorage.setItem('favorites', JSON.stringify(favorites));
};

export const removeFavorite = (gifId) => {
  favorites = favorites.filter(id => id !== gifId);
  localStorage.setItem('favorites', JSON.stringify(favorites));
};

export const getFavorites = ((offset=0) => 
{
  const copy = [...favorites] 
  let limitedFavorites = [];
  if(offset>=copy.length){
    return limitedFavorites;
  }
  if(offset+12>=copy.length){
    for (let i=offset;i<copy.length;i++){
      limitedFavorites.push(copy[i])
    }
  } else {
    for (let i=offset;i<(offset+12);i++){
      limitedFavorites.push(copy[i])
    }
  }

  return limitedFavorites;
});

export const getAllFavorites = () => [...favorites];