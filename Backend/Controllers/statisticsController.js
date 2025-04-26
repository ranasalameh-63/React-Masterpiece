const User = require("../Models/usersModel");
const Expert = require("../Models/expertsModel");
const Video = require("../Models/videosModel");
const Booking = require("../Models/bookingModel");

exports.getStatistics = async (req, res) => {
  try {
    const usersCount = await User.countDocuments();
    const expertsCount = await Expert.countDocuments();
    const videosCount = await Video.countDocuments();
    const bookingsCount = await Booking.countDocuments({ status: "confirmed" });

    res.status(200).json({
      users: usersCount,
      experts: expertsCount,
      videos: videosCount,
      bookings: bookingsCount,
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching statistics" });
  }
};
