import "./App.css";
import searchIcon from "./assets/search-icon.png";
import cloudIcon from "./assets/cloudy.png";
import windIcon from "./assets/wind.png";
import humidyIcon from "./assets/humidity.png";
import React, { useState } from "react";

import BarChart from "./BarChart";
const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const fetchData = async () => {
    setError(null);
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=02be204ad5ab93e03ae60dce10a95c5f`;
      const response = await fetch(url);

      // Check if the response is successful
      if (!response.ok) {
        throw new Error("This city does not exist");
      }

      // Parse the JSON response
      const jsonData = await response.json();
      setData(jsonData);
      //update search history
      setSearchHistory((prevSearchHistory) => [
        inputValue,
        ...prevSearchHistory.slice(0, 4),
      ]);
    } catch (error) {
      setError(error);
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSearch = () => {
    // Fetch data only if inputValue is not empty
    if (inputValue.trim() !== "") {
      fetchData();
    }
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  return (
    <>
    <h1>Weather App</h1>
    <div className="container">
      <div className="search-city">
        <div className="input-container">
          <input
            type="text"
            value={inputValue}
            placeholder="Enter city name"
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
          <button onClick={handleSearch}>
            <img src={searchIcon} alt="search-icon" />
          </button>
        </div>
        {isInputFocused && (
          <div>
            <ul className="search-history">
              {searchHistory.map((search, index) => (
                <>
                  <li className="searched-record" key={index}>
                    {search}
                  </li>
                  <hr />
                </>
              ))}
            </ul>
          </div>
        )}
        {error && <div>Error: {error.message}</div>}
        {data && (
          <div className="weather-details">
            <img src={cloudIcon} alt="cloudy-icon" className="cloudy-icon" />
            <div className="city-temperature">
              {Math.round(data.main.temp) - 273} &#8451; /{" "}
              {((Math.round(data.main.temp) - 273) * 9) / 5} &#x2109;
            </div>
            <div className="country-name">
              <p>
                {data.name},{data.sys.country}
              </p>
            </div>
            <hr />

            <div className="weather-display wind-speed">
              <img src={windIcon} alt="wind-icon" />
              <p>Wind Speed : {data.wind.speed}kmph</p>
              <p></p>
            </div>
            <hr />
            <div className="weather-display humidity">
              <img src={humidyIcon} alt="humidity-icon" />
              <p>Humidity : {data.main.humidity}%</p>
            </div>
          </div>
        )}
      </div>
        {data && <BarChart key ={Math.random()+1} cityName={data.name} />}
    </div>
    </>
  );
};

export default App;
