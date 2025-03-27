import mongoose from "mongoose";

const pgSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: ["Boys", "Girls", "Co-Ed"],
      required: true,
    },
    services: {
      type: [String], // ["WiFi", "AC", "Laundry", etc.]
    },
    images: {
      type: [String], // URLs of images
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    location: {
      type: { type: String },
      coordinates: [Number], // GeoJSON for map integration
    },
    occupancies: {
      type: [String],
    },
    amenities: {
      type: [String],
    },
    details: {
      type: String,
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

pgSchema.index({ location: "2dsphere" }); // For geospatial querying

const PG = mongoose.model("PG", pgSchema);
export default PG;
