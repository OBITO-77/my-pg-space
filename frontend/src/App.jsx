import { useState } from "react";
import "./styles/global.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupPage from "./pages/Signup";
import PGDetailsPage from "./pages/PGDetailsPage";
import FindRoommatePage from "./pages/FindRoommatePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={<SignupPage />} />
        <Route path="/find-roommate" element={<FindRoommatePage />} />
        <Route path="/pg/:pgId" element={<PGDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
