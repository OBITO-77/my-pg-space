import { useState, useRef, useEffect } from 'react';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/useAuthStore';

const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { authUser:user, logout } = useAuthStore();
  const UPLOADS_URL = import.meta.env.VITE_UPLOADS_URL;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsOpen(false);
  };

  return (
    <div className="relative flex items-center space-x-4 m-6" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 focus:outline-none"
        aria-label="User menu"
      >
        {user?.profilePic ? (
          <img 
            src={`${UPLOADS_URL}/${user.profilePic}`}
            alt="Profile" 
            className="w-10 h-10 rounded-full object-cover border-2 border-indigo-200 hover:border-indigo-400 transition"
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

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-12 w-48 bg-white rounded-md shadow-lg py-1 z-50">
          <button
            onClick={() => {
              navigate('/student-profile');
              setIsOpen(false);
            }}
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 w-full text-left"
          >
            <FaUserCircle className="mr-3 text-indigo-600" />
            My Profile
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 w-full text-left"
          >
            <FaSignOutAlt className="mr-3 text-indigo-600" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;