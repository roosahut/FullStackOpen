const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const bcrypt = require('bcrypt')
const User = require('../models/user')


beforeEach(async () => {
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('secret', 10)
  const user = new User({ username: 'rosis', passwordHash })
  await user.save()

  await Blog.deleteMany({})
  const blogOne = new Blog({
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    user: user.id
  })
  await blogOne.save()
  const blogTwo = new Blog({
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    user: user.id
  })
  await blogTwo.save()
})

describe('saved notes', () => {
  test('returns the correct amount of blogs as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialLength)
  })

  test('the identifier is called id', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach(blog => {
      expect(blog.id).toBeDefined()
    })
  })
})

describe('addition of a new blog', () => {
  test('a blog can be added', async () => {
    const newBlog = {
      title: 'koirat',
      author: 'kissa',
      url: 'www.kissa.lol',
      likes: 100
    }

    const userLogging = {
      username: 'rosis',
      password: 'secret'
    }

    const response = await api
      .post('/api/login')
      .send(userLogging)
      .expect(200)

    const token = response._body.token

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialLength + 1)

    const titles = blogsAtEnd.map(n => n.title)
    expect(titles).toContain(
      'koirat'
    )
  })

  test('if likes is not given a value it is 0', async () => {
    const newBlog = {
      title: 'kissa',
      author: 'jee',
      url: 'hmm'
    }

    const userLogging = {
      username: 'rosis',
      password: 'secret'
    }

    const response = await api
      .post('/api/login')
      .send(userLogging)
      .expect(200)

    const token = response._body.token

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialLength + 1)

    const likes = blogsAtEnd.map(n => n.likes)
    expect(likes[helper.initialLength]).toBe(0)
  })

  test('blog without title and url is not added', async () => {
    const newBlog = {
      author: 'jee'
    }

    const userLogging = {
      username: 'rosis',
      password: 'secret'
    }

    const response = await api
      .post('/api/login')
      .send(userLogging)
      .expect(200)

    const token = response._body.token

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialLength)
  })

  test('blog is not added without token and returns 401', async () => {
    const newBlog = {
      title: 'kissa',
      author: 'jee',
      url: 'hmm'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialLength)
  })
})

describe('blog deletion with id', () => {
  test('succeeds with status code 204', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    const userLogging = {
      username: 'rosis',
      password: 'secret'
    }

    const response = await api
      .post('/api/login')
      .send(userLogging)
      .expect(200)

    const token = response._body.token
    console.log(response._body)

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send()
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(
      helper.initialLength - 1
    )
  })
})

describe('blog update with id', () => {
  test('succeeds with status code 201', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    const update = {
      likes: 10
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(update)
      .expect(201)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialLength)

    expect(blogsAtEnd[0].likes).toBe(10)
  })
})

afterAll(() => {
  mongoose.connection.close()
})