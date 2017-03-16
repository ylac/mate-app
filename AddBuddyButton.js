import React, { Component } from 'react';
import { AppRegistry, Button, ListView, PermissionsAndroid, StyleSheet, Text, TextInput, View } from 'react-native';
var SelectContacts = require('react-native-select-contact-android');
import ContactsWrapper from 'react-native-contacts-wrapper';

export default class AddBuddyButton extends Component {
  addBuddy() {
    // this.requestContactsPermission();
    console.log(ContactsWrapper);
    ContactsWrapper.getContact()
        .then((contact) => {
            // Replace this code
            console.log(contact);
        })
        .catch((error) => {
            console.log("ERROR CODE: ", error.code);
            console.log("ERROR MESSAGE: ", error.message);
        });
  }
  async requestContactsPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          'title': 'Mate App Contacts Permission',
          'message': 'Mate App needs access to your contacts ' +
                     'so you can choose a buddy.'
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can access the contacts")
      } else {
        console.log("Contacts permission denied")
      }
    } catch (err) {
      console.warn(err)
    }
  }
  render() {
    return (
      <Button
      title="+"
      style={{
        flex: 0.5
      }}
      onPress={this.addBuddy.bind(this)}
      />
    )
  }
};