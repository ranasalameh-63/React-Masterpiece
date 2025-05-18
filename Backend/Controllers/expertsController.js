const bcrypt = require('bcryptjs');
const User = require('../Models/usersModel');
const Expert = require('../Models/expertsModel');
const path = require('path');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

exports.createExpert = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, experienceYears, location, aboutYourself, password} = req.body;

    const skills = req.body.skills ? JSON.parse(req.body.skills) : [];
    const availability = req.body.availability ? JSON.parse(req.body.availability) : [];
    
    const profileImagePath = req.file ? `/uploads/${req.file.filename}` : null;

    console.log("Received files:", req.file);
    console.log("Received body:", req.body);

    
    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }
    
    if (!password) {
      return res.status(400).json({ message: "Password is required." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already in use. Please use another one." });
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ message: "Password must be at least 8 characters long and contain at least one letter and one number." });
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ message: "Phone number must be exactly 10 digits." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      fullName: `${firstName} ${lastName}`,
      email,
      password: hashedPassword,
    });

    await user.save();

    const token = jwt.sign(
      { userId: user._id, email: user.email }, 
      process.env.JWT_SECRET, 
      { expiresIn: "7d" }
    );

    const expert = new Expert({
      userId: user._id, 
      phoneNumber: phone,
      location,
      skills,
      experienceYears,
      aboutYourself,
      availability: availability, 
      profileImage: profileImagePath,
    });

    await expert.save();

    res.status(201).json({ message: "User and Expert created successfully", expert, token });
    console.log(token)
  } catch (error) {
    console.error("Error creating user and expert:", error);
    res.status(500).json({ message: "Error creating user and expert", error });
  }
};



exports.getAllExperts = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, skills, location } = req.query;

    const skip = (page - 1) * limit;

    const filter = {};

    if (skills) {
      filter.skills = { $in: skills.split(",") };
    }

    if (location) {
      filter.location = { $regex: location, $options: "i" };
    }

    const experts = await Expert.find(filter)
      .populate({
        path: "userId",
        match: { role: "expert", ...(search && { fullName: { $regex: search, $options: "i" } }) },
        select: "fullName email",
      })
      .select("userId location experienceYears skills profileImage")
      .skip(skip)
      .limit(parseInt(limit));

    const filteredExperts = experts.filter(expert => expert.userId);

    const totalExperts = filteredExperts.length;
    const totalPages = Math.ceil(totalExperts / limit);

    res.status(200).json({
      data: filteredExperts,
      totalExperts,
      totalPages,
      currentPage: parseInt(page),
      perPage: parseInt(limit),
    });
  } catch (error) {
    console.error("Error fetching experts:", error.message);
    res.status(500).json({ error: error.message });
  }
};



  


exports.getExpertById = async (req, res) => {
  try {
    const { expertId } = req.params; 

    if (!mongoose.Types.ObjectId.isValid(expertId)) {
      console.log("Invalid ObjectId format:", expertId);
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    const expert = await Expert.findOne({ _id:expertId })
      .populate("userId", "fullName email role") 
      .select("userId location experienceYears skills profileImage"); 

    if (!expert) {
      console.error("Expert not found for user id:", expertId);
      return res.status(404).json({ message: "Expert not found" });
    }
console.log("fffff",expert);
    res.status(200).json({
      expertData: {
        expertId:expert.userId._id,
        fullName: expert.userId.fullName,
        location: expert.location,
        experienceYears: expert.experienceYears,
        skills: expert.skills,
        profileImage: expert.profileImage,
      }
    });

  } catch (error) {
    console.error("Error occurred during expert lookup:", error);
    res.status(500).json({ error: error.message });
  }
};


  
