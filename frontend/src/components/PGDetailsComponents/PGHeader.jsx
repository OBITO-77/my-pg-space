import React from "react";
import "../../styles/PGDetailsStyles/PGHeader.css";
import ImageSlider from "./ImageSlider";
const UPLOADS_URL = import.meta.env.VITE_UPLOADS_URL;

const PGHeader = ({ pg }) => {
  return (
    <div className="pg-header">
      <ImageSlider images={pg.images.map((url) => `${UPLOADS_URL}${url}`)} />
      <div className="pg-info">
        <h1>{pg.name}</h1>
        <p>{pg.address}</p>
        <p>Starts from ₹{pg.price}/mo</p>
        <div className="pg-actions">
          <button className="schedule-visit-btn">Schedule a Visit</button>
          <button className="request-callback-btn">Request a Callback</button>
        </div>
      </div>
    </div>
  );
};

export default PGHeader;
