import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const handleNewName = (event) => {
    //console.log(event.target.value)
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
    //console.log(persons.map(person => person.name).indexOf(newName))

    if (persons.map(person => person.name).indexOf(newName) !== -1) {
      alert(`${newName} is already added to phonebook`)

    } else {
      const nameObject = {
        name: newName,
        number: newNumber
      }

      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
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

        <Persons persons={persons} filter={newFilter} />
    </div>
  )
}

export default App