const express = require("express");
const Game = require("../models/games");
const router = express.Router();
const { upload } = require("../config/cloudinary");


// CREATE a game (image is a URL in req.body.image)
router.post("/", async (req, res) => {
  try {
    const { name, price, category, status, image, description, rating } = req.body;

    // Validate required fields
    if (!name || !price || !category || !status || !image) {
      return res.status(400).json({
        message: "Missing required fields: name, price, category, status, or image",
      });
    }

    const game = new Game({
      name,
      price,
      category,
      status,
      image,         // It's a URL string now, not a file
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
