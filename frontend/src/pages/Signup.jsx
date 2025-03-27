// src/components/Signup.jsx
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "../styles/Signup.css";

// const SignupPage = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("authToken");
//     if (token) {
//       navigate("/");
//     }
//   }, [navigate]);

//   const BASE_URL = import.meta.env.VITE_BASE_URL;

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (password !== confirmPassword) {
//       setError("Passwords don't match");
//       return;
//     }

//     try {
//       await axios.post(`${BASE_URL}/users/register`, {
//         name,
//         email,
//         password,
//       });

//       navigate("/login");
//     } catch (error) {
//       setError("Error during registration");
//     }
//   };

//   return (
//     <div className="signup-container">
//       <form className="signup-form" onSubmit={handleSubmit}>
//         <h2>Sign Up</h2>
//         {error && <p className="error-message">{error}</p>}
//         <div className="form-group">
//           <label>Name</label>
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Email</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Password</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Confirm Password</label>
//           <input
//             type="password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">Sign Up</button>
//         <p>
//           Already have an account? <a href="/login">Login</a>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default SignupPage;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Signup.css";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const navigate = useNavigate();

  // Check if authToken exists on component mount
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      navigate("/"); // Redirect to home if token is present
    }
  }, [navigate]);

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const validateEmail = (email) => {
    if (!email.endsWith("@gmail.com")) {
      setEmailError("Email must be a valid Gmail address (e.g., @gmail.com)");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = (password) => {
    if (password.length < 6) {
      setPasswordStrength("Password must be at least 6 characters long");
    } else if (!/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
      setPasswordStrength("Password must contain both letters and numbers");
    } else {
      setPasswordStrength("");
    }
  };

  const validateConfirmPassword = (password, confirmPassword) => {
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    validateEmail(email);
    validatePassword(password);
    validateConfirmPassword(password, confirmPassword);

    if (emailError || passwordStrength || confirmPasswordError) {
      return;
    }

    try {
      await axios.post(`${BASE_URL}/users/register`, {
        name,
        email,
        password,
      });
      navigate("/login");
    } catch (error) {
      setError("Error during registration");
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        {error && <p className="error-message">{error}</p>}

        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              validateEmail(e.target.value);
            }}
            required
          />
          {emailError && <span className="popup-error">{emailError}</span>}
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              validatePassword(e.target.value);
            }}
            required
          />
          {passwordStrength && (
            <span className="popup-error">{passwordStrength}</span>
          )}
        </div>

        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              validateConfirmPassword(password, e.target.value);
            }}
            required
          />
          {confirmPasswordError && (
            <span className="popup-error">{confirmPasswordError}</span>
          )}
        </div>

        <button type="submit">Sign Up</button>
        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
};

export default SignupPage;
