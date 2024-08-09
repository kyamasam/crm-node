// index.js
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Import the user routes
const userRoutes = require("./routes/userRoutes");
const userRoleRoutes = require("./routes/userRoleRoutes");

// Use the routes
app.use("/api/users", userRoutes);
app.use("/api/roles", userRoleRoutes);

app.get("/", (req, res) => {
  res.send("Hello, World! API WORKS");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
