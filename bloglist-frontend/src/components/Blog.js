import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createBlog, removeBlog, likeBlog } from '../reducers/blogReducers'
import { Link } from 'react-router-dom'



const Blog = (props) => {
  const blogStyle = {
    padding: 10,
    paddingLeft: 0,
    border: '1px solid black',
    margin: 10,
    marginLeft: 0,
    display: 'flex',
  }
  const titleStyle = {
    cursor: 'pointer',
  }

  const likeBlogHandler = async () => {
    const title = props.blog.title
    const author = props.blog.author
    const url = props.blog.url
    const user = props.blog.user.id
    const likes = props.blog.likes + 1
    const id = props.blog._id
    props.likeBlog({ title, author, url, user, likes }, id)
  }

  const removeBlogHandler = async (title, author, id) => {
    const conf = window.confirm(`Are you sure you want to remove ${title} by ${author}?`) 
    conf && props.removeBlog(id)
  }

  return (
    <div style={blogStyle}>
      <Link to={`/blogs/${props.blog._id}`}>
        <div style={titleStyle}>{props.blog.title}</div>
        <div> {props.blog.author} </div>
        <a href={props.blog.url}>{props.blog.url}</a>
        <div>added by {props.blog.user.username}</div>
      </Link>
      <div>{props.blog.likes} likes<button onClick={ ()=> likeBlogHandler()}>like</button> </div>
      <button onClick={() => removeBlogHandler(props.blog.title, props.blog.author, props.blog._id)}>remove</button>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  setBlogs: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
  }
}

const mapDispatchToProps = {
  createBlog,
  removeBlog,
  likeBlog
}

const ConnectedBlog = connect(mapStateToProps, mapDispatchToProps)(Blog)
export default ConnectedBlog