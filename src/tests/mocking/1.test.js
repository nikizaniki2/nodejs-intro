/* eslint-disable no-func-assign */

const myFunc = require('./getWinner');

jest.mock('./getWinner');

test('getWinner returns', () => {
  // MOCKING with jest

  const result = myFunc.getWinner("Player 1", "Player 2");
  expect(result).toBe("Player 1");

  expect(myFunc.getWinner).toHaveBeenCalledWith("Player 1", "Player 2");

  //  undo MOCKING
  myFunc.getWinner.mockRestore();
});