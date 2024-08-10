const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Import the configured sequelize instance

// Define the Move model
const Move = sequelize.define(
  "Move",
  {
    branch_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "branches", // name of the table
        key: "id",
      },
      field: "branch_id", // Maps to `branch_id` column in the database
    },
    consumer_name: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "consumer_name", // Maps to `consumer_name` column in the database
    },
    corporate_name: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "corporate_name", // Maps to `corporate_name` column in the database
    },
    moving_from: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "moving_from", // Maps to `moving_from` column in the database
    },
    contact_information: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "contact_information", // Maps to `contact_information` column in the database
    },
    moving_to: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "moving_to", // Maps to `moving_to` column in the database
    },
    lead_source: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "lead_source", // Maps to `lead_source` column in the database
    },
    remarks: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "remarks", // Maps to `remarks` column in the database
    },
    notes: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "notes", // Maps to `notes` column in the database
    },
    sales_representative: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "users", // name of the table
        key: "id",
      },
      field: "sales_representative", // Maps to `sales_representative` column in the database
    },
  },
  {
    tableName: "moves",
    timestamps: true,
    underscored: true, // Automatically converts camelCase to snake_case
  }
);

module.exports = Move;
