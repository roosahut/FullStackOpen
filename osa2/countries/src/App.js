import { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({ country, handleSelected }) => {
  return (
    <div>
      {country.name.common}
      <div>
        <button onClick={() => handleSelected(country)} >show</button>
      </div>
    </div >
  )
}

const Countries = ({ countries, search, selected, handleSelected }) => {
  const searchedCountries = countries.filter(country => country.name.common.toLowerCase().indexOf(search.toLowerCase()) !== -1)
  //console.log(selected)

  if (searchedCountries.length > 10) {
    return 'Too many matches, specify another filter'

  } else if (searchedCountries.length === 1) {
    return (
      <div>
        <ShowCountry country={searchedCountries[0]} />
      </div>
    )

  } else if (selected.length !== 0) {

    return (
      <div>
        <ShowCountry country={selected} />
      </div>
    )

  } else {
    return (
      <div>
        {searchedCountries.map(country =>
          <Country key={country.name.common} country={country} handleSelected={handleSelected} />
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
  const [weather, setWeather] = useState(null)
  //console.log(languages)
  //console.log(country)

  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}&units=metric`)
      .then(response => {
        //console.log('fulfilled')
        setWeather(response.data)
      })
  }, [])

  console.log(weather)
  return (
    <div>
      <h1>{country.name.common}</h1>
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
      <h2>Weather in {country.capital}</h2>
      <p>temperature {weather?.main.temp ?? ''} Celsius</p>
      <p>wind {weather?.wind.speed ?? ''} m/s</p>
      {weather?.weather ? <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}></img> : <p>Loading...</p>}
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchCountry, setSearchCountry] = useState('')
  const [selected, setSelected] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        //console.log('fulfilled')
        setCountries(response.data)
      })
  }, [])

  const handleSearchCountry = (event) => {
    //console.log(event.target.value)
    setSearchCountry(event.target.value)
    setSelected([])
  }

  const handleSelected = (country) => {
    //console.log(event.target.value)
    setSelected(country)
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
      <Countries countries={countries} search={searchCountry} selected={selected} handleSelected={handleSelected} />
    </div>
  )
}

export default App;
