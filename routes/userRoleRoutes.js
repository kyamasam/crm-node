const express = require("express");
const router = express.Router();
const userRoleController = require("../controllers/userRoleController");

router.get("/", userRoleController.getUserRoles);
router.post("/", userRoleController.createUserRole);

module.exports = router;
