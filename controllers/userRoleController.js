const UserRole = require('../models/userRoleModel');

// Ensure the table is created before handling any requests
const createTableIfNotExists = async () => {
  try {
    await UserRole.sync(); // Ensure table exists
  } catch (error) {
    console.error("Error creating table:", error);
    throw new Error("An error occurred while setting up the database.");
  }
};

// Controller to get user roles
exports.getUserRoles = async (req, res) => {
  try {
    await createTableIfNotExists(); // Ensure table exists

    const roles = await UserRole.findAll();
    res.json(roles);
  } catch (error) {
    res.status(500).send("An error occurred while retrieving user roles.");
  }
};

// Controller to create a user role
exports.createUserRole = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).send("Role name is required.");
  }

  const normalizedName = name.trim().toLowerCase();

  try {
    await createTableIfNotExists(); // Ensure table exists

    // Check for existing roles with similar names
    const existingRole = await UserRole.findOne({
      where: {
        name: normalizedName
      }
    });

    if (existingRole) {
      return res.status(409).send("Role name already exists.");
    }

    // Create the new role
    await UserRole.create({ name: normalizedName });
    res.status(201).send("User role created successfully.");
  } catch (error) {
    console.error("Error creating user role:", error);
    res.status(500).send("An error occurred while creating the user role.");
  }
};
