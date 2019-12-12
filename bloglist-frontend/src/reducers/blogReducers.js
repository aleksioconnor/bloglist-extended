import blogService from '../services/blogs'

export const createBlog = (content) => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog,
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const anecdotes = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: anecdotes,
    })
  }
}

export const removeBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'REMOVE_BLOG',
      data: id
    })
  }
}

export const likeBlog = (blog, id) => {
  return async dispatch => {
    const returnblog = await blogService.like(blog, id)
    dispatch({
      type: 'LIKE_BLOG',
      data: returnblog
    })
  }
}
