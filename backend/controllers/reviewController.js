import Review from "../models/Review.js";
import PG from "../models/PG.js";

// Add a new review
export const addReview = async (req, res) => {
  const { pgId, rating, comment } = req.body;

  try {
    const pg = await PG.findById(pgId);
    if (!pg) return res.status(404).json({ message: "PG not found" });

    const review = await Review.create({
      user: req.user._id,
      pg: pgId,
      rating,
      comment,
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get all reviews for a PG
export const getPGReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ pg: req.params.pgId }).populate("user");
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a review
export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });

    // Check if the user is the owner of the review or the PG
    if (
      review.user.toString() !== req.user._id.toString() &&
      review.pg.owner.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await review.remove();
    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
