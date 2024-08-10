require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// import routes
const userRoutes = require("./routes/userRoutes");
const firmRoutes = require("./routes/firmRoutes.js");
const branchRoutes = require("./routes/branchRoutes.js");
const moveRoutes = require("./routes/moveRoutes.js");
const authRoutes = require("./routes/authRoutes.js");
const userRoleRoutes = require("./routes/userRoleRoutes");

// Use the routes
app.use("/api/users", userRoutes);
app.use("/api/login", authRoutes);
app.use("/api/firms", firmRoutes);
app.use("/api/branches", branchRoutes);
app.use("/api/moves", moveRoutes);
app.use("/api/roles", userRoleRoutes);
app.get("/", (req, res) => {
  res.send("Hello, World! API WORKS");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
