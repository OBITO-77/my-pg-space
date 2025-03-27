import React from "react";
import "../../styles/PGDetailsStyles/Amenities.css";

const Amenities = ({ amenities }) => {
  return (
    <div className="amenities">
      <h2>Amenities</h2>
      <ul>
        {amenities.map((amenity, index) => (
          <li key={index}>{amenity}</li>
        ))}
      </ul>
    </div>
  );
};

export default Amenities;
