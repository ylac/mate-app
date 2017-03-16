import React, { Component } from 'react';
import {
  AppRegistry,
  Button,
  ListView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import { Body, CheckBox, Container, Content, Item, Input, Icon, ListItem } from 'native-base';
import AddBuddyButton from './AddBuddyButton';


export default class MateApp extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var initData = ['Go jogging', 'Eat flaxseed oil'];
    this.state = {
      dataSource: ds.cloneWithRows(initData),
      db: initData
    };
  }
  addHabit() {
    var text = this.refs.newHabit._lastNativeText;
    this.refs.newHabit.setNativeProps({text: ''});
    var newData = this.state.db.slice();
    newData.push(text);
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(newData),
      db: newData
    });
  }
  render() {
    return (
      <View style={styles.view}>
        <TextInput
          placeholder="Enter new habit here"
          style={styles.textInput}
          onSubmitEditing={this.addHabit.bind(this)}
          ref="newHabit"
        />
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) =>
            <View style={styles.row}>
              <Text>{rowData}</Text>
              <AddBuddyButton/>
            </View>
          }
          style={styles.listView}
        />
      </View>
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
