const Payment = require("../Models/paymentModel");

const checkoutController = async (req, res) => {
  try {
    const { amount, paymentMethod, status, userId } = req.body;

    if (!amount || !paymentMethod || !status || !userId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (paymentMethod !== "paypal") {
      return res.status(400).json({ message: "Only PayPal is supported" });
    }

    const payment = await Payment.create({
      userId,
      amount,
      paymentMethod,
      status,
    });

    return res.status(200).json({
      message: "Payment recorded successfully",
      paymentId: payment._id,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error processing PayPal payment",
      error: error.message,
    });
  }
};

module.exports = { checkoutController };
