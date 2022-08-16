import { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({ country }) => {
  return (
    <div>
      {country.name.common}
    </div>
  )
}

const Countries = ({ countries, search }) => {
  const searchedCountries = countries.filter(country => country.name.common.toLowerCase().indexOf(search.toLowerCase()) !== -1)
  console.log(searchedCountries)

  if (searchedCountries.length > 10) {
    return 'Too many matches, specify another filter'

  } else if (searchedCountries.length === 1) {
    return (
      <div>
        <ShowCountry country={searchedCountries[0]} />
      </div>
    )

  } else {
    return (
      <div>
        {searchedCountries.map(country =>
          <Country key={country.name.common} country={country} />
        )}
      </div>
    )
  }
}

const Language = ({ language }) => {
  return (
    <li>
      {language}
    </li>
  )
}

const ShowCountry = ({ country }) => {
  const languages = Object.values(country.languages)
  console.log(languages)
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h3>languages:</h3>
      <ul>
        {languages.map((language, i) =>
          <Language key={i} language={language} />
        )}
      </ul>
      <img
        src={country.flags.svg}
        height='150px'
        alt='flag'
      />
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchCountry, setSearchCountry] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        //console.log('fulfilled')
        setCountries(response.data)
      })
  }, [])

  const handleSearchCountry = (event) => {
    console.log(event.target.value)
    setSearchCountry(event.target.value)
  }

  return (
    <div>
      <form>
        <div>
          find countries
          <input
            value={searchCountry}
            onChange={handleSearchCountry}
          />
        </div>
      </form>
      <Countries countries={countries} search={searchCountry} />
    </div>
  )
}

export default App;
