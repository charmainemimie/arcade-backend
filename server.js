const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const gamesRoutes = require("./routes/games");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration for multiple frontends
const corsOptions = {
  origin: [
    "http://localhost:5173", // client app
    "http://localhost:5174",
    "https://miracle-arcade.netlify.app/",
    "https://miracle-arcade-admin.netlify.app/",
  ],
  credentials: true,
  optionsSuccessStatus: 200,
};

// Middleware
app.use(express.json());
app.use(cors(corsOptions));

// MongoDB Connection
connectDB();

// Routes
app.use("/games", gamesRoutes);

app.listen(PORT, () => console.log(`🌸 Server running on port ${PORT}`));
