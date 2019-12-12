import React, { useState, useEffect } from 'react'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import blogsService from './services/blogs'
import { initializeBlogs } from './reducers/blogReducers'
import { connect } from 'react-redux'




function App(props) {

  useEffect(() => {
    props.initializeBlogs()
  })

  // State declarations
  const [user, setUser] = useState(null)
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [blogVisible, setBlogVisible] = useState(false)

  useEffect( () => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogsService.setToken(user.token)
    }
  }, [])

  const loginForm = () => (
    <Login
      user={user}
      setUser={setUser}
    />
  )

  const dashboard = () => (
    <Dashboard
      user={user}
      title={title}
      setTitle={setTitle}
      author={author}
      setAuthor={setAuthor}
      url={url}
      setUrl={setUrl}
      blogVisible={blogVisible}
      setBlogVisible={setBlogVisible}
    />
  )

  return (
    <div className="App">
      {user === null && loginForm()}
      {user !== null && dashboard()}
    </div>
  )
}




export default connect(null, { initializeBlogs })(App)
