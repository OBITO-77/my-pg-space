import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

function SearchBar({ allPGs, setFilteredPGs }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      // If search is empty, show all PGs
      setFilteredPGs(allPGs);
      return;
    }

    const filtered = allPGs.filter(pg => {
      const searchLower = searchQuery.toLowerCase();
      return (
        pg.name.toLowerCase().includes(searchLower) ||
        pg.city.toLowerCase().includes(searchLower) ||
        pg.address.toLowerCase().includes(searchLower) ||
        (pg.details && pg.details.toLowerCase().includes(searchLower)) ||
        pg.services.some(service => service.toLowerCase().includes(searchLower)) ||
        pg.amenities.some(amenity => amenity.toLowerCase().includes(searchLower))
      );
    });

    setFilteredPGs(filtered);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto mb-8">
      <div className="flex shadow-sm rounded-lg overflow-hidden">
        <input
          type="text"
          className="flex-grow px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Search for PGs by name, city, address, amenities..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button
          onClick={handleSearch}
          className="bg-indigo-600 text-white px-6 py-3 hover:bg-indigo-700 transition flex items-center"
        >
          <FiSearch className="mr-2" />
          Search
        </button>
      </div>
      
      {/* Search suggestions dropdown */}
      {searchQuery && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-b-md border border-gray-200">
          {allPGs
            .filter(pg => 
              pg.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
              pg.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .slice(0, 5)
            .map(pg => (
              <div 
                key={pg._id}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  handleSearch();
                }}
              >
                {pg.name} - {pg.city}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;



// // src/components/SearchBar.jsx
// import React, { useState } from "react";
// import "../../styles/HomeStyles/SearchBar.css";

// function SearchBar({ onSearch }) {
//   const [search, setSearch] = useState("");

//   const handleSearch = () => {
//     onSearch(search);
//   };

//   return (
//     <div className="search-bar">
//       <input
//         type="text"
//         placeholder="Search for PGs by location or college"
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />
//       <button onClick={handleSearch}>Search</button>
//     </div>
//   );
// }

// export default SearchBar;


