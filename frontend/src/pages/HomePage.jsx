import React, { useEffect, useState } from "react";
import Header from "../components/HomeComponents/Header";
import Banner from "../components/HomeComponents/Banner";
import FilterSection from "../components/HomeComponents/FilterSection";
import PGList from "../components/HomeComponents/PGList";
import SearchBar from "../components/HomeComponents/SearchBar";
import Footer from "../components/HomeComponents/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_BASE_URL;

// const pgList = [
//   {
//     name: "Austin House",
//     location: "Kondhwa",
//     price: 9999,
//     latitude: 18.4574,
//     longitude: 73.8932,
//     image: "https://example.com/austin.jpg",
//   },
//   {
//     name: "Pelotas House",
//     location: "Vadgaon",
//     price: 7399,
//     latitude: 18.5155,
//     longitude: 73.8415,
//     image: "https://example.com/pelotas.jpg",
//   },
//   {
//     name: "Sarnen House",
//     location: "Dhankawadi",
//     price: 7499,
//     latitude: 18.4708,
//     longitude: 73.8594,
//     image: "https://example.com/sarnen.jpg",
//   },
// ];

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if authToken exists in localStorage
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login"); // Redirect to login page if no token is found
    }
  }, [navigate]); // Depend on navigate to prevent lint warning

  const [pgList, setPgList] = useState([]);

  useEffect(() => {
    const fetchPgData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/pgs`);
        setPgList(response.data);
      } catch (error) {
        console.error("Error fetching PGs", error);
      }
    };
    fetchPgData();
  }, []);

  return (
    <>
      <Header />
      <Banner />
      <section id="pgs">
        <SearchBar />
        {/* <FilterSection /> */}

        <PGList pgData={pgList} />
      </section>
      <Footer />
    </>
  );
};

export default HomePage;
