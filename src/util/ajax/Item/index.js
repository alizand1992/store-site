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

      axios.post(
        '/api/items',
        {
          ...data,
          authenticity_token,
        }
      ).then((res) => {
        callback(res);
      }).catch((err) => {

      });
    }).catch((err) => {

    });
};

export const saveAttributes = (data, callback) => {
  axios.get('/api/application/new')
    .then((res) => {
      const { authenticity_token } = res.data;

      axios.post(
        '/api/item_attributes',
        {
          ...data,
          authenticity_token,
        }
      ).then((res) => {
        callback(res);
      }).catch((err) => {

      });
    }).catch((err) => {

    });
}

export const _saveItem = (formData, callback) => {
  axios.get('/api/application/new')
    .then((res) => {
      const { authenticity_token } = res.data;

      formData.append('authenticity_token', authenticity_token);

      let method = 'POST';
      let url = '/api/items';

      if (formData.get('id') !== null && formData.get('id') !== undefined) {
        method = 'PUT';
        url += `/${formData.get('id')}`;
      }

      axios({
        method,
        url,
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

export const getItemAttributes = (item_id, callback) => {
  axios.get(`/api/item_attributes/${item_id}`)
    .then((res) => {
      callback(res);
    }).catch((err) => {
    console.log(err)
  });
}
