import express from "express";
import { getAllStudents } from "../controllers/student.controller.js";
import Student from "../models/student.model.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.js";
import User from "../models/user.model.js";

const router = express.Router();

router.get("/", getAllStudents);


router.get('/profile', protectRoute, async (req, res) => {
    try {
      const student = await Student.findOne({ user: req.user._id })
        .populate('user', 'name email phone profilePic')
        .populate('preferredPGs', 'title location.address');
      
      if (!student) {
        return res.status(404).json({ message: 'Student profile not found' });
      }
      
      res.json(student);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Update combined profile
  router.put('/profile', protectRoute, async (req, res) => {
    try {
      // Update user data
      const userUpdates = {
        name: req.body.user?.name,
        phone: req.body.user?.phone,
        profilePic: req.body.user?.profilePic
      };
      
      await User.findByIdAndUpdate(req.user._id, userUpdates, { new: true });
  
      // Update student data
      const studentUpdates = {
        age: req.body.student?.age,
        budget: req.body.student?.budget,
        percentage: req.body.student?.percentage,
        interests: req.body.student?.interests,
        collegeName: req.body.student?.collegeName,
        courseName: req.body.student?.courseName,
        yearOfStudy: req.body.student?.yearOfStudy,
        facilitiesRequired: req.body.student?.facilitiesRequired
      };
  
      const student = await Student.findOneAndUpdate(
        { user: req.user._id },
        { $set: studentUpdates },
        { new: true, runValidators: true }
      ).populate('user', 'name email phone profilePic');
  
      if (!student) {
        return res.status(404).json({ message: 'Student profile not found' });
      }
  
      res.json(student);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  // Profile picture upload endpoint
  router.post('/upload-profile-pic', protectRoute, upload.single('profilePic'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
  
    //   // Process the file (upload to cloud storage, etc.)
      const fileUrl = req.file.filename // Implement this function
      
      // Update user's profile picture
      await User.findByIdAndUpdate(req.user._id, { profilePic: fileUrl });
      
      res.json({ url: fileUrl });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

export default router;
