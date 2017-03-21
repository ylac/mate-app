import moment from 'moment';
import {REHYDRATE} from 'redux-persist/constants';

export var habitReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_HABIT':
      // console.log('newState', newState);
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          dates: action.dates
        }
      ];
    case 'TOGGLE_HABIT':
      var newState = state;
      newState.forEach((habit) => {
        if (habit.id === action.habitID) {
          var date = moment().subtract(action.checkboxID, 'days').format("D-M-YYYY");
          habit.dates[date] = action.checked;
        }
      });
      console.log('newState', newState);
      return newState;
    case 'DELETE_HABIT':
      var newState = state.filter((habit) => {
        return action.id !== habit.id;
      });
      return newState;
    case 'ADD_BUDDY':
      let newState = state;
      newState.forEach((habit) => {
        if (habit.text === action.habit) {
          habit.buddies = {
            name: action.name,
            phone: action.phone,
            photo: action.photo
          };
        }
      });
      return newState;
    default:
      return state;
  }
};
