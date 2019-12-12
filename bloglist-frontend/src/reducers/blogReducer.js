

const initialState = [] // get this from axios

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case 'NEW_BLOG':
    return state.concat(action.data)
  case 'INIT_BLOGS':
    return action.data
  case 'REMOVE_BLOG':
    return state.filter(blog => blog._id !== action.data)
  case 'LIKE_BLOG':
    return state.map(n => n._id !== action.data._id ? n : { ...state.find(blog => blog._id === action.data._id), likes: action.data.likes })
  default: return state
  }
}

export default reducer