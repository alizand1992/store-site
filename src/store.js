import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import common from './reducers/common';
import item from './reducers/Item';
import user from './reducers/User';

const rootReducer = combineReducers({
  common,
  item,
  user,
});

export const store = createStore(
  rootReducer,
  {},
  composeWithDevTools(),
);

