import React, { Component } from 'react';
import { AppRegistry, Button, ListView, StyleSheet, Text, TextInput, View } from 'react-native';
import { applyMiddleware, createStore, combineReducers, compose } from 'redux';
import { connect, Provider } from 'react-redux';

import * as actions from './android/app/src/actions/actions.js';
import AddBuddyButton from './AddBuddyButton';

var store = require('./android/app/src/store/configureStore').configure();
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2, sectionHeaderHasChanged: (s1, s2) => s1 !== s2});

export default class MateApp extends Component {
  constructor(props) {
    super(props);
  }
  addHabit() {
    var text = this.refs.newHabit._lastNativeText;
    store.dispatch(actions.addHabit(text));
    this.setState({
      // habits: store.getState().habits
    });
    this.refs.newHabit.setNativeProps({text: ''});
  }
  render() {
    return (
      <Provider store={store}>
        <View style={styles.view}>
          <TextInput
            placeholder="Enter new habit here"
            style={styles.textInput}
            onSubmitEditing={this.addHabit.bind(this)}
            ref="newHabit"
          />
          <ListView
            dataSource={ds.cloneWithRows(store.getState().habits)}
            renderRow={(rowData) =>
              <View style={styles.row}>
                <Text>{rowData.text}</Text>
                <AddBuddyButton habit={rowData.text}/>
              </View>
            }
            style={styles.listView}
          />
        </View>
      </Provider>
    );
  }
}


const styles = StyleSheet.create({
  view: {
    flex: 1,
    padding: 10
  },
  textInput: {
    height: 40
  },
  listView: {
    padding: 5
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});

AppRegistry.registerComponent('MateApp', () => MateApp);
