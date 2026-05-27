require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.json({
    message: "GlobalEarn Backend Running"
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Backend Connected",
    status: "running"
  });
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(process.env.PORT, () => {
      console.log(
        `Server running on port ${process.env.PORT}`
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });
