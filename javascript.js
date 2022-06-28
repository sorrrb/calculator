let display = () => {
  const container = document.querySelector('div.calculator');
  
  const ROWS = 6;
  const COLS = 4;

  let CALC_DISPLAY_VALUE;
  let valueA = null;
  let valueB = null;

  // CALCULATOR BUTTON VALUES - array of strings denoting button functions
  const BUTTON_VALUES = ['C', '±', '%', '÷', '7', '8', '9', 'x', '4', '5', '6',
       '-', '1', '2', '3', '+', '0', '.', '='];
  
  // DEFINE BUTTONS - nested for loop to create buttons
  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      if (i === 0) {
        const NUM_DISPLAY = document.createElement('div');
        NUM_DISPLAY.classList.add('display');
        container.appendChild(NUM_DISPLAY);
        break;
      }
      else if (i === 1 || j === 3) {
        const CALC_OPERATOR = document.createElement('div');
        CALC_OPERATOR.classList.add('click');
        CALC_OPERATOR.classList.add('operate');
        container.appendChild(CALC_OPERATOR);
      }
      else if (i === 5 && j < 1) {
        const SPAN_TWO = document.createElement('div');
        SPAN_TWO.classList.add('click');
        SPAN_TWO.classList.add('zero-btn');
        SPAN_TWO.textContent = 0;
        container.appendChild(SPAN_TWO);
        j++;
      }
      else if (i === 5 && j === 2) {
        const CALC_FLOAT = document.createElement('div');
        CALC_FLOAT.classList.add('click');
        CALC_FLOAT.classList.add('decimal');
        container.appendChild(CALC_FLOAT);
      }
      else {
        const CALC_SQUARE = document.createElement('div');
        CALC_SQUARE.classList.add('click');
        CALC_SQUARE.classList.add('num');
        container.appendChild(CALC_SQUARE);
      }
    }
  }

  const DISPLAY = document.querySelector('div.display');
  DISPLAY.textContent = 0;

  // IMPLEMENT TEXT - add relevant button text content for each button
  let eachElement = DISPLAY.nextElementSibling;
  for (let i = 0; i < BUTTON_VALUES.length; i++) {
    eachElement.textContent = BUTTON_VALUES[i];
    eachElement = eachElement.nextElementSibling;
  }

  const NUMS = document.querySelectorAll('div.num');
  const ZERO_NUM = document.querySelector('div.zero-btn');
  const OPERATORS = document.querySelectorAll('div.operate');

  let clearDisplay = () => {
    const clearVal = 0;
    CALC_DISPLAY_VALUE = clearVal;
    DISPLAY.textContent = CALC_DISPLAY_VALUE;
  }

  let updateDisplay = (e) => {
    const buttonContext = e.target.textContent;
    if (isNaN(Number(buttonContext))) { // if button pressed is not a number
      // do this
    }
    else {
      if (DISPLAY.textContent !== `0`) { // else fill display with numbers pressed
        CALC_DISPLAY_VALUE += e.target.textContent.toString();
        DISPLAY.textContent = CALC_DISPLAY_VALUE;
        CALC_DISPLAY_VALUE = Number(CALC_DISPLAY_VALUE);
      }
      else {
        CALC_DISPLAY_VALUE = Number(e.target.textContent);
        DISPLAY.textContent = CALC_DISPLAY_VALUE;
      }
    }
  }

  // Event listeners for buttons
  NUMS.forEach((number) => {
    number.addEventListener('click', updateDisplay);
  });

  ZERO_NUM.addEventListener('click', updateDisplay);

  OPERATORS.forEach((button) => {
    switch (button.textContent) {
      case 'C':
        button.addEventListener('click', clearDisplay);
        break;
      case '+':
        button.addEventListener('click', updateDisplay);
        break;
      case '-':
        button.addEventListener('click', clearDisplay);
        break;
      case 'x':
        button.addEventListener('click', clearDisplay);
        break;
      case '÷':
        button.addEventListener('click', clearDisplay);
        break;
      case '±':
        button.addEventListener('click', clearDisplay);
        break;
      case '%':
        button.addEventListener('click', clearDisplay);
        break;
      case '=':
        button.addEventListener('click', updateDisplay);
        break;
    } // DECIMAL OMITTED
  });
}

// HELPER FUNCTIONS

let add = (a,b) => a + b;
let subtract = (a,b) => a - b;
let multiply = (a,b) => a * b;
let divide = (a,b) => a / b;

let operate = (operator, x, y) => {
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

// OPERATIONS
const plus = `+`;
const minus = `-`;
const times = `x`;
const over = `÷`;

display();