import React, { useEffect, useState } from "react";
import Forcast from "../forcast/index";
import "./style.css";
import vedio from "../assets/vedio.mp4";
import cloudyWeather from "../assets/images/cloudyWeather.avif";
import clearSky from "../assets/images/clear sky.jpeg";
import rain from "../assets/images/rain.jpg";
import thunderstorm from "../assets/images/lighting.avif";
import mist from "../assets/images/mist.jpeg";
import snow from "../assets/images/snow.jpeg";
const WeatherApp = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [weatherData, setWeatherData] = useState(null);
  const [searchLocation, setSearchLocation] = useState("");

  const weatherIcons = {
    "clear sky": clearSky,
    "few clouds": cloudyWeather,
    "scattered clouds": cloudyWeather,
    "broken clouds": cloudyWeather,
    "light rain": rain,
    "moderate rain": rain,
    "heavy rain": rain,
    "overcast clouds": cloudyWeather,
    "heavy intensity rain": rain,
    "Partly Cloudy": cloudyWeather,
    snow: snow,
    Frost: snow,
    drizzle: rain,
    thunderstorm: thunderstorm,
    cloud: cloudyWeather,
    mist: mist,
    fog: mist,
    haze: mist,
  };

  const weatherForecast = (func) => {
    navigator.geolocation.getCurrentPosition(function (position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      func(latitude, longitude);
    });
  };

  const search = async (lat, lon) => {
    if (!navigator.onLine) {
      alert("No internet connection. Please check your network settings.");
      return;
    }
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=b1e59849496c4a1d27d22cc5b3b9d14a`
      );
      if (!response.ok) {
        if (response.status === 404) {
          alert("Location not found. Please try another location.");
        } else {
          alert(
            "An error occurred while fetching weather data. Please try again later."
          );
        }
      } else {
        const data = await response.json();
        setWeatherData(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchLocationChange = (event) => {
    setSearchLocation(event.target.value);
  };

  const fetchWeatherData = async (location) => {
    if (!navigator.onLine) {
      alert("No internet connection. Please check your network settings.");
      return;
    }
    if (!location) {
      alert("Please enter a valid location");
      return;
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=b1e59849496c4a1d27d22cc5b3b9d14a`
      );
      if (!response.ok) {
        alert(`Weather data not found for location: ${location}`);
      } else {
        const data = await response.json();
        setWeatherData(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSearch = () => {
    fetchWeatherData(searchLocation);
  };

  useEffect(() => {
    weatherForecast(search);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formattedDate = currentDateTime.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedTime = currentDateTime.toLocaleTimeString();
  const currentHour = currentDateTime.getHours();
  const isNight = currentHour < 6 || currentHour >= 19;

  const temperatureKelvin = weatherData?.main?.temp;
  const temperatureCelsius = temperatureKelvin
    ? temperatureKelvin - 273.15
    : null;

  let weatherCondition = "";
  let weatherBgImage = clearSky;

  if (weatherData && weatherData.weather && weatherData.weather.length > 0) {
    weatherCondition = weatherData.weather[0].description.toLowerCase();
    weatherBgImage = weatherIcons[weatherCondition] || clearSky;
  }

  return (
    <>
      {weatherData ? (
        <div className="container">
          <div className="weatherdetails">
            <div className="temperature">
              {temperatureCelsius
                ? temperatureCelsius.toFixed(1) + "°C"
                : "N/A"}{" "}
              {weatherData &&
                weatherData.main &&
                weatherData.main.feels_like && (
                  <span className="feels-like">
                    / Feels like{" "}
                    {(weatherData.main.feels_like - 273.15).toFixed(1)}°C
                  </span>
                )}
            </div>
            <img src={weatherBgImage} alt="" />
            <div className="datetime">
              <div className="date">{formattedDate}</div>
              <div className="time">
                <span>
                  <i
                    className={`fa-solid ${isNight ? "fa-moon" : "fa-sun"}`}
                  ></i>
                </span>
                {formattedTime}
              </div>
            </div>
          </div>
          <Forcast
            weatherData={weatherData}
            handleSearchLocationChange={handleSearchLocationChange}
            handleSearch={handleSearch}
            searchLocation={searchLocation}
            temperatureCelsius={temperatureCelsius}
          ></Forcast>
        </div>
      ) : (
        <div className="container">
          <video src={vedio} autoPlay loop muted></video>
          <h1>Detecting Location</h1>
        </div>
      )}
    </>
  );
};

export default WeatherApp;
