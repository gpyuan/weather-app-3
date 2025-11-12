import SearchBar from "./SearchBar";
import WeatherCard from "./WeatherCard";

function WeatherWrapper() {
  return (
    <div className="wrapper">
      <h1>天氣預報</h1>
      <SearchBar />
      <WeatherCard />
    </div>
  );
}

export default WeatherWrapper;
