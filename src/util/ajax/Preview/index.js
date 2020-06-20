import axios from 'axios';

export const getImage = (image, callback) => {
  const url = image.url.replace('3000', '5000');

  axios.get(url, {
    responseType: 'blob',
  }).then((res) => {
    const file = res.data;
    callback(file);
  }).catch((err) => {
    console.log(err);
  });
}