import axios from 'axios';

export const saveItem = (data, callback) => {
  axios.get('/api/application/new')
    .then((res) => {
      const { authenticity_token } = res.data;

      const { auth_key: authorization } = data;
      delete data.auth_key;

      axios.post(
        '/api/items',
        {
          ...data,
          authenticity_token,
        },
        {
          headers: {
            authorization,
          }
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

export const saveImages = (id, images, deleted, auth_key, callback) => {
  axios.get('/api/application/new')
    .then((res) => {
      const { authenticity_token } = res.data;

      const formData = new FormData();

      formData.append('authenticity_token', authenticity_token);
      deleted.forEach((d_id, index) => {
        formData.append(`deleted[${index}]`, deleted[index]);
      })

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
          authorization: auth_key,
          'Content-Type': `multipart/form-data; boundary=${1}`,
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
