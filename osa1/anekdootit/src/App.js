import { useState } from 'react'

const Headings = ({text}) => {
  return (
    <h1>{text}</h1>
  )
}

const Button = ({handleClick, text}) => {
  return (
    <div>
      <button
        onClick={handleClick}>
          {text}
      </button>
    </div>
  )
}

const MostVotes = ({votes, anecdotes}) => {
  const values = Object.values(votes)
  const max = Math.max(...values)
  const maxKey = Object.keys(votes).find(key => votes[key] === max)
  return (
    <div>
      {anecdotes[maxKey]}
      <p>has {max} votes</p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const points = {0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0}
  const [copy, setPoints] = useState({ ...points })

  const newAnecdote = () => setSelected(Math.floor(Math.random() * anecdotes.length))
  const addVote = () => setPoints({ ...copy, [selected]: copy[selected]+1})

  console.log(copy)
  return (
    <div>
      <Headings text='Anecdote of the day' />
      {anecdotes[selected]}
      <p>has {copy[selected]} votes</p>
      <Button handleClick={addVote} text='vote' />
      <Button handleClick={newAnecdote} text='new anecdote' />
      <Headings text='Anecdote with most votes' />
      <MostVotes votes={copy} anecdotes={anecdotes} />
    </div>
  )
}

export default App