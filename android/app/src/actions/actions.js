const uuid = require('uuid/v4');
import moment from 'moment';

export function addHabit(text) {
  var date1 = moment().format("D-M-YYYY");
  var date3 = moment().subtract(1, 'days').format("D-M-YYYY");
  var date2 = moment().subtract(2, 'days').format("D-M-YYYY");
  var obj = {
    type: 'ADD_HABIT',
    id: uuid(),
    text,
    dates: {}
  };
  obj.dates[date1] = false;
  obj.dates[date2] = false;
  obj.dates[date3] = false;
  return obj;
}

export function toggleHabit(checked, habitID, checkboxID) {
  return {
    type: 'TOGGLE_HABIT',
    checked,
    habitID,
    checkboxID
  }
}

export function updateHabit(id, text) {
  return {
    type: 'UPDATE_HABIT',
    id,
    text
  }
}

export function deleteHabit(id) {
  return {
    type: 'DELETE_HABIT',
    id
  }
}

export function addBuddy(contact, habitID) {
  return {
    type: 'ADD_BUDDY',
    habitID,
    name: contact.name,
    phone: contact.phone,
    photo: contact.photo
  }
}

export function deleteBuddy(habitID) {
  return {
    type: 'DELETE_BUDDY',
    habitID
  }
}
