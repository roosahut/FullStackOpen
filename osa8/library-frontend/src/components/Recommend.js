const Books = (props) => {
  if (!props.show) {
    return null
  }

  const books = props.books
  const favoriteGenre = props.user.favoriteGenre

  return (
    <div>
      <h2>books</h2>
      books in your favorite genre <b>{favoriteGenre}</b>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.filter(b => b.genres.includes(favoriteGenre)).map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))
          }
        </tbody>
      </table>
    </div >
  )
}

export default Books