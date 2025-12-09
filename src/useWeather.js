import { useState, useEffect } from "react";

const apiKey = "CWA-F9E10420-AA34-4AB2-BD5E-AF3AD2F41A2D";
const apiUrl = (cityName) =>
  `https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-D0047-091?Authorization=${apiKey}&LocationName=${cityName}`;

function useWeather(inputCity) {
  const [weatherData, setWeatherData] = useState(null);
  // const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!inputCity) return;

    const fetchWeather = async () => {
      setError(null);

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
