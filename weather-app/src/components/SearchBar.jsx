import { useState } from "react";

function SearchBar() {
  const [inputCity, setInputCity] = useState("");

  const handleChange = (e) => {
    setInputCity(e.target.value);
  };

  return (
    <form className="search-bar">
      <input
        type="text"
        placeholder="請輸入城市"
        value={inputCity}
        onChange={handleChange}
      />
      <button type="submit">查詢</button>
    </form>
  );
}

export default SearchBar;
