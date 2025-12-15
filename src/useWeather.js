import { useState, useEffect } from "react";

const apiKey = import.meta.env.VITE_CWA_API_KEY;

const apiUrl = (cityName) =>
  `https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-D0047-091?Authorization=${apiKey}&LocationName=${cityName}`;

function useWeather(inputCity) {
  const [weatherData, setWeatherData] = useState(null);

  const [error, setError] = useState(null);

  useEffect(() => {
    if (!inputCity) return;

    const fetchWeather = async () => {
      setError(null);
      setWeatherData(null);

      try {
        const response = await fetch(apiUrl(inputCity));
        const data = await response.json();
        setWeatherData(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchWeather();
  }, [inputCity]);

  return { weatherData, error };
}

export default useWeather;
