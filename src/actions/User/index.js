import { ActionTypes } from '../../util/ActionTypes';

export const setAuthKey = (auth_key) => ({
  type: ActionTypes.SET_AUTH_KEY,
  auth_key,
});

export const removeAuthKey = () => ({
  type: ActionTypes.REMOVE_AUTH_KEY,
});