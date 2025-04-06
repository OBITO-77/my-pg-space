import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import pgRoutes from "./routes/pgRoutes.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import connectDB from "./config/db.js";
import cors from "cors";
import { app, server } from "./lib/socket.js";

dotenv.config();

connectDB(); // Connect to MongoDB

app.use(express.json()); // Parse JSON
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
); // Enable CORS

// Serve images from the uploads folder
app.use("/uploads", express.static("uploads"));

// API Routes
//app.use("/api/users", userRoutes);
app.use("/api/pgs", pgRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

app.get("/test", (req, res) => {
  res.send("this is test Route");
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
