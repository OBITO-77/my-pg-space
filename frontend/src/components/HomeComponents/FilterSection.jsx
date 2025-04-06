// import React from "react";
// import "../../styles/HomeStyles/FilterSection.css";

import { useState } from "react";

// function FilterSection({ filters, onFilterChange }) {
//   return (
//     <div className="filter-section">
//       <h4>Filters</h4>
//       <div className="filter-group">
//         <label>Room Type</label>
//         <select onChange={(e) => onFilterChange("roomType", e.target.value)}>
//           <option value="">Any</option>
//           <option value="single">Single</option>
//           <option value="shared">Shared</option>
//         </select>
//       </div>
//       {/* Add more filter options here */}
//     </div>
//   );
// }

// export default FilterSection;

const FilterSection = ({ onFilter }) => {
  const [city, setCity] = useState("");
  const [type, setType] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [amenities, setAmenities] = useState([]);

  const amenityOptions = ["WiFi", "AC", "Laundry", "Food", "Parking"];

  const handleAmenityChange = (e) => {
    const value = e.target.value;
    setAmenities((prev) =>
      prev.includes(value) ? prev.filter((a) => a !== value) : [...prev, value]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter({ city, type, maxPrice, amenities });
    
  };

  const handleReset = () => {
    setCity("");
    setType("");
    setMaxPrice("");
    setAmenities([]);
    onFilter({}); // send empty filters
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border p-2 rounded"
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Select Type</option>
          <option value="Boys">Boys</option>
          <option value="Girls">Girls</option>
          <option value="Co-Ed">Co-Ed</option>
        </select>

        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="border p-2 rounded"
        />

        <div className="flex flex-wrap gap-2 col-span-full">
          {amenityOptions.map((amenity) => (
            <label key={amenity} className="flex items-center gap-1">
              <input
                type="checkbox"
                value={amenity}
                checked={amenities.includes(amenity)}
                onChange={handleAmenityChange}
              />
              {amenity}
            </label>
          ))}
        </div>

        <div className="col-span-full flex gap-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Apply Filters
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="bg-gray-400 text-white px-4 py-2 rounded"
          >
            Reset Filters
          </button>
        </div>
      </form>
    </div>
  );
};
export default FilterSection;
