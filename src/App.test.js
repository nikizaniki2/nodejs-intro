const sum = (a, b) => a + b;
const subtract = (a, b) => a - b;

let result, expected;

function sumTest(){
  result = sum(3, 7);
  expected = 10;
  expect(result).toBe(expected);
}

function subtractTest(){
  result = subtract(7, 3);
  expected = 4;
  expect(result).toBe(expected);
}


test('Subtract test', subtractTest);
test('Sum test', sumTest);