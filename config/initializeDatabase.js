const sequelize = require("../config/database"); // Import your Sequelize instance
const User = require("../models/userModel"); // Import the User model

// Sync models and create tables if they do not exist
const initializeDatabase = async () => {
  try {
    await sequelize.sync({ force: false }); // `force: false` to avoid dropping existing tables
    console.log("Database synchronized successfully.");
  } catch (error) {
    console.error("Error synchronizing database:", error);
  }
};

module.exports = initializeDatabase;
