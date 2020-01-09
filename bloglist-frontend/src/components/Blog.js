import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createBlog, removeBlog, likeBlog } from '../reducers/blogReducers'
import { Link } from 'react-router-dom'



const Blog = (props) => {
  const blogStyle = {
    padding: 10,
    paddingLeft: 10,
    border: '2px solid black',
    margin: 10,
    marginLeft: 0,
    display: 'flex',
    maxWidth: 600
  }

  const titleStyle = {
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'space-around',
    cursor: 'pointer',
    color: 'black',
    textDecoration: 'none'
  }
  const spacing = {
    marginRight: '5px',
    border: '1px solid gray',
    padding: 5
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
      <Link style={titleStyle} to={`/blogs/${props.blog._id}`}>
        <div style={spacing}>title: {props.blog.title}</div>
        <div style={spacing}>author: {props.blog.author} </div>
        <a style={spacing} href={props.blog.url}>url: {props.blog.url}</a>
        <div style={spacing}>added by {props.blog.user.username}</div>
      </Link>
      <div style={spacing}>{props.blog.likes} likes <button onClick={ ()=> likeBlogHandler()}>like</button> </div>
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