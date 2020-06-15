import axios from 'axios';

export const selectThumbnail = (id, image_id, callback) => {
  axios.get('/api/application/new')
    .then((res) => {
      const { authenticity_token } = res.data;

      axios.post(
        `/api/items/${id}/select_thumbnail`,
        {
          authenticity_token,
          image_id,
        }
      ).then((res) => {
        callback(res);
      }).catch((err) => {
        console.log(err);
      });
    }).catch((err) => {
      console.log(err)
    });
};