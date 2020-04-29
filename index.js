const express = require("express");
var bodyParser = require("body-parser");
let createGame = require("./gameDetails");
// let roomRouter = require("./roomRouter");
let cors = require("cors");
const app = express();
const port = 5000;
app.all("*", cors());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
let gameData = new Map();
let gameId = 0;
function handleRequest(req, res) {
  // console.log("request received by the server", req.body);
  let playerName = req.body.playerName;
  gameId = req.body.gameId;
  createGame({ playerName, gameId }, gameData);
  // console.log(gameData, gameData.size);
  let player1Data = new Map(gameData.get(gameId));
  player1Data.delete("player1Pass");
  let fileredData = player1Data;
  console.log(
    "Player1",
    player1Data,
    typeof player1Data + "YOOOOOOO",
    fileredData
  );
  res.send(gameData.get(gameId));
}

app.post("/", cors(), (req, res) => handleRequest(req, res));

app.post("/player2Details", cors(), (req, res) => {
  console.log("waiting for player2 to register");
  console.log("RegisterPlayer2", req.body);
  let playerData = req.body.playerId;
  console.log(gameData.get(playerData), playerData);
  res.send(gameData.get(gameId));
});

// app.post(`/registerPlayer/${gameData.get(gameData.size).gameId}`);
app.listen(port, () =>
  console.log(`Hello express server is listenning at ${port}!`)
);

//look for gameId if it doesnt exist that create and obj and store it inside the map
