import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    collegeName: {
      type: String,
      required: true,
    },
    courseName: {
      type: String,
      required: true,
    },
    yearOfStudy: {
      type: Number,
      required: true,
    },
    preferredPGs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PG",
      },
    ],
    facilitiesRequired: [
      {
        type: String,
      },
    ],
    budgetRange: {
      min: { type: Number, required: true },
      max: { type: Number, required: true },
    },
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model("Student", studentSchema);
export default Student;
