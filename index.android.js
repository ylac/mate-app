import React, { Component } from 'react';
import { AppRegistry, Button, ListView, StyleSheet, Text, TextInput, View } from 'react-native';
import { applyMiddleware, createStore, combineReducers, compose } from 'redux';
import { connect, Provider } from 'react-redux';
import CheckBox from 'react-native-check-box'
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

import * as actions from './android/app/src/actions/actions.js';
import BuddyArea from './BuddyArea';
import GridHeader from './GridHeader';

var store = require('./android/app/src/store/configureStore').configure();
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2, sectionHeaderHasChanged: (s1, s2) => s1 !== s2});

export default class MateApp extends Component {
  constructor(props) {
    super(props);
  }
  addHabit() {
    var text = this.refs.newHabit._lastNativeText;
    store.dispatch(actions.addHabit(text));
    this.setState({});
    this.refs.newHabit.setNativeProps({text: ''});
  }
  render() {
    var rowRenderer = (rowData) =>
      <View style={styles.view}>
        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <Text style={styles.habitText}>{rowData.text}</Text>
          </View>
          <View style={styles.rowRight}>
            <CheckBox
              onClick={() => store.dispatch(actions.toggleHabit(rowData.id))}
              isChecked={false}
            />
            <CheckBox
              onClick={() => store.dispatch(actions.toggleHabit(rowData.id))}
              isChecked={false}
            />
            <CheckBox
              onClick={() => store.dispatch(actions.toggleHabit(rowData.id))}
              isChecked={false}
            />
            <View style={styles.buddyArea}>
              <BuddyArea habitText={rowData.text}/>
            </View>
          </View>
        </View>
      </View>
    return (
      <Provider store={store}>
        <View style={styles.view}>
          <TextInput
            placeholder="Enter new habit here"
            style={styles.textInput}
            onSubmitEditing={this.addHabit.bind(this)}
            ref="newHabit"
          />
          <View style={styles.gridHeader}>
            <GridHeader/>
          </View>
          <ListView
            dataSource={ds.cloneWithRows(store.getState().habits)}
            renderRow={rowRenderer}
            style={styles.listView}
            contentContainerStyle={styles.contentContainer}
          />
          <ActionButton style={styles.actionButton}>
            <ActionButton.Item buttonColor='#9b59b6' title="New Task" onPress={() => console.log("notes tapped!")}>
              <Icon name="md-create" style={styles.actionButtonIcon} />
            </ActionButton.Item>
          </ActionButton>
        </View>
      </Provider>
    );
  }
}


const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 10
  },
  textInput: {
    height: 40
  },
  listView: {
    flex: 1,
    paddingTop: 0
  },
  contentContainer: {
    paddingBottom: 400
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10
  },
  rowLeft: {
    flex: 0.4,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingRight: 20
  },
  habitText: {
    fontWeight: 'bold'
  },
  rowRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  buddyArea: {
    // flex: 0.1,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingBottom: 10
  },
  actionButton: {

  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  gridHeader: {
    flex: 0.6,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingLeft: 130
  },
  // placeholderText: {
  //   color: 'white'
  // }
});

AppRegistry.registerComponent('MateApp', () => MateApp);
