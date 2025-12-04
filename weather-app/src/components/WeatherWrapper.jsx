import { useState } from "react";
import SearchBar from "./SearchBar";
import WeatherCard from "./weatherCard/WeatherCard";
import WeatherWindow from "./WeatherWindow";

function WeatherWrapper() {
  const [inputCity, setInputCity] = useState("臺北市");
  const [weatherText, setWeatherText] = useState("");

  const hour = new Date().getHours();
  const isDay = hour >= 6 && hour < 18;

  return (
    <>
      <WeatherWindow weatherText={weatherText} />
      <div className={isDay ? "wrapper day" : "wrapper night"}>
        <h1>天氣預報</h1>
        <SearchBar setInputCity={setInputCity} />
        <WeatherCard
          inputCity={inputCity}
          onWeatherText={setWeatherText}
          isDay={isDay}
        />
      </div>
    </>
  );
}

export default WeatherWrapper;
