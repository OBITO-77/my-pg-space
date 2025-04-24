import { useState } from 'react';

const PGFilter = ({ allPGs, setFilteredPGs }) => {
  const [filters, setFilters] = useState({
    city: '',
    minPrice: '',
    maxPrice: '',
    type: '',
    service: '',
    amenity: ''
  });

  // Extract unique values for dropdowns
  const cities = [...new Set(allPGs.map(pg => pg.city))];
  const types = [...new Set(allPGs.map(pg => pg.type))];
  const services = [...new Set(allPGs.flatMap(pg => pg.services))];
  const amenities = [...new Set(allPGs.flatMap(pg => pg.amenities))];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    const filtered = allPGs.filter(pg => {
      return (
        (filters.city === '' || pg.city === filters.city) &&
        (filters.minPrice === '' || pg.price >= Number(filters.minPrice)) &&
        (filters.maxPrice === '' || pg.price <= Number(filters.maxPrice)) &&
        (filters.type === '' || pg.type === filters.type) &&
        (filters.service === '' || pg.services.includes(filters.service)) &&
        (filters.amenity === '' || pg.amenities.includes(filters.amenity))
      );
    });
    setFilteredPGs(filtered);
  };

  const resetFilters = () => {
    setFilters({
      city: '',
      minPrice: '',
      maxPrice: '',
      type: '',
      service: '',
      amenity: ''
    });
    setFilteredPGs(allPGs);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-xl font-semibold mb-4">Filter PGs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* City Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
          <select
            name="city"
            value={filters.city}
            onChange={handleFilterChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">All Cities</option>
            {cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
          <div className="flex gap-2">
            <input
              type="number"
              name="minPrice"
              placeholder="Min"
              value={filters.minPrice}
              onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <input
              type="number"
              name="maxPrice"
              placeholder="Max"
              value={filters.maxPrice}
              onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        {/* Type Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
          <select
            name="type"
            value={filters.type}
            onChange={handleFilterChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">All Types</option>
            {types.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Service Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Service</label>
          <select
            name="service"
            value={filters.service}
            onChange={handleFilterChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">All Services</option>
            {services.map(service => (
              <option key={service} value={service}>{service}</option>
            ))}
          </select>
        </div>

        {/* Amenity Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Amenity</label>
          <select
            name="amenity"
            value={filters.amenity}
            onChange={handleFilterChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">All Amenities</option>
            {amenities.map(amenity => (
              <option key={amenity} value={amenity}>{amenity}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-end mt-4 gap-2">
        <button
          onClick={resetFilters}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
        >
          Reset
        </button>
        <button
          onClick={applyFilters}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default PGFilter;