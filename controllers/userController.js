require("dotenv").config(); // Load environment variables
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const JWT_SECRET = process.env.JWT_SECRET; // Replace with the same secret key

// Controller to authenticate user and generate token
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Email and password are required.");
  }

  try {
    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).send("Invalid email or password.");
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send("Invalid email or password.");
    }

    // Generate token
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h", // Token expiration time
    });

    res.json({ token, user });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).send("An error occurred while logging in.");
  }
};

// Controller to get users by branch
exports.getUsersByBranch = async (req, res) => {
  const { branch_id } = req.params;

  try {
    const users = await User.findAll({
      where: { branch_id },
      attributes: [
        "id",
        "first_name",
        "last_name",
        "phone_country_code",
        "phone_local_number",
        "email",
        "firm_id",
        "branch_id",
        "is_active",
        "user_type",
        "created_at",
        "updated_at",
      ],
    });

    if (users.length === 0) {
      return res.status(404).send("No users found for this branch.");
    }

    res.json(users);
  } catch (error) {
    console.error("Error retrieving users by branch:", error);
    res.status(500).send("An error occurred while retrieving users by branch.");
  }
};

// Controller to get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: [
        "id",
        "first_name",
        "last_name",
        "phone_country_code",
        "phone_local_number",
        "email",
        "password",
        "firm_id",
        "branch_id",
        "is_active",
        "user_type",
        "created_at",
        "updated_at",
      ],
    });
    res.json(users);
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).send("An error occurred while retrieving users.");
  }
};
// Controller to create a new user
exports.createUser = async (req, res) => {
  const {
    first_name,
    last_name,
    phone_country_code,
    phone_local_number,
    email,
    password,
    firm_id,
    branch_id,
    is_active,
    user_type,
  } = req.body;

  if (!first_name || !last_name || !email || !password || !user_type) {
    return res.status(400).send("Required fields are missing.");
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      first_name,
      last_name,
      phone_country_code,
      phone_local_number,
      email,
      password: hashedPassword, // Save hashed password
      firm_id,
      branch_id,
      is_active,
      user_type,
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send("An error occurred while creating the user.");
  }
};

// Controller to get a user by ID
exports.getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).send("User not found.");
    }
    res.json(user);
  } catch (error) {
    console.error("Error retrieving user:", error);
    res.status(500).send("An error occurred while retrieving the user.");
  }
};

// Controller to update a user
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const {
    first_name,
    last_name,
    phone_country_code,
    phone_local_number,
    email,
    password,
    firm_id,
    branch_id,
    is_active,
    user_type,
  } = req.body;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).send("User not found.");
    }

    user.first_name = first_name || user.first_name;
    user.last_name = last_name || user.last_name;
    user.phone_country_code = phone_country_code || user.phone_country_code;
    user.phone_local_number = phone_local_number || user.phone_local_number;
    user.email = email || user.email;
    user.password = password || user.password;
    user.firm_id = firm_id || user.firm_id;
    user.branch_id = branch_id || user.branch_id;
    user.is_active = is_active || user.is_active;
    user.user_type = user_type || user.user_type;

    await user.save();

    res.json(user);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).send("An error occurred while updating the user.");
  }
};

// Controller to delete a user
exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).send("User not found.");
    }

    await user.destroy();
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).send("An error occurred while deleting the user.");
  }
};

// Controller to deactivate the user
exports.deactivateUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).send("User not found.");
    }

    // Deactivate the user
    user.is_active = false;
    await user.save();

    res.json(user);
  } catch (error) {
    console.error("Error deactivating user:", error);
    res.status(500).send("An error occurred while deactivating the user.");
  }
};
