import axios from 'axios';

export const getThumbnails = () => {
  axios.get('/api/gallery')
    .then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    });
}