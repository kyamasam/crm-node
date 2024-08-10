const Move = require("../models/moveModel");
const User = require("../models/userModel.js"); // Import User model for user type checks
const Branch = require("../models/branchModel");

// Middleware to check if the user has access to the move
const checkAccess = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id); // Ensure user is fetched correctly
    const { branch_id } = req.body; // For create/update operations
    const moveId = req.params.id; // For update/delete operations

    if (user.user_type === "super_admin") {
      return next(); // Admins have full access
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
      }
      return res.status(403).send("Access denied.");
    }

    return res.status(403).send("Access denied.");
  } catch (error) {
    console.error("Error in checkAccess middleware:", error);
    return res.status(500).send("Server error.");
  }
};

// Controller to get all moves
exports.getMoves = async (req, res) => {
  try {
    const moves = await Move.findAll({
      attributes: [
        "id",
        "branch_id",
        "consumer_name",
        "corporate_name",
        "moving_from",
        "contact_information",
        "moving_to",
        "lead_source",
        "remarks",
        "notes",
        "sales_representative",
        "created_at",
        "updated_at",
      ],
    });
    res.json(moves);
  } catch (error) {
    console.error("Error retrieving moves:", error);
    res.status(500).send("An error occurred while retrieving moves.");
  }
};

// Controller to create a new move
exports.createMove = async (req, res) => {
  const {
    branch_id,
    consumer_name,
    corporate_name,
    moving_from,
    contact_information,
    moving_to,
    lead_source,
    remarks,
    notes,
    sales_representative,
  } = req.body;

  if (
    !branch_id ||
    !moving_from ||
    !contact_information ||
    !moving_to ||
    !lead_source ||
    !remarks ||
    !notes
  ) {
    return res.status(400).send("Required fields are missing.");
  }

  try {
    const newMove = await Move.create({
      branch_id,
      consumer_name,
      corporate_name,
      moving_from,
      contact_information,
      moving_to,
      lead_source,
      remarks,
      notes,
      sales_representative,
    });

    res.status(201).json(newMove);
  } catch (error) {
    console.error("Error creating move:", error);
    res.status(500).send("An error occurred while creating the move.");
  }
};

// Controller to get a move by ID
exports.getMoveById = async (req, res) => {
  const { id } = req.params;

  try {
    const move = await Move.findByPk(id);
    if (!move) {
      return res.status(404).send("Move not found.");
    }
    res.json(move);
  } catch (error) {
    console.error("Error retrieving move:", error);
    res.status(500).send("An error occurred while retrieving the move.");
  }
};

// Controller to update a move
exports.updateMove = async (req, res) => {
  const { id } = req.params;
  const {
    branch_id,
    consumer_name,
    corporate_name,
    moving_from,
    contact_information,
    moving_to,
    lead_source,
    remarks,
    notes,
    sales_representative,
  } = req.body;

  try {
    const move = await Move.findByPk(id);
    if (!move) {
      return res.status(404).send("Move not found.");
    }

    const user = await User.findByPk(req.user.id); // Fetch user again here
    if (
      user.user_type === "admin" ||
      (user.user_type === "user" && move.branch_id === user.branch_id)
    ) {
      move.branch_id = branch_id || move.branch_id;
      move.consumer_name = consumer_name || move.consumer_name;
      move.corporate_name = corporate_name || move.corporate_name;
      move.moving_from = moving_from || move.moving_from;
      move.contact_information =
        contact_information || move.contact_information;
      move.moving_to = moving_to || move.moving_to;
      move.lead_source = lead_source || move.lead_source;
      move.remarks = remarks || move.remarks;
      move.notes = notes || move.notes;
      move.sales_representative =
        sales_representative || move.sales_representative;

      await move.save();
      res.json(move);
    } else {
      res.status(403).send("Access denied.");
    }
  } catch (error) {
    console.error("Error updating move:", error);
    res.status(500).send("An error occurred while updating the move.");
  }
};

// Controller to delete a move
exports.deleteMove = async (req, res) => {
  const { id } = req.params;

  try {
    const move = await Move.findByPk(id);
    if (!move) {
      return res.status(404).send("Move not found.");
    }

    const user = await User.findByPk(req.user.id); // Fetch user again here
    if (
      user.user_type === "admin" ||
      user.user_type === "super_admin" ||
      (user.user_type === "user" && move.branch_id === user.branch_id)
    ) {
      await move.destroy();
      res.status(204).send();
    } else {
      res.status(403).send("Access denied.");
    }
  } catch (error) {
    console.error("Error deleting move:", error);
    res.status(500).send("An error occurred while deleting the move.");
  }
};
