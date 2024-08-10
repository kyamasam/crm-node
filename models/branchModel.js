const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Import the configured sequelize instance

// Define the Branch model
const Branch = sequelize.define(
  "Branch",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      field: "name", // Maps to `name` column in the database
    },
    firm_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "firms", // name of the table
        key: "id",
      },
      field: "firm_id", // Maps to `firm_id` column in the database
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      field: "is_active", // Maps to `is_active` column in the database
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
    tableName: "branches",
    timestamps: true,
    underscored: true, // Automatically converts camelCase to snake_case
  }
);

module.exports = Branch;
