import axios from 'axios';

export const getSiteProperties = (callback) => {
  axios.get('/api/site_properties')
    .then((res) => {
      callback(res);
    }).catch((err) => {
      console.log(err);
    });
}