import Booking from "../models/Booking.js";
import PG from "../models/PG.js";

// Create a new booking
export const createBooking = async (req, res) => {
  const { pgId, startDate, endDate } = req.body;

  try {
    const pg = await PG.findById(pgId);
    if (!pg) return res.status(404).json({ message: "PG not found" });

    const booking = await Booking.create({
      user: req.user._id,
      pg: pgId,
      startDate,
      endDate,
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get bookings for a specific user
export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate("pg");
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get bookings for a specific PG
export const getPGBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ pg: req.params.pgId }).populate(
      "user"
    );
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Cancel a booking
export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await booking.remove();
    res.json({ message: "Booking cancelled successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
