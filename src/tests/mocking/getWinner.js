function getWinner(p1, p2) {
  let winner_id =  Math.round(Math.random());
  switch(winner_id){
  case(0): return p1;
  case(1): return p2;
  default: return "No winner";
  }
}
module.exports = {getWinner};