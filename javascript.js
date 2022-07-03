let calculatorDisplay = () => {
  const container = document.querySelector('div.calculator');
  
  const ROWS = 6; // GRID - calculator # rows
  const COLS = 4; // GRID - calculator # cols

  // Button values
  const BUTTON_VALUES = ['C', '±', '%', '÷', '7', '8', '9', 'x', '4', '5', '6',
       '-', '1', '2', '3', '+', '0', '.', '='];

  // Operation variables for use
  const PLUS = `+`;
  const MINUS = `-`;
  const TIMES = `x`;
  const OVER = `÷`;
  const CLEAR = `C`;
  const INVERT = `±`;
  const PERCENT = `%`;
  const DECIMAL = `.`;
  const RESULT = `=`;
  
  // Helper functions for math operations
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
        if (y === 0) {
          result = String.fromCodePoint(0x1F921);
        }
        break;
    }
    return result;
  }

  // Nested for loops to generate DOM elements & append to container div
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
        SPAN_TWO.classList.add('num');
        SPAN_TWO.classList.add('zero');
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

  let displayValue = 0;
  let valueInMemory = 0;
  let operationInMemory;
  let operationInProgress = false;

  const DISPLAY = document.querySelector('div.display');
  DISPLAY.textContent = displayValue;

  // For loop to give each button text content
  let eachElement = DISPLAY.nextElementSibling;
  for (let i = 0; i < BUTTON_VALUES.length; i++) {
    eachElement.textContent = BUTTON_VALUES[i];
    eachElement = eachElement.nextElementSibling;
  }

  // Grabs current stored value in display
  let grabDisplayValue = () => {
    let currentValue = ((operationInProgress && displayValue === 0) || (displayValue === 0) ? 0 : displayValue);
    return currentValue;
  }

  // Updates display with given value
  let updateDisplayValue = (value, canResetDisplay) => {
    let appendValue = grabDisplayValue();
    let output = (canResetDisplay ? value : appendValue.toString() + value.toString());
    displayValue = Number(output);
    DISPLAY.textContent = displayValue;
  }

  // Clears display/values-in-memory
  let clearDisplayValue = () => {
    displayValue = 0;
    valueInMemory = 0;
    operationInMemory = null;
    operationInProgress = false;
    DISPLAY.textContent = displayValue;
  }

  // Callback to update display with pressed number buttons
  let buttonUpdate = e => {
    let buttonValue = Number(e.target.textContent);
    isDisplayEmpty = ((displayValue === 0) && (valueInMemory === 0) ? true : false);
    updateDisplayValue(buttonValue, isDisplayEmpty);
  }

  // Callback to store display value and display operation
  let callDisplayOperation = e => {
    let clickedOperation = e.target.textContent;
    if (operationInProgress) {
      let newDisplay = operate(operationInMemory, valueInMemory, displayValue);
      operationInMemory = clickedOperation;
      updateDisplayValue(newDisplay, true);
      valueInMemory = displayValue;
      displayValue = 0;
    }
    else {
      operationInMemory = clickedOperation;
      valueInMemory = displayValue;
      operationInProgress = true;
      displayValue = 0;
    }
  }

  // Event listeners
  const NUM_BUTTONS = document.querySelectorAll('div.num');
  NUM_BUTTONS.forEach((number) => {
    number.addEventListener('click', buttonUpdate)
  });

  const FUNCTION_BUTTONS = document.querySelectorAll('div.function');
  FUNCTION_BUTTONS.forEach((functionButton) => {
    switch(functionButton.textContent) {
      case CLEAR:
        functionButton.addEventListener('click', clearDisplayValue);
        break;
      case PLUS:
        functionButton.addEventListener('click', callDisplayOperation);
        break;
    }
  });
}

calculatorDisplay();