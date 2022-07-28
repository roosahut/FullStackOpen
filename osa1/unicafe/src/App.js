import { useState } from 'react'

const Button = ({handleClick, text}) => {
  return (
    <div>
      <button
        onClick={handleClick}> {text}
      </button>
    </div>
  )
}

const StatisticLine = ({text, value}) => {
  if (text == 'positive') {
    return (
    <tbody>
        <tr>
          <td>{text}</td>
          <td>{value} %</td>
        </tr>
      </tbody>
    )
  }
  return (
      <tbody>
        <tr>
          <td>{text}</td>
          <td>{value}</td>
        </tr>
      </tbody>
  )
}

const Statistics = ({good, neutral, bad}) => {
  if ((good + neutral + bad) == 0) {
    return (
      <div>
        no feedback given
      </div>
    )
  }
  return (
    <table>
      <StatisticLine text="good" value ={good} />
      <StatisticLine text="neutral" value ={neutral} />
      <StatisticLine text="bad" value ={bad} />
      <StatisticLine text="all" value ={good + neutral + bad} />
      <StatisticLine text="average" value ={((good - bad)/(good + neutral + bad)).toFixed(1)} />
      <StatisticLine text="positive" value ={((good/(good + neutral + bad))*100).toFixed(1)} />
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good +1)
  const handleNeutral = () => setNeutral(neutral +1)
  const handleBad = () => setBad(bad +1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGood} text='good' />
      <Button handleClick={handleNeutral} text='neutral' />
      <Button handleClick={handleBad} text='bad' />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App