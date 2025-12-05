import "weather-icons/css/weather-icons.css";

const Images = ({ weatherText, isDay }) => {
  const text = String(weatherText || "");
  const icons = [];

  // 多雲時晴
  if (text.includes("雲") && text.includes("晴"))
    icons.push({
      class: isDay ? "wi wi-day-cloudy" : "wi wi-night-alt-cloudy",
      style: { marginTop: "15px" },
    });
  // 晴
  else if (text.includes("晴"))
    icons.push({
      class: isDay ? "wi wi-day-sunny" : "wi wi-night-clear",
    });
  // 雨
  else if (text.includes("雨"))
    icons.push({
      class: isDay ? "wi wi-day-rain" : "wi wi-night-alt-rain",
    });
  // 雷
  else if (text.includes("雷"))
    icons.push({
      class: isDay ? "wi wi-day-lightning" : "wi wi-night-alt-lightning",
    });
  // 多雲
  else if (text.includes("多雲") || text.includes("陰"))
    icons.push({
      class: "wi wi-cloudy",
    });
  // 雲
  else if (text.includes("雲"))
    icons.push({
      class: isDay ? "wi wi-day-cloudy" : "wi wi-night-alt-cloudy",
    });
  // 雪
  else if (text.includes("雪"))
    icons.push({
      class: "wi wi-snow",
    });

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
