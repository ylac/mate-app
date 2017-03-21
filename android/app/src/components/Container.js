import React, { Component } from 'react';
import { ListView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
var { connect, Provider } = require('react-redux');
import moment from 'moment';
import ActionButton from 'react-native-action-button';
import Button from 'react-native-button';
import CheckBox from 'react-native-android-checkbox';

import * as actions from './../actions/actions.js';
import GridHeader from './GridHeader';
import BuddyArea from './../components/BuddyArea';
import styleSheet from './../styles/index.js';
const styles = styleSheet;
import Icon from 'react-native-vector-icons/Ionicons';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2, sectionHeaderHasChanged: (s1, s2) => s1 !== s2});
var store = require('./../store/configureStore').configure();

export class Container extends Component {
  constructor() {
    super();
    this.state = {
      value: false
    }
    this.rowRenderer = this.rowRenderer.bind(this);
  }
  addHabit() {
    var text = this.refs.newHabit._lastNativeText;
    this.props.dispatch(actions.addHabit(text));
    // console.log('newState', store.getState());
    this.refs.newHabit.setNativeProps({text: ''});
  }
  rowRenderer(rowData) {
    var {dispatch, habits} = this.props;
    var date0 = moment().format("D-M-YYYY");
    var date1 = moment().subtract(1, 'days').format("D-M-YYYY");
    var date2 = moment().subtract(2, 'days').format("D-M-YYYY");
    console.log('habits', habits);
    var filter = (id, date) => {
      return habits.filter((habit) => {
        return habit.id === id;
      })
    [0].dates[date]
    };
    // console.log('filter', filter(1));
    return (
      <View style={styles.view}>
        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <Text style={styles.habitText}>{rowData.text}</Text>
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
    )
  }
  render() {
    var {habits} = this.props;
    // console.log('habits', habits);
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
            renderRow={this.rowRenderer}
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
