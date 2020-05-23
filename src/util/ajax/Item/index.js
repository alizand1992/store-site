import axios from 'axios';

export const getItems = (callback) => {
  axios.get('/api/items')
    .then((res) => {
      callback(res.data);
    }).catch((err) => {
      console.log(err);
    });
}

export const saveItem = (formData, callback) => {
  axios.get('/api/application/new')
    .then((res) => {
      const { authenticity_token } = res.data;

      formData.append('authenticity_token', authenticity_token);

      axios({
        method: 'POST',
        url: '/api/items',
        data: formData,
        headers: {
          'Content-Type': `multipart/form-data; boundary=${123}`
        }
      }).then((res) => {
        callback(res);
      }).catch((err) => {
        console.log(err)
      });
    }).catch((err) => {
      console.log(err)
    });
}

export const getItem = (id, callback) => {
  axios.get(`/api/items/${id}`)
    .then((res) => {
      callback(res);
    }).catch((err) => {
      console.log(err)
    });
}