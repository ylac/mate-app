import React, { Component } from 'react';
import { Text, View } from 'react-native';

var moment = require('moment');

export default class GridHeader extends Component {
  render() {
    return (
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}>
        <Text>{moment().format("dd")}</Text>
        <Text>{moment().subtract(1, 'days').format("dd")}</Text>
        <Text>{moment().subtract(2, 'days').format("dd")}</Text>
        <Text>Buddy</Text>
      </View>
    );
  }
}
