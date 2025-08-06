const express = require("express");
const Game = require("../models/games");
const router = express.Router();
const multer = require("multer");
const { uploadImageToCloudinary } = require("../cloudinary");

// Set up multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// CREATE a game
router.post("/", upload.single('image'), async (req, res) => {
  try {
    const { name, price, category, status, description, rating } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No image file provided." });
    }

    // Upload the image buffer to Cloudinary
    const imageUrl = await uploadImageToCloudinary(req.file.buffer);

    const game = new Game({
      name,
      price,
      category,
      status,
      image: imageUrl, // Now it's the URL from Cloudinary
      description,
      rating,
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
  try {
    const games = await Game.find();
    res.json(games);
  } catch (err) {
    console.error("Error fetching games:", err);
    res.status(500).json({ error: err.message });
  }
});

//READ a single game
router.get("/:id", async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }
    res.json(game);
  } catch (err) {
    console.error("Error fetching game:", err);
    res.status(500).json({ error: err.message });
  }
});

//UPDATE a single game
router.put("/:id", async (req, res) => {
  try {
    const game = await Game.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }
    res.json(game);
  } catch (err) {
    console.error("Error updating game:", err);
    res.status(500).json({ error: err.message });
  }
});

//DELETE a single game
router.delete("/:id", async (req, res) => {
  try {
    const game = await Game.findByIdAndDelete(req.params.id);
    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }
    res.json({ message: "Game deleted successfully" });
  } catch (err) {
    console.error("Error deleting game:", err);
    res.status(500).json({ error: err.message });
  }
});

console.log("routes in games.js loaded");

module.exports = router;
