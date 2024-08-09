const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Import the configured sequelize instance

const UserRole = sequelize.define(
  "UserRole",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [1, 255],
      },
    },
  },
  {
    tableName: "userRoles",
    timestamps: false,
  }
);

module.exports = UserRole;
