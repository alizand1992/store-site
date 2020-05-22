import { ActionTypes } from '../util/ActionTypes';

function common(state = {}, action) {
  switch (action.type) {
    case ActionTypes.SET_CURRENT_COMPONENT:
      return {
        ...state,
        currentComponent: action.component,
      }
    default:
      return state;
  }
}

export default common;