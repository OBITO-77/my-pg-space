import PG from "../models/PG.js";

// Get all PG listings
export const getPGs = async (req, res) => {
  const { city, type, price } = req.query;

  const filters = {};
  if (city) filters.city = city;
  if (type) filters.type = type;
  if (price) filters.price = { $lte: price };

  try {
    const pgs = await PG.find(filters);
    console.log("returned PGs");
    res.json(pgs);
  } catch (error) {
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
  const images = req.files.map((file) => file.filename); // Image file names

  try {
    const newPG = await PG.create({
      name,
      address,
      city,
      price,
      type,
      services,
      images,
      amenities,
      occupancies,
      details,
      location: {
        type: "Point",
        coordinates: [lat, lang],
      },
      owner: req.user._id,
    });

    res.status(201).json(newPG);
  } catch (error) {
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
    res.status(500).json({ message: "Server error" });
  }
};
