const jwt = require("jsonwebtoken");
const User = require("../Models/usersModel"); 


exports.authMiddleware = (req, res, next) => {
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



exports.adminMiddleware = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized. No user information found. Please log in.",
      code: "USER_NOT_FOUND"
    });
  }

  if (req.user.role !== "Admin") {
    return res.status(403).json({
      message: `Access denied. You need to be an admin to access this resource. Your role is ${req.user.role}.`,
      code: "INSUFFICIENT_PERMISSIONS"
    });
  }

  next();
};



