import axios from 'axios';

export const updateItem = (data, callback) => {
  axios.get('/api/application/new')
    .then((res) => {
      const { authenticity_token } = res.data;

      const { name, show_in_gallery, auth_key } = data;

      axios.put(
        `/api/items/${data.id}`,
        {
          name,
          show_in_gallery,
          authenticity_token,
        }, {
          headers: {
            authorization: auth_key,
          },
        }
      ).then((res) => {
        callback(res);
      }).catch((err) => {

      });
    }).catch((err) => {

  });
};

export const getImageData = (id, callback) => {
  axios.get(`/api/items/${id}/image_data`)
    .then((res) => {
      const { images } = res.data;

      callback(images);
    }).catch((err) => {
      console.log(err);
    });
};