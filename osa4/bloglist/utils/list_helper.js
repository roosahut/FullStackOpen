const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const likes = blogs.reduce((a, object) => {
    return a + object.likes
  }, 0)
  return likes
}

const favoriteBlog = (blogs) => {
  const favorite = blogs.sort((a, b) => {
    return b.likes - a.likes
  })
  return {
    title: favorite[0].title,
    author: favorite[0].author,
    likes: favorite[0].likes
  }
}

const mostBlogs = (blogs) => {
  const result = _.map(_.countBy(blogs, 'author'), (val, key) => ({
    author: key,
    blogs: val
  }))
  const resultSorted = result.sort((a, b) => {
    return b.blogs - a.blogs
  })
  return resultSorted[0]
}

const mostLikes = (blogs) => {
  const result = _.map(_.groupBy(blogs, 'author'), (val, key) => ({
    author: key,
    likes: _.sumBy(val, (o) => { return o.likes })
  }))
  const resultSorted = result.sort((a, b) => {
    return b.blogs - a.blogs
  })
  return resultSorted[0]
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}