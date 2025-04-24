import { useEffect, useState } from "react";
// import "./styles/global.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupPage from "./pages/Signup";
import PGDetailsPage from "./pages/PGDetailsPage";
import FindRoommatePage from "./pages/FindRoommatePage";
import ChatPage from "./pages/ChatPage";
import "./App.css";
import { useAuthStore } from "./stores/useAuthStore";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";
import PaymentSuccess from "./components/PaymentComponents/PaymentSuccess";
import CreatePG from "./pages/CreatePG";
import StudentProfile from "./pages/StudentProfile";

function App() {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();

  console.log({ onlineUsers });

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/student-profile" element={<StudentProfile />} />
          <Route path="/find-roommate" element={<FindRoommatePage />} />
          <Route path="/pg/:pgId" element={<PGDetailsPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/paymentsuccess" element={<PaymentSuccess />} />
          <Route path="/create-pg" element={<CreatePG />} />
          <Route path="/edit-pg/:id" element={<CreatePG isEdit={true} />} />
        </Route>
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
