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

export const saveImages = (id, thumbnail, images, callback) => {
  axios.get('/api/application/new')
    .then((res) => {
      const { authenticity_token } = res.data;

      const formData = new FormData();

      formData.append('authenticity_token', authenticity_token);
      formData.append('thumbnail', thumbnail);

      images.forEach((image, index) => {
        formData.append(`images[${index}]`, image);
      })

      const method = 'POST';
      const url = `/api/items/${id}/images`;

      axios({
        method,
        url,
        data: formData,
        headers: {
          'Content-Type': `multipart/form-data; boundary=${1}`
        }
      }).then((res) => {
        callback(res);
      }).catch((err) => {
        console.log(err)
      });
    }).catch((err) => {
    console.log(err)
  });
};

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
