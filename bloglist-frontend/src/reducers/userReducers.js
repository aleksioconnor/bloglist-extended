import loginService from '../services/login'
import blogsService from '../services/blogs'

export const logIn = (credentials) => {
  return async dispatch => {
    const login = await loginService.login(credentials)
    blogsService.setToken(login.token)
    window.localStorage.setItem('loggedUser', JSON.stringify(login) )
    dispatch({
      type: 'SET_USER',
      data: login
    })
  }
}

export const initUser = () => {
  const findLogin = window.localStorage.getItem('loggedUser')
  if(findLogin) {
    const user = JSON.parse(findLogin)
    blogsService.setToken(user.token)
    return({ type: 'SET_USER', data: user })
  }
  else return ({type: 'CLEAR_USER', data: null})
}

export const clearUser = () => {
  window.localStorage.removeItem('loggedUser')
  return ({ type: 'CLEAR_USER', data: null })
}
