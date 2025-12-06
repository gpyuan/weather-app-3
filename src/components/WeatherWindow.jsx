import React from "react";

const WeatherWindow = ({ weatherText }) => {
  const text = weatherText || "";

  const hour = new Date().getHours();
  const isDay = hour >= 6 && hour < 18;

  const folder = isDay ? "day" : "night";
  // let bgName = "mostly-clear.jpg";
  let bgName = "clear.jpg";

  if (text.includes("晴時多雲")) bgName = "mostly-clear.jpg";
  else if (text.includes("多雲時晴")) bgName = "partly-clear.jpg";
  else if (text.includes("雨")) bgName = "rain.jpg";
  else if (text.includes("陰")) bgName = "overcast.jpg";
  else if (text.includes("雲")) bgName = "cloudy.jpg";
  else if (text.includes("晴")) bgName = "clear.jpg";
  else if (text.includes("雷")) bgName = "thunder.jpg";
  else if (text.includes("雪")) bgName = "snow.jpg";

  const bgImage = `${import.meta.env.BASE_URL}${folder}/${bgName}`;

  return (
    <>
      <div
        className="weatherbg"
        style={{
          backgroundColor: "black",
          opacity: "0.5",
          zIndex: -1,
        }}
      ></div>
      <div
        className="weatherbg"
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      ></div>
    </>
  );
};

export default WeatherWindow;
