const express = require("express");
var bodyParser = require("body-parser");
let initiateGameReq = require("./gameDetails").initiateGameReq;
let addSecondPlayer = require("./gameDetails").addPlayer2;
let verification = require("./updatePlayermove").verification;
// let roomRouter = require("./roomRouter");
let cors = require("cors");
const app = express();
const port = 5000;
app.all("*", cors());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
let gameData = new Map();
let gameId = 0;

let currentMove = {};
let playerIdentity = "";
let updateFeildRequest = 0;

//Its important for us to understand if the request came from player1 or player2 so that we can hide
function handleRequest(req, res) {
  let playerName = req.body.playerName;
  gameId = req.body.gameId;
  let currentRegistrationPlayer;
  if (gameData.has(gameId) === false) {
    // console.log("registration of player1");
    currentRegistrationPlayer = "player1";
    initiateGameReq({ playerName, gameId }, gameData);
  } else {
    if (gameData.has(gameId) === true) {
      // console.log("registration of player2", gameId);
      currentRegistrationPlayer = "player2";
      addSecondPlayer({ playerName, gameId }, gameData);
    }
  }

  // console.log("AFter create the player 1 info", gameData);

  let playerInfo = {};
  if (currentRegistrationPlayer == "player2") {
    let player1 = gameData.get(gameId)["player1"];
    let player2 = gameData.get(gameId)[currentRegistrationPlayer];
    playerInfo.player1Name = player1.name;
    playerInfo.player2Name = player2.name;
    playerInfo.password = player2.password;
  } else {
    playerInfo = gameData.get(gameId)[currentRegistrationPlayer];
  }
  let beginGame = gameData.get(gameId)["beginGame"];
  res.send({ playerInfo, gameId, beginGame });
}

app.post("/", cors(), (req, res) => handleRequest(req, res)); // only this function does ask for the password for the register player

//I think Server need to the board identity, associated player name and pass to that board on the safer side
app.post("/requestingPlayer2Details", cors(), (req, res) => {
  //reply to player1Request
  // console.log("Details send to get the information about player2", req.body);
  let gameId = req.body.gameId;
  let player2Data = gameData.get(gameId)["player2"];
  // console.log("What is player2Name", player2Data);
  if (player2Data != undefined) {
    // console.log("Found the Player2Data", player2Data);
    let player2Name = player2Data.name;
    let beginGame = gameData.get(gameId)["beginGame"];
    let playerInfo = {};
    playerInfo.player1Name = req.body.player1Name;
    playerInfo.password = req.body.password;
    playerInfo.player2Name = player2Name;
    res.send({ playerInfo, gameId, beginGame });
  }
  //  else {
  //   let player2Name = undefined;
  //   res.send({ player2Name });
  // }
});

app.post("/updateplayermove", cors(), (req, res) => {
  let playerinfo = req.body;
  let { rowId, colId, squareId } = playerinfo;
  let verify = verification(playerinfo, gameData);
  updateFeildRequest += 1;
  console.log("updateFeildRequest", playerinfo.player);
  // console.log(
  //   "Verification of the player is",
  //   playerinfo,
  //   typeof playerinfo,
  //   verify
  // );
  if (verify == true && Object.keys(currentMove).length == 0) {
    //update the currentMove
    currentMove = {
      yourTurn: true,
      id: squareId,
      rowId: rowId,
      colId: colId,
    };
    res.send({ sucess: "success" });
  }
});

app.post("/getplayermove", cors(), (req, res) => {
  let playerinfo = req.body;
  console.log("Get Next move request obj", playerinfo.player);
  let verify = verification(playerinfo, gameData);
  if (verify == true && Object.keys(currentMove).length != 0) {
    res.send(currentMove);
    currentMove = {};
  } else {
    res.send({ wait: "wait" });
  }
});

// app.post(`/registerPlayer/${gameData.get(gameData.size).gameId}`);
app.listen(port, () =>
  console.log(`Hello express server is listenning at ${port}!`)
);

//look for gameId if it doesnt exist that create and obj and store it inside the map
