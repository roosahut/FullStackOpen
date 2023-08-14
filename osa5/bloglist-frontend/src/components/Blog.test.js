import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders title and author', () => {
  const blog = {
    title: 'Rendering test title',
    author: 'Testaaja',
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText('Rendering test title Testaaja')

  expect(element).toBeDefined()
})

test('shows url, likes and user, when view is clicked', async () => {
  const blog = {
    title: 'Rendering test',
    author: 'Testaaja',
    url: 'testi.fi',
    likes: 2,
    user: {
      id: 1,
      name: 'Testaaja 2',
    },
  }
  const userObject = {
    id: 23,
    name: 'Tester',
  }

  render(<Blog blog={blog} user={userObject} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const element1 = screen.getByText('testi.fi')
  expect(element1).toBeDefined()
  const element2 = screen.getByText('likes: 2')
  expect(element2).toBeDefined()
  const element3 = screen.getByText('Testaaja 2')
  expect(element3).toBeDefined()
})

test('if likes is pressed twice changeLikes is called twice', async () => {
  const blog = {
    title: 'Rendering test',
    author: 'Testaaja',
    url: 'testi.fi',
    likes: 2,
    user: {
      id: 1,
      name: 'Testaaja 2',
    },
  }
  const userObject = {
    id: 23,
    name: 'Tester',
  }

  const mockHandler = jest.fn()

  render(<Blog blog={blog} user={userObject} changeLikes={mockHandler} />)

  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)
  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
