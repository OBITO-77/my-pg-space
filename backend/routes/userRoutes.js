import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";
import authMiddleware from "../utils/authMiddleware.js";

const router = express.Router();

// Register a new user
router.post("/register", registerUser);

// Login user
router.post("/login", loginUser);

// Get user profile (Private)
router.get("/profile", authMiddleware, getUserProfile);

// Update user profile (Private)
router.put("/profile", authMiddleware, updateUserProfile);

export default router;
