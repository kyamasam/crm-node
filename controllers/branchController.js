const Branch = require("../models/branchModel");
const { User } = require("../models/userModel"); // Import User model for user type checks

// Middleware to check if the user is a firm owner or admin
const checkAccess = async (req, res, next) => {
  const { user } = await User.findByPk(req.user.id);
  const { firm_id } = req.body; // For create/update operations
  const branchId = req.params.id; // For update/delete operations

  if (user.user_type === "admin" || user.user_type === "super_admin") {
    return next(); // Admins have full access
  }

  if (user.user_type === "user" && branchId) {
    const branch = await Branch.findByPk(branchId);
    if (branch && branch.firm_id === user.firm_id) {
      return next(); // Firm owners can edit branches of their own firm
    }
  }

  return res.status(403).send("Access denied.");
};

// Controller to get all branches
exports.getBranches = async (req, res) => {
  try {
    const branches = await Branch.findAll({
      attributes: [
        "id",
        "name",
        "firm_id",
        "registration_number",
        "location",
        "is_active",
        "created_at",
        "updated_at",
      ],
    });
    res.json(branches);
  } catch (error) {
    console.error("Error retrieving branches:", error);
    res.status(500).send("An error occurred while retrieving branches.");
  }
};

// Controller to create a new branch
exports.createBranch = async (req, res) => {
  const { name, firm_id, is_active } = req.body;

  if (!name || !firm_id) {
    return res.status(400).send("Required fields are missing.");
  }

  try {
    const newBranch = await Branch.create({
      name,
      firm_id,
      registration_n,
      location,
      is_active,
    });

    res.status(201).json(newBranch);
  } catch (error) {
    console.error("Error creating branch:", error);
    res.status(500).send("An error occurred while creating the branch.");
  }
};

// Controller to get a branch by ID
exports.getBranchById = async (req, res) => {
  const { id } = req.params;

  try {
    const branch = await Branch.findByPk(id);
    if (!branch) {
      return res.status(404).send("Branch not found.");
    }
    res.json(branch);
  } catch (error) {
    console.error("Error retrieving branch:", error);
    res.status(500).send("An error occurred while retrieving the branch.");
  }
};

// Controller to update a branch
exports.updateBranch = async (req, res) => {
  const { id } = req.params;
  const { name, firm_id, is_active, registration_number, location } = req.body;

  try {
    const branch = await Branch.findByPk(id);
    if (!branch) {
      return res.status(404).send("Branch not found.");
    }

    // Middleware check
    const { user } = req;
    if (
      user.user_type === "admin" ||
      user.user_type === "super_admin" ||
      (user.user_type === "user" && branch.firm_id === user.firm_id)
    ) {
      branch.name = name || branch.name;
      branch.firm_id = firm_id || branch.firm_id;
      branch.is_active = is_active || branch.is_active;
      branch.location = location || branch.location;
      branch.registration_number =
        registration_number || branch.registration_number;

      await branch.save();
      res.json(branch);
    } else {
      res.status(403).send("Access denied.");
    }
  } catch (error) {
    console.error("Error updating branch:", error);
    res.status(500).send("An error occurred while updating the branch.");
  }
};

// Controller to delete a branch
exports.deleteBranch = async (req, res) => {
  const { id } = req.params;

  try {
    const branch = await Branch.findByPk(id);
    if (!branch) {
      return res.status(404).send("Branch not found.");
    }

    const { user } = req;
    if (
      user.user_type === "admin" ||
      user.user_type === "super_admin" ||
      (user.user_type === "user" && branch.firm_id === user.firm_id)
    ) {
      await branch.destroy();
      res.status(204).send();
    } else {
      res.status(403).send("Access denied.");
    }
  } catch (error) {
    console.error("Error deleting branch:", error);
    res.status(500).send("An error occurred while deleting the branch.");
  }
};
