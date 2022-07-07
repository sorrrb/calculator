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
        result = (y === 0 ? String.fromCodePoint(0x1F921) : divide(x,y));
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

  const DISPLAY = document.querySelector('div.display');
  DISPLAY.textContent = 0;

  // For loop to add text content (numbers/symbols) to buttons
  let eachElement = DISPLAY.nextElementSibling;
  for (let i = 0; i < BUTTON_VALUES.length; i++) {
    eachElement.textContent = BUTTON_VALUES[i];
    eachElement = eachElement.nextElementSibling;
  }

  // Helper function - adds commas to numbers displayed > 999
  let composeCommas = num => {
    let stringOfNum = num.toString();
    let arrayIndex;
    if (Math.abs(num) < 1000) return stringOfNum;
    else {
      let arrayHolder = Array.from(stringOfNum);
      let numCommas = Math.floor((stringOfNum.length - 1)/3);
      switch(stringOfNum.length % 3) {
        case 1:
          arrayIndex = 1;
          break;
        case 2:
          arrayIndex = 2;
          break;
        case 0:
          arrayIndex = 3;
          break;
      }
      while (numCommas > 0) {
        arrayHolder.splice(arrayIndex,0,',');
        arrayIndex += 4;
        numCommas--;
      }
      return arrayHolder.join(''); 
    }
  }
  
  // Helper function - removes comma(s) from string number/typecasts to number
  let removeCommas = str => {
    let arrayOfString = Array.from(str);
    while (arrayOfString.includes(',')) {
      arrayOfString.splice(arrayOfString.indexOf(','), 1);
    };
    let output = arrayOfString.join('');
    return Number(output);
  }

  // Helper to callback functions - grabs display value
  let grabDisplayValue = () => {
    return (removeCommas(DISPLAY.textContent));
  }

  // Helper to callback functions - clears display value
  let clearDisplayValue = () => {
    DISPLAY.textContent = 0;
    activeDisplayValue = 0;
    storedDisplayValue = 0;
    currentDisplayValue = 0;
    storedOperation = null;
    DISPLAY.style.fontSize = `36px`;
  }
  
  // Helper to callback functions - finds active operation buttons, if any
  let toggleActiveButtons = () => {
    const ACTIVE_BUTTONS = document.querySelectorAll(`div.active`);
    ACTIVE_BUTTONS.forEach((button) => {
      button.classList.toggle(`active`);
    });
  }

  let adjustDisplayText = () => {
    let displayLength = DISPLAY.textContent.length;
    switch(displayLength) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
      case 10:
      case 11:
      case 12:
      case 13:
      case 14:
        DISPLAY.style.fontSize = `36px`;
        break;
      case 15:
        DISPLAY.style.fontSize = `32px`;
        break;
      case 16:
      case 17:
        DISPLAY.style.fontSize = `30px`;
        break;
      case 18:
        DISPLAY.style.fontSize = `28px`;
        break;
      case 19:
        DISPLAY.style.fontSize = `26px`;
        break;
      case 20:
      default:
        DISPLAY.style.fontSize = `24px`;
    }
  }

  let activeDisplayValue = removeCommas(DISPLAY.textContent);
  let storedDisplayValue;
  let storedOperation;
  let currentDisplayValue;

  // Callback function - updates display value based off number of button clicked
  let updateDisplayValue = e => {
    let pressedButton = e.target.textContent;
    let isNumber = !isNaN(pressedButton);
    if (isNumber) {
      let pressedNumber = Number(e.target.textContent);
      currentDisplayValue = (typeof(currentDisplayValue) === 'object' ? 0 : grabDisplayValue());
      if (((pressedNumber !== 0) && (currentDisplayValue !== 0)) ||
          ((pressedNumber === 0) && (currentDisplayValue !== 0))) {
        let appendValue = pressedNumber.toString();
        if ((composeCommas(currentDisplayValue)).length <= 20) {
          currentDisplayValue += appendValue;
          DISPLAY.textContent = composeCommas(currentDisplayValue);
          activeDisplayValue = removeCommas(DISPLAY.textContent);
          adjustDisplayText();
        }
        else return;
      }
      else if (((pressedNumber !== 0) && (currentDisplayValue === 0))) {
        currentDisplayValue = pressedNumber;
        DISPLAY.textContent = composeCommas(currentDisplayValue);
        activeDisplayValue = removeCommas(DISPLAY.textContent);
        adjustDisplayText();
      }
    }
    else {
      if (pressedButton !== RESULT) {
        if (e.target.classList.contains(`operate`)) {
          storedDisplayValue = activeDisplayValue;
          storedOperation = pressedButton;
          e.target.classList.toggle(`active`);
          currentDisplayValue = null;
        }
        else if (pressedButton === INVERT) {
          currentDisplayValue = (0 - removeCommas(DISPLAY.textContent))
          DISPLAY.textContent = composeCommas(currentDisplayValue);
          activeDisplayValue = removeCommas(DISPLAY.textContent);
          adjustDisplayText();
        }
        else {
          return;
        }
      }
      else {
        let displayResult = operate(storedOperation, storedDisplayValue, activeDisplayValue);
        DISPLAY.textContent = composeCommas(displayResult);
        adjustDisplayText();
        toggleActiveButtons();
      }
    }
  }


  // Event listener(s) for buttons
  const BUTTONS = document.querySelectorAll('div.click');
  BUTTONS.forEach((button) => {
    if (button.classList.contains('num')) {
      button.addEventListener('click', updateDisplayValue);
    }
    else if (button.classList.contains('operate')) {
      button.addEventListener('click', updateDisplayValue);
    }
    else if (button.classList.contains('function') && (!(button.classList.contains('operate')))) {
      switch(button.textContent) {
        case CLEAR:
          button.addEventListener('click', clearDisplayValue);
          break;
        case INVERT:
          button.addEventListener('click', updateDisplayValue);
          break;
        default:
          button.addEventListener('click', (event) => {
            console.log(grabDisplayValue());
          });
      }
    }
  });
}

calculatorDisplay();