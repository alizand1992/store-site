import axios from 'axios';

export const getItems = (callback) => {
  axios.get('/api/items')
    .then((res) => {
      callback(res.data);
    }).catch((err) => {
      console.log(err);
    });
}

export const saveItem = (data, callback) => {
  axios.get('/api/application/new')
    .then((res) => {
      const { authenticity_token } = res.data;

      let formData = new FormData();
      formData.append('authenticity_token', authenticity_token);
      formData.append('file', data);
      formData.append('file_name', 'some_name')

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
        callback(err);
      });
    }).catch((err) => {
      callback(err);
    });

}