import axios from 'axios';

export const getImage = (image, callback) => {
  const url = image.url.replace('http://localhost:3000', 'http://localhost:5001');
  axios.get(url, {
    responseType: 'blob',
  }).then((res) => {
    const file = res.data;
    callback(file);
  }).catch((err) => {
    console.log(err);
  });
}