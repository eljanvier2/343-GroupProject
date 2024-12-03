import React, { useState, useEffect } from 'react'

const MAX_SAFE_WIND_SPEED = 10 // Max wind speed in m/s for safe delivery
const ALLOWABLE_RAIN = 0 // No rain allowed for drone delivery
const MONTREAL_COORDINATES = { lat: 45.5017, lng: -73.5673 } // Center of Montreal
const DELIVERY_RADIUS_KM = 10 // 10km delivery radius

const WeatherTracking = () => {
  const [location, setLocation] = useState('')
  const [currentWeather, setCurrentWeather] = useState<any>(null)
  const [forecast, setForecast] = useState<any[]>([])
  const [weatherMessage, setWeatherMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    // Fetch current weather for Montreal on component load
    fetchWeatherForMontreal()
  }, [])

  const fetchWeatherForMontreal = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${MONTREAL_COORDINATES.lat}&lon=${MONTREAL_COORDINATES.lng}&units=metric&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
      )
      const data = await response.json()
      setCurrentWeather(data)

      // Fetch 5-day forecast for Montreal
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${MONTREAL_COORDINATES.lat}&lon=${MONTREAL_COORDINATES.lng}&units=metric&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
      )
      const forecastData = await forecastResponse.json()
      setForecast(forecastData.list.slice(0, 5)) // Show next 5 forecasts
    } catch (error) {
      console.error('Error fetching Montreal weather data:', error)
    }
  }

  const calculateDistance = (
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number
  ) => {
    const R = 6371 // Radius of the Earth in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLng = ((lng2 - lng1) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c // Distance in km
  }

  const fetchWeather = async () => {
    if (!location) {
      // Clear logs and show error
      setWeatherMessage('')
      setError('Please enter a location.')
      return
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
      )

      if (!response.ok) {
        setWeatherMessage('')
        setError('Failed to fetch weather data. Please check the location.')
        return
      }

      const data = await response.json()
      const distanceFromMontreal = calculateDistance(
        MONTREAL_COORDINATES.lat,
        MONTREAL_COORDINATES.lng,
        data.coord.lat,
        data.coord.lon
      )

      if (distanceFromMontreal > DELIVERY_RADIUS_KM) {
        setWeatherMessage('')
        setError(
          'Delivery unavailable: Location is outside the 10km delivery radius from Montreal.'
        )
        return
      }

      const windSpeed = data.wind.speed
      const rain = data.rain ? data.rain['1h'] || data.rain['3h'] : 0

      if (windSpeed > MAX_SAFE_WIND_SPEED || rain > ALLOWABLE_RAIN) {
        setError('')
        setWeatherMessage(
          'Delivery unavailable due to unsafe weather conditions (too windy or rainy).'
        )
      } else {
        setError('')
        setWeatherMessage('Weather conditions are safe for delivery.')
      }
    } catch (err) {
      console.error('Error fetching weather data:', err)
      setWeatherMessage('')
      setError('An unexpected error occurred. Please try again.')
    }
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Weather Tracking</h1>

      {/* Display Current Weather in Montreal */}
      {currentWeather && (
        <div style={styles.weatherSection}>
          <h2 style={styles.subHeader}>Current Weather in Montreal</h2>
          <p style={styles.text}>
            <strong>Temperature:</strong> {currentWeather.main.temp}°C
          </p>
          <p style={styles.text}>
            <strong>Wind Speed:</strong> {currentWeather.wind.speed} m/s
          </p>
          <p style={styles.text}>
            <strong>Conditions:</strong> {currentWeather.weather[0].description}
          </p>
        </div>
      )}

      {/* Display Weather Forecast */}
      {forecast.length > 0 && (
        <div style={styles.weatherSection}>
          <h2 style={styles.subHeader}>Weather Forecast (Next Few Days)</h2>
          {forecast.map((forecastItem, index) => (
            <div key={index} style={styles.forecastItem}>
              <p>
                <strong>Day {index + 1}:</strong>{' '}
                {forecastItem.weather[0].description}, {forecastItem.main.temp}
                °C
              </p>
            </div>
          ))}
        </div>
      )}

      <div style={styles.formGroup}>
        <label htmlFor="location" style={styles.label}>
          Enter Location:
        </label>
        <input
          id="location"
          type="text"
          placeholder="Enter a location (e.g., Montreal)"
          value={location}
          onChange={(e) => {
            setLocation(e.target.value)
            if (e.target.value.trim() === '') {
              setWeatherMessage('')
              setError('')
            }
          }}
          style={styles.input}
        />
      </div>
      <button onClick={fetchWeather} style={styles.button}>
        Check Weather
      </button>
      {error && <p style={styles.error}>{error}</p>}
      {weatherMessage && <p style={styles.message}>{weatherMessage}</p>}
    </div>
  )
}

export default WeatherTracking

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    color: '#333'
  },
  header: {
    fontSize: '24px',
    textAlign: 'center',
    marginBottom: '20px'
  },
  subHeader: {
    fontSize: '18px',
    marginBottom: '10px',
    fontWeight: 'bold'
  },
  formGroup: {
    marginBottom: '15px'
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold'
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '14px',
    border: '1px solid #ddd',
    borderRadius: '5px'
  },
  button: {
    display: 'block',
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#2ecc71',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  weatherSection: {
    marginBottom: '20px',
    padding: '15px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9'
  },
  forecastItem: {
    marginBottom: '10px'
  },
  text: {
    margin: '5px 0'
  },
  error: {
    color: '#ff0000',
    marginTop: '10px',
    textAlign: 'center'
  },
  message: {
    color: '#2ecc71',
    marginTop: '10px',
    textAlign: 'center',
    fontWeight: 'bold'
  }
}
