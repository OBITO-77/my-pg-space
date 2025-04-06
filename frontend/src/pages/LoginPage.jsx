// src/components/Login.jsx
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import "../styles/Login.css";
import { useAuthStore } from "../stores/useAuthStore";
import { Loader2 } from "lucide-react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login, isLoggingIn, authUser } = useAuthStore();

  //Check if authToken exists on component mount
  // useEffect(() => {
  //   checkAuth()
  // }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("hello");
    login({ email, password });
  };

  if (authUser) return <Navigate to="/" />;

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">
          {isLoggingIn ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Loading...
            </>
          ) : (
            "Sign in"
          )}
        </button>
        <p>
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
