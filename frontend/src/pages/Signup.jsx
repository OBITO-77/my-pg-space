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
//   const [emailError, setEmailError] = useState("");
//   const [passwordStrength, setPasswordStrength] = useState("");
//   const [confirmPasswordError, setConfirmPasswordError] = useState("");
//   const navigate = useNavigate();

//   // Check if authToken exists on component mount
//   useEffect(() => {
//     const token = localStorage.getItem("authToken");
//     if (token) {
//       navigate("/"); // Redirect to home if token is present
//     }
//   }, [navigate]);

//   const BASE_URL = import.meta.env.VITE_BASE_URL;

//   const validateEmail = (email) => {
//     if (!email.endsWith("@gmail.com")) {
//       setEmailError("Email must be a valid Gmail address (e.g., @gmail.com)");
//     } else {
//       setEmailError("");
//     }
//   };

//   const validatePassword = (password) => {
//     if (password.length < 6) {
//       setPasswordStrength("Password must be at least 6 characters long");
//     } else if (!/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
//       setPasswordStrength("Password must contain both letters and numbers");
//     } else {
//       setPasswordStrength("");
//     }
//   };

//   const validateConfirmPassword = (password, confirmPassword) => {
//     if (password !== confirmPassword) {
//       setConfirmPasswordError("Passwords do not match");
//     } else {
//       setConfirmPasswordError("");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     validateEmail(email);
//     validatePassword(password);
//     validateConfirmPassword(password, confirmPassword);

//     if (emailError || passwordStrength || confirmPasswordError) {
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
//             onChange={(e) => {
//               setEmail(e.target.value);
//               validateEmail(e.target.value);
//             }}
//             required
//           />
//           {emailError && <span className="popup-error">{emailError}</span>}
//         </div>

//         <div className="form-group">
//           <label>Password</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => {
//               setPassword(e.target.value);
//               validatePassword(e.target.value);
//             }}
//             required
//           />
//           {passwordStrength && (
//             <span className="popup-error">{passwordStrength}</span>
//           )}
//         </div>

//         <div className="form-group">
//           <label>Confirm Password</label>
//           <input
//             type="password"
//             value={confirmPassword}
//             onChange={(e) => {
//               setConfirmPassword(e.target.value);
//               validateConfirmPassword(password, e.target.value);
//             }}
//             required
//           />
//           {confirmPasswordError && (
//             <span className="popup-error">{confirmPasswordError}</span>
//           )}
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
  const [role, setRole] = useState("student"); // 'student' or 'owner'
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    budget: "",
    percentage: "",
    interests: "",
    profilePic: null,
    contactNumber: "",
    idProof: null,
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) navigate("/");
  }, [navigate]);

  const validate = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email.endsWith("@gmail.com"))
      newErrors.email = "Email must be a Gmail address";
    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    if (role === "student") {
      if (!formData.age) newErrors.age = "Age is required";
      if (!formData.budget) newErrors.budget = "Budget is required";
      if (!formData.percentage) newErrors.percentage = "12th % is required";
      if (!formData.profilePic)
        newErrors.profilePic = "Profile picture is required";
    }

    if (role === "owner") {
      if (!formData.contactNumber)
        newErrors.contactNumber = "Contact number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("role", role);

    if (role === "student") {
      data.append("age", formData.age);
      data.append("budget", formData.budget);
      data.append("percentage", formData.percentage);
      data.append("interests", formData.interests);
      data.append("profilePic", formData.profilePic);
    } else if (role === "owner") {
      data.append("contactNumber", formData.contactNumber);
      if (formData.idProof) data.append("idProof", formData.idProof);
    }

    try {
      await axios.post(`${BASE_URL}/users/register`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      setErrors({ submit: "Something went wrong during registration" });
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>

        {errors.submit && <p className="error-message">{errors.submit}</p>}

        {/* Role Selector */}
        <div className="form-group">
          <label>Sign up as:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="student">Student</option>
            <option value="owner">PG Owner</option>
          </select>
        </div>

        {/* Common Fields */}
        <div className="form-group">
          <label>Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {errors.name && <span className="popup-error">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <span className="popup-error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && (
            <span className="popup-error">{errors.password}</span>
          )}
        </div>

        <div className="form-group">
          <label>Confirm Password</label>
          <input
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {errors.confirmPassword && (
            <span className="popup-error">{errors.confirmPassword}</span>
          )}
        </div>

        {/* Student-specific fields */}
        {role === "student" && (
          <>
            <div className="form-group">
              <label>Age</label>
              <input
                name="age"
                type="number"
                value={formData.age}
                onChange={handleChange}
              />
              {errors.age && <span className="popup-error">{errors.age}</span>}
            </div>

            <div className="form-group">
              <label>Budget (INR)</label>
              <input
                name="budget"
                type="number"
                value={formData.budget}
                onChange={handleChange}
              />
              {errors.budget && (
                <span className="popup-error">{errors.budget}</span>
              )}
            </div>

            <div className="form-group">
              <label>12th Percentage</label>
              <input
                name="percentage"
                type="number"
                step="0.1"
                value={formData.percentage}
                onChange={handleChange}
              />
              {errors.percentage && (
                <span className="popup-error">{errors.percentage}</span>
              )}
            </div>

            <div className="form-group">
              <label>Interests (comma-separated)</label>
              <input
                name="interests"
                type="text"
                value={formData.interests}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Profile Picture</label>
              <input
                name="profilePic"
                type="file"
                accept="image/*"
                onChange={handleChange}
              />
              {errors.profilePic && (
                <span className="popup-error">{errors.profilePic}</span>
              )}
            </div>
          </>
        )}

        {/* Owner-specific fields */}
        {role === "owner" && (
          <>
            <div className="form-group">
              <label>Contact Number</label>
              <input
                name="contactNumber"
                type="text"
                value={formData.contactNumber}
                onChange={handleChange}
              />
              {errors.contactNumber && (
                <span className="popup-error">{errors.contactNumber}</span>
              )}
            </div>

            <div className="form-group">
              <label>ID Proof (optional)</label>
              <input
                name="idProof"
                type="file"
                accept=".jpg,.png,.pdf"
                onChange={handleChange}
              />
            </div>
          </>
        )}

        <button type="submit">Register</button>
        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
};

export default SignupPage;
