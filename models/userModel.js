const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Import the configured sequelize instance

// Define the User model
const User = sequelize.define(
  "User",
  {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "first_name", // Maps to `first_name` column in the database
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "last_name", // Maps to `last_name` column in the database
    },
    phone_country_code: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "phone_country_code", // Maps to `phone_code` column in the database
    },
    phone_local_number: {
      type: DataTypes.BIGINT,
      allowNull: true,
      field: "phone_local_number", // Maps to `phone_number` column in the database
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      field: "email", // Maps to `email` column in the database
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "password", // Maps to `password` column in the database
    },
    firm_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "firms", // name of the table
        key: "id",
      },
      field: "firm_id", // Maps to `firm_id` column in the database
    },
    branch_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "branches", // name of the table
        key: "id",
      },
      field: "branch_id", // Maps to `branch_id` column in the database
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      field: "is_active", // Maps to `is_active` column in the database
    },
    user_type: {
      type: DataTypes.ENUM("admin", "user", "guest"), // Update with your actual user types
      allowNull: false,
      field: "user_type", // Maps to `user_type` column in the database
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: "created_at", // Maps to `created_at` column in the database
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: "updated_at", // Maps to `updated_at` column in the database
    },
  },
  {
    tableName: "users",
    timestamps: true,
    underscored: true, // Automatically converts camelCase to snake_case
  }
);

module.exports = User;
