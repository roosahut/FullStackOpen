import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(phonebook => {
        setPersons(phonebook)
      })
  }, [])

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNewFilter = (event) => {
    setNewFilter(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }

    if (persons.map(person => person.name).indexOf(newName) !== -1) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number?`)) {
        const personId = persons[(persons.map(person => person.name).indexOf(newName))].id

        personService
          .updateNumber(personId, nameObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== personId ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
          })
      }
    } else {

      personService
        .create(nameObject)
        .then(number => {
          setPersons(persons.concat(number))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const deletePerson = (person) => {
    const personId = person.id
    if (window.confirm(`Do you want to delete ${person.name} from the phonebook?`)) {
      personService
        .deleteId(personId)
        .then(returnedPersons => {
          setPersons(returnedPersons)
          setNewName('')
          setNewNumber('')
        })
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>

      <Filter value={newFilter} handleChange={handleNewFilter} />

      <h2>Add a new one</h2>

      <PersonForm addName={addName}
        newName={newName} handleNewName={handleNewName}
        newNumber={newNumber} handleNewNumber={handleNewNumber}
      />

      <h2>Numbers</h2>

      <Persons persons={persons} deletePerson={deletePerson} filter={newFilter} />
    </div>
  )
}

export default App