const Header = ({ name }) => {
  return (
    <div>
      <h1>{name}</h1>
    </div>
  )
}

const Part = ({ part }) => {
  return (
    <div>
    {part.name} {part.exercises}
    </div>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part =>
        <Part key={part.id} part={part} />
        )}
    </div>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts}/>
    </div>
  )
}

const Total = ({ parts }) => {
  const total = parts.reduce((p, c) => p + c.exercises, 0)

  return (
    <div>
      <p>
        <strong>total of {total} exercises</strong>
      </p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App