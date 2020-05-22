import { ActionTypes } from '../util/ActionTypes';

export const setCurrentComponent = (component) => ({
  type: ActionTypes.SET_CURRENT_COMPONENT,
  component,
});