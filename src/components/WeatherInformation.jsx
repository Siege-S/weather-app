import React from "react";
import humidityIcon from "../assets/images/humidity.png";
import windspeedIcon from "../assets/images/wind_speed.png";

const WeatherInformation = ({
  city,
  country,
  temperature,
  humidity,
  icon,
  description,
  windspeed,
}) => {
  const windspeedUnit = `${windspeed} Km/h`;
  const humidityPercentage = `${humidity} %`;
  const weatherDetails = [
    { icon: humidityIcon, text: "Humidity", info: humidityPercentage },

    { icon: icon, text: "Weather", info: description },
    { icon: windspeedIcon, text: "Wind Speed", info: windspeedUnit },
  ];
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <h1 className="font-semibold text-[36px] text-[#756d88]">{`${city}, ${country}`}</h1>
        <img className="h-[217px] w-[217px]" src={icon} alt="weather icon" />
        <p className="font-extrabold text-[48px] text-[#756d88]">{`${temperature} °c`}</p>
      </div>
      <div className="grid grid-cols-3 p-[16px] bg-[#D9D9D9] rounded-b-2xl">
        {weatherDetails.map((data, i) => (
          <div
            key={i}
            className="flex flex-col justify-center items-center w-[120px]"
          >
            <img
              className="h-[27px]"
              src={data.icon}
              alt={`icon ${data.text}`}
            />
            <p className="text-[12px] text-gray-700">{data.text}</p>
            <p className="text-[14px] text-gray-700">{`${data.info}`}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default WeatherInformation;
