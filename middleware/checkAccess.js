const Move = require("../models/moveModel");
const User = require("../models/userModel");
const Branch = require("../models/branchModel");

// Middleware to check if the user has access to the move
const checkAccess = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id); // Ensure user is fetched correctly
    const { branch_id } = req.body; // For create/update operations
    const moveId = req.params.id; // For update/delete operations

    if (user.user_type === "super_admin") {
      return next(); // Admins and super admins have full access
    }

    if (user.user_type === "user") {
      if (moveId) {
        const move = await Move.findByPk(moveId);
        if (move) {
          const branch = await Branch.findByPk(move.branch_id);
          if (branch && branch.firm_id === user.firm_id) {
            return next(); // Users within the same firm can access moves in their firm
          }
        }
      } else if (branch_id && branch_id === user.branch_id) {
        return next();
      }
    }

    return res.status(403).send("Access denied.");
  } catch (error) {
    console.error("Error in checkAccess middleware:", error);
    return res.status(500).send("Server error.");
  }
};

module.exports = checkAccess;
