import axios from 'axios';

export const getItemImages = (itemId) => {
  const blobs = [];

  axios.get(`/api/items/${itemId}/images`)
    .then((res) => {
      const { images } = res.data;

      images.forEach((image) => {
        getImage(image, (blob) => {
          blobs.push(blob);
        });
      });
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

    file.name = image.name
    callback(file);
  }).catch((err) => {
    console.log(err);
  });
}