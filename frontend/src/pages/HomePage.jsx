import { useState } from "react";
import Header from "../components/HomeComponents/Header";
import Banner from "../components/HomeComponents/Banner";
import FilterSection from "../components/HomeComponents/FilterSection";
import PGList from "../components/HomeComponents/PGList";
import SearchBar from "../components/HomeComponents/SearchBar";
import Footer from "../components/HomeComponents/Footer";
import { useQuery } from "@tanstack/react-query";
import { getAllPgs } from "../services/api/pgApi";
import { Loader2 } from "lucide-react";

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
  const [pgList, setPgList] = useState([]);

  const {
    data: pgs,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["pgs"],
    queryFn: getAllPgs,
  });

  if (isLoading) return <Loader2 className="h-5 w-5 animate-spin" />;

  return (
    <>
      <Header />
      <Banner />
      <section id="pgs">
        <SearchBar />
        {/* <FilterSection /> */}

        <PGList pgData={pgs} />
      </section>
      <Footer />
    </>
  );
};

export default HomePage;
