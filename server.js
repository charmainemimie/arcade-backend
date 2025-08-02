const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const gamesRoutes = require("./routes/games");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
connectDB();

// Routes
app.use("/games", gamesRoutes);

app.listen(PORT, () => console.log(`🌸 Server running on port ${PORT}`));
