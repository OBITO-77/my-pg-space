// PGCard.jsx
import React from "react";
import "../../styles/HomeStyles/PGCard.css";
import { useNavigate } from "react-router-dom";
const UPLOADS_URL = import.meta.env.VITE_UPLOADS_URL;

const PGCard = ({ pg, onHover, onLeave, onClick }) => {
  const navigate = useNavigate();
  return (
    <div
      className="pg-card"
      onMouseEnter={() => onHover(pg)}
      onMouseLeave={onLeave}
      onClick={() => {
        navigate(`/pg/${pg._id}`);
      }}
    >
      <img
        src={`${UPLOADS_URL}/${pg.images[0]}`}
        alt={pg.name}
        className="pg-image"
      />
      <div className="pg-info">
        <h2>{pg.name}</h2>
        <p>{pg.address}</p>
        <p>Price: ₹{pg.price}/mo</p>
        <div className="pg-actions">
          <button className="schedule">SCHEDULE A VISIT</button>
          <button className="callback">REQUEST A CALLBACK</button>
        </div>
      </div>
    </div>
  );
};

export default PGCard;
