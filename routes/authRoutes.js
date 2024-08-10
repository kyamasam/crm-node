const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Route for user login
router.post("/login", userController.loginUser);

module.exports = router;
