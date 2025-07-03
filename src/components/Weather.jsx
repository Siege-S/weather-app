import React, { useEffect, useRef, useState } from "react";
import searchIcon from "../assets/images/search-icon.png";
import WeatherInfomation from "./WeatherInformation";
import clearSky from "../assets/images/clear sky.png";
import fewClouds from "../assets/images/few clouds.png";
import scatteredCLouds from "../assets/images/scattered clouds.png";
import brokenCLouds from "../assets/images/broken clouds.png";
import showerRainClouds from "../assets/images/shower rain.png";
import rainClouds from "../assets/images/rain.png";
import thunderStorm from "../assets/images/thunder storm.png";
import snow from "../assets/images/snow.png";
import mist from "../assets/images/mist.png";
const Weather = () => {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  const inputCityRef = useRef();
  const [weatherData, setWeatherData] = useState({});
  const [error, setError] = useState("");
  const weatherIcons = {
    "01d": clearSky,
    "01n": clearSky,
    "02d": fewClouds,
    "02n": fewClouds,
    "03d": scatteredCLouds,
    "03n": scatteredCLouds,
    "04d": brokenCLouds,
    "04n": brokenCLouds,
    "09d": showerRainClouds,
    "09n": showerRainClouds,
    "10d": rainClouds,
    "10n": rainClouds,
    "11d": thunderStorm,
    "11n": thunderStorm,
    "13d": snow,
    "13n": snow,
    "50d": mist,
    "50n": mist,
  };

  useEffect(() => {
    search("Manila");
  }, []);

  const search = async (city) => {
    if (city.trim() === "") {
      setError("*Please enter a city name!");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

      const response = await fetch(url);
      const data = await response.json();
      console.log(data);

      const icon = weatherIcons[data.weather[0].icon];
      setWeatherData({
        city: data.name,
        country: data.sys.country,
        temperature: Math.round(data.main.temp),
        humidity: data.main.humidity,
        icon: icon,
        description: data.weather[0].description,
        windspeed: data.wind.speed,
      });
    } catch (error) {
      setWeatherData(false);
      console.log(error);
    }
    setError("");
  };

  const handleEnterKey = () => {
    if (event.key === "Enter") {
      search(inputCityRef.current.value);
    }
  };
  console.log(weatherData);

  return (
    <div className="weather flex justify-center items-center">
      <div className="flex flex-col rounded-2xl bg-[#ECF0F3]">
        <div className="flex flex-col w-full px-[36px] pt-[36px] pb-[16px]">
          <p className=" text-red-500 text-[16px]">{error}</p>
          <div className="flex w-full ">
            <input
              className="rounded-lg bg-white flex-1 mr-4 text-[12px] px-5"
              ref={inputCityRef}
              onKeyDown={handleEnterKey}
              type="text"
              placeholder="Enter City Name. . ."
            />
            <button
              className="flex justify-center items-center rounded-lg bg-white h-[30px] w-[30px]"
              onClick={() => search(inputCityRef.current.value)}
            >
              <img className="h-[20px]" src={searchIcon} />
            </button>
          </div>
        </div>
        <div>
          {weatherData ? (
            <WeatherInfomation
              city={weatherData.city}
              country={weatherData.country}
              temperature={weatherData.temperature}
              humidity={weatherData.humidity}
              icon={weatherData.icon}
              description={weatherData.description}
              windspeed={weatherData.windspeed}
            />
          ) : (
            <div className="flex justify-center p-[36px] text-[24px] text-gray-500">
              City Not Found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Weather;
