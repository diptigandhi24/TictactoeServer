let uuidv4 = require("uuid").v4;
function doesGameInstanceExit(gameId, serverGameData) {
  return serverGameData.has(gameId);
}
// prettier-ignore
function initiateGameReq( clientDetails, gameData) {
  let gameInstance ={
    player1Name : clientDetails.playerName, 
    player2Name:"", 
    gameId : clientDetails.gameId,
    isGameRunning : false,
    player1Pass :uuidv4().substring(0,5)
  } 
  console.log(gameInstance);
  gameData.set(gameInstance.gameId, gameInstance)
  return gameData;
}

function addPlayer2(serverData, gameId, playerName) {
  if (serverData.get(gameId).player2Name == "") {
    serverData.get(gameId).player2Name = playerName;
    serverData.set(player2Pass, uuidv4().substring(0, 5));
    console.log("Updated server data", serverData);
  }
  // if ((player1Name !== "") & (player2Name !== "")) {
  //   isGameRunning = true;
  // }
  return serverData;
}

//notify the frontEnd to start the game
function startGame() {}
var createGame = function (clientReq, gameData) {
  if (doesGameInstanceExit(clientReq.gameId, gameData) === true) {
    console.log("Game Instance exist already so adding second player");
    addPlayer2(gameData, clientReq.gameId, clientReq.playerName);
  } else {
    console.log("Game instance doesn't exits");
    initiateGameReq(clientReq, gameData);
  }
  return gameData;
};

module.exports = createGame;
// module.exports.doesGameInstanceExit = doesGameInstanceExit;
// module.exports.addPlayer2 = addPlayer2;
