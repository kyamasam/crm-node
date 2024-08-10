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
        model: "branches",
        key: "id",
      },
      field: "branch_id",
    },
    consumer_name: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "consumer_name",
    },
    corporate_name: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "corporate_name",
    },
    moving_from: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "moving_from",
    },
    client_email: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "client_email",
    },
    moving_to: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "moving_to",
    },
    lead_source: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "lead_source",
    },
    remarks: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "remarks",
    },
    notes: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "notes",
    },
    sales_representative: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "users",
        key: "id",
      },
      field: "sales_representative",
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      field: "is_active", // Maps to `is_active` column in the database
    },
  },
  {
    tableName: "moves",
    timestamps: true,
    underscored: true,
  }
);

module.exports = Move;
