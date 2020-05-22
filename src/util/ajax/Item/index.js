import axios from 'axios';

export const getItems = (callback) => {
  axios.get('/api/items')
    .then((res) => {
      callback(res.data);
    }).catch((err) => {
      console.log(err);
    });
}