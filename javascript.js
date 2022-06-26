let display = () => {
  const container = document.querySelector('div.calculator');
  
  const ROWS = 6;
  const COLS = 4;

  // CALCULATOR BUTTON VALUES - array of strings denoting button functions
  const BUTTON_VALUES = ['C', '±', '%', '÷', '7', '8', '9', 'x', '4', '5', '6',
       '-', '1', '2', '3', '+', '0', '.', '='];
  
  //DEFINE BUTTONS - nested for loop to create buttons
  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      if (i === 0) {
        const NUM_DISPLAY = document.createElement('div');
        NUM_DISPLAY.classList.add('display');
        container.appendChild(NUM_DISPLAY);
        break;
      }
      else if (i === 5 && j < 1) {
        const SPAN_TWO = document.createElement('div');
        SPAN_TWO.classList.add('click');
        SPAN_TWO.classList.add('zero-btn')
        SPAN_TWO.textContent = 0;
        container.appendChild(SPAN_TWO);
        j++;
      }
      else {
        const CALC_SQUARE = document.createElement('div');
        CALC_SQUARE.classList.add('click');
        container.appendChild(CALC_SQUARE);
      }
    }
  }

  const DISPLAY = document.querySelector('div.display');
  DISPLAY.textContent = 0;

  let eachElement = DISPLAY.nextElementSibling;
  for (let i = 0; i < BUTTON_VALUES.length; i++) {
    eachElement.textContent = BUTTON_VALUES[i];
    eachElement = eachElement.nextElementSibling;
  }
  console.log(DISPLAY);
  
}

// HELPER FUNCTIONS

let add = (a,b) => a + b;
let subtract = (a,b) => a - b;
let multiply = (a,b) => a * b;
let divide = (a,b) => a / b;

let operate = (operator, x, y) => {
  const plus = 'add';
  const minus = 'subtract';
  const times = 'multiply';
  const over = 'divide';
  let result;
  switch(operator) {
    case plus:
      result = add(x,y);
      break;
    case minus:
      result = subtract(x,y);
      break;
    case times:
      result = multiply(x,y);
      break;
    case over:
      result = divide(x,y);
      break;
  }
  return result;
}

console.log(add(10,20)); // 30
console.log(subtract(55,12)); // 43
console.log(multiply(7,12)); // 84
console.log(divide(2,1)); // 2 
console.log('BREAK POINT')
console.log(operate('add',10,20));
console.log(operate('subtract',55,12));
console.log(operate('multiply',7,12));
console.log(operate('divide',2,1));

display();