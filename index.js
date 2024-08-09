const db = require("./db");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello, World! Tessst");
});

// Example query to test the connection
db.query("SELECT * FROM users", (err, results, fields) => {
  if (err) {
    console.error("Error executing query:", err.stack);
    return;
  }
  console.log("Query results:", results);
});

// Close the connection when done
db.end();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
