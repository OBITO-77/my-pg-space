import express from "express";
import {
  checkAuth,
  login,
  logout,
  signup,
  updateProfile,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.post("/signup",upload.fields([
  { name: "profilePic", maxCount: 1 },
  { name: "idProof", maxCount: 1 },
]), signup);
router.post("/login", login);
router.post("/logout", logout);

router.put("/update-profile", protectRoute, updateProfile);

router.get("/checkAuth", protectRoute, checkAuth);

export default router;
