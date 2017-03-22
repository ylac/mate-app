import React, { Component } from 'react';
import { Dimensions, Image, ListView, Picker, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
var { connect, Provider } = require('react-redux');
import moment from 'moment';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import ActionButton from 'react-native-action-button';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
// import Button from 'react-native-button';
import { Button, Icon } from 'react-native-elements';
import CheckBox from 'react-native-android-checkbox';
import Modal from 'react-native-modalbox';
import Slider from 'react-native-slider';
import Swipeable from 'react-native-swipeable';
import SwipeList from 'react-native-smooth-swipe-list';
import ContactsWrapper from 'react-native-contacts-wrapper';
import Communications from 'react-native-communications';
var SendIntentAndroid = require('react-native-send-intent');
var SmsAndroid = require('react-native-sms-android');

import * as actions from './../actions/actions.js';
import BuddyArea from './../components/BuddyArea';
import styleSheet from './../styles/index.js';
const styles = styleSheet;

var screen = Dimensions.get('window');
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2, sectionHeaderHasChanged: (s1, s2) => s1 !== s2});
var store = require('./../store/configureStore').configure();

export class Container extends Component {
  constructor() {
    super();
    this.state = {
      value: false,
      editable: false,
      textInputCounter: 0,
      selectedHabit: {},
      messageText: `Yo, I'mma hit the gym 3/3 times this week. Howzat?`
    }
    this.chooseBuddy = this.chooseBuddy.bind(this);
    this.renderBuddyArea = this.renderBuddyArea.bind(this);
    this.rowRenderer = this.rowRenderer.bind(this);
    this.deleteHabit = this.deleteHabit.bind(this);
    this.editHabit = this.editHabit.bind(this);
    this.toggleHabit = this.toggleHabit.bind(this);
  }
  openAddBuddyModal(selectedHabit) {
    this.setState({
      selectedHabit
    });
    console.log('selectedHabitText', selectedHabit.text);
    this.refs.modal.open();
  }
  chooseBuddy(habitID) {
    var {dispatch} = this.props;
    ContactsWrapper.getContact()
      .then((contact) => {
        console.log('contact', contact);
        dispatch(actions.addBuddy(contact, habitID));
        this.forceUpdate();
      })
      .catch((error) => {
          console.log("ERROR CODE: ", error.code);
          console.log("ERROR MESSAGE: ", error.message);
      });
  }
  deleteBuddy(habitID) {
    this.props.dispatch(actions.deleteBuddy(habitID));
    this.refs.modal.close()
    this.forceUpdate();
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
  editHabit(rowData, secId, rowId, rowMap, selectedHabit) {
    rowMap[`${secId}${rowId}`].closeRow();
    this.openAddBuddyModal(selectedHabit)
  }
  toggleHabit(checked, rowData, checkboxID) {
    this.props.dispatch(actions.toggleHabit(checked, rowData.id, checkboxID));
    this.setState({checked});
  }
  updateHabit(id, text) {
    this.props.dispatch(actions.updateHabit(id, text))
    this.setState({editable: false});
  }
  renderBuddyArea(id) {
    var {habits} = this.props;
    var selectedHabit = habits.filter((habit) => {
      return habit.id === id;
    })[0];
    if (selectedHabit.buddies) {
      var buddyId = selectedHabit.buddies.photo ? selectedHabit.buddies.photo : selectedHabit.buddies.name;
      console.log('buddyId', buddyId);
      return (
        <Image
          style={{width: 30, height: 30, paddingTop: 20 }}
          source={require('./../img/kevin.jpg')}/>
      );
    }
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
    console.log('habits', habits);
    if (habits.length > 0) {
      var selectedHabit = habits.filter((habit) => {
        return habit.id === rowData.id;
      })[0];
      console.log('selectedHabit', selectedHabit);
      var checkedValue = (date) => {
        return selectedHabit.dates[date]
      };
      var renderRightButton = (selectedHabit) => {
        if (!selectedHabit.hasOwnProperty("buddies")) {
          return <Icon name='person-add' onPress={() => {
              rowMap[`${secId}${rowId}`].closeRow();
              this.openAddBuddyModal(selectedHabit);
              this.chooseBuddy(selectedHabit.id);
            }}></Icon>
        } else {
          return <Icon name='mode-edit' style={styles.sideButtons}
            onPress={() => {
              rowMap[`${secId}${rowId}`].closeRow();
              this.editHabit(rowData, secId, rowId, rowMap, selectedHabit)
            }}
            >Edit
          </Icon>
        }
      }
    }
    return (
      <SwipeRow
        disableRightSwipe={false}
  			disableLeftSwipe={false}
  			leftOpenValue={80}
  			rightOpenValue={-80}
      >
        <View style={styles.hiddenRow}>
          <Icon name='delete' style={styles.sideButtons} onPress={() => this.deleteHabit(rowData, secId, rowId, rowMap)}>Delete</Icon>
          {renderRightButton(selectedHabit)}
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
                value={checkedValue(date0)}
                disabled={false}
                onValueChange={(value) => {
                  this.toggleHabit(value, rowData, 0);
                }}
              />
              <CheckBox
                value={checkedValue(date1)}
                disabled={false}
                onValueChange={(value) => {
                  this.toggleHabit(value, rowData, 1);
                }}
              />
              <CheckBox
                value={checkedValue(date2)}
                disabled={false}
                onValueChange={(value) => {
                  this.toggleHabit(value, rowData, 2);
                }}
              />
              <View style={styles.buddyArea}>
                {this.renderBuddyArea(rowData.id)}
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
      <View style={styles.container}>
        <TextInput
          placeholder="Enter new habit here"
          style={styles.textInput}
          onSubmitEditing={this.addHabit.bind(this)}
          ref="newHabit"
        />
        <ScrollView>
          <SwipeListView
            dataSource={ds.cloneWithRows(habits)}
            renderHeader={this.rowHeader}
            renderRow={this.rowRenderer}
            style={styles.listView}
          />
        </ScrollView>
        <Icon
          raised
          name='add-circle-outline'
          onPress={() => console.log('You pressed me!')}
          underlayColor='red'
        />
        <Modal style={styles.modal} position={"center"} ref={"modal"}>
          <ScrollView contentContainerStyle={styles.modalView}>
            <Text>Manage buddy for "{this.state.selectedHabit.text}"</Text>
            <View>
              <Icon name='person-add' onPress={() => this.chooseBuddy(this.state.selectedHabit.id)}></Icon>
              <Icon name='delete' onPress={() => this.deleteBuddy(this.state.selectedHabit.id)}></Icon>
            </View>
            <Text>Progress message</Text>
            <TextInput
              value={this.state.messageText}
              mutliline={true}
              numberOfLines={4}
              maxLength={200}
            />
            <Text>Message Timing</Text>
            <Picker
              selectedValue={this.state.messageTiming}
              onValueChange={(timing) => this.setState({messageTiming: timing})}
              prompt='Message Timing'>
              <Picker.Item label="After completing every habit" value="afterEachHabit" />
              <Picker.Item label="Weekly" value="weekly" />
            </Picker>
            <Button onPress={() => {
                SmsAndroid.sms('0403182826', this.state.messageText, 'sendDirect', // sendDirect or sendIndirect
                  (err, message) => {
                    if (err){
                      console.log("error");
                    } else {
                      console.log('SMS', message); // callback message
                    }
                  }
                );
            }}>Send SMS</Button>
          </ScrollView>
        </Modal>
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
