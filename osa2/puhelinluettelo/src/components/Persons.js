const Person = ({ person, deletePerson }) => {
  return (
    <div>
      {person.name} {person.number}
      <button onClick={() => deletePerson(person)} >delete</button>
    </div>
  )
}

const Persons = ({ persons, deletePerson, filter }) => {
  if (filter === '') {
    return (
      <div>
        {persons.map(person =>
          <Person key={person.id} person={person} deletePerson={deletePerson} />
        )}
      </div>
    )
  } else {
    const filteredPersons = persons.filter(person => person.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1)

    return (
      <div>
        {filteredPersons.map(person =>
          <Person key={person.id} person={person} deletePerson={deletePerson} />
        )}
      </div>
    )
  }
}

export default Persons