import axios from 'axios';

export const signInUser = (data, callback) => {
  axios.post(
  '/api/users/sign_in', {
      user: data,
    }, {
      dataType: 'application/json',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  ).then((res) => {
    callback(res);
  }).catch((err) => {
    console.log(err);
  });
};
