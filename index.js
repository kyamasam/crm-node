// index.js
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// Import the user routes
const userRoutes = require("./routes/userRoutes");

// Use the routes
app.use("/api", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello, World! Tessst");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
