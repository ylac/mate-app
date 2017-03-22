import React, { Component } from 'react';
import { ListView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
var { connect, Provider } = require('react-redux');
import moment from 'moment';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import ActionButton from 'react-native-action-button';
import Button from 'react-native-button';
import { Icon } from 'react-native-elements';
import CheckBox from 'react-native-android-checkbox';
import Modal from 'react-native-modalbox';
import Swipeable from 'react-native-swipeable';
import SwipeList from 'react-native-smooth-swipe-list';

import * as actions from './../actions/actions.js';
import GridHeader from './GridHeader';
import BuddyArea from './../components/BuddyArea';
import styleSheet from './../styles/index.js';
const styles = styleSheet;

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2, sectionHeaderHasChanged: (s1, s2) => s1 !== s2});
var store = require('./../store/configureStore').configure();

export class Container extends Component {
  constructor() {
    super();
    this.state = {
      value: false,
      editable: false,
      textInputCounter: 0
    }
    this.rowRenderer = this.rowRenderer.bind(this);
    this.deleteHabit = this.deleteHabit.bind(this);
    this.editHabit = this.editHabit.bind(this);
  }
  addHabit() {
    var text = this.refs.newHabit._lastNativeText;
    this.props.dispatch(actions.addHabit(text));
    // console.log('newState', store.getState());
    this.refs.newHabit.setNativeProps({text: ''});
  }
  deleteHabit(rowData, secId, rowId, rowMap) {
    rowMap[`${secId}${rowId}`].closeRow();
    var {dispatch} = this.props;
    dispatch(actions.deleteHabit(rowData.id));
  }
  editHabit(rowData, secId, rowId, rowMap) {
    rowMap[`${secId}${rowId}`].closeRow();
    this.setState({editable: true});
    var ref = rowData.id;
    console.log('refs', this.refs);
    this.myTextInput.focus();
  }
  updateHabit(id, text) {
    this.props.dispatch(actions.updateHabit(id, text))
    this.setState({editable: false});
  }
  rowHeader() {
    return (
      <View style={styles.rowHeader}>
        <Text>{moment().format("dd")}</Text>
        <Text>{moment().subtract(1, 'days').format("dd")}</Text>
        <Text>{moment().subtract(2, 'days').format("dd")}</Text>
      </View>
    )
  }
  rowRenderer(rowData, secId, rowId, rowMap) {
    var {dispatch, habits} = this.props;
    var date0 = moment().format("D-M-YYYY");
    var date1 = moment().subtract(1, 'days').format("D-M-YYYY");
    var date2 = moment().subtract(2, 'days').format("D-M-YYYY");
    // console.log('habits', habits);
    var filter = (id, date) => {
      return habits.filter((habit) => {
        return habit.id === id;
      })[0].dates[date]
    };
    return (
      <SwipeRow
        disableRightSwipe={false}
  			disableLeftSwipe={false}
  			leftOpenValue={80}
  			rightOpenValue={-80}
      >
        <View style={styles.hiddenRow}>
          <Icon name='delete' style={styles.sideButtons} onPress={() => this.deleteHabit(rowData, secId, rowId, rowMap)}>Delete</Icon>
          <Icon name='mode-edit' style={styles.sideButtons} onPress={() => this.editHabit(rowData, secId, rowId, rowMap)}>Edit</Icon>
        </View>
        <View style={styles.view}>
          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <TextInput
                editable={true}
                multiline={true}
                numberOfLines={3}
                onChangeText={(text) => this.updateHabit(rowData.id, text)}
                ref={(ref => this.myTextInput = ref)}
                style={styles.habitText}
                underlineColorAndroid='transparent'
              >
              {rowData.text}
            </TextInput>
            </View>
            <View style={styles.rowRight}>
              <CheckBox
                value={filter(rowData.id, date0)}
                disabled={false}
                onValueChange={(value) => {
                  dispatch(actions.toggleHabit(value, rowData.id, 0));
                  this.setState({value});
                }}
              />
              <CheckBox
                value={filter(rowData.id, date1)}
                disabled={false}
                onValueChange={(value) => {
                  dispatch(actions.toggleHabit(value, rowData.id, 1));
                  this.setState({value});
                }}
              />
              <CheckBox
                value={filter(rowData.id, date2)}
                disabled={false}
                onValueChange={(value) => {
                  dispatch(actions.toggleHabit(value, rowData.id, 2));
                  this.setState({value});
                }}
              />
              <View style={styles.buddyArea}>
                <BuddyArea habitText={rowData.text}/>
              </View>
            </View>
          </View>
        </View>
      </SwipeRow>
    )
  }
  render() {
    var {habits} = this.props;
    return (
      <View style={styles.view}>
        <TextInput
          placeholder="Enter new habit here"
          style={styles.textInput}
          onSubmitEditing={this.addHabit.bind(this)}
          ref="newHabit"
        />
        <View style={styles.gridHeader}>

        </View>
        <ScrollView>
          <SwipeListView
            dataSource={ds.cloneWithRows(habits)}
            renderHeader={this.rowHeader}
            renderRow={this.rowRenderer}
            style={styles.listView}
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
