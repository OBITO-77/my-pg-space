import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import Owner from "../models/owner.model.js";
import Student from "../models/student.model.js";
//import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
  const {
    name,
    email,
    password,
    role, // 'student' or 'owner'
    age,
    budget,
    percentage,
    interests,
    collegeName,
    courseName,
    yearOfStudy,
    contactNumber,
    facilitiesRequired,
  } = req.body;

  const profilePic = req.files?.profilePic?.[0]?.filename || "";
 // assuming multer handles this

  try {
    // 1. Validate required fields
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });

    // 2. Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Create user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      profilePic,
    });

    await newUser.save();

    // 4. Create role-specific document
    if (role === "student") {
      const student = new Student({
        user: newUser._id,
        age,
        budget,
        percentage,
        interests: interests?.split(",").map((i) => i.trim()),
        collegeName,
        courseName,
        yearOfStudy,
        facilitiesRequired: facilitiesRequired?.split(",").map((f) => f.trim()),
      });
      await student.save();
    } else if (role === "owner") {
      const idProof = req.files?.idProof?.[0]?.filename || "";
      const owner = new Owner({
        user: newUser._id,
        contactNumber,
        idProof,
      });
      await owner.save();
    }

    // 5. Generate token and respond
    generateToken(newUser._id, res);

    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      role,
      profilePic: newUser.profilePic,
    });
  } catch (error) {
    console.log("Error in signup controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  // try {
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  generateToken(user._id, res);

  res.status(200).json({
    _id: user._id,
    fullName: user.fullName,
    email: user.email,
    profilePic: user.profilePic,
  });
  // } catch (error) {
  //   console.log("Error in login controller", error.message);
  //   res.status(500).json({ message: "Internal Server Error" });
  // }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;

    if (!profilePic) {
      return res.status(400).json({ message: "Profile pic is required" });
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("error in update profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
