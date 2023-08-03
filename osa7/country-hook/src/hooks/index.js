import { useState, useEffect } from 'react'
import axios from 'axios'


export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (name) {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
        .then(response => {
          setCountry({
            found: true,
            data: {
              name: response.data.name.common,
              capital: response.data.capital,
              population: response.data.population,
              flag: response.data.flags.png
            }
          })
        })
        .catch(error => {
          setCountry(null)
        })
    }
  }, [name])

  return country
}