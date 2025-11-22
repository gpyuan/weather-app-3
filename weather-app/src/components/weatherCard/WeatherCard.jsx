import { useEffect, useState } from "react";
import useWeather from "../../useWeather";
import DayCard from "./DayCard";

function WeatherCard({ inputCity, onWeatherText }) {
  const { weatherData, error } = useWeather(inputCity);
  const [selectedDay, setSelectedDay] = useState(null);

  const locations = weatherData?.records?.Locations?.[0]?.Location ?? [];
  const found = locations.find((loc) => loc.LocationName === inputCity);

  const temperature = found?.WeatherElement.find(
    (e) => e.ElementName === "平均溫度"
  );
  const wxElement = found?.WeatherElement.find(
    (e) => e.ElementName === "天氣現象"
  );
  const rainChance = found?.WeatherElement.find(
    (e) => e.ElementName === "12小時降雨機率"
  );
  const windSpeed = found?.WeatherElement.find((e) => e.ElementName === "風速");
  const UVIndex = found?.WeatherElement.find(
    (e) => e.ElementName === "紫外線指數"
  );
  const humidity = found?.WeatherElement.find(
    (e) => e.ElementName === "平均相對濕度"
  );

  const tempText = temperature?.Time?.[0]?.ElementValue?.[0]?.Temperature ?? "";
  const weatherText = wxElement?.Time?.[0]?.ElementValue?.[0]?.Weather ?? "";
  const rainChanceText =
    rainChance?.Time?.[0]?.ElementValue?.[0]?.ProbabilityOfPrecipitation ?? "";
  const windSpeedText =
    Number(windSpeed?.Time?.[0]?.ElementValue?.[0]?.WindSpeed ?? 0) * 3.6;
  const UVIndexText = UVIndex?.Time?.[0]?.ElementValue?.[0]?.UVIndex ?? "";
  const humidityText =
    humidity?.Time?.[0]?.ElementValue?.[0]?.RelativeHumidity ?? "";

  useEffect(() => {
    if (weatherText) {
      onWeatherText(weatherText);
    }
  }, [weatherText, onWeatherText]);

  // 7日預報
  // 以 天氣現象 StartTime 日期分組
  const formatDate = (isoString) => {
    return new Date(isoString).toLocaleDateString("zh-TW", {
      month: "2-digit",
      day: "2-digit",
    });
  };

  const forecastByDay = {};
  wxElement?.Time?.forEach((t) => {
    const dateStr = t.StartTime.split("T")[0];
    if (!forecastByDay[dateStr]) forecastByDay[dateStr] = [];
    forecastByDay[dateStr].push(t);
  });

  // 儲存7天資料
  const next7Days = [];
  Object.keys(forecastByDay)
    .slice(0, 7)
    .forEach((dateStr) => {
      const first = forecastByDay[dateStr][0]; //每天第一筆資料

      next7Days.push({
        date: dateStr,
        weather: first.ElementValue[0].Weather,
      });
    });

  const handleDayClick = (day) => {
    setSelectedDay(day);
  };

  if (error) return <p>錯誤：{error}</p>;
  if (!weatherData) return <p>資料尚未載入...</p>;
  if (!found) return <p>查無資料，請確認城市輸入是否正確</p>;

  return (
    <>
      <div className="weather-wrapper">
        <div className="weather-card">
          <h2>{inputCity}</h2>
          <div style={{ fontSize: "3.5rem", marginLeft: "20px" }}>
            {tempText}°{" "}
          </div>
          <div>{weatherText}</div>
        </div>
        <div className="weather-content">
          <div>
            <i className="fa-solid fa-umbrella"></i>
            <p>降雨機率：{rainChanceText}%</p>
          </div>
          <div>
            <i className="fa-solid fa-wind"></i>{" "}
            <p>風速：{windSpeedText.toFixed(1)}公里/時</p>
          </div>
          <div>
            <i className="fa-solid fa-sun"></i>
            <p>紫外線指數：{UVIndexText}</p>
          </div>
          <div>
            <i className="fa-solid fa-droplet"></i>
            <p>濕度：{humidityText}%</p>
          </div>
        </div>
      </div>
      <div className="weekly-forecast">
        {next7Days.map((day) => {
          const dateStr = formatDate(day.date);

          return (
            <DayCard
              key={day.date}
              day={day}
              selected={selectedDay?.date === day.date}
              date={dateStr}
              onClick={() => handleDayClick(day)}
            />
          );
        })}
      </div>
    </>
  );
}

export default WeatherCard;
