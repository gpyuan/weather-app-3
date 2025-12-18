import { useEffect, useState } from "react";
import useWeather from "../../useWeather";
import DayCard from "./DayCard";

// 格式化日期
const formatDate = (isoString) =>
  new Date(isoString).toLocaleDateString("zh-TW", {
    month: "2-digit",
    day: "2-digit",
  });

function WeatherCard({ inputCity, onWeatherText, isDay }) {
  const [loading, setLoading] = useState(false);
  const [showNotFound, setShowNotFound] = useState(false);
  const { weatherData, error } = useWeather(inputCity);
  const [selectedDay, setSelectedDay] = useState(null);
  const [weeklyWeather, setWeeklyWeather] = useState([]);
  const [animate, setAnimate] = useState(false);
  const [isChangingCity, setIsChangingCity] = useState(false);

  const locations = weatherData?.records?.Locations?.[0]?.Location ?? [];
  const found = locations.find((loc) => loc.LocationName === inputCity);

  // 處理 API 資料並轉換成 7 天天氣格式
  useEffect(() => {
    if (!weatherData || !found) return;

    const forecastByDay = {};

    const getElement = (name) =>
      found?.WeatherElement.find((e) => e.ElementName === name);

    const wxElement = getElement("天氣現象");
    const temperature = getElement("平均溫度");
    const rainChance = getElement("12小時降雨機率");
    const windSpeed = getElement("風速");
    const UVIndex = getElement("紫外線指數");
    const humidity = getElement("平均相對濕度");

    // 將 API 資料以"日期"為單位分組
    const append = (element, key, transform) => {
      element?.Time?.forEach((t) => {
        const dateStr = t.StartTime.split("T")[0];
        if (!forecastByDay[dateStr]) forecastByDay[dateStr] = {};

        forecastByDay[dateStr][key] = transform
          ? transform(t.ElementValue[0])
          : t.ElementValue[0];
      });
    };

    append(wxElement, "weather", (v) => v.Weather);
    append(temperature, "temp", (v) => v.Temperature);
    append(rainChance, "rain", (v) => v.ProbabilityOfPrecipitation);
    append(windSpeed, "windSpeed", (v) => Number(v.WindSpeed).toFixed(1));
    append(UVIndex, "UVIndex", (v) => v.UVIndex);
    append(humidity, "humidity", (v) => v.RelativeHumidity);

    // 取得 7 天完整天氣資料
    const next7 = Object.keys(forecastByDay)
      .sort()
      .slice(0, 7)
      .map((dateStr) => ({
        date: dateStr,
        dateLabel: formatDate(dateStr),
        weather: forecastByDay[dateStr].weather ?? "無資料",
        temp: forecastByDay[dateStr].temp ?? "無資料",
        rain: forecastByDay[dateStr].rain ?? "無資料",
        windSpeed: forecastByDay[dateStr].windSpeed ?? "無資料",
        UVIndex: forecastByDay[dateStr].UVIndex ?? "無資料",
        humidity: forecastByDay[dateStr].humidity ?? "無資料",
      }));

    setWeeklyWeather(next7);

    //預設顯示第一天天氣
    if (next7.length > 0) {
      setSelectedDay(next7[0]);
      onWeatherText?.(next7[0].weather);
    }
  }, [weatherData, inputCity, found, onWeatherText]);

  // 切換天氣資料
  const handleDayClick = (day) => {
    setSelectedDay(day);
    onWeatherText?.(day.weather);
  };

  // 切換城市時重置狀態
  useEffect(() => {
    setIsChangingCity(true);
    setAnimate(false);
    setSelectedDay(null);
    setWeeklyWeather([]);
  }, [inputCity]);

  // 控制 loading 顯示時機 (避免快速回應時的閃爍)
  useEffect(() => {
    if (!inputCity) {
      setLoading(false);
      return;
    }

    setLoading(false);

    const timer = setTimeout(() => {
      if (!weatherData) {
        setLoading(true);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [inputCity, weatherData]);

  // 控制 "查無資料" 顯示時機 (避免閃爍)
  useEffect(() => {
    setShowNotFound(false);

    if (!weatherData || loading) return;

    const timer = setTimeout(() => {
      if (!found) {
        setShowNotFound(true);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [weatherData, found, inputCity, loading]);

  // 當新資料到達時，解除"切換城市"狀態
  useEffect(() => {
    if (weatherData) {
      setIsChangingCity(false);
    }
  }, [weatherData]);

  // 當 weeklyWeather 更新時觸發進場動畫
  useEffect(() => {
    if (weeklyWeather.length > 0 && !isChangingCity) {
      setAnimate(false);

      const timer = setTimeout(() => {
        setAnimate(true);
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [weeklyWeather, isChangingCity]);

  return (
    <>
      {error && <p className="message">{`錯誤：${error}`}</p>}
      {loading && <p className="message">{`資料尚未載入...`}</p>}
      {showNotFound && (
        <p className="message">{`查無資料，請確認城市輸入是否正確`}</p>
      )}
      {!loading && !showNotFound && !error && !isChangingCity && (
        <>
          {!selectedDay && <p className="message">資料處理中...</p>}
          {selectedDay && (
            <div
              className={`weather-wrapper ${
                animate ? "slideUp-wrapper" : "hidden"
              }`}
            >
              <div className="weather-card">
                <h2>{inputCity}</h2>

                <div style={{ fontSize: "3.5rem", marginLeft: "20px" }}>
                  {selectedDay.temp}°
                </div>
                <div>{selectedDay.weather}</div>
              </div>

              <div className="weather-content">
                <div>
                  <i className="fa-solid fa-umbrella"></i>
                  <p>降雨機率：{selectedDay.rain}%</p>
                </div>
                <div>
                  <i className="fa-solid fa-wind"></i>
                  <p>
                    風速：{selectedDay.windSpeed}
                    <br />
                    (公里/時)
                  </p>
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
          )}
          <div
            className={`weekly-forecast ${isDay ? "day" : "night"} ${
              animate ? "slideUp-forecast" : "hidden"
            }`}
          >
            {weeklyWeather.map((day) => (
              <DayCard
                key={day.date}
                day={day}
                date={day.dateLabel}
                onClick={() => handleDayClick(day)}
                isDay={isDay}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default WeatherCard;
