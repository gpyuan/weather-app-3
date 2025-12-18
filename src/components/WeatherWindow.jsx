const WeatherWindow = ({ weatherText, isDay }) => {
  const text = weatherText || "";

  // 根據日夜選擇圖片資料夾
  const folder = isDay ? "day" : "night";

  const rules = [
    { key: "晴時多雲", img: "mostly-clear.jpg" },
    { key: "多雲時晴", img: "partly-clear.jpg" },
    { key: "雨", img: "rain.jpg" },
    { key: "雷", img: "thunder.jpg" },
    { key: "雪", img: "snow.jpg" },
    { key: "陰", img: "overcast.jpg" },
    { key: "雲", img: "cloudy.jpg" },
    { key: "晴", img: "clear.jpg" },
  ];

  const rule = rules.find((r) => text.includes(r.key));
  const bgName = rule ? rule.img : "clear.jpg";

  const bgImage = `${import.meta.env.BASE_URL}${folder}/${bgName}`;

  return (
    <div className="weather-window-container">
      <div className="weatherbg-overlay"></div>
      <div
        className="weatherbg-image"
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>
    </div>
  );
};

export default WeatherWindow;
