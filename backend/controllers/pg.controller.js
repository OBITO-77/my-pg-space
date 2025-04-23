import PG from "../models/PG.js";

// Get all PG listings with advanced filtering
export const getPGs = async (req, res) => {
  const { city, type, maxPrice, amenities } = req.query;

  const filters = {};

  if (city) {
    filters.city = { $regex: city, $options: "i" }; // case-insensitive city match
  }

  if (type) {
    filters.type = type;
  }

  if (maxPrice) {
    filters.price = { $lte: Number(maxPrice) };
  }

  if (amenities) {
    const amenitiesArray = amenities.split(",");
    filters.amenities = { $all: amenitiesArray };
  }

  try {
    const pgs = await PG.find(filters);
    console.log("Filtered PGs returned:", pgs.length);
    res.json(pgs);
  } catch (error) {
    console.error("Error fetching PGs:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get PG by ID
export const getPGById = async (req, res) => {
  try {
    const pg = await PG.findById(req.params.id);
    if (!pg) return res.status(404).json({ message: "PG not found" });

    res.json(pg);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Create a new PG
export const createPG = async (req, res) => {
  const {
    name,
    address,
    city,
    price,
    type,
    services,
    amenities,
    occupancies,
    details,
    lat,
    lang,
  } = req.body;

  const images = req.files.map((file) => file.filename); // Uploaded images

  try {
    const newPG = await PG.create({
      name,
      address,
      city,
      price,
      type,
      services: services?.split(",").map((i) => i.trim()),
      images,
      amenities: amenities?.split(",").map((i) => i.trim()),
      occupancies: occupancies?.split(",").map((i) => i.trim()),
      details,
      location: {
        type: "Point",
        coordinates: [lat, lang],
      },
      owner: req.user._id,
    });

    res.status(201).json(newPG);
  } catch (error) {
    console.error("Error creating PG:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Update PG
export const updatePG = async (req, res) => {
  try {
    const updatedPG = await PG.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updatedPG) return res.status(404).json({ message: "PG not found" });

    res.json(updatedPG);
  } catch (error) {
    console.error("Error updating PG:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete PG
export const deletePG = async (req, res) => {
  try {
    const deletedPG = await PG.findByIdAndDelete(req.params.id);

    if (!deletedPG) return res.status(404).json({ message: "PG not found" });

    res.json({ message: "PG deleted successfully" });
  } catch (error) {
    console.error("Error deleting PG:", error);
    res.status(500).json({ message: "Server error" });
  }
};
