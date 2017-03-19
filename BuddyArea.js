import React, { Component } from 'react';
import { AppRegistry, Image, ListView, PermissionsAndroid, StyleSheet, Text, TextInput, View } from 'react-native';
import * as Redux from 'react-redux';
import * as actions from './android/app/src/actions/actions.js';
var SelectContacts = require('react-native-select-contact-android');
import ContactsWrapper from 'react-native-contacts-wrapper';
import Button from 'react-native-button';

export class BuddyArea extends Component {
  addBuddy() {
    // this.requestContactsPermission();
    var {dispatch, habitText} = this.props;
    ContactsWrapper.getContact()
      .then((contact) => {
        console.log('contact', contact);
        dispatch(actions.addBuddy(contact, habitText));
        this.setState({});
      })
      .catch((error) => {
          console.log("ERROR CODE: ", error.code);
          console.log("ERROR MESSAGE: ", error.message);
      });
  }
  // async requestContactsPermission() {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
  //       {
  //         'title': 'Mate App Contacts Permission',
  //         'message': 'Mate App needs access to your contacts ' +
  //                    'so you can choose a buddy.'
  //       }
  //     )
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       console.log("You can access the contacts")
  //     } else {
  //       console.log("Contacts permission denied")
  //     }
  //   } catch (err) {
  //     console.warn(err)
  //   }
  // }
  render() {
    var {habitText, habits} = this.props;
    console.log('habits', habits);
    var selectedHabit = habits.filter((habit) => {
      return habit.text === habitText;
    });
    console.log('selectedHabit', selectedHabit);
    var renderBuddyArea = () => {
      if (!selectedHabit[0].buddies) {
        return (
          <View style={{ height: 20, width: 30 }}>
            <Button
              containerStyle={{padding:0, height:25, overflow:'hidden', borderRadius:4}}
              style={{fontSize: 20, color: 'black'}}
              onPress={this.addBuddy.bind(this)}>
              +
            </Button>
          </View>
        );
      } else {
        var buddyId = selectedHabit[0].buddies.photo ? selectedHabit[0].buddies.photo : selectedHabit[0].buddies.name;
        console.log('buddyId', buddyId);
        return (
          <Image
            style={{width: 30, height: 30, paddingTop: 20 }}
            source={require('./kevin.jpg')}/>
        );
      }
    };
    return (
      <View>
        {renderBuddyArea()}
      </View>
    )
  }
};

export default Redux.connect(
  (state) => {
    return state;
  }
)(BuddyArea);
