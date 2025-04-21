const Booking = require('../Models/bookingModel');
const User = require('../Models/usersModel');
const Expert = require('../Models/expertsModel');

exports.createBooking = async (req, res) => {
  try {
    const { userId, expertId, preferredDate, preferredTime, serviceDetails } = req.body;
    console.log("req= ",req.body)

    const user = await User.findById(userId);
   
    const expert = await Expert.findOne({ userId: expertId });
console.log("expert",expert);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (!expert) {
      return res.status(400).json({ message: "Expert not found" });
    }

    const newBooking = new Booking({
      userId,
      expertId,
      preferredDate,
      preferredTime,
      serviceDetails 
    });

    const savedBooking = await newBooking.save();

    res.status(201).json({
      message: "Booking successfully created",
      booking: savedBooking
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while booking. Please try again later." });
  }
};



// Get all bookings function
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('userId', 'name email') 
      .populate('expertId', 'name skills'); 

    res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while retrieving the bookings." });
  }
};

exports.getBookingById = async (req, res) => {
  try {
    const { id } = req.params;  

    if (!id) {
      return res.status(400).json({ message: "Booking ID is required" });
    }

    const booking = await Booking.findById({ _id: id })
      .populate('userId', '_id')  
      .populate('expertId', '_id')
      .select("userId expertId ");  

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json(booking);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while retrieving the booking." });
  }
};

