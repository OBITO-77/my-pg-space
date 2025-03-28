import express from "express";
import {
  getPGs,
  getPGById,
  createPG,
  updatePG,
  deletePG,
} from "../controllers/pg.controller.js";
import authMiddleware from "../utils/authMiddleware.js";
import multer from "multer";
import path from "path";

const router = express.Router();

// Get all PGs with search and filter options
router.get("/", getPGs);

// Get a single PG by its ID
router.get("/:id", getPGById);

// Multer configuration to save images to 'uploads/' folder
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Folder where the images will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filenames
  },
});

const upload = multer({ storage: storage });

// Create a new PG listing (Private, owner only)
router.post("/", authMiddleware, upload.array("images", 5), createPG);

// Update an existing PG (Private, owner only)
router.put("/:id", authMiddleware, updatePG);

// Delete a PG listing (Private, owner only)
router.delete("/:id", authMiddleware, deletePG);

export default router;
