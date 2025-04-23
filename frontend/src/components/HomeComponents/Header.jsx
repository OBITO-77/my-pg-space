import "../../styles/HomeStyles/Header.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";
import { useAuthStore } from "../../stores/useAuthStore";

function Header() {
  const navigate = useNavigate();

  // Fetch user data (simplified version - you might want to use context/state)
    const {  authUser:user } = useAuthStore();

  return (
    <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
      <div className="logo text-2xl font-bold text-indigo-700">My PG Space</div>
      
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
        </ul>
      </nav>
      
      {/* Profile Avatar */}
      <div className="flex items-center space-x-4">
        <button 
          onClick={() => navigate('/student-profile')}
          className="flex items-center space-x-2 focus:outline-none"
          aria-label="User profile"
        >
          {user?.profilePic ? (
            <img 
              src={user.profilePic} 
              alt="Profile" 
              className="w-10 h-10 rounded-full object-cover border-2 border-indigo-200"
            />
          ) : (
            <FaUserCircle className="text-4xl text-gray-400 hover:text-indigo-600 transition" />
          )}
          {user?.name && (
            <span className="hidden md:inline text-gray-700 font-medium">
              {user.name.split(' ')[0]} {/* Show first name only */}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}

export default Header;