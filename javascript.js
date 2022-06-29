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
  DISPLAY.textContent = 0;
  
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

  let isDisplayEmpty = () => {
    return ((Number(DISPLAY.textContent) === 0) || (storedNum === Number(DISPLAY.textContent)) ? true : false);
  }

  let storedOperation = null;
  let updatedOperation = null;
  let storedNum = null;

  let populateDisplay = e => {
    let clickedButton = e.target.textContent;
    let buttonNaN = Number(clickedButton);
    if (!(Number.isNaN(buttonNaN))) {
      let displayActiveBool = isDisplayEmpty();
      if (!displayActiveBool) {
        DISPLAY.textContent += clickedButton;
      }
      else {
        DISPLAY.textContent = clickedButton;
      }
    }
    else {
      if (clickedButton === 'C') {
        DISPLAY.textContent = 0;
        storedOperation = null;
        storedNum = null;
      }
      else if (storedOperation === null) {
        storedOperation = clickedButton;
        storedNum = Number(DISPLAY.textContent);
      }
      else if (storedOperation === '=') {
        DISPLAY.textContent = operate(updatedOperation, Number(DISPLAY.textContent), storedNum);
      }
      else {
        let operateOutput;
        switch (clickedButton) {
          case PLUS:
            operateOutput = operate(storedOperation, storedNum, Number(DISPLAY.textContent));
            storedNum = Number(DISPLAY.textContent);
            DISPLAY.textContent = operateOutput;
            updatedOperation = storedOperation;
            storedOperation = PLUS;
            break;
          case MINUS:
            break;
          case TIMES:
            break;
          case OVER:
            break;
          case RESULT:
            operateOutput = operate(storedOperation, storedNum, Number(DISPLAY.textContent));
            storedNum = Number(DISPLAY.textContent);
            DISPLAY.textContent = operateOutput;
            updatedOperation = storedOperation;
            storedOperation = RESULT;
            break;
        }
      }
    }
  }

  // Event listeners for buttons
  NUMS.forEach((number) => {
    number.addEventListener('click', populateDisplay); // iterate through each number button
  });

  ZERO_NUM.addEventListener('click', populateDisplay); // add same listener to 0

  OPERATORS.forEach((button) => {
    button.addEventListener('click', populateDisplay);
  });

  FLOAT.addEventListener('click', populateDisplay);
}

display();