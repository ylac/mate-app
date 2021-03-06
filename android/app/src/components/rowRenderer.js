import React, { Component } from 'react';
import { AppRegistry, AsyncStorage, Button, ListView, StyleSheet, Text, TextInput, View } from 'react-native';
import moment from 'moment';

import styles from './../styles/index.js';
import * as actions from './../actions/actions.js';
import BuddyArea from './../components/BuddyArea';
import CheckBox from 'react-native-checkbox';
var store = require('./../store/configureStore').configure();

export var rowRenderer = (rowData) => {
  // console.log('rowData', rowData);
  console.log('this', this.props);
  var checkedFirst = rowData.dates[moment().format("D-M-YYYY")];
  // checkedFirst = true;
  // console.log('checkedFirst', checkedFirst);
  return (
    <View style={styles.view}>
      <View style={styles.row}>
        <View style={styles.rowLeft}>
          <Text style={styles.habitText}>{rowData.text}</Text>
        </View>
        <View style={styles.rowRight}>
          <CheckBox
            value={this.state.value}
            disabled={false}
            onValueChange={(value) => {
              this.setState({ value })
            }}
          />
          <View style={styles.buddyArea}>
            <BuddyArea habitText={rowData.text}/>
          </View>
        </View>
      </View>
    </View>
    )
};
