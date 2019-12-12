const initialState = null

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_USER':
    return action.data
  case 'CLEAR_USER':
    return initialState
  default: return state
  }
}

export default reducer