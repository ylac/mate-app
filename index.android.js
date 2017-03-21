import React, { Component } from 'react';
import { AppRegistry, AsyncStorage, Button, ListView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { applyMiddleware, createStore, combineReducers, compose } from 'redux';
var { connect, Provider } = require('react-redux');

import Container from './android/app/src/components/Container.js';
var store = require('./android/app/src/store/configureStore').configure();

export default class MateApp extends Component {
  constructor(props) {
    super(props);
    // this.setState{{ rehydrated: false }}
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
