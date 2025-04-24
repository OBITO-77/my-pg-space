import "../../styles/HomeStyles/Header.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";
import { useAuthStore } from "../../stores/useAuthStore";
import UserDropdown from "./UserDropdown";
const UPLOADS_URL = import.meta.env.VITE_UPLOADS_URL;


function Header() {
  const navigate = useNavigate();

  // Fetch user data (simplified version - you might want to use context/state)
    const {  authUser:user } = useAuthStore();

  return (
    <header className="bg-white shadow-sm p-6 flex justify-between items-center">
      <div className="logo text-2xl m-5 font-bold text-indigo-700">My PG Space</div>
      
      <nav className="hidden md:block">
        <ul className="flex space-x-8">
          <li>
            <a href="/" className="text-gray-700 hover:text-indigo-600 transition">HOME</a>
          </li>
          <li>
            <a href="#pgs" className="text-gray-700 hover:text-indigo-600 transition">PGs</a>
          </li>
          <li>
            <a href="/find-roommate" className="text-gray-700 hover:text-indigo-600 transition">Find Roommate</a>
          </li>
          <li>
            <a href="/contact" className="text-gray-700 hover:text-indigo-600 transition">CONTACT</a>
          </li>
          <li>
            <a href="/create-pg" className="text-gray-700 hover:text-indigo-600 transition">Add PG</a>
          </li>
        </ul>
      </nav>
      
      {/* Profile Avatar */}
      {/* <div className="flex items-center space-x-46 m-6">
        <button 
          onClick={() => navigate('/student-profile')}
          className="flex items-center space-x-2 focus:outline-none"
          aria-label="User profile"
        >
          {user?.profilePic ? (
            <img 
              src={`${UPLOADS_URL}/${user.profilePic}`}
              alt="Profile" 
              className="w-10 h-10 rounded-full object-cover border-2 border-"
            />
          ) : (
            <FaUserCircle className="text-4xl text-gray-400 hover:text-indigo-600 transition" />
          )}
          {user?.name && (
            <span className="hidden md:inline text-indigo-200 font-medium">
              {user.name.split(' ')[0]}
            </span>
          )}
        </button>
      </div> */}
      <UserDropdown />
    </header>
  );
}

export default Header;