const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const Comment = require('../models/comment')
const User = require ('../models/user') // mock
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog
      .find({}).populate('user', {username: 1, name: 1, id: 1})

    response.json(blogs)
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.post('/:id/comments', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)
    request.body.blog = blog._id
    const comment = new Comment(request.body)
    const res = await comment.save()
    response.status(201).json(res)
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.get('/:id/comments', async (request, response, next) => {
  const res = await Comment.find({blog: request.params.id})
  console.log(res)
  response.status(201).json(res)
})

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogsRouter.post('/', async (request, response, next) => {
  const token = getTokenFrom(request)
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)
    request.body.user = user._id
    const blog = new Blog(request.body)
    const res = await blog.save()
    // res must be saved to user
    user.blogs = user.blogs.concat(res._id) // add current blog id reference to user
    await user.save()
    response.status(201).json(res)
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
    const token = getTokenFrom(request)
    try {
      const decodedToken = jwt.verify(token, process.env.SECRET)
      if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
      }
      const blog = await Blog.findById(request.params.id)
      console.log(blog)
  
      if (blog.user.toString() === decodedToken.id) {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
      } else {
        response.status(404).end()
      }
    }  
    catch(exception) {
      next(exception)
    }
  


})

blogsRouter.put('/:id', async (request, response, next) => {
  try {
    // const blog = new Blog(request.body)
    const { author, title, url,likes } = request.body
    const blog = {
      author, title, url, likes,
    }
    const result = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true
    })
    response.json(result)
  } catch (exception) {
    console.log(exception)
    next(exception)
  }
})

module.exports = blogsRouter