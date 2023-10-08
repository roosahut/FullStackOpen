import { useState } from 'react'

const Books = (props) => {
  const [genre, setGenre] = useState('')

  if (!props.show) {
    return null
  }

  const books = props.books
  const genres = [...new Set(books.flatMap((b) => b.genres))]

  return (
    <div>
      <h2>books</h2>

      {genre !== '' ? (
        <div>
          in genre: <b>{genre}</b>
        </div>
      ) : null
      }

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {genre === '' ? (
            books.map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))
          ) : (
            books.filter(b => b.genres.includes(genre)).map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {
        genres.map((g) => (
          <button onClick={() => setGenre(g)} key={g} value={g}>
            {g}
          </button>
        ))
      }
      <button onClick={() => setGenre('')}>all genres</button>
    </div >
  )
}

export default Books
