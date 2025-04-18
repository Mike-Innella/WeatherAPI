import React, { useState } from "react";

const Search = ({ fetchWeather, weatherData, setWeatherData }) => {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [animationState, setAnimationState] = useState(""); // 'slide-in', 'slide-out'

  const handleSubmit = async (e) => {
    setAnimationState("slide-in");
    e.preventDefault();
    if (city) {
      setLoading(true);
      setOverlayVisible(true);
      await fetchWeather(city);
      setCity("");

      setTimeout(() => setLoading(false), 1600);
    }
  };

  const handleCloseWeather = (e) => {
    // Start the slide-out animation
    setAnimationState("slide-out");
    e.preventDefault();

    // Wait for the slide-out animation to complete before removing weather data
    setTimeout(() => {
      setWeatherData(null);
      setOverlayVisible(false);
      setAnimationState("");
    }, 400);
  };

  return (
    <>
      {/* Loading Overlay */}
      {loading && overlayVisible && (
        <div className="loading-overlay visible">
          <div className="spin__wrapper">
            <div className="spinner">
              <i className="fa fa-spinner fa-spin"></i>
            </div>
            <p className="fetching-text">Fetching weather data...</p>
          </div>
        </div>
      )}

      {/* Weather Result & Overlay */}
      {!loading && weatherData && overlayVisible && (
        <>
          <div className="weather__overlay"></div>
          <div className={`weather__result ${animationState}`}>
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
        </>
      )}

      {/* Search Section */}
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
                    disabled={loading}
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
      </section>
    </>
  );
};

export default Search;
