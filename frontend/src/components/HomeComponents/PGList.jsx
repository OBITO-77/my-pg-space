// PGList.jsx
import React, { useState } from "react";
import PGCard from "./PGCard";
import MapComponent from "./MapComponent";
import "../../styles/HomeStyles/PGList.css";

const PGList = ({ pgData }) => {
  const [hoveredPG, setHoveredPG] = useState(null);

  const handleHover = (pg) => {
    setHoveredPG(pg); // Set the PG when hovered
  };

  const handleLeave = () => {
    setHoveredPG(null); // Reset when the mouse leaves
  };

  const handleClick = (pg) => {
    // Navigate to PG details page with PG ID or other identifying data
    navigate(`/pg/${pg._id}`); // Replace `pg.id` with the appropriate identifier
  };

  return (
    <div className="pg-container">
      <div className="pg-list">
        <div className="pg-cards">
          {pgData.map((pg, index) => (
            <PGCard
              key={index}
              pg={pg}
              onHover={handleHover}
              onLeave={handleLeave}
              onClick={handleClick}
            />
          ))}
        </div>
        {/* <div className="map">
        <MapComponent pgData={pgData} hoveredPG={hoveredPG} />
      </div> */}
      </div>
      <div className="map">
        <MapComponent pgData={pgData} hoveredPG={hoveredPG}></MapComponent>
      </div>
    </div>
  );
};

export default PGList;
