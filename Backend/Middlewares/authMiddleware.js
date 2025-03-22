const jwt = require("jsonwebtoken");
const User = require("../Models/usersModel"); 


const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded._id || !decoded.role) {
      return res.status(401).json({ message: "Invalid token structure" });
    }

    req.user = decoded;
    console.log("Authenticated User:", req.user);

    next();
  } catch (error) {
    
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token has expired" });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }
    
    return res
      .status(401)
      .json({ message: "Authorization failed", error: error.message });
  }
};

module.exports = authMiddleware;
