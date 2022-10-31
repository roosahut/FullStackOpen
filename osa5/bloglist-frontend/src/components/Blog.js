import { useState } from 'react'

const Blog = ({ blog, user, changeLikes, deleteBlog }) => {
  const [state, changeState] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const changeShowStatus = () => {
    if (state === true) {
      changeState(false)
    } else if (state === false) {
      changeState(true)
    }
  }

  const label = state
    ? 'hide' : 'view'

  const showRest = () => (
    <div>
      <p>{blog.url}</p>
      <p>likes: {blog.likes}
        <button onClick={changeLikes}>like</button>
      </p>
      {blog.user.name}
      {blog.user.name === user.name ? showDeleteButton() : null}
    </div>
  )

  const showDeleteButton = () => (
    <div>
      <button onClick={deleteBlog}>delete this blog</button>
    </div>
  )

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={changeShowStatus}>{label}</button>
      {state === true ? showRest() : null}
    </div >
  )
}

export default Blog