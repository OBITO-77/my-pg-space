import React from "react";
import "../../styles/HomeStyles/FilterSection.css";

function FilterSection({ filters, onFilterChange }) {
  return (
    <div className="filter-section">
      <h4>Filters</h4>
      <div className="filter-group">
        <label>Room Type</label>
        <select onChange={(e) => onFilterChange("roomType", e.target.value)}>
          <option value="">Any</option>
          <option value="single">Single</option>
          <option value="shared">Shared</option>
        </select>
      </div>
      {/* Add more filter options here */}
    </div>
  );
}

export default FilterSection;
