import React, { Component } from 'react';
import { ListView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
var { connect, Provider } = require('react-redux');
import ActionButton from 'react-native-action-button';
import Button from 'react-native-button';

import * as actions from './../actions/actions.js';
import GridHeader from './GridHeader';
import {rowRenderer} from './rowRenderer.js';
import styleSheet from './../styles/index.js';
const styles = styleSheet;
import Icon from 'react-native-vector-icons/Ionicons';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2, sectionHeaderHasChanged: (s1, s2) => s1 !== s2});
var store = require('./../store/configureStore').configure();


export class Container extends Component {
  addHabit() {
    var text = this.refs.newHabit._lastNativeText;
    this.props.dispatch(actions.addHabit(text));
    console.log('newState', store.getState());
    // this.forceUpdate();
    this.refs.newHabit.setNativeProps({text: ''});
  }
  render() {
    var {habits} = this.props;
    console.log('habits', habits);
    return (
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
        <ScrollView>
          <ListView
            dataSource={ds.cloneWithRows(habits)}
            renderRow={rowRenderer}
            style={styles.listView}
            contentContainerStyle={styles.contentContainer}
          />
        </ScrollView>
        <ActionButton style={styles.actionButton}>
          <ActionButton.Item buttonColor='#9b59b6' title="New Task" onPress={() => console.log("notes tapped!")}>
            <Icon name="md-create" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </View>
    )
  }
}

export default connect(
  (state) => {
    return {
      habits: state.habits
    }
  }
)(Container)
