import axios from 'axios';

export const saveProperties = (properties, callback) => {
  axios.get('/api/application/new')
    .then((res) => {
      const { authenticity_token } = res.data;

      axios.put('/api/site_properties', {
        authenticity_token,
        properties,
      }).then((res) => {
        callback(res);
      }).catch((err) => {
        console.log(err)
      });
    }).catch((err) => {
      console.log(err)
    });
};