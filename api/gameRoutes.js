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
    .findOne({ gameId: new ObjectId(req.params.id) });
  if (Object.keys(data).length > 0) {
    res.json(data);
  } else {
    // This will stop the server as there is no catch statement
    throw new Error("Data was not found :(");
  }
});

module.exports = gameRoutes;
