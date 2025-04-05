const Voucher = require('../Models/voucherModel');

exports.createVoucher = async (req, res) => {
  const { amount, details,userId,expertId } = req.body;  

  try {
   

    const newVoucher = new Voucher({
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
