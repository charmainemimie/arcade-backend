const express = require("express");
const Game = require("../models/games");
const router = express.Router();

//test route
router.get("/test", (req, res) => {
  res.send("Games route is working");
});

//CREATE
router.post("/", async (req, res) => {
  const game = new Game(req.body);
  await game.save();
  res.status(201).json(game);
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
