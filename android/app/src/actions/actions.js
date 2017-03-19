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
  return {
    type: 'ADD_HABIT',
    text
  }
}

export function toggleHabit(id) {
  return {
    type: 'TOGGLE_HABIT',
    id
  }
}
