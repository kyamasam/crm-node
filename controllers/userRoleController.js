const db = require("../db");

const normalizeName = (name) => {
  return name.trim().toLowerCase();
};

// Ensure the table is created before handling any requests
const createTableIfNotExists = () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS userRoles (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL UNIQUE COLLATE utf8_general_ci
    )
  `;

  return new Promise((resolve, reject) => {
    db.query(createTableQuery, (err) => {
      if (err) {
        console.error("Error creating table:", err.stack);
        return reject("An error occurred while setting up the database.");
      }
      resolve();
    });
  });
};

// Controller to get user roles
exports.getUserRoles = async (req, res) => {
  try {
    await createTableIfNotExists(); // Ensure table exists
    db.query("SELECT * FROM userRoles", (err, results) => {
      if (err) {
        console.error("Error executing query:", err.stack);
        return res
          .status(500)
          .send("An error occurred while retrieving user roles.");
      }
      res.json(results);
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Controller to create a user role
exports.createUserRole = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).send("Role name is required.");
  }

  const normalizedName = normalizeName(name);
  console.log("normalizedName: " + normalizedName);

  try {
    await createTableIfNotExists(); // Ensure table exists

    // Check for similar names
    const checkQuery = "SELECT * FROM userRoles WHERE LOWER(name) = ?";
    db.query(checkQuery, [normalizedName], (err, results) => {
      if (err) {
        console.error("Error executing query:", err.stack);
        return res
          .status(500)
          .send("An error occurred while checking for existing roles.");
      }

      if (results.length > 0) {
        return res.status(409).send("Role name already exists.");
      }

      // Insert the new role
      const insertQuery = "INSERT INTO userRoles (name) VALUES (?)";
      db.query(insertQuery, [name], (err, results) => {
        if (err) {
          console.error("Error executing query:", err.stack);
          return res
            .status(500)
            .send("An error occurred while creating the user role.");
        }
        res.status(201).send("User role created successfully.");
      });
    });
  } catch (error) {
    res.status(500).send(error);
  }
};
