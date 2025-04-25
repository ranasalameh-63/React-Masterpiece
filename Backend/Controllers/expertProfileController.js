const Expert = require("../Models/expertsModel");
const Booking = require("../Models/bookingModel");



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
    if (req.file) {
      updates.profileImage = req.file ? `/uploads/${req.file.filename}` : null; // أو full path if needed
  }
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



exports.getExpertBookings = async (req, res) => {
  try {
    const expertId =req.params;  
    const id =expertId.id;
    const bookings = await Booking.find({ expertId:id }).populate("userId", "fullName email") 
          .sort({ preferredDate: -1 }); ;
    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching expert bookings" });
  }
};







exports.updateBookingStatus = async (req, res) => {
  const { bookingId, status } = req.body;  

  if (!["confirmed", "canceled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" }); 
  }

  try {
      const booking = await Booking.findById(bookingId);

      if (!booking) {
          return res.status(404).json({ message: "Booking not found" }); 
      }

      booking.status = status;
      await booking.save();

      res.status(200).json({ message: "Booking status updated successfully", booking });
  } catch (error) {
      console.error("Error updating booking status:", error);
      res.status(500).json({ message: "Server error" });
  }
};