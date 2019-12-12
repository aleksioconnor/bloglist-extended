import React, { useState, useEffect } from 'react'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import Users from './components/Users'
import SimpleBlog from './components/SimpleBlog'
import UserView from './components/UserView'
import { likeBlog } from './reducers/blogReducers'
import { initializeBlogs } from './reducers/blogReducers'
import { initUser } from './reducers/userReducers'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'




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
    <div>
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

    </div>
  )

  const Testi = () => {
    return (
      <div>
        {props.user_ === null && loginForm()}
        {props.user_ !== null && dashboard()}
      </div>
    )
  }

  return (
    <div>
      <Router>
        <div className='nav'>
          <Link to='/'>blogs </Link>
          <Link to='/users'>users</Link>
        </div>
        <div className="App">
          <Route exact path="/users" render={() => <Users /> } />
          <Route exact path="/" render={() => <Testi /> } />
          <Route exact path="/user/:id" render={({ match }) =>
            <UserView user={ match.params.id }  />
          } />
          <Route exact path="/blogs/:id" render={({ match }) =>
          {
            if (props.blogs.length < 1) {
              return null
            }
            else {
              const blog = props.blogs.find(n => n._id === match.params.id)
              return (
                <SimpleBlog blog={blog} onClick={() => props.likeBlog({ ...blog, likes: blog.likes + 1 }, blog._id)}  />
              )
            }
          }
          } />
        </div>
      </Router>
    </div>

  )
}

const mapStateToProps = (state) => {
  return {
    user_: state.user,
    blogs: state.blogs
  }
}


export default connect(mapStateToProps, { initializeBlogs, initUser, likeBlog })(App)
