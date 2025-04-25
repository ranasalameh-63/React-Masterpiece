const Voucher = require('../Models/voucherModel');

exports.createVoucher = async (req, res) => {
  const { bookId } = req.params;
  const { amount, details,userId,expertId } = req.body;  
  console.log("bookingID:", req.params);
  console.log("Received data:", req.body);

  try {
    const newVoucher = new Voucher({
      bookingId: bookId, 
      amount,
      details,
      userId,
      expertId,
    });

    const savedVoucher = await newVoucher.save();

    res.status(201).json({
      message: "Voucher created successfully",
      voucher: {
        voucherNumber: savedVoucher.voucherNumber, 
        amount: savedVoucher.amount,
        details: savedVoucher.details,
        userId: savedVoucher.userId,
        expertId: savedVoucher.expertId,
        createdAt: savedVoucher.createdAt,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while creating the Voucher" });
  }
};



exports.getVoucherByBookingId = async (req, res) => {
  const { bookingId } = req.params;
  console.log(bookingId);
  
  if (!bookingId ) {
    return res.status(400).json({ message: "Invalid or missing bookingId" });
  }
  try {
    const voucher = await Voucher.findOne({ bookingId:bookingId });
      console.log(voucher);
    if (!voucher) {
      return res.status(404).json({ message: "No voucher found for this booking" });
    }

    res.json(voucher);
  } catch (error) {
    console.error("Error fetching voucher:", error);
    res.status(500).json({ message: "Server error" });
  }
};
