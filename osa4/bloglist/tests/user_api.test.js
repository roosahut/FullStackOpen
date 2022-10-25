const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany({})
  const passwordHashFirst = await bcrypt.hash('secret', 10)
  const passwordHashSecond = await bcrypt.hash('very_secret', 10)

  initialUsers = [
    {
      username: 'rosis',
      name: 'Roosa Huttunen',
      passwordHashFirst
    },
    {
      username: 'patu',
      name: 'Pete P',
      passwordHashSecond
    }
  ]

  await User.insertMany(initialUsers)
})

describe('creating a new user', () => {
  test('creation succeeds with correct values', async () => {
    const newUser = {
      username: 'cat',
      name: 'Kitty K',
      password: 'secret'
    }

    const usersAtStart = await helper.usersInDb()

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation not succesful without username', async () => {
    const newUser = {
      name: 'Kitty K',
      password: 'secret'
    }

    const usersAtStart = await helper.usersInDb()

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` is required')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation not succesful without password', async () => {
    const newUser = {
      username: 'cat',
      name: 'Kitty K'
    }

    const usersAtStart = await helper.usersInDb()

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('password missing')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation not succesful if username already taken', async () => {
    const newUser = {
      username: 'rosis',
      name: 'Roosa Huttunen',
      password: 'secret'
    }

    const usersAtStart = await helper.usersInDb()

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username must be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation not succesful with username under 3 characters', async () => {
    const newUser = {
      username: 'ca',
      name: 'Kitty K',
      password: 'secret'
    }

    const usersAtStart = await helper.usersInDb()

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('shorter than the minimum allowed length')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation not succesful with password under 3 characters', async () => {
    const newUser = {
      username: 'cat',
      name: 'Kitty K',
      password: 'se'
    }

    const usersAtStart = await helper.usersInDb()

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('password must be at least 3 characters')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})