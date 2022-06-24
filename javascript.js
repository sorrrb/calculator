let displayApp = () => {
  const CALC_CONTAINER = document.querySelector('div.wrapper');
  
}

// HELPER FUNCTIONS

let add = (a,b) => a + b;
let subtract = (a,b) => a - b;
let multiply = (a,b) => a * b;
let divide = (a,b) => a / b;

let operate = (operator, x, y) => {
  let result;
  switch(operator) {
    case 'add':
      result = add(x,y);
      break;
    case 'subtract':
      result = subtract(x,y);
      break;
    case 'multiply':
      result = multiply(x,y);
      break;
    case 'divide':
      result = divide(x,y);
      break;
  }
  return result;
}

console.log(add(10,20)); // 30
console.log(subtract(55,12)); // 43
console.log(multiply(7,12)); // 84
console.log(divide(2,1)); // 2 

console.log(operate('add',10,20));
console.log(operate('subtract',55,12));
console.log(operate('multiply',7,12));
console.log(operate('divide',2,1));

displayApp();