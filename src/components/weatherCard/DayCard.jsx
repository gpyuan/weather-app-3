import Images from "./Images";

const DayCard = ({ date, day, onClick, isDay }) => {
  return (
    <div className="day-card" onClick={onClick}>
      <p>{date}</p>
      <Images weatherText={day.weather} isDay={isDay} />
    </div>
  );
};

export default DayCard;

DayCard.jsx;
