const express = require("express");
const database = require("./connect");
const ObjectId = require("mongodb").ObjectId; // converts a string into an object id compatible with mongoDB

let gameRoutes = express.Router();

// 1 - Retrieve all
// http://localhost:3000/games
gameRoutes.route("/games").get(async (req, res) => {
  let db = database.getDb();
  let data = await db.collection("games").find({}).toArray(); // {} returns everything
  if (data.length > 0) {
    res.json(data);
  } else {
    // This will stop the server as there is no catch statement
    throw new Error("Data was not found :(");
  }
});

// 2   Retrieve one
// http://localhost:3000/games/6914722b2dfb703149c28364
gameRoutes.route("/games/:id").get(async (req, res) => {
  let db = database.getDb();
  let data = await db
    .collection("games")
    .findOne({ _id: new ObjectId(req.params.id) });
  if (Object.keys(data).length > 0) {
    res.json(data);
  } else {
    // This will stop the server as there is no catch statement
    throw new Error("Data was not found :(");
  }
});

// 3 Retrieve leaderboard for a game
// http://localhost:3000/games/leaderboard/6914722b2dfb703149c28364
gameRoutes.route("/games/leaderboard/:id").get(async (req, res) => {
  let db = database.getDb();
  let data = await db
    .collection("scores")
    .find({ gameId: new ObjectId(req.params.id) })
    .sort({ time: 1 })
    .limit(5)
    .toArray();
  if (Object.keys(data).length > 0) {
    res.json(data);
  } else {
    return res.status(404).json({ error: "Leaderboard not found" });
  }
});

// 4 Add a player to the leaderboard
// http://localhost:3000/games/leaderboard/6914722b2dfb703149c28364
gameRoutes.route("/games/leaderboard/:id").post(async (req, res) => {
  let db = database.getDb();

  // Check to see if a user already exists in the database for that game
  const existingPlayer = await db.collection("scores").findOne({
    gameId: new ObjectId(req.params.id),
    playerName: { $regex: new RegExp(`^${req.body.playerName}$`, "i") },
  });

  if (existingPlayer) {
    console.log("Player already exists");
    return res.status(409).json({
      error: "Player already exists in the leaderboard for this game",
    });
  }
  try {
    const newPlayer = {
      gameId: new ObjectId(req.params.id),
      playerName: req.body.playerName,
      time: req.body.time,
    };
    const result = await db.collection("scores").insertOne(newPlayer);
    res.json({ message: "Player added to leaderboard", result: result });
  } catch (error) {
    console.error("Error adding player to leaderboard:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = gameRoutes;
