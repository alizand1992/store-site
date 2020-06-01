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

export const signOutUser = (auth_key, callback) => {
  axios.delete(
    '/api/users/sign_out',
    {
      headers: {
        authorization: auth_key,
      },
    }
  ).then((res) => {
    callback(res);
  }).catch((err) => {
    console.log(err)
  });
};

export const isUserSignedIn = (authorization, success, failure) => {
  axios.get(
    '/api/application/is_user_signed_in',
    {
      headers: {
        authorization,
      },
    }
  ).then((res) => {
    success(res);
  }).catch((err) => {
    failure(err);
  })
}