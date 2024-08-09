const db = require("../db");

// Controller to get users
exports.getUsers = (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) {
      console.error("Error executing query:", err.stack);
      return res.status(500).send("An error occurred while retrieving users.");
    }
    res.json(results);
  });
};
