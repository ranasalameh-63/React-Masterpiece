const Payment = require("../Models/paymentModel");

const checkoutController = async (req, res) => {
  try {
    const { amount, paymentMethod, status, userId, voucherId, bookingId } = req.body;
    console.log(req.body)

    if (!amount || !paymentMethod || !status || !userId || !voucherId || !bookingId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const payment = await Payment.create({
      userId,
      amount,
      paymentMethod,
      status,
      voucherId,
      bookingId,
    });

    return res.status(200).json({
      message: "Payment recorded successfully",
      paymentId: payment._id,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error processing payment",
      error: error.message,
    });
  }
};

module.exports = { checkoutController };

