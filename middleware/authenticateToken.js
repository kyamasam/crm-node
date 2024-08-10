require("dotenv").config(); // Load environment variables
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET; // Replace with the same secret key

// Middleware to check authentication
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    console.log("verify token", err);

    if (err) return res.sendStatus(403);

    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
