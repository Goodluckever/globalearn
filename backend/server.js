const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("GlobalEarn backend is running");
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    status: "Backend Connected"
  });
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
