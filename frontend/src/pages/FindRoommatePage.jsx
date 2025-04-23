import { useState, useEffect, useMemo } from "react";
import "../styles/FindRoommateStyles/style.css";
import ChatModal from "../components/FindRoommateComponents/ChatModal.jsx";
import { useQuery } from "@tanstack/react-query";
import { getAllStudents } from "../services/api/studentApi.js";
import { Loader2 } from "lucide-react";
import { useAuthStore } from "../stores/useAuthStore.js";

const UPLOADS_URL = import.meta.env.VITE_UPLOADS_URL;

const FindRoommatePage = () => {
  const {
    data: roommates = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["students"],
    queryFn: getAllStudents,
  });
  const authUser = useAuthStore((state) => state.authUser);

  const [selectedRoommate, setSelectedRoommate] = useState(null);
  const [showChat, setShowChat] = useState(false);

  const [filters, setFilters] = useState({
    gender: "any",
    budget: 20000,
    minPercentage: 60,
    selectedInterests: [],
  });

  const filteredRoommates = useMemo(() => {
    return roommates.filter((roommate) => {
      if (roommate._id === authUser._id) return false;

      const matchesGender =
        filters.gender === "any" || roommate.user.gender === filters.gender;
      const matchesBudget = roommate.budget <= filters.budget;
      const matchesPercentage = roommate.percentage >= filters.minPercentage;
      const matchesInterests =
        filters.selectedInterests.length === 0 ||
        filters.selectedInterests.some((interest) =>
          roommate.interests.includes(interest)
        );

      return (
        matchesGender && matchesBudget && matchesPercentage && matchesInterests
      );
    });
  }, [roommates, filters]);

  const handleInterestToggle = (interest) => {
    setFilters((prev) => ({
      ...prev,
      selectedInterests: prev.selectedInterests.includes(interest)
        ? prev.selectedInterests.filter((i) => i !== interest)
        : [...prev.selectedInterests, interest],
    }));
  };

  const handleConnect = (roommate) => {
    setSelectedRoommate(roommate);
    setShowChat(true);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-6">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center">Failed to load students</div>
    );
  }

  return (
    <div className="container">
      {showChat && (
        <ChatModal
          contact={selectedRoommate}
          onClose={() => setShowChat(false)}
          onSendMessage={(message) => console.log("Message sent:", message)}
        />
      )}

      <h1>Find Student Roommates</h1>

      {/* Filters */}
      <div className="search-section">
        <h2>Search Filters</h2>
        <div className="filter-section">
          <div className="filter-group">
            <label>Preferred Gender:</label>
            <select
              value={filters.gender}
              onChange={(e) =>
                setFilters({ ...filters, gender: e.target.value })
              }
            >
              <option value="any">Any</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Budget Range (₹):</label>
            <input
              type="range"
              min="1000"
              max="20000"
              step="500"
              value={filters.budget}
              onChange={(e) =>
                setFilters({ ...filters, budget: Number(e.target.value) })
              }
            />
            <span>₹{filters.budget}</span>
          </div>

          <div className="filter-group">
            <label>Minimum 12th Percentage:</label>
            <input
              type="number"
              min="40"
              max="100"
              value={filters.minPercentage}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  minPercentage: Number(e.target.value),
                })
              }
            />
          </div>

          <div className="filter-group">
            <label>Interests:</label>
            <div className="interests-filter">
              {["movies", "games", "reading", "sports", "other"].map(
                (interest) => (
                  <div
                    key={interest}
                    className={`interest-tag ${
                      filters.selectedInterests.includes(interest)
                        ? "selected"
                        : ""
                    }`}
                    onClick={() => handleInterestToggle(interest)}
                  >
                    {getInterestIcon(interest)}{" "}
                    {interest.charAt(0).toUpperCase() + interest.slice(1)}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="results-section">
        {filteredRoommates.length === 0 ? (
          <div>No roommates match your criteria.</div>
        ) : (
          filteredRoommates.map((roommate) => (
            <RoommateCard
              key={roommate._id}
              roommate={roommate}
              onConnect={handleConnect}
            />
          ))
        )}
      </div>
    </div>
  );
};

const RoommateCard = ({ roommate, onConnect }) => {
  const user = roommate.user || {};
  return (
    <div className="profile-card">
      <img
        className="profile-photo"
        src={`${UPLOADS_URL}/${user.profilePic}`}
        alt="Profile"
      />
      <h3>{user.name}</h3>
      <div className="stats">
        <div className="stat-item">
          <div className="stat-value">{roommate.age}</div>
          <div>Age</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">₹{roommate.budget.toLocaleString()}</div>
          <div>Budget</div>
        </div>
      </div>
      <div className="academic-score">
        🎓 12th Percentage: {roommate.percentage}%
      </div>
      <div className="interests">
        {roommate.interests.map((interest) => (
          <div key={interest} className="interest">
            {getInterestIcon(interest)}{" "}
            {interest.charAt(0).toUpperCase() + interest.slice(1)}
          </div>
        ))}
      </div>
      <button className="connect-button" onClick={() => onConnect(roommate)}>
        📩 Connect
      </button>
    </div>
  );
};

const getInterestIcon = (interest) => {
  const icons = {
    movies: "🎬",
    games: "🎮",
    reading: "📚",
    sports: "⚽",
    other: "✨",
  };
  return icons[interest] || "🌟";
};

export default FindRoommatePage;
