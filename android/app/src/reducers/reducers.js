export var habitReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_HABIT':
      var newState = state;
      newState.push({
        text: action.text
      });
      return newState;
    default:
      return state;
  }
};
