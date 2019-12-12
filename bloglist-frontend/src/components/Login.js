import React from 'react'
import loginService from '../services/login'
import { useField } from '../hooks'
import { connect } from 'react-redux'
import { createNotification, clearNotification } from '../reducers/notificationReducers'


const Login = (props) => {

  const username = useField('text')
  const password = useField('text')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({'username': username.props.value, 'password': password.props.value })

      window.localStorage.setItem('loggedUser', JSON.stringify(user) )
      props.setUser(user)

    } catch(e) {
      props.createNotification('wrong credentials')
      setTimeout(() => {
        props.clearNotification()
      }, 5000)
    }
  }

  return (
    <div>
      <h1>Log in in to the application</h1>
      <p>
        {props.notifications}
      </p>
      <form onSubmit={handleLogin}>
        username:
        <input
          {...username.props}
        />
        password:
        <input
          {...password.props}
        />
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}


const mapDispatchToProps = {
  createNotification,
  clearNotification
}

const mapStateToProps = (state) => {
  return {
    notifications: state.notifications,
  }
}

const ConnectedLogin = connect(mapStateToProps, mapDispatchToProps)(Login)

export default ConnectedLogin
