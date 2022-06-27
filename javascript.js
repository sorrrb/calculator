let display = () => {
  const container = document.querySelector('div.calculator');
  
  const ROWS = 6;
  const COLS = 4;
  
  let displayValueNum = 0;
  let displayValueString = '';

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
        SPAN_TWO.textContent = displayValueString;
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

  // SEND NUMBER ON CLICK TO DISPLAY - add number to display off relevant click
  function sendToDisplay(calcValue) {
    let stringRef = DISPLAY.textContent;
    if (stringRef === '0') {
      DISPLAY.textContent = '';
      stringRef = '';
    }
    displayValueString = stringRef + calcValue;
    displayValueString = appendCommas(displayValueString);
    displayValueNum = removeCommas(displayValueString);
    DISPLAY.textContent = displayValueString;
    // NEED TO ADD COMMA FUNCTIONALITY
  }

  function appendCommas(stringNum) {
    const TRUE_NUM = removeCommas(stringNum);
    const STRING_LENGTH = TRUE_NUM.length;
    if (STRING_LENGTH > 3) {
      const arrayConvert = Array.from(TRUE_NUM);
      for (let i = 0; i < STRING_LENGTH; i++) {
        if ((i % 3) === 1) {
          // insert a ',' every fourth element (3+1)
          arrayConvert.splice(i, 0, ',');
        }
      }
      const reconvertNum = arrayConvert.join('');
      return reconvertNum;
    }
    else {
      return stringNum;
    }
  }

  function removeCommas(stringNum) {
    let arrayCopy = Array.from(stringNum);
    const result = arrayCopy.filter(letter => letter !== ',');
    return result.join('');
  }

  let updateNum = (e) => {
    sendToDisplay(e.target.textContent);
  }

  NUMS.forEach((number) => {
    number.addEventListener('click', updateNum);
  });

  ZERO_NUM.addEventListener('click', updateNum);

  console.log(removeCommas('1,234,567'));
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

display();