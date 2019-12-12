import React, { useState, useEffect } from 'react'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import { initializeBlogs } from './reducers/blogReducers'
import { initUser } from './reducers/userReducers'
import { connect } from 'react-redux'




function App(props) {


  // State declarations
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [blogVisible, setBlogVisible] = useState(false)

  useEffect( () => {
    props.initUser()
    props.initializeBlogs()
  }, [])

  const loginForm = () => (
    <Login/>
  )

  const dashboard = () => (
    <Dashboard
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
      {props.user_ === null && loginForm()}
      {props.user_ !== null && dashboard()}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user_: state.user
  }
}


export default connect(mapStateToProps, { initializeBlogs, initUser })(App)
