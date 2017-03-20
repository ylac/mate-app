import React, { Component } from 'react';
import { AsyncStorage, Button, ListView, ScrollView, Text, View } from 'react-native';
var { connect } = require('react-redux');
import moment from 'moment';

import BuddyArea from './BuddyArea';
import styles from './../styles/index.js';
import * as actions from './../actions/actions.js';
import CheckBox from 'react-native-checkbox';
var store = require('./../store/configureStore').configure();

export class HabitsList extends Component {
  componentWillReceiveProps() {
    console.log('habitsList', 'Receiving new props!');
    console.log('props', this.props);
  }
  render() {
    console.log('props', this.props);
    var {habits} = this.props;
    console.log('habits', habits);
    var renderHabits = () => {
      if (habits.length === 0) {
        return (
          <Text>No habits here. Why not add one today?</Text>
        )
      } else {
        var output;
        habits.forEach((habit) => {
          output = <Text>  {habit.text} </Text>;
        });
        console.log('output', output);
        return output;
      }
    };
    // console.log('renderHabits', renderHabits());
    // console.log('renderHabits', renderHabits);
    return (
      renderHabits()
    )
  }
};

export default connect(
  (state) => {
    return state;
  }
)(HabitsList);
