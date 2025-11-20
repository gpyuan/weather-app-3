// import WeatherWrapper from "./WeatherWrapper";
import useWeather from "../useWeather";

function WeatherCard({ inputCity }) {
  const { weatherData, error } = useWeather(inputCity);

  // if (loading) return <p>讀取中...</p>;
  if (error) return <p>錯誤：{error}</p>;
  if (!weatherData) return null;

  const locations = weatherData.records.Locations[0].Location;
  const found = locations.find((loc) => loc.LocationName === inputCity);

  if (!found) {
    <p>查無此城市，請確認輸入是否正確</p>;
    return;
  }

  const temperature = found.WeatherElement.find(
    (e) => e.ElementName === "平均溫度"
  );
  const wxElement = found.WeatherElement.find(
    (e) => e.ElementName === "天氣現象"
  );
  const rainChance = found.WeatherElement.find(
    (e) => e.ElementName === "12小時降雨機率"
  );
  const windSpeed = found.WeatherElement.find((e) => e.ElementName === "風速");

  const UVIndex = found.WeatherElement.find(
    (e) => e.ElementName === "紫外線指數"
  );
  const humidity = found.WeatherElement.find(
    (e) => e.ElementName === "平均相對濕度"
  );

  const tempText = temperature.Time[0].ElementValue[0].Temperature;
  const weatherText = wxElement.Time[0].ElementValue[0].Weather;
  const rainChanceText =
    rainChance.Time[0].ElementValue[0].ProbabilityOfPrecipitation;
  const windSpeedText =
    Number(windSpeed.Time[0].ElementValue[0].WindSpeed) * 3.6;
  const UVIndexText = UVIndex.Time[0].ElementValue[0].UVIndex;
  const humidityText = humidity.Time[0].ElementValue[0].RelativeHumidity;

  return (
    <div className="weather-wrapper">
      <div className="weather-card">
        <h2>{inputCity}</h2>
        <div style={{ fontSize: "3.5rem" }}>{tempText}° </div>
        <div> {weatherText}</div>
      </div>
      <div className="weather-content">
        <div>降雨機率：{rainChanceText}%</div>
        <div>風速：{windSpeedText.toFixed(1)}公里/時</div>
        <div>紫外線指數：{UVIndexText}</div>
        <div>濕度：{humidityText}%</div>
      </div>
    </div>
  );
}

export default WeatherCard;
