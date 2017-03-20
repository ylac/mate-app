import React, { Component } from 'react';
import { AppRegistry, AsyncStorage, Button, ListView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { applyMiddleware, createStore, combineReducers, compose } from 'redux';
var { connect, Provider } = require('react-redux');
import {getStoredState, autoRehydrate, createPersistor, persistStore} from 'redux-persist';
import CheckBox from 'react-native-custom-checkbox';
import ActionButton from 'react-native-action-button';

import * as actions from './android/app/src/actions/actions.js';
import Container from './android/app/src/components/Container.js';
import HabitsList from './android/app/src/components/HabitsList.js';
import {rowRenderer} from './android/app/src/components/rowRenderer.js';
// import GridHeader from './GridHeader';
// import BuddyArea from './android/app/src/components/BuddyArea';

var store = require('./android/app/src/store/configureStore').configure();

export class MateApp extends Component {
  constructor(props) {
    super(props);
    // this.setState{{ rehydrated: false }}
  }
  componentWillUpdate() {
    // persistStore(store, {storage: AsyncStorage}, () => {
    //   this.setState({ rehydrated: true })
    // })
    console.log('newState', store.getState());
  }

  render() {
    return (
      <Provider store={store}>
        <Container/>
      </Provider>
    );
  }
}


AppRegistry.registerComponent('MateApp', () => MateApp);
