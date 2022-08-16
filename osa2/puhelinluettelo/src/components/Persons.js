const Person = ({ person }) => {
    return (
      <div>
        {person.name} {person.number}
      </div>
    )
  }
  
  const Persons = ({ persons, filter }) => {
    if (filter === '') {
      return (
        <div>
          {persons.map(person =>
            <Person key={person.name} person={person} />
            )}
        </div>
      )
      } else {
        const filteredPersons = persons.filter(person => person.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
        console.log(filteredPersons)
        
        return (
          <div>
            {filteredPersons.map(person =>
              <Person key={person.name} person={person} />
              )}
          </div>
        )
      }
  }

export default Persons