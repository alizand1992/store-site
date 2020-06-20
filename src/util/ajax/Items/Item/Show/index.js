import axios from 'axios';

export const getItemWithAttributes = (id, auth_key, callback) => {
  axios.get(`/api/items/${id}`, {
      headers: {
        authorization: auth_key,
      },
    }).then((res) => {
      callback(res);
    }).catch((err) => {
      console.log(err);
    });
};

export const getImageUrls = (id, success, failure) => {
  axios.get(`/api/items/${id}/images`)
    .then((res) => {
      const { images } = res.data;

      success(images);
    }).catch((err) => {
      failure(err);
    });
};