import { useDispatch, useSelector } from 'react-redux'
import { voteById } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'

const Anecdotes = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
  })

  const vote = (id, content) => {
    dispatch(voteById(id))
    dispatch(createNotification(`you voted '${content}'`, 5))
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )
      }
    </div >
  )
}

export default Anecdotes