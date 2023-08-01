const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;
const dbUrl = process.env.DB_CONNECTION;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to the database
mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
    process.exit(1);
  });

app.get("/", (req, res) => {
  res.send("welcome Employee");
});

// Routes
const employeeRoutes = require("./routes/employeeRoutes");
app.use("/api", employeeRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
