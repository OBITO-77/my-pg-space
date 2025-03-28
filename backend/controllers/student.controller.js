import Student from "../models/student.js";
import User from "../models/user.model.js";

/**
 * @desc Create a new student profile
 * @route POST /api/students
 */
export const createStudent = async (req, res) => {
  try {
    const {
      user,
      collegeName,
      courseName,
      yearOfStudy,
      preferredPGs,
      facilitiesRequired,
      budgetRange,
    } = req.body;

    // Check if user exists
    const existingUser = await User.findById(user);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create a new student profile
    const student = new Student({
      user,
      collegeName,
      courseName,
      yearOfStudy,
      preferredPGs,
      facilitiesRequired,
      budgetRange,
    });

    await student.save();
    res
      .status(201)
      .json({ message: "Student profile created successfully", student });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * @desc Get student profile by user ID
 * @route GET /api/students/:userId
 */
export const getStudentByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const student = await Student.findOne({ user: userId })
      .populate("user")
      .populate("preferredPGs");

    if (!student) {
      return res.status(404).json({ message: "Student profile not found" });
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * @desc Update student profile
 * @route PUT /api/students/:userId
 */
export const updateStudent = async (req, res) => {
  try {
    const { userId } = req.params;
    const updatedData = req.body;

    const student = await Student.findOneAndUpdate(
      { user: userId },
      updatedData,
      { new: true }
    );

    if (!student) {
      return res.status(404).json({ message: "Student profile not found" });
    }

    res
      .status(200)
      .json({ message: "Student profile updated successfully", student });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * @desc Delete student profile
 * @route DELETE /api/students/:userId
 */
export const deleteStudent = async (req, res) => {
  try {
    const { userId } = req.params;

    const student = await Student.findOneAndDelete({ user: userId });

    if (!student) {
      return res.status(404).json({ message: "Student profile not found" });
    }

    res.status(200).json({ message: "Student profile deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
