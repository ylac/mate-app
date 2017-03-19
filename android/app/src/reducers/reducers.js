export var habitReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_HABIT':
      var newState = state;
      newState.push({
        text: action.text
      });
      return newState;
    case 'TOGGLE_HABIT':
      var newState = state;
      newState.forEach((habit) => {
        if (habit.id === action.id) {
          habit.checked = !habit.checked
        }
      });
      console.log('newState', newState);
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
      console.log('newState', newState);
      return newState;
    default:
      return state;
  }
};
