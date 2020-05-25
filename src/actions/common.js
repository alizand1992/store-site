import { ActionTypes } from '../util/ActionTypes';

export const setCurrentComponent = (component) => ({
  type: ActionTypes.SET_CURRENT_COMPONENT,
  component,
});

export const setSiteProperties = (properties) => ({
  type: ActionTypes.SET_SITE_PROPERTIES,
  properties,
});