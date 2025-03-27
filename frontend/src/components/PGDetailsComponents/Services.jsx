import React from "react";
import "../../styles/PGDetailsStyles/Services.css";

const Services = ({ services }) => {
  return (
    <div className="services">
      <h2>Services</h2>
      <ul>
        {services.map((service, index) => (
          <li key={index}>{service}</li>
        ))}
      </ul>
    </div>
  );
};

export default Services;
