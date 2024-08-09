const { Sequelize } = require("sequelize");
require("dotenv").config(); // Load environment variables

console.log(process.env.DB_CONNECTION, "db conn");

const sequelize = new Sequelize({
  dialect: process.env.DB_CONNECTION,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  logging: false, // Set to true if you want to see SQL queries in the console
});

module.exports = sequelize;
