import express from "express";
import {
  createBooking,
  getUserBookings,
  getPGBookings,
  cancelBooking,
} from "../controllers/bookingController.js";
import authMiddleware from "../utils/authMiddleware.js";

const router = express.Router();

// Create a new booking for a PG (Private, tenant only)
router.post("/", authMiddleware, createBooking);

// Get all bookings for a specific user (Private)
router.get("/user/:id", authMiddleware, getUserBookings);

// Get all bookings for a specific PG (Private, owner only)
router.get("/pg/:pgId", authMiddleware, getPGBookings);

// Cancel a booking (Private, tenant only)
router.put("/:id/cancel", authMiddleware, cancelBooking);

export default router;
