const express = require("express");
const router = express.Router();
const branchController = require("../controllers/branchController");
const checkAccess = require("../middleware/checkAccess");

router.get("/", branchController.getBranches);
router.post("/", checkAccess, branchController.createBranch);
router.get("/:id", branchController.getBranchById);
router.put("/:id", checkAccess, branchController.updateBranch);
router.delete("/:id", checkAccess, branchController.deleteBranch);

module.exports = router;
