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

    // let loadingTimeoutId;

    const fetchWeather = async () => {
      setError(null);

      // 避免快速回應時閃爍
      // const showLoading = () => setLoading(true);
      // let loadingTimeoutId = setTimeout(setLoading(true), 500);

      try {
        const response = await fetch(apiUrl(inputCity));
        const data = await response.json();
        setWeatherData(data);

        // clearTimeout(loadingTimeoutId);
      } catch (err) {
        // clearTimeout(loadingTimeoutId);
        setError(err.message);
      } finally {
        // setLoading(false);
      }
    };

    fetchWeather();
  }, [inputCity]);

  return { weatherData, error };
}

export default useWeather;
