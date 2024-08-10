require("dotenv").config(); // Load environment variables
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET; // Replace with the same secret key

// Middleware to check authentication
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Token is missing" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token has expired" });
      } else {
        return res.status(403).json({ message: "Invalid token" });
      }
    }

    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
