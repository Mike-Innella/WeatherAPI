import React, { useState } from "react";

const Search = ({ fetchWeather, weatherData, setWeatherData }) => {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city) {
      fetchWeather(city); // Fetch weather data for the given city
      setCity(""); // Optionally reset input after submit
    }
  };

  const handleCloseWeather = () => {
    setWeatherData(null); // Set weatherData to null to close the card
  };

  return (
    <section className="search-section" id="section">
      <div className="container">
        <div className="row">
          <div className="search__wrapper" id="searchWrapper">
            <h2>Search Your Location Here!</h2>
            <div className="search__bar">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Enter a location"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
                <button type="submit">
                  <i className="fa fa-search"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Conditionally render the weather card if weatherData exists */}
      {weatherData && (
        <div className="weather__result">
          <div className="weather__content">
            <h3>Weather in {weatherData.name}</h3>
            <p>🌡️ {((weatherData.main.temp * 9) / 5 + 32).toFixed(2)}°F</p>
            <p>☁️ {weatherData.weather[0].description}</p>
            <p>💨 {(weatherData.wind.speed * 2.23694).toFixed(2)} mph</p>
            <button className="close-weather" onClick={handleCloseWeather}>
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Search;
