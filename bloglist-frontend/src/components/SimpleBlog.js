import React from 'react'
import { useState, useEffect } from 'react'
import commentService from '../services/comments'


const SimpleBlog = ({ blog, onClick }) => {

  const handleSubmit = async (event) => { 
    event.preventDefault()
    await commentService.create( { content: title }, blog._id)
  }
  const getComments = async () => {
    const comments = await commentService.getAll(blog._id)
    const formattedComments = comments.map((n) => n.content)
    setComments(formattedComments)
  }

  const [title, setTitle] = useState('')
  const [comments, setComments] = useState(null)

  useEffect(() => {
    getComments()
  }, [])


  return (
    <div>
      <div className='title-author'>
        <h1>{blog.title}</h1> {blog.author}
      </div>
      <div className='likes'>
        blog has {blog.likes} likes
        <button onClick={onClick}>like</button>
        <div>url is {blog.url}</div>
        <div>added by {blog.user.username}</div>
        <h4>comments</h4>
        {comments ? comments.map((n, i) => <li key={i}>{n}</li>) : null}
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            value={title}
            name='title'
            onChange={({ target }) => setTitle(target.value)} />
          <button type='submit'>add comment</button>
        </form>
      </div>
    </div>
  )
}

export default SimpleBlog




