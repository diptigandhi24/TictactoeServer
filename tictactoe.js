// Row[column[]] two demensional array in js
// Why you wanted to you Map so much
// logic for reverse diagonal move , x+y = length of the array -1
// let board = [
//   [00, 01, 02, 03],
//   [10, 11, 12, 13],
//   [20, 21, 22, 23],
//   [30, 31, 32, 33],
// ];

let activateRowMove = new Map();
let activateColMove = new Map();
let activateDiagonalMove = { count: 0 };
let activateRevDiagonalMove = { count: 0 };
let activateDrawRCMove = new Set();
let winner = "none";

let length = 3;
//determine the correct Column and Row
//determine the activeRow or activeColumn move
function diagonalKey(x, y) {
  return `${x}${y}`;
}
function diagonalUpdateMoves(xyObj, value, targetRC) {
  if (xyObj.count == 0) {
    xyObj.value = value;
    xyObj.count = 1;
  } else {
    if (xyObj.value == value) {
      xyObj.count += 1;
    } else {
      activateDrawRCMove.add(targetRC);
      // console.log(
      //   "update of draw information from diagnal colunms",
      //   activateDrawRCMove
      // );
    }
  }
}
function isTheRowColAlreadyActive(xy, xyarray, value, targetRC) {
  let isActive = xyarray.has(xy);
  let isDraw = activateDrawRCMove.has(targetRC);

  if (isActive == false && isDraw == false) {
    xyarray.set(xy, { moveId: value, count: 1 });
    console.log(
      "Current map and its count value",
      value,
      xyarray.get(xy).count
    );
  } else {
    // console.log("Before Value of a count", xyarray.get(xy).count);
    if (isDraw == false) {
      if (xyarray.get(xy).moveId === value) {
        xyarray.get(xy).count += 1;
        winner = xyarray.get(xy).count == 3 ? value : "none";
        console.log(
          "Current map and its count value",
          value,
          xyarray.get(xy).count
        );
      } else {
        activateDrawRCMove.add(targetRC);
        xyarray.delete(xy);
      }
    } else {
      // console.log("Already in a draw state");
    }
  }
}
//if the rol/col is active, checkout if the earlier entry and current move belongs to same player or else call it draw
function lookForDrawRowCol(index, array, currentplayedValue) {
  if (currentplayedValue == array.get(index)) {
  }
}

function updateRowColumnMove(rowX, colY) {
  // console.log("Entered User Value", rowX, colY, rowX == colY);
  switch (true) {
    case rowX == colY:
      console.log("case 1");
      //activateDiagonalMove

      // prettier-ignore
      diagonalUpdateMoves(activateDiagonalMove,value,"diagonal");
      //activateRowMove
      isTheRowColAlreadyActive(rowX, activateRowMove, value, `row${rowX}`);
      //activateColMove
      isTheRowColAlreadyActive(colY, activateColMove, value, `col${colY}`);
      break;
    case rowX + colY == length:
      console.log("case 2");
      //activateReverseDiagonalMove
      let target = "revDiagonal";
      // prettier-ignore
      diagonalUpdateMoves(activateRevDiagonalMove,value,target,"revDiagonal");
      //activateRowMove
      isTheRowColAlreadyActive(rowX, activateRowMove, value, `row${rowX}`);
      //activateColMove
      isTheRowColAlreadyActive(colY, activateColMove, value, `col${colY}`);
      break;
    default:
      console.log("case default");
      //activateRowMove
      isTheRowColAlreadyActive(rowX, activateRowMove, value, `row${rowX}`);
      //activateColMove
      isTheRowColAlreadyActive(colY, activateColMove, value, `col${colY}`);
  }
  if (winner == "none") {
    return activateDrawRCMove.size == 8 ? "DRAW" : "Done";
  } else {
    return winner;
  }
}

module.exports.updateRowColumnMove = updateRowColumnMove;
