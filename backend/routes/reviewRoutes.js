import express from "express";
import {
  addReview,
  getPGReviews,
  deleteReview,
} from "../controllers/reviewController.js";
import authMiddleware from "../utils/authMiddleware.js";

const router = express.Router();

// Add a new review for a PG (Private, tenant only)
router.post("/", authMiddleware, addReview);

// Get all reviews for a specific PG
router.get("/pg/:pgId", getPGReviews);

// Delete a review (Private, tenant/owner only)
router.delete("/:id", authMiddleware, deleteReview);

export default router;
