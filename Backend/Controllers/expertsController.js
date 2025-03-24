const Expert = require("../Models/expertsModel");
const path = require("path");

exports.createExpert = async (req, res) => {
  try {
    const { phoneNumber, location, experienceYears, aboutYourself, skills, specialties, availability, hourlyRate } = req.body;
    let profileImage = req.file ? `/uploads/experts/${req.file.filename}` : null; 

    const expert = new Expert({
      userId: req.user.id,
      phoneNumber,
      location,
      experienceYears,
      aboutYourself,
      skills: skills ? skills.split(",") : [],
      specialties: specialties ? specialties.split(",") : [],
      availability: Array.isArray(availability) ? availability : availability ? [availability] : [],
      hourlyRate,
      profileImage,
    });

    await expert.save();
    res.status(201).json({ message: "Expert profile created successfully", expert });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.getAllExperts = async (req, res) => {
    try {
      const experts = await Expert.find().populate("userId", "firstName lastName email"); 
      res.status(200).json(experts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  



  exports.getExpertById = async (req, res) => {
    try {
      const expert = await Expert.findById(req.params.id).populate("userId", "firstName lastName email");
      if (!expert) return res.status(404).json({ message: "Expert not found" });
      res.status(200).json(expert);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
