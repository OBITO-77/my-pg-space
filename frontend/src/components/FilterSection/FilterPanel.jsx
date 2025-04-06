import { useState } from "react";

const FilterPanel = ({ onApply }) => {
  const [city, setCity] = useState("");
  const [type, setType] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [amenities, setAmenities] = useState([]);

  const amenityOptions = ["WiFi", "AC", "Laundry", "Food", "Parking"];

  const handleAmenityChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setAmenities([...amenities, value]);
    } else {
      setAmenities(amenities.filter((a) => a !== value));
    }
  };

  const applyFilters = () => {
    onApply({ city, type, maxPrice, amenities });
  };

  return (
    <div className="bg-white shadow rounded-xl p-4 mb-4 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {/* City */}
        <div>
          <label className="block text-sm font-semibold">City</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city"
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Type */}
        <div>
          <label className="block text-sm font-semibold">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Any</option>
            <option value="Boys">Boys</option>
            <option value="Girls">Girls</option>
            <option value="Co-Ed">Co-Ed</option>
          </select>
        </div>

        {/* Max Price */}
        <div>
          <label className="block text-sm font-semibold">Max Price</label>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="8000"
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Amenities */}
        <div>
          <label className="block text-sm font-semibold">Amenities</label>
          <div className="grid grid-cols-2 gap-1 text-sm">
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
        </div>
      </div>

      {/* Apply Button */}
      <button
        onClick={applyFilters}
        className="bg-[#219EBC] text-white px-4 py-2 rounded hover:bg-[#023047]"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default FilterPanel;
