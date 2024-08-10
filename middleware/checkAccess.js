const Branch = require("../models/branchModel");
const { User } = require("../models/userModel"); // Ensure this import is correct

const checkAccess = async (req, res, next) => {
  try {
    // Check if the User model is loaded correctly
    if (!User) {
      console.error("User model is not defined.");
      return res.status(500).send("Server error: User model is not defined.");
    }

    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(403).send("User not found.");
    }

    const branchId = req.params.id;
    const { firm_id } = req.body;

    // Admins and Super Admins have full access
    if (user.user_type === "admin" || user.user_type === "super_admin") {
      return next();
    }

    // Firm Owners can only create or edit branches within their own firm
    if (user.user_type === "user") {
      if (branchId) {
        const branch = await Branch.findByPk(branchId);
        if (branch && branch.firm_id === user.firm_id) {
          return next();
        }
      } else if (firm_id && firm_id === user.firm_id) {
        return next();
      }
    }

    return res.status(403).send("Access denied.");
  } catch (error) {
    console.error("Error in checkAccess middleware:", error);
    return res.status(500).send("An error occurred while checking access.");
  }
};

module.exports = checkAccess;
