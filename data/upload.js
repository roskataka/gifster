let uploads = JSON.parse(localStorage.getItem('uploads')) || [];

export const addToUploaded = (gifId) => {
    uploads.push(gifId);
    localStorage.setItem('uploads', JSON.stringify(uploads));
}

export const getUploads = () => [...uploads];