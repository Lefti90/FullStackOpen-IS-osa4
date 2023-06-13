const blog = require("../models/blog")

const dummy = (blogs) => {
    return 1
  }

const likes = (blogs) => {
    const totalLikes = blogs.reduce((sum, blog) => {
      return sum + blog.likes
    }, 0)
    return totalLikes
  }

const favorite = (blogs) =>{
    const maxLikes = Math.max(...blogs.map((blog) => blog.likes))
    return blogs.find((blog) => blog.likes === maxLikes)
}

  module.exports = {
    dummy,
    likes,
    favorite
  }