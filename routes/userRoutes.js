const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Define routes and map them to controller methods
router.get("/users", userController.getUsers);

module.exports = router;
