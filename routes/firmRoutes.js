const express = require("express");
const router = express.Router();
const firmController = require("../controllers/firmController");
const authenticateToken = require("../middleware/authenticateToken");
const checkAccess = require("../middleware/checkAccess");

// Route to get all firms
router.get("/", authenticateToken, firmController.getFirms);

// Route to create a new firm
router.post("/", authenticateToken, firmController.createFirm);

// Route to get a firm by ID
router.get("/:id", authenticateToken, firmController.getFirmById);

// Route to update a firm by ID
router.put("/:id", authenticateToken, firmController.updateFirm);

// Route to delete a firm by ID
router.delete("/:id", authenticateToken, firmController.deleteFirm);

module.exports = router;
