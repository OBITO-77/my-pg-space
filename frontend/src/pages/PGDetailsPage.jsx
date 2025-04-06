import React, { useState, useEffect } from "react";
import OccupancyDetails from "../components/PGDetailsComponents/OccupancyDetails";
import Amenities from "../components/PGDetailsComponents/Amenities";
import Services from "../components/PGDetailsComponents/Services";
import PGHeader from "../components/PGDetailsComponents/PGHeader";
import Header from "../components/HomeComponents/Header";
import axios from "axios";
import "../styles/PGDetailsStyles/PGDetails.css";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../lib/axiosInstance";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const PGDetailPage = ({ match }) => {
  const [pg, setPg] = useState(null);
  const { pgId } = useParams(); // assuming you pass the PG ID via URL

  useEffect(() => {
    const fetchPgData = async () => {
      try {
        const response = await axiosInstance.get(`/pgs/${pgId}`);
        setPg(response.data);
      } catch (error) {
        console.error("Error fetching PG data", error);
      }
    };
    fetchPgData();
  }, [pgId]);

  if (!pg) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <div className="pg-detail-page">
        <PGHeader pg={pg} />
        <OccupancyDetails occupancies={pg.occupancies} />
        <div className="middle-container">
          <Amenities amenities={pg.amenities} />
          <Services services={pg.services} />
        </div>
        <div className="pg-details">
          <p>{pg.details}</p>
        </div>
      </div>
    </>
  );
};

export default PGDetailPage;
