import axios from 'axios';

export const signInUser = (data, callback) => {
  axios.get('/api/application/new')
    .then((res) => {
      const { authenticity_token } = res.data;

      axios.post(
        '/api/users/sign_in', {
          authenticity_token,
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
    }).catch((err) => {
      console.log(err);
    });
};

export const signOutUser = (auth_key, callback) => {
  axios.get('/api/application/new')
    .then((res) => {
      const { authenticity_token } = res.data;

      axios.delete(
        '/api/users/sign_out',
        {
          data: {
            authenticity_token,
          },
          headers: {
            authorization: auth_key,
          },
        }
      ).then((res) => {
        callback(res);
      }).catch((err) => {
        console.log(err)
      });
    }).catch((err) => {
      console.log(err);
    });
};

export const signUpUser = (data, callback) => {
  axios.get('/api/application/new')
    .then((res) => {
      const { authenticity_token } = res.data;

      axios.post(
        '/api/users',
        {
          authenticity_token,
          user: {
            ...data
          },
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