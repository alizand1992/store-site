import axios from 'axios';

export const getItemWithAttributes = (id, callback) => {
  axios.get(`/api/items/${id}`)
    .then((res) => {
      callback(res);
    }).catch((err) => {
      console.log(err);
    });
};

export const getImageUrls = (id, callback) => {
  axios.get(`/api/items/${id}/images`)
    .then((res) => {
      const { images } = res.data;

      callback(images);
    }).catch((err) => {
      console.log(err);
    });
};