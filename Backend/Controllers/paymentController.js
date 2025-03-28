const Payment = require('../Models/paymentModel');

// Create a new payment
exports.createPayment = async (req, res) => {
  try {
    const { userId, amount, paymentMethod, status } = req.body;
    const payment = new Payment({ userId, amount, paymentMethod, status });

    await payment.save();
    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error.message)
  }
};

// Get all payments
exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
