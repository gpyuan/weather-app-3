import { useState, useEffect } from "react";

const apiKey = import.meta.env.VITE_CWA_API_KEY;

const apiUrl = (cityName) =>
  `https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-D0047-091?Authorization=${apiKey}&LocationName=${cityName}`;

// 查詢中央氣象署天氣資料
function useWeather(inputCity) {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!inputCity) return;

    // 用於取消請求，避免 memory leak
    const controller = new AbortController();

    const fetchWeather = async () => {
      setError(null);
      setWeatherData(null);

      try {
        const response = await fetch(apiUrl(inputCity), {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(
            `API 錯誤：${response.status} ${response.statusText}`
          );
        }

        const data = await response.json();
        setWeatherData(data);
      } catch (err) {
        // 忽略取消請求的錯誤
        if (err.name === "AbortError") {
          return;
        }
        setError(err.message);
      }
    };

    fetchWeather();

    // cleanup: 元件卸載或 inputCity 改變時取消請求
    return () => controller.abort();
  }, [inputCity]);

  return { weatherData, error };
}

export default useWeather;
