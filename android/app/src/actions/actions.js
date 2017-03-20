const uuid = require('uuid/v4');
import moment from 'moment';

export function addBuddy(contact, habit) {
  return {
    type: 'ADD_BUDDY',
    habit,
    name: contact.name,
    phone: contact.phone,
    photo: contact.photo
  }
}

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
