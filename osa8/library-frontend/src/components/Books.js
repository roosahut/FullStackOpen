import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const [genre, setGenre] = useState('')
  const booksFilteredByGenre = useQuery(ALL_BOOKS, {
    variables: { genre: genre },
    skip: genre === '',
    pollInterval: 2000
  })

  if (!props.show) {
    return null
  }
  if (booksFilteredByGenre.loading) {
    return <div>loading...</div>
  }

  const books = booksFilteredByGenre.data && genre !== '' ? booksFilteredByGenre.data.allBooks : props.books
  const genres = [...new Set(props.books.flatMap((b) => b.genres))]

  return (
    <div>
      <h2>books</h2>
      {genre !== '' ? (
        <div>
          in genre: <b>{genre}</b>
        </div>
      ) : null}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map((g) => (
        <button onClick={() => setGenre(g)} key={g} value={g}>
          {g}
        </button>
      ))}
      <button onClick={() => setGenre('')}>all genres</button>
    </div >
  )
}

export default Books
