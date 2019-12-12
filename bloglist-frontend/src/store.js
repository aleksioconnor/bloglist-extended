import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const reducer = combineReducers({
  notifications: notificationReducer,
  blogs: blogReducer,
  user: userReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store