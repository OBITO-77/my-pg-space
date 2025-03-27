import { useState, useEffect } from "react";
import "../styles/FindRoommateStyles/style.css";
import ChatModal from "../components/FindRoommateComponents/ChatModal.jsx";

const initialRoommates = [
  {
    id: 1,
    name: "Rahul Sharma",
    age: 20,
    gender: "male",
    budget: 12000,
    twelfthPercentage: 85,
    interests: ["movies", "sports"],
    location: "Koramangala",
    photo:
      "https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg",
    contact: "rahul.sharma@example.com",
  },
  {
    id: 2,
    name: "Priya Patel",
    age: 19,
    gender: "female",
    budget: 15000,
    twelfthPercentage: 92,
    interests: ["reading", "games"],
    location: "Indiranagar",
    photo:
      "https://w7.pngwing.com/pngs/308/71/png-transparent-female-avatar-girl-face-woman-user-flat-classy-users-icon.png",
    contact: "priya.patel@example.com",
  },
  {
    id: 3,
    name: "Amit Singh",
    age: 21,
    gender: "male",
    budget: 13000,
    twelfthPercentage: 78,
    interests: ["games", "music"],
    location: "HSR Layout",
    photo:
      "https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-man-avatar-with-circle-frame-vector-ilustration-png-image_6110328.png",
    contact: "amit.singh@example.com",
  },
  {
    id: 4,
    name: "Neha Gupta",
    age: 20,
    gender: "female",
    budget: 14000,
    twelfthPercentage: 88,
    interests: ["reading", "movies"],
    location: "Whitefield",
    photo:
      "https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-female-user-profile-vector-illustration-isolated-background-women-profile-sign-business-concept_157943-38866.jpg?semt=ais_hybrid",
    contact: "neha.gupta@example.com",
  },
  {
    id: 5,
    name: "Rohan Kumar",
    age: 22,
    gender: "male",
    budget: 11000,
    twelfthPercentage: 82,
    interests: ["sports", "travel"],
    location: "Marathahalli",
    photo:
      "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png",
    contact: "rohan.kumar@example.com",
  },
  // Add 5 more entries following the same structure
];

function FindRoommatePage() {
  const [roommates, setRoommates] = useState(initialRoommates);
  const [selectedRoommate, setSelectedRoommate] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [filteredRoommates, setFilteredRoommates] = useState(initialRoommates);
  const [filters, setFilters] = useState({
    gender: "any",
    budget: 20000,
    minPercentage: 60,
    selectedInterests: [],
  });

  useEffect(() => {
    applyFilters();
  }, [filters]);

  const handleConnect = (roommate) => {
    setSelectedRoommate(roommate);
    setShowChat(true);
  };

  const applyFilters = () => {
    const filtered = roommates.filter((roommate) => {
      return (
        (filters.gender === "any" || roommate.gender === filters.gender) &&
        roommate.budget <= filters.budget &&
        roommate.twelfthPercentage >= filters.minPercentage &&
        (filters.selectedInterests.length === 0 ||
          filters.selectedInterests.some((interest) =>
            roommate.interests.includes(interest)
          ))
      );
    });
    setFilteredRoommates(filtered);
  };

  const handleInterestToggle = (interest) => {
    setFilters((prev) => ({
      ...prev,
      selectedInterests: prev.selectedInterests.includes(interest)
        ? prev.selectedInterests.filter((i) => i !== interest)
        : [...prev.selectedInterests, interest],
    }));
  };

  return (
    <div className="container">
      {showChat && (
        <ChatModal
          contact={selectedRoommate}
          onClose={() => setShowChat(false)}
          onSendMessage={(message) => {
            // Here you would typically send the message to your backend
            console.log("Message sent:", message);
          }}
        />
      )}
      <h1>Find Student Roommates</h1>

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
              min="5000"
              max="20000"
              step="1000"
              value={filters.budget}
              onChange={(e) =>
                setFilters({ ...filters, budget: e.target.value })
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
                setFilters({ ...filters, minPercentage: e.target.value })
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

      <div className="results-section">
        {filteredRoommates.map((roommate) => (
          <RoommateCard
            key={roommate.id}
            roommate={roommate}
            onConnect={handleConnect}
          />
        ))}
      </div>
    </div>
  );
}

const RoommateCard = ({ roommate, onConnect }) => {
  return (
    <div className="profile-card">
      <img
        className="profile-photo"
        display="contain"
        width="10"
        height="10"
        src={roommate.photo}
        alt="Profile"
      />
      <h3>{roommate.name}</h3>
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
        🎓 12th Percentage: {roommate.twelfthPercentage}%
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
