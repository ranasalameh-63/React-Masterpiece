const mongoose = require("mongoose");
const Expert = require("../Models/expertsModel");

exports.getCurrentExpert = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
        
    if (!id) {
      return res.status(400).json({ message: "Invalid expert ID" });
    }

    const expert = await Expert.findOne({ userId: id })
      .populate("userId", "fullName email role")
      .select("userId location experienceYears skills profileImage phoneNumber aboutYourself availability");

    if (!expert) {
      return res.status(404).json({ message: 'Expert not found' });
    }

    res.status(200).json({
      expertData: {
        expertId: expert._id,
        fullName: expert.userId.fullName,
        email: expert.userId.email,
        role: expert.userId.role,
        phoneNumber: expert.phoneNumber,
        location: expert.location,
        experienceYears: expert.experienceYears,
        aboutYourself: expert.aboutYourself,
        skills: expert.skills,
        availability: expert.availability,
        profileImage: expert.profileImage,
      },
    });
  } catch (error) {
    console.error('Error fetching expert data:', error);
    res.status(500).json({ error: error.message });
  }
};




exports.updateCurrentExpert = async (req, res) => {
  try {
    const { id } = req.params; 

    if (!id) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const updates = req.body; 

    const expert = await Expert.findOneAndUpdate(
      { userId: id },
      { $set: updates },
      { new: true }
    )
    .populate("userId", "fullName email role");

    if (!expert) {
      return res.status(404).json({ message: "Expert not found" });
    }

    res.status(200).json({
      message: "Expert updated successfully",
      expertData: {
        expertId: expert._id,
        fullName: expert.userId.fullName,
        email: expert.userId.email,
        role: expert.userId.role,
        phoneNumber: expert.phoneNumber,
        location: expert.location,
        experienceYears: expert.experienceYears,
        aboutYourself: expert.aboutYourself,
        skills: expert.skills,
        availability: expert.availability,
        profileImage: expert.profileImage,
      },
    });

  } catch (error) {
    console.error("Error updating expert:", error);
    res.status(500).json({ error: error.message });
  }
};

