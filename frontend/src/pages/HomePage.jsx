import Header from "../components/HomeComponents/Header";
import Banner from "../components/HomeComponents/Banner";
import FilterSection from "../components/HomeComponents/FilterSection";
import PGList from "../components/HomeComponents/PGList";
import SearchBar from "../components/HomeComponents/SearchBar";
import Footer from "../components/HomeComponents/Footer";
import { Loader2 } from "lucide-react";
import Chatbot from "../components/ChatBot/Chatbot";
import { useQuery } from "@tanstack/react-query";
import { getAllPgs } from "../services/api/pgApi";
import { useEffect, useState } from "react";
import ChatbotAI from "../components/chatbaseAI";
import "../styles/HomeStyles/HomePage.css";
import "../styles/global.css";
import PGFilter from "../components/FilterSection/FilterComponent";
import { useAuthStore } from "../stores/useAuthStore";
import { useNavigate } from "react-router-dom";


const HomePage = () => {
  // const [pgList, setPgList] = useState([]);
    const navigate = useNavigate();
  
    const { login, isLoggingIn, authUser,checkAuth } = useAuthStore();
  

  const { data: pgList, isLoading,error } = useQuery({
    queryKey: ["pgs"],
    queryFn: getAllPgs,
    
  });
  const [filteredPgs,setFilteredPGs] = useState()

  useEffect(() => {
    checkAuth() 
  }, [navigate]);


  // Update filteredPgs when allPGs changes
  useEffect(() => {
    setFilteredPGs(pgList);
  }, [pgList]);
  


  const handleFilter = async (filters) => {
    // useEffect(() => {
    //   const script = document.createElement("script");
    //   script.src = "https://www.chatbase.co/embed.min.js";
    //   script.id = "cxCIe3YaS7nvIPyET_8-W";
    //   script.defer = true;
    //   window.chatbaseConfig = {
    //     chatbotId: "cxCIe3YaS7nvIPyET_8-W",
    //   };
    //   document.body.appendChild(script);
    //   return () => {
    //     document.body.removeChild(script);
    //   };
    // }, []);
    // setLoading(true);
    // try {
    //   const query = new URLSearchParams();
    //   if (filters.city) query.append("city", filters.city);
    //   if (filters.type) query.append("type", filters.type);
    //   if (filters.maxPrice) query.append("price", filters.maxPrice);
    //   if (filters.amenities && filters.amenities.length > 0) {
    //     query.append("amenities", filters.amenities.join(","));
    //   }
    //   console.log(query);
    //   const res = await axios.get(`/api/pgs?${query.toString()}`);
    //   setPgList(res.data);
    // } catch (err) {
    //   console.error("Error filtering PGs", err);
    // } finally {
    //   setLoading(false);
    // }
  };

  // useEffect(() => {
  //   handleFilter(); // Load all PGs on initial render
  // }, []);

  if (isLoading) return <div className="text-center py-8">Loading PGs...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error loading PGs</div>;

  return (
    <>
    <div className="home-page">
      <Header />
      <Banner />
      <section id="pgs" className="px-4 md:px-12">
        <SearchBar allPGs={pgList} setFilteredPGs={setFilteredPGs}/>
        {/* <FilterSection onFilter={handleFilter} /> */}
        {/* <PGFilter allPGs={pgList} setFilteredPGs={setFilteredPGs}/> */}
        {isLoading ? (
  <div className="flex justify-center py-6">
    <Loader2 className="h-8 w-8 animate-spin" />
  </div>
) : filteredPgs?.length > 0 ? ( 
  <PGList pgData={filteredPgs} />
) : (
  <div className="col-span-full text-center py-12">
    <h3 className="text-xl font-medium text-gray-700">No PGs found</h3>
    <p className="text-gray-500 mt-2">Try adjusting your search criteria</p>
  </div>
)}
      </section>
      {/* <ChatbotAI /> */}
      <Footer />
      </div>
    </>
  );
};

export default HomePage;

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
