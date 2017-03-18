import * as redux from 'redux';
// import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__ });

import {habitReducer} from './../reducers/reducers.js';

var initialStateData = {habits: [
  {
    text: 'Eat flaxseed oil'
  },
  {
    text: 'Go jogging'
  }
]};

export var configure = (initialState = initialStateData) => {
  var reducer = redux.combineReducers({
    habits: habitReducer
  });
  var store = redux.createStore(reducer, initialState, redux.compose(
    redux.applyMiddleware(loggerMiddleware),
  ));
  console.log(store.getState());
  return store;
};
