const Admin = require("../Models/adminModel");
const User = require("../Models/usersModel"); 
const Booking = require("../Models/bookingModel");
const Video = require("../Models/videosModel");
const Expert = require("../Models/expertsModel");


exports.details = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await Admin.findById(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: "Error fetching user data" });
    }
  };

  


exports.getAdminStatistics = async (req, res) => {
  try {
    const [
      usersCount,
      expertsCount,
      videosCount,
      bookingsCount,
      pendingBookings,
      confirmedBookings,
      canceledBookings
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ role: 'expert' }),
      Video.countDocuments(),
      Booking.countDocuments(),
      Booking.countDocuments({ status: 'pending' }),
      Booking.countDocuments({ status: 'confirmed' }),
      Booking.countDocuments({ status: 'canceled' })
    ]);

    return res.status(200).json({
      usersCount,
      expertsCount,
      videosCount,
      bookingsCount,
      pendingBookings,
      confirmedBookings,
      canceledBookings
    });

  } catch (error) {
    console.error("Error fetching admin statistics:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};




// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); 
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users", error: error.message });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user", error: error.message });
  }
};



// Get all pending experts
exports.getPendingExperts = async (req, res) => {
  try {
    const experts = await Expert.find().populate('userId', 'fullName email role');
    const pending = experts.filter((expert) => expert.userId.role === "user");

    res.status(200).json(pending);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong." });
  }
};

// Approve an expert
exports.approveExpert = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.role = "expert";
    await user.save();

    res.status(200).json({ message: "User promoted to expert successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong." });
  }
};






