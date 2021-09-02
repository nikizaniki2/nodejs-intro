const sum = (a, b) => a + b;
const subtract = (a, b) => a - b;

let result, expected;

function sumTest(){
  result = sum(2, 7);
  expected = 10;
  expect(result).toBe(expected);
}
test('Sum test', sumTest);

function subtractTest(){
  result = subtract(7, 3);
  expected = 4;
  expect(result).toBe(expected);
}
test('Subtract test', subtractTest);

function test(title, callback){
  try{
    callback();
    console.log(`PASS: ${title}`);
  } catch(error) {
    console.error(`ERROR: ${title}: ` + error.message);
  }
}


function expect(actual) {
  return {
    toBe(expected) {
      if (actual !== expected){
        throw new Error(`${actual} is not equal to ${expected}`);
      }
    }
  };
}