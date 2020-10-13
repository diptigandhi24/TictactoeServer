let uuidv4 = require("uuid").v4;
function doesGameInstanceExit(gameId, serverGameData) {
  return serverGameData.has(gameId);
}
function createPlayerInfo(clientinfo) {
  return {
    name: clientinfo.playerName,
    password: uuidv4().substring(0, 5),
  };
}

// prettier-ignore
function initiateGameReq( clientDetails, gameData) {
 let player1 = createPlayerInfo(clientDetails)
  gameData.set(clientDetails.gameId, {player1})
  gameData.get(clientDetails.gameId)["beginGame"] =false
  gameData.get(clientDetails.gameId)["currentMove"] = {}
  return gameData;
}

function addPlayer2(clientDetails, gameData) {
  // console.log("Player2 Details from a function", clientDetails);
  let player2 = createPlayerInfo(clientDetails);
  gameData.get(clientDetails.gameId)["player2"] = player2;
  gameData.get(clientDetails.gameId)["beginGame"] = true;
  // console.log("Updated server data", gameData);
  return gameData;
}

//notify the frontEnd to start the game
function startGame() {}
var createGame = function (clientReq, gameData) {
  if (doesGameInstanceExit(clientReq.gameId, gameData) === true) {
    // console.log("Game Instance exist already so adding second player");
    addPlayer2(gameData, clientReq.gameId, clientReq.playerName);
  } else {
    // console.log("Game instance doesn't exits");
    initiateGameReq(clientReq, gameData);
  }
  return gameData;
};

module.exports.initiateGameReq = initiateGameReq;
// module.exports.doesGameInstanceExit = doesGameInstanceExit;
module.exports.addPlayer2 = addPlayer2;
