const User = require("../Models/usersModel");
const Booking = require("../Models/bookingModel");


exports.details = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: "Error fetching user data" });
    }
  };



  exports.updateUserProfile = async (req, res) => {
    try {
      const { id } = req.params;
      const { fullName, email } = req.body;
  
      const user = await User.findById(id);
      if (!user) return res.status(404).json({ message: "User not found" });
  
      user.fullName = fullName || user.fullName;
      user.email = email || user.email;
  
      if (req.file) {
        user.profilePicture = req.file ? `/uploads/${req.file.filename}` : null;
      }
  
      const updatedUser = await user.save();
  
      res.status(200).json({ message: "Profile updated", user: updatedUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error updating profile" });
    }
  };
  


  exports.getUserBookings = async (req, res) => {
    try {
      const { userId } = req.params;
  
      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }
  
      const bookings = await Booking.find({ userId })
      .populate({
        path: "expertId",
        select: "skills profileImage",
        populate: {
          path: "userId",
          model: "User",
          select: "fullName"
        }
      });
      
  
      res.status(200).json(bookings);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred while retrieving the bookings." });
    }
  };
  
  