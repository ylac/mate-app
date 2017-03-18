export function addBuddy() {
  return {
    type: 'ADD_BUDDY'
  }
}

export function addHabit(text) {
  return {
    type: 'ADD_HABIT',
    text
  }
}
