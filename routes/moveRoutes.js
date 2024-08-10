const express = require("express");
const router = express.Router();
const moveController = require("../controllers/moveController");
const authenticateToken = require("../middleware/authenticateToken");
const checkAccess = require("../middleware/checkAccess"); // Access control for moves

// Apply authentication and authorization middleware to all routes
router.use(authenticateToken);
router.use(checkAccess); // Only admins and users with access can access these routes

// Route to get all moves
router.get("/", moveController.getMoves);

// Route to create a new move
router.post("/", moveController.createMove);

// Route to get a move by ID
router.get("/:id", moveController.getMoveById);

// Route to update a move by ID
router.put("/:id", moveController.updateMove);

// Route to delete a move by ID
router.delete("/:id", moveController.deleteMove);

module.exports = router;
