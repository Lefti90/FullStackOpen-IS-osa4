const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const { title, author, url, likes } = request.body

  const blog = new Blog({
    title,
    author,
    url,
    likes,
  })

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})


blogsRouter.delete('/', async (request, response) => {
  const { title } = request.body

  try {
    const deletedBlog = await Blog.findOneAndDelete({ title })

    if (deletedBlog) {
      response.status(204).end()
    } else {
      response.status(404).json({ error: 'Blog not found' })
    }
  } catch (error) {
    response.status(500).json({ error: 'Something went wrong' })
  }
})

module.exports = blogsRouter