import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

afterEach(cleanup)

test('renders content', () => {
  const blog = {
    title: 'Title',
    author: 'Author',
    likes: 5
  }
  const component = render(
    <SimpleBlog blog={blog} />
  )

  expect(component.container.querySelector('.title-author')).toHaveTextContent('Title Author')
  expect(component.container.querySelector('.likes')).toHaveTextContent('blog has 5 likes')

})

test('button is pressed twice', async () => {
  const mockHandler = jest.fn()
  const blog = {
    title: 'Title',
    author: 'Author',
    likes: 5
  }
  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)
  expect(mockHandler.mock.calls.length).toBe(2)

})
