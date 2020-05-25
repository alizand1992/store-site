import axios from 'axios';

export const getItemImageData = (itemId, callback) => {
  axios.get(`/api/items/${itemId}/images`)
    .then((res) => {
      const { images } = res.data;

      callback(images);
    }).catch((err) => {
      console.log(err);
    });
}

export const getImage = (image, callback) => {
  const url = image.url.replace('http://localhost:3000', 'http://localhost:5000');
  axios.get(url, {
    responseType: 'blob',
  }).then((res) => {
    const file = res.data;
    callback(file);
  }).catch((err) => {
    console.log(err);
  });
}