import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const changeVotes = async (id) => {
  const anecdotes = await getAll()
  const anecdoteToVote = anecdotes.find(n => n.id === id)
  const changedAnecdote = {
    ...anecdoteToVote,
    votes: anecdoteToVote.votes + 1
  }
  const response = await axios.put(`${baseUrl}/${id}`, changedAnecdote)
  const newList = anecdotes.map(anecdote =>
    anecdote.id !== id ? anecdote : response.data)
  return newList
}

export default { getAll, createNew, changeVotes }