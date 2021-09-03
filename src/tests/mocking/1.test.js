/* eslint-disable no-func-assign */

const myFunc = require('./getWinner');

test('getWinner returns', () => {
  // MOCKING with jest
  jest.spyOn(myFunc ,'getWinner');
  myFunc.getWinner.mockImplementation((p1, p2) => p1);

  const result = myFunc.getWinner("Player 1", "Player 2");
  expect(result).toBe("Player 1");

  expect(myFunc.getWinner).toHaveBeenCalledWith("Player 1", "Player 2");

  //  undo MOCKING
  myFunc.getWinner.mockRestore();
});