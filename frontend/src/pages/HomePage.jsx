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
import { useEffect } from "react";
import ChatbotAI from "../components/chatbaseAI";
import "../styles/HomeStyles/HomePage.css";

const HomePage = () => {
  // const [pgList, setPgList] = useState([]);

  const { data: pgList, isLoading } = useQuery({
    queryKey: ["pgs"],
    queryFn: getAllPgs,
  });

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

  return (
    <>
      <Header />
      <Banner />
      <section id="pgs" className="px-4 md:px-12">
        <SearchBar />
        {/* <FilterSection onFilter={handleFilter} /> */}
        {isLoading ? (
          <div className="flex justify-center py-6">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <PGList pgData={pgList} />
        )}
      </section>
      {/* <ChatbotAI /> */}
      <Footer />
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
