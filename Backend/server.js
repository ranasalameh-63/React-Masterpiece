require("dotenv").config(); 
const express = require("express");
const cors = require("cors");
const connectDB = require("./Config/db");  
const jwt = require("jsonwebtoken");  
const cookiesParser = require("cookie-parser");
const bodyParser = require("body-parser");



const authRouter = require ('./Routes/authRoute')
const addVideoRouter = require ('./Routes/addVideoRoute')
const userRoute = require ('./Routes/userRoute')
const expertRoute = require ('./Routes/expertRoutes')
const contactRoute = require ('./Routes/contactRoute')
const paymentRoute = require ('./Routes/paymentRoute')
const bookingRoute = require ('./Routes/bookingRoute')
const voucherRoute = require ('./Routes/voucherRoute')


const path = require("path");
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cookiesParser());
app.use(
  cors({
    origin: (_, callback) => {
      callback(null, true);
    },
    credentials: true,
  })
);
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB using connectDB function
connectDB();


// Routes
app.use("/api/auth", authRouter);
app.use("/api/videos", addVideoRouter);
app.use("/api/user", userRoute);
app.use("/api/expert", expertRoute);
app.use("/api/contact", contactRoute);
app.use("/api/payment", paymentRoute);
app.use("/api/booking", bookingRoute);
app.use("/api/voucher", voucherRoute);



app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
