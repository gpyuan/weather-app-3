import React from "react";
import Images from "./Images";

const DayCard = ({ day, date, onClick }) => {
  return (
    <div onClick={onClick}>
      <p>{date}</p>
      <Images weatherText={day.weather} />
    </div>
  );
};

export default DayCard;

DayCard.jsx;
