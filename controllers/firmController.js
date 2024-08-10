const Firm = require("../models/firmModel");
const User = require("../models/userModel");

// Middleware to check if the user is an admin
const checkAdmin = async (req, res, next) => {
  const user = await User.findByPk(req.user.id);
  if (
    (user && user.user_type === "admin") ||
    user.user_type === "super_admin"
  ) {
    next();
  } else {
    res.status(403).send("Access forbidden: Admins only.");
  }
};

// Get all firms
exports.getFirms = async (req, res) => {
  try {
    const firms = await Firm.findAll();
    res.json(firms);
  } catch (error) {
    console.error("Error retrieving firms:", error);
    res.status(500).send("An error occurred while retrieving firms.");
  }
};

// Create a new firm
exports.createFirm = [
  checkAdmin,
  async (req, res) => {
    const { name, location, registration_number } = req.body;

    if (!name) {
      return res.status(400).send("Firm name is required.");
    }

    try {
      const newFirm = await Firm.create({
        name,
        location,
        registration_number,
      });
      res.status(201).json(newFirm);
    } catch (error) {
      console.error("Error creating firm:", error);
      res.status(500).send("An error occurred while creating the firm.");
    }
  },
];

// Get a firm by ID
exports.getFirmById = async (req, res) => {
  const { id } = req.params;

  try {
    const firm = await Firm.findByPk(id);
    if (!firm) {
      return res.status(404).send("Firm not found.");
    }
    res.json(firm);
  } catch (error) {
    console.error("Error retrieving firm:", error);
    res.status(500).send("An error occurred while retrieving the firm.");
  }
};

// Update a firm by ID
exports.updateFirm = [
  checkAdmin,
  async (req, res) => {
    const { id } = req.params;
    const { name, location, is_active } = req.body;

    try {
      const firm = await Firm.findByPk(id);
      if (!firm) {
        return res.status(404).send("Firm not found.");
      }

      firm.name = name || firm.name;
      firm.location = location || firm.location;
      firm.is_active = is_active !== undefined ? is_active : firm.is_active;

      await firm.save();

      res.json(firm);
    } catch (error) {
      console.error("Error updating firm:", error);
      res.status(500).send("An error occurred while updating the firm.");
    }
  },
];

// Delete a firm by ID
exports.deleteFirm = [
  checkAdmin,
  async (req, res) => {
    const { id } = req.params;

    try {
      const firm = await Firm.findByPk(id);
      if (!firm) {
        return res.status(404).send("Firm not found.");
      }

      await firm.destroy();
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting firm:", error);
      res.status(500).send("An error occurred while deleting the firm.");
    }
  },
];
