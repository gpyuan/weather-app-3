import { useState } from "react";
import SearchBar from "./SearchBar";
import WeatherCard from "./WeatherCard";

function WeatherWrapper() {
  const [inputCity, setInputCity] = useState("臺北市");

  return (
    <div className="wrapper">
      <h1>天氣預報</h1>
      <SearchBar setInputCity={setInputCity} />
      <WeatherCard inputCity={inputCity} />
    </div>
  );
}

export default WeatherWrapper;
