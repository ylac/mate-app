import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import {AsyncStorage} from 'react-native';
// import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import moment from 'moment';
import {getStoredState, autoRehydrate, createPersistor, persistStore} from 'redux-persist';
const uuid = require('uuid/v4');
const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__ });

import {habitReducer} from './../reducers/reducers.js';

var date = moment().format("D-M-YYYY");

var initialStateData = {habits: [
  {
    id: uuid(),
    text: 'Eat flaxseed oil',
    dates: {}
  }
]};
initialStateData.habits[0].dates[date] = false;
// initialStateData.habits[1].dates[date] = false;


export var configure = () => {
  var reducer = combineReducers({
    habits: habitReducer
  });
  var store = createStore(reducer, {}, compose(
    // applyMiddleware(loggerMiddleware),
    // autoRehydrate()
  ));
  // persistStore(store, {storage: AsyncStorage}).purge();
  // persistStore(store, {storage: AsyncStorage}, () => {
  // });
  return store;
};
