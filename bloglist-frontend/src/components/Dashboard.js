import React from 'react'
import Blog from './Blog'
import { connect } from 'react-redux'
import { createBlog } from '../reducers/blogReducers'
import { createNotification, clearNotification } from '../reducers/notificationReducers'


const LogOut = () => {
  const logUserOut = () => {
    window.localStorage.removeItem('loggedUser')
  }
  return (
    <button onClick={() => {logUserOut()}}>Logout</button>
  )
}

const AddBlog = ({
  user,
  title,
  setTitle,
  author,
  setAuthor,
  url,
  setUrl,
  createNot,
  clearNot,
  blogVisible,
  setBlogVisible,
  newBlog
}) => {


  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      newBlog({
        title, author, url, user
      })
      createNot(`a new blog ${title} by ${author} added`)
      setTimeout(() => {
        clearNot()
      }, 5000)
      setTitle('')
      setAuthor('')
      setUrl('')



    } catch(e) {
      createNot('blog was not added')
      setTimeout(() => {
        clearNot()
      }, 5000)
    }
  }


  const hideWhenVisible = { display : blogVisible ? 'none' : '' }
  const showWhenVisible = { display : blogVisible ? '' : 'none' }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={() => setBlogVisible(true)}>add blog</button>
      </div>
      <div style={showWhenVisible}>
        <h3>create new</h3>
        <form onSubmit={handleSubmit}>
                title:
          <input
            type='text'
            value={title}
            name='title'
            onChange={({ target }) => setTitle(target.value)}
          />
                author:
          <input
            type='text'
            value={author}
            name='author'
            onChange={({ target }) => setAuthor(target.value)}
          />
                url:
          <input
            type='text'
            value={url}
            name='url'
            onChange={({ target }) => setUrl(target.value)}
          />
          <button type='submit'>create</button>
        </form>
        <button onClick={() => setBlogVisible(false)}>cancel</button>
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
      <LogOut />
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
        user={props.user}
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
  createBlog
}

const mapStateToProps = (state) => {
  return {
    notifications: state.notifications,
    blogs: state.blogs,
  }
}

const ConnectedDashboard = connect(mapStateToProps, mapDispatchToProps)(Dashboard)

export default ConnectedDashboard
