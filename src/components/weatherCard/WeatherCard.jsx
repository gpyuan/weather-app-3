import { useEffect, useState } from "react";
import useWeather from "../../useWeather";
import DayCard from "./DayCard";

function WeatherCard({ inputCity, onWeatherText, isDay }) {
  const { weatherData, error } = useWeather(inputCity);
  const [selectedDay, setSelectedDay] = useState(null);
  const [weeklyWeather, setWeeklyWeather] = useState([]);

  const locations = weatherData?.records?.Locations?.[0]?.Location ?? [];
  const found = locations.find((loc) => loc.LocationName === inputCity);

  // 取得資料
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

  // 7日預報
  const formatDate = (isoString) => {
    return new Date(isoString).toLocaleDateString("zh-TW", {
      month: "2-digit",
      day: "2-digit",
    });
  };

  // -----------------------------
  // 🔧 依日期分組
  // -----------------------------
  const forecastByDay = {};

  wxElement?.Time?.forEach((t) => {
    const dateStr = t.StartTime.split("T")[0];
    if (!forecastByDay[dateStr]) forecastByDay[dateStr] = {};
    forecastByDay[dateStr].weather = t.ElementValue[0].Weather;
  });

  temperature?.Time?.forEach((t) => {
    const dateStr = t.StartTime.split("T")[0];
    if (!forecastByDay[dateStr]) forecastByDay[dateStr] = {};
    forecastByDay[dateStr].temp = t.ElementValue[0].Temperature;
  });

  rainChance?.Time?.forEach((t) => {
    const dateStr = t.StartTime.split("T")[0];
    if (!forecastByDay[dateStr]) forecastByDay[dateStr] = {};
    forecastByDay[dateStr].rain = t.ElementValue[0].ProbabilityOfPrecipitation;
  });

  windSpeed?.Time?.forEach((t) => {
    const dateStr = t.StartTime.split("T")[0];
    if (!forecastByDay[dateStr]) forecastByDay[dateStr] = {};
    forecastByDay[dateStr].windSpeed = t.ElementValue[0].WindSpeed;
  });

  UVIndex?.Time?.forEach((t) => {
    const dateStr = t.StartTime.split("T")[0];
    if (!forecastByDay[dateStr]) forecastByDay[dateStr] = {};
    forecastByDay[dateStr].UVIndex = t.ElementValue[0].UVIndex;
  });

  humidity?.Time?.forEach((t) => {
    const dateStr = t.StartTime.split("T")[0];
    if (!forecastByDay[dateStr]) forecastByDay[dateStr] = {};
    forecastByDay[dateStr].humidity = t.ElementValue[0].RelativeHumidity;
  });

  // -----------------------------
  // 🔧 整理成 7 日資料
  // -----------------------------
  useEffect(() => {
    if (!wxElement || !temperature || !rainChance) return;

    const next7 = Object.keys(forecastByDay)
      .slice(0, 7)
      .map((dateStr) => ({
        date: dateStr,
        weather: forecastByDay[dateStr].weather || "無資料",
        temp: forecastByDay[dateStr].temp || "無資料",
        rain: forecastByDay[dateStr].rain || "無資料",
        windSpeed: forecastByDay[dateStr].windSpeed
          ? Number(forecastByDay[dateStr].windSpeed).toFixed(1)
          : "無資料",
        UVIndex: forecastByDay[dateStr].UVIndex || "無資料",
        humidity: forecastByDay[dateStr].humidity || "無資料",
        dateLabel: formatDate(dateStr),
      }));

    setWeeklyWeather(next7);

    // 預設顯示第一天
    if (next7.length > 0) {
      setSelectedDay(next7[0]);
      onWeatherText?.(next7[0].weather);
    }
  }, [weatherData]);

  // 點擊切換資料
  const handleDayClick = (day) => {
    setSelectedDay(day);
    onWeatherText?.(day.weather);
  };

  if (error) return <p>錯誤：{error}</p>;
  if (!weatherData) return <p>資料尚未載入...</p>;
  if (!found) return <p>查無資料，請確認城市輸入是否正確</p>;
  if (!selectedDay) return <p>資料處理中...</p>;

  return (
    <>
      <div className="weather-wrapper">
        <div className="weather-card">
          <h2>{inputCity}</h2>

          <div style={{ fontSize: "3.5rem", marginLeft: "20px" }}>
            {selectedDay.temp}°{" "}
          </div>
          <div>{selectedDay.weather}</div>
        </div>
        <div className="weather-content">
          <div>
            <i className="fa-solid fa-umbrella"></i>
            <p>降雨機率：{selectedDay.rain}%</p>
          </div>
          <div>
            <i className="fa-solid fa-wind"></i>{" "}
            <p>風速：{selectedDay.windSpeed} (公里/時)</p>
          </div>
          <div>
            <i className="fa-solid fa-sun"></i>
            <p>紫外線指數：{selectedDay.UVIndex}</p>
          </div>
          <div>
            <i className="fa-solid fa-droplet"></i>
            <p>濕度：{selectedDay.humidity}%</p>
          </div>
        </div>
      </div>
      <div className={`weekly-forecast ${isDay ? "day" : "night"}`}>
        {weeklyWeather.map((day) => {
          return (
            <DayCard
              key={day.date}
              day={day}
              date={day.dateLabel}
              onClick={() => handleDayClick(day)}
              isDay={isDay}
            />
          );
        })}
      </div>
    </>
  );
}

export default WeatherCard;
