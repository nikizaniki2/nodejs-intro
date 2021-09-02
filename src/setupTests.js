// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

async function test(title, callback){
  try{
    await callback();
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

global.test = test;
global.expect = expect;