const dummy = (blogs) => {
    return 1
  }

const likes = (blogs) => {
    const totalLikes = blogs.reduce((sum, blog) => {
      return sum + blog.likes
    }, 0)
    return totalLikes
  }

  module.exports = {
    dummy,
    likes
  }