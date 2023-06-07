const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const { connectToDatabase, addBlog} = require('./mongo')
const Blog = require('./models/blog')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

//const Blog = mongoose.model('Blog', blogSchema)

//const mongoUrl = process.env.MONGODB_URI // 
//const mongoUrl = 'mongodb://localhost/bloglist'
//mongoose.connect(mongoUrl)


//ERROR HANDLER
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

//GET
app.get('/api/blogs/:id', (request, response, next) => {
  const id = Number(request.params.id)
  console.log('GET started')

  Blog.findById(id)
    .then((blog) => {
      if (blog) {
        console.log('Blogs:', blog)
        response.json(blog)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error))
})

app.get('/api/blogs', (req, res) => {
  Blog.find({})
    .then((blogs) => {
      res.json(blogs)
    })
    .catch((error) => next(error))
})


//POST
app.post('/api/blogs', (request, response, next) => {
  const body = request.body

  if (!body.title || !body.author || !body.url) {
    return response.status(400).json({ error: 'Title, author or url is missing' })
  }

  addBlog(body.title, body.author, body.url, body.likes)
    .then((savedBlog) => {
      response.json(savedBlog)
    })
    .catch((error) => next(error))
}, errorHandler)


//SERVER
const PORT = process.env.PORT || 3001

connectToDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`)
    })
  })
  .catch((error) => {
    console.error('Error connecting to database:', error)
    process.exit(1)
  })