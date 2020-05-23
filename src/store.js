import { combineReducers, createStore } from 'redux';
import common from './reducers/common';
import { composeWithDevTools } from 'redux-devtools-extension';

const rootReducer = combineReducers({
  common,
});

export const store = createStore(
  rootReducer,
  {},
  composeWithDevTools(),
);

