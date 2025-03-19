require("dotenv").config(); 
const express = require("express");
const cors = require("cors");
const connectDB = require("./Config/db");  
const jwt = require("jsonwebtoken");  
const cookiesParser = require("cookie-parser");
const bodyParser = require("body-parser");



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



// Connect to MongoDB using connectDB function
connectDB();

// Routes


app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
