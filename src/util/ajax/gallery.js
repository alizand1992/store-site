import axios from 'axios';

export const getThumbnails = (callback) => {
  axios.get('/api/gallery')
    .then((res) => {
      callback(res);
    }).catch((err) => {
      console.log(err);
    });
}
