const express = require("express");
const Game = require("../models/games");
const multer = require("multer");
const path = require("path");

const router = express.Router();

// Setup storage engine for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // directory to save images
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// File filter for images only
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

// Serve static files from uploads folder
router.use("/uploads", express.static("uploads"));

// Test route
router.get("/test", (req, res) => {
  res.send("Games route is working");
});

// CREATE (with image upload)
router.post("/", upload.single("image"), async (req, res) => {
  try {
    // Validate required fields
    const { name, price, category, status } = req.body;
    if (!name || !price || !category || !status) {
      return res.status(400).json({
        message: "Missing required fields: name, price, category, status",
      });
    }

    const game = new Game({
      ...req.body,
      image: req.file ? `/uploads/${req.file.filename}` : null,
    });
    await game.save();
    res.status(201).json(game);
  } catch (err) {
    console.error("Error creating game:", err);
    res.status(500).json({ error: err.message });
  }
});

//READ all games
router.get("/", async (req, res) => {
  const games = await Game.find();
  res.json(games);
});

//READ a single game
router.get("/:id", async (req, res) => {
  const game = await Game.findById(req.params.id);
  res.json(game);
});

//UPDATE a single game
router.put("/:id", async (req, res) => {
  const game = await Game.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!game) return res.status(404).json({ message: "Game not found" });

  res.json(game);
});

//DELETE a single game
router.delete("/:id", async (req, res) => {
  const game = await Game.findByIdAndDelete(req.params.id);
  if (!game) return res.status(404).json({ message: "Game not found" });
  res.json({ message: "Game deleted" });
});
console.log("routes in games.js loaded");

module.exports = router;
