import React, { Component } from 'react';
import { Dimensions, Image, ListView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
var { connect, Provider } = require('react-redux');
import moment from 'moment';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import ActionButton from 'react-native-action-button';
// import Button from 'react-native-button';
import { Button, Icon } from 'react-native-elements';
import CheckBox from 'react-native-android-checkbox';
import Modal from 'react-native-modalbox';
import Slider from 'react-native-slider';
import Swipeable from 'react-native-swipeable';
import SwipeList from 'react-native-smooth-swipe-list';
import ContactsWrapper from 'react-native-contacts-wrapper';


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
      selectedHabit: {}
    }
    this.chooseBuddy = this.chooseBuddy.bind(this);
    this.renderBuddyArea = this.renderBuddyArea.bind(this);
    this.rowRenderer = this.rowRenderer.bind(this);
    this.deleteHabit = this.deleteHabit.bind(this);
    this.editHabit = this.editHabit.bind(this);
  }
  openAddBuddyModal(selectedHabit) {
    this.setState({
      selectedHabit
    });
    console.log('selectedHabitText', selectedHabit.text);
    this.refs.modal4.open();
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
  renderBuddyArea(id) {
    var {habits} = this.props;
    var selectedHabit = habits.filter((habit) => {
      return habit.id === id;
    });
    if (!selectedHabit[0].buddies) {
      return (
        <View style={{ height: 20, width: 30 }}>
          <Icon
            name='person-add'
            onPress={() => this.openAddBuddyModal(selectedHabit[0])}>
          </Icon>
        </View>
      );
    } else {
      var buddyId = selectedHabit[0].buddies.photo ? selectedHabit[0].buddies.photo : selectedHabit[0].buddies.name;
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
        <Modal style={styles.modal} position={"center"} ref={"modal4"}>
          <ScrollView contentContainerStyle={styles.modalView}>
            <Text>Add buddy for "{this.state.selectedHabit.text}"</Text>
            <Icon
              name='person-add'
              onPress={() => this.chooseBuddy(this.state.selectedHabit.id)}>
            </Icon>
            <TextInput
              defaultValue={`Hey [name], I went jogging x/x times this week. Howzat?`}
            >
            </TextInput>
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
