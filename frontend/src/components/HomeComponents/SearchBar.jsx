// src/components/SearchBar.jsx
import React, { useState } from "react";
import "../../styles/HomeStyles/SearchBar.css";

function SearchBar({ onSearch }) {
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    onSearch(search);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search for PGs by location or college"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchBar;
