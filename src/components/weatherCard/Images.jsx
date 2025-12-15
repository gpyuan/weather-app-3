import "weather-icons/css/weather-icons.css";

const Images = ({ weatherText, isDay }) => {
  const text = String(weatherText || "");

  const iconRules = [
    {
      key: ["雲", "晴"],
      icon: isDay ? "wi wi-day-cloudy" : "wi wi-night-alt-cloudy",
    },
    {
      key: ["晴"],
      icon: isDay ? "wi wi-day-sunny" : "wi wi-night-clear",
    },
    {
      key: ["雷"],
      icon: isDay ? "wi wi-day-lightning" : "wi wi-night-alt-lightning",
    },
    {
      key: ["雨"],
      icon: isDay ? "wi wi-day-rain" : "wi wi-night-alt-rain",
    },
    {
      key: ["多雲"],
      icon: "wi wi-cloudy",
    },
    {
      key: ["陰"],
      icon: "wi wi-cloudy",
    },
    {
      key: ["雲"],
      icon: isDay ? "wi wi-day-cloudy" : "wi wi-night-alt-cloudy",
    },
    {
      key: ["雪"],
      icon: "wi wi-snow",
    },
  ];

  // 找到第一個符合條件的 icon
  const matched = iconRules.find((rule) =>
    rule.key.every((k) => text.includes(k))
  );

  const icons = matched ? [{ class: matched.icon }] : []; // 若沒有符合，不顯示 icon

  return (
    <div>
      {icons.map((icon, index) => (
        <i
          key={index}
          className={icon.class}
          style={{
            fontSize: "3em",
            marginTop: "10px",
          }}
        />
      ))}
    </div>
  );
};

export default Images;
