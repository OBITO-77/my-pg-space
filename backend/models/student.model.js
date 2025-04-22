import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    age: {
      type: Number,
    },
    budget: {
      type: Number,
    },
    percentage: {
      type: Number,
    },
    interests: [
      {
        type: String,
      },
    ],
    collegeName: {
      type: String,
      
    },
    courseName: {
      type: String,
      
    },
    yearOfStudy: {
      type: Number,
      
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
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model("Student", studentSchema);
export default Student;
