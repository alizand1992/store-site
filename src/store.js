import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import common from './reducers/common';
import item from './reducers/item';

const rootReducer = combineReducers({
  common,
  item,
});

export const store = createStore(
  rootReducer,
  {},
  composeWithDevTools(),
);

