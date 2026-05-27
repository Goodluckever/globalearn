require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

/* =========================
   MIDDLEWARE
========================= */

app.use(cors());
app.use(express.json());
const userRoutes =
require("./routes/userRoutes");
app.use(
    "/api/users",
    userRoutes
);
/* =========================
   ROOT ROUTE
========================= */

app.get("/", (req, res) => {

    res.json({
        success: true,
        message:
        "GlobalEarn Backend Running"
    });

});

/* =========================
   HEALTH CHECK
========================= */

app.get("/api/health",
(req, res) => {

    res.json({
        success: true,
        status: "running",
        message:
        "GlobalEarn Backend Connected"
    });

});

/* =========================
   DATABASE CONNECTION
========================= */

mongoose.connect(
    process.env.MONGO_URI
)

.then(() => {

    console.log(
        "MongoDB Connected"
    );

    app.listen(
        process.env.PORT || 10000,
        () => {

        console.log(
            `Server running on port ${
                process.env.PORT
            }`
        );

    });

})

.catch((error) => {

    console.log(
        "Database error:",
        error
    );

});
