import { ActionTypes } from '../../util/ActionTypes';

function user(state = {}, action) {
  switch (action.type) {
    case ActionTypes.SET_AUTH_KEY:
      return {
        ...state,
        auth_key: action.auth_key,
      };

    default:
      return state;
  };
};

export default user;