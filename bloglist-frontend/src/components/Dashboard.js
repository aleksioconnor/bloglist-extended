import React from 'react'
import Blog from './Blog'
import { connect } from 'react-redux'
import { createBlog } from '../reducers/blogReducers'
import { createNotification, clearNotification } from '../reducers/notificationReducers'
import { clearUser } from '../reducers/userReducers'



const LogOut = (props) => {
  return (
    <button onClick={() => props.logOut()}>Logout</button>
  )
}



const AddBlog = (props) => {


  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const title = props.title
      const author = props.author
      const url = props.url
      const user = props.user
      props.newBlog({
        title, author, url, user
      })
      props.createNot(`a new blog ${props.title} by ${props.author} added`)
      setTimeout(() => {
        props.clearNot()
      }, 5000)
      props.setTitle('')
      props.setAuthor('')
      props.setUrl('')



    } catch(e) {
      props.createNot('blog was not added')
      setTimeout(() => {
        props.clearNot()
      }, 5000)
    }
  }


  const hideWhenVisible = { display : props.blogVisible ? 'none' : '' }
  const showWhenVisible = { display : props.blogVisible ? '' : 'none' }

  const styles = {
    addBlog: {
      color: 'red',
    },
    title: {
      display: 'flex',
      textAlign: 'center',
      justifyContent: 'space-around'
    }
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={() => props.setBlogVisible(true)}>add blog</button>
      </div>
      <div style={ { ...showWhenVisible, ...styles.addBlog } }>
        <h3>create new</h3>
        <form onSubmit={handleSubmit}>
                title:
          <input
            type='text'
            value={props.title}
            name='title'
            onChange={({ target }) => props.setTitle(target.value)}
          />
                author:
          <input
            type='text'
            value={props.author}
            name='author'
            onChange={({ target }) => props.setAuthor(target.value)}
          />
                url:
          <input
            type='text'
            value={props.url}
            name='url'
            onChange={({ target }) => props.setUrl(target.value)}
          />
          <button type='submit'>create</button>
        </form>
        <button onClick={() => props.setBlogVisible(false)}>cancel</button>
      </div>
    </div>
  )
}


const Dashboard = (props) => {
  return (
    <div>
      <p>
        {props.notifications}
      </p>
        Hello {props.user.username}
      <LogOut logOut={props.clearUser}/>
      <div>
        <h2>blogs</h2>
        {props.blogs
          .sort((a, b) => b.likes - a.likes)
          .map(blog =>
            <Blog key={blog._id} blog={blog}/>
          )}
      </div>
      <AddBlog
        title={props.title}
        setTitle={props.setTitle}
        author={props.author}
        setAuthor={props.setAuthor}
        url={props.url}
        setUrl={props.setUrl}
        createNot={props.createNotification}
        clearNot={props.clearNotification}
        setBlogVisible={props.setBlogVisible}
        blogVisible={props.blogVisible}
        newBlog={props.createBlog}
      />

    </div>
  )
}

const mapDispatchToProps = {
  createNotification,
  clearNotification,
  createBlog,
  clearUser
}

const mapStateToProps = (state) => {
  return {
    notifications: state.notifications,
    blogs: state.blogs,
    user: state.user
  }
}

const ConnectedDashboard = connect(mapStateToProps, mapDispatchToProps)(Dashboard)

export default ConnectedDashboard

