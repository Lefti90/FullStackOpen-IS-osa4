const mongoose = require('mongoose')
const blog = require('./models/blog')
require('dotenv').config()

let db // Store the MongoDB client connection

const connectToDatabase = async () => {
  try {
    db = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('Connected to MongoDB')
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
    process.exit(1)
  }
}

const addBlog = async (title, author, url, likes) => {
  try {
    const blog = new Blog({
      title,
      author,
      url,
      likes
    })
    const savedblog = await blog.save()
    console.log(`Added ${savedblog.title} to the bloglist`)
    return savedblog
  } catch (error) {
    console.error('Error adding a blog:', error)
    throw error
  }
}

module.exports = {
  connectToDatabase,
  addBlog,
  db, // Export the MongoDB client connection
}