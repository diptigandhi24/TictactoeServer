let updateRowColumnMove = require("./tictactoe").updateRowColumnMove;
test("access the pointX and pointY", () => {
  expect(updateRowColumnMove((x = 0), (y = 0), (value = "x"))).toBe("Done");
  expect(updateRowColumnMove((x = 0), (y = 1), (value = "x"))).toBe("Done");
  expect(updateRowColumnMove((x = 1), (y = 0), (value = "x"))).toBe("Done");
  expect(updateRowColumnMove((x = 1), (y = 1), (value = "x"))).toBe("Done");
  expect(updateRowColumnMove((x = 1), (y = 2), (value = "o"))).toBe("Done");
  expect(updateRowColumnMove((x = 2), (y = 0), (value = "o"))).toBe("Done");
  expect(updateRowColumnMove((x = 2), (y = 1), (value = "o"))).toBe("Done");
  expect(updateRowColumnMove((x = 2), (y = 2), (value = "x"))).toBe("Done");
  expect(updateRowColumnMove((x = 0), (y = 2), (value = "x"))).toBe("x");
});
