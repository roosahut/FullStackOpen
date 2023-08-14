import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject, userName) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  return {
    id: response.data.id,
    title: response.data.title,
    author: response.data.author,
    url: response.data.url,
    likes: response.data.likes,
    user: {
      id: response.data.user,
      name: userName,
    },
  }
}

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  }

  await axios.delete(`${baseUrl}/${id}`, config)
}

export default { setToken, getAll, create, update, deleteBlog }
