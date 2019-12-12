import React from 'react'

const SimpleBlog = ({ blog, onClick }) => (
  <div>
    <div className='title-author'>
      <h1>{blog.title}</h1> {blog.author}
    </div>
    <div className='likes'>
      blog has {blog.likes} likes
      <button onClick={onClick}>like</button>
      {console.log(blog)}
      <div>url is {blog.url}</div>
      <div>added by {blog.user.username}</div>
    </div>
  </div>
)

export default SimpleBlog