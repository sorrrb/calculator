let display = () => {
  const container = document.querySelector('div.calculator');
  
  const ROWS = 6; // GRID - calculator # rows
  const COLS = 4; // GRID - calculator # cols

  // CALCULATOR BUTTON VALUES - array of strings denoting button functions
  const BUTTON_VALUES = ['C', '±', '%', '÷', '7', '8', '9', 'x', '4', '5', '6',
       '-', '1', '2', '3', '+', '0', '.', '='];

  // OPERATIONS
  const PLUS = `+`;
  const MINUS = `-`;
  const TIMES = `x`;
  const OVER = `÷`;
  const CLEAR = `C`;
  const INVERT = `±`;
  const PERCENT = `%`;
  const DECIMAL = `.`;
  const RESULT = `=`;
  
  // HELPER FUNCTIONS (MATH OPERATORS)

  let add = (a,b) => a + b;
  let subtract = (a,b) => a - b;
  let multiply = (a,b) => a * b;
  let divide = (a,b) => a / b;

  let operate = (operator, x, y) => {
    let result;
    switch(operator) {
      case PLUS:
        result = add(x,y);
        break;
      case MINUS:
        result = subtract(x,y);
        break;
      case TIMES:
        result = multiply(x,y);
        break;
      case OVER:
        result = divide(x,y);
        break;
    }
    return result;
  }
  
  // DEFINE BUTTONS - nested for loop to create buttons
  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      if (i === 0) {
        const NUM_DISPLAY = document.createElement('div');
        NUM_DISPLAY.classList.add('display');
        container.appendChild(NUM_DISPLAY);
        break;
      }
      else if (i === 1 && j !== 3) {
        const CALC_FUNCTION = document.createElement('div');
        CALC_FUNCTION.classList.add('click');
        CALC_FUNCTION.classList.add('function');
        container.appendChild(CALC_FUNCTION);
      }
      else if (j === 3) {
        const CALC_OPERATOR = document.createElement('div');
        CALC_OPERATOR.classList.add('click');
        CALC_OPERATOR.classList.add('function');
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
  
  // IMPLEMENT TEXT - add relevant button text content for each button
  let eachElement = DISPLAY.nextElementSibling;
  for (let i = 0; i < BUTTON_VALUES.length; i++) {
    eachElement.textContent = BUTTON_VALUES[i];
    eachElement = eachElement.nextElementSibling;
  }

  const NUMS = document.querySelectorAll('div.num');
  const ZERO_NUM = document.querySelector('div.zero-btn');
  const OPERATORS = document.querySelectorAll('div.function');
  const FLOAT = document.querySelector('div.decimal');

  let displayValue = 0;
  let displayString = '';
  DISPLAY.textContent = displayValue;
  let storedOperand = 0;
  let storedOperator = '';
  let currentCalcDisplay;

  let calculateDisplay = (e) => {
    let pressedButton = e.target.textContent;
    let castTypeButton = Number(pressedButton);
    let isNumberBool = (isNaN(castTypeButton) ? true : false);
    if (isNumberBool) {
      switch (e.target.textContent) {
        case CLEAR:
          displayValue = 0;
          displayString = '';
          currentCalcDisplay = displayValue
          storedOperator = displayString;
          storedOperand = displayValue;
          DISPLAY.textContent = displayValue;
          break;
        case INVERT:
          displayValue = -displayValue;
          DISPLAY.textContent = displayValue;
          break;
        case PERCENT:
          break;
        case RESULT:
          break;
        case PLUS:
          if (storedOperator === '') {
            storedOperator = PLUS;
            storedOperand = displayValue;
            displayValue = 0;
            displayString = '';
            break;
          }
          else {
            currentCalcDisplay = displayValue;
            displayValue = operate(storedOperator, storedOperand, currentCalcDisplay);
            DISPLAY.textContent = displayValue;
            break;
          }
      }
    }
    else {
      let hasActiveOperation = (storedOperator === '' ? false : true);
      if (hasActiveOperation && DISPLAY.textContent === '0') {
        displayString = '';
        DISPLAY.textContent = displayString;
      }
      let checkNumCount = (DISPLAY.textContent.length <= 14 ? true : false);
      if (checkNumCount) {
        displayString += pressedButton;
        displayValue = Number(displayString);
        DISPLAY.textContent = displayValue;
      }
    }
  }

  // Event listeners for buttons
  NUMS.forEach((number) => {
    number.addEventListener('click', calculateDisplay); // iterate through each number button
  });

  ZERO_NUM.addEventListener('click', calculateDisplay); // add same listener to 0

  OPERATORS.forEach((button) => {
    button.addEventListener('click', calculateDisplay);
  });

  FLOAT.addEventListener('click', calculateDisplay);
}

display();