const initialState = 'No notifications to display'

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case 'NEW_NOTIFICATION':
    return action.data.message
  case 'CLEAR_NOTIFICATION':
    return initialState
  default: return state
  }
}

export default reducer