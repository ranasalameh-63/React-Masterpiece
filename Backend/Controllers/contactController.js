const Contact = require("../Models/contactModel"); 

exports.createContactMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newContactMessage = new Contact({
      name,
      email,
      message,
    });

    await newContactMessage.save();

    res.status(201).json({
      message: "Your message has been sent successfully!",
      data: newContactMessage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong, please try again later" });
  }
};

exports.getContactMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 }); 
    res.status(200).json({ data: messages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong, please try again later" });
  }
};
