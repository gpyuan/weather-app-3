import { useRef } from "react";
import CityData from "./CityData";

function SearchBar({ setInputCity }) {
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const value = inputRef.current.value;
    if (!value.trim()) return;

    setInputCity(value);
    inputRef.current.value = "";
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="請輸入城市"
        ref={inputRef}
        list="cityData"
      />
      <datalist id="cityData">
        {CityData.map((cityName) => (
          <option key={cityName} value={cityName} />
        ))}
      </datalist>
      <button type="submit">查詢</button>
    </form>
  );
}

export default SearchBar;
