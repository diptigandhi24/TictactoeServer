let createGame = require("./gameDetails");
let doesGameInstanceExit = require("./gameDetails").doesGameInstanceExit;
let addPlayer2 = require("./gameDetails").addPlayer2;

//Finally I can write some test Yayyy
//what the point of dividing the functionality into multiple function if I have not return a test for those functions
let serverGameData = new Map();
serverGameData.set("11", { name: "Dipti" });
let test1 = {
  playerName1: "Dipti",
  gameUUID: "111111"
};

test("Create the game instance ", () => {
  expect(createGame(test1, serverGameData)).toEqual(serverGameData);
});

// test("Does Instance Exist in the gameData ", () => {
//   console.log(serverGameData);
//   expect(doesGameInstanceExit("111111", serverGameData)).toBe(true);
// });

// test("Add Second Player ", () => {
//   expect(addPlayer2(serverGameData, "111111")).toEqual(serverGameData);
// });
