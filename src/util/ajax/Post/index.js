import axios from 'axios';

export const savePost = (data, callback) => {
  axios.get('/api/application/new')
    .then((res) => {
      const { authenticity_token } = res.data;

      axios.post(
        '/api/posts', {
          ...data,
          authenticity_token,
        }
      ).then((res) => {
        callback(res);
      }).catch((err) => {
        console.log(err);
      });
    }).catch((err) => {
      console.log(err);
    });
};

export const getPost = (id, callback) => {
  axios.get(`/api/posts/${id}`)
    .then((res) => {
      callback(res);
    }).catch((err) => {
    console.log(err);
  })
}

export const updatePost = (data, callback) => {
  axios.get('/api/application/new')
    .then((res) => {
      const { authenticity_token } = res.data;

      axios.put(
        `/api/posts/${data.id}`, {
          ...data,
          authenticity_token,
        }
      ).then((res) => {
        callback(res);
      }).catch((err) => {
        console.log(err);
      });
    }).catch((err) => {
    console.log(err);
  });
};

export const getActivePosts = (callback) => {
  axios.get('/api/posts')
    .then((res) => {
      callback(res);
    }).catch((err) => {
      console.log(err);
  })
}