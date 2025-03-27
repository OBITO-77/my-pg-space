import React from "react";
import "../../styles/PGDetailsStyles/OccupancyDetails.css";

const OccupancyDetails = ({ occupancies }) => {
  return (
    <div className="occupancy-details">
      <h2>Available Occupancies</h2>
      <div className="occupancies">
        {occupancies.map((occupancy, index) => (
          <div key={index} className="occupancy">
            <h3>{`x${index + 1}`} Occupancy</h3>
            <p>₹{occupancy * (index + 1)}/mo</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OccupancyDetails;
