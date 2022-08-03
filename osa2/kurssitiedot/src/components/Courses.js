const Header = ({ name }) => {
    return (
      <div>
        <h2>{name}</h2>
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
  
  const Courses = ({ courses }) => {
    return (
      <div>
        {courses.map(course =>
          <Course key={course.id} course={course} />
          )}
      </div>
    )
  }

export default Courses