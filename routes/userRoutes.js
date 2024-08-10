const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authenticateToken = require("../middleware/authenticateToken");

// Public route for login
router.post("/login", userController.loginUser);

// Route to get all users
router.get("/", authenticateToken, userController.getUsers);

// Route to create a new user
router.post("/", userController.createUser);

// Route to get a user by ID
router.get("/:id", authenticateToken, userController.getUserById);

// Route to get a user by branch
router.get(
  "/branch/:branch_id",
  authenticateToken,
  userController.getUsersByBranch
);

// Route to update a user by ID
router.put("/:id", authenticateToken, userController.updateUser);

// Route to delete a user by ID
router.delete("/:id", authenticateToken, userController.deleteUser);

// Route to deactivate a user by ID
router.patch(
  "/:id/deactivate",
  authenticateToken,
  userController.deactivateUser
);

module.exports = router;
