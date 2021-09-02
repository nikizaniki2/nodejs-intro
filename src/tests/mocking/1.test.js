/* eslint-disable no-func-assign */
function getWinner(p1, p2) {
  let winner_id =  Math.round(Math.random());
  switch(winner_id){
  case(0): return p1;
  case(1): return p2;
  default: return "No winner";
  }
}

test('getWinner returns', () => {
  // MOCKING
  const originalGetWinner = getWinner;
  getWinner = jest.fn((p1, p2) => p1);

  const result = getWinner("Player 1", "Player 2");
  expect(result).toBe("Player 1");

  expect(getWinner).toHaveBeenCalledWith("Player 1", "Player 2");

  //  undo MOCKING
  getWinner = originalGetWinner;
});