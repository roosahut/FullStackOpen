import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        //console.log('fulfilled')
        setPersons(response.data)
      })
  }, [])

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
        number: newNumber,
        id: persons.length + 1
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