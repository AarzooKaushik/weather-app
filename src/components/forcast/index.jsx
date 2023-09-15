import React from "react";
import "./style.css";
import clearSky from "../assets/icons/clear.png";
import cloud from "../assets/icons/cloud.png";
import drizzle from "../assets/icons/drizzle.png";
import snow from "../assets/icons/snow.png";
import rain from "../assets/icons/rain.png";

const weatherIcons = {
  "clear sky": clearSky,
  "few clouds": cloud,
  "scattered clouds": cloud,
  "broken clouds": cloud,
  "light rain": drizzle,
  "moderate rain": rain,
  "heavy rain": rain,
  "overcast clouds": cloud,
  "heavy intensity rain": rain,
  "Partly Cloudy": cloud,
  drizzle: drizzle,
  snow: snow,
  frost: snow,
  cloud: cloud,
  thunderstorm: cloud,
};

const Forcast = (props) => {
  const {
    weatherData,
    handleSearch,
    handleSearchLocationChange,
    searchLocation,
    temperatureCelsius,
  } = props;

  const weatherCondition = weatherData.weather?.[0]?.description.toLowerCase();
  const weatherImage = weatherIcons[weatherCondition] || clearSky;

  return (
    <>
      <div className="forcast-container">
        <div className="searchbar">
          <input
            type="text"
            id="search"
            placeholder="Search location"
            value={searchLocation}
            onChange={handleSearchLocationChange}
          />
          <span onClick={handleSearch}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </span>
        </div>

        {weatherData && (
          <>
            <div className="weather-image">
              <img src={weatherImage} alt="" />
            </div>
            <div className="weatherCondition">
              {weatherData.weather?.[0]?.description}
            </div>
            <div className="location">{weatherData.name}</div>
            <ul className="weatherDetails">
              <li>
                <span>Temperature</span>{" "}
                <span>
                  {temperatureCelsius
                    ? temperatureCelsius.toFixed(1) + "°C"
                    : "N/A"}
                </span>
              </li>
              <li>
                <span>Humidity</span> <span>{weatherData.main?.humidity}%</span>
              </li>
              <li>
                <span>Visibility</span>{" "}
                <span>
                  {weatherData.visibility
                    ? weatherData.visibility + "mi"
                    : "N/A"}
                </span>
              </li>
              <li>
                <span>Wind Speed</span>{" "}
                <span>
                  {weatherData.wind?.speed
                    ? weatherData.wind.speed + "Km/h"
                    : "N/A"}
                </span>
              </li>
            </ul>
          </>
        )}
      </div>
    </>
  );
};

export default Forcast;
