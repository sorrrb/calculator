let display = () => {

  const calcWrapper = document.querySelector('div.calc-wrapper');
  const calcInterface = document.createElement('div');
  calcInterface.classList.add('display');
  calcWrapper.appendChild(calcInterface);

  // CALC GRID CONSTANTS
  const CALC_COLS = 4;
  const CALC_ROWS = 6;

  // NESTED FOR LOOPS TO CREATE/APPEND BUTTONS TO DISPLAY GRID
  for (let i = 1; i < CALC_ROWS; i++) {
    for (let j = 1; j <= CALC_COLS; j++) {
      if ((i === 5) && (j === 1)) {
        const calcZeroButton = document.createElement('div');
        calcZeroButton.classList.add('button', 'number', 'zero');
        calcWrapper.appendChild(calcZeroButton);
        j++;
      }
      else if (((i < 5) && (i > 1)) && (j < 4)) {
        const calcNumButton = document.createElement('div');
        calcNumButton.classList.add('button', 'number');
        calcWrapper.appendChild(calcNumButton);
      }
      else if ((i === 1) && (j < 4)) {
        const calcFuncButton = document.createElement('div');
        calcFuncButton.classList.add('button', 'function');
        calcWrapper.appendChild(calcFuncButton);
      }
      else if ((j === 4)) {
        const calcOperatorButton = document.createElement('div');
        calcOperatorButton.classList.add('button', 'operation');
        calcWrapper.appendChild(calcOperatorButton);
      }
      else if ((i === 5) && (j === 3)) {
        const calcButton = document.createElement('div');
        calcButton.classList.add('button', 'decimal');
        calcWrapper.appendChild(calcButton);
      }
    }
  }

  // CALC BUTTON TEXT CONSTANTS
  const buttonTextValues = ['AC', '±', '%', '÷', '×', '-', '+', '='];
  const buttonNumberValues = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];
  
  // BUTTON VALUES FOR NUMBERS/TEXT
  const numberButtons = document.querySelectorAll('div.number');
  for (const entry of numberButtons.entries()) {
    entry[1].textContent = buttonNumberValues[entry[0]];
  }

  const textButtons = document.querySelectorAll('div.function, div.operation');
  for (const entry of textButtons.entries()) {
    entry[1].textContent = buttonTextValues[entry[0]];
  }

  // CONSTANT/VALUE FOR DECIMAL BUTTON
  const decimalButton = document.querySelector('div.decimal');
  decimalButton.textContent = '.';

  // MATH HELPER FUNCTIONS
  let add = (firstNum, secondNum) => firstNum + secondNum;
  let subtract = (firstNum, secondNum) => firstNum - secondNum;
  let multiply = (firstNum, secondNum) => firstNum * secondNum;
  let divide = (firstNum, secondNum) => firstNum / secondNum;

  let operate = (firstNum, secondNum, operator) => {
    let output;
    switch(operator) {
      case '+':
        output = add(firstNum, secondNum);
        break;
      case '-':
        output = subtract(firstNum, secondNum);
        break;
      case '×':
        output = multiply(firstNum, secondNum);
        break;
      case '÷':
        output = divide(firstNum, secondNum);
        break;
    }
    return output;
  }

  // CALLBACK FUNCTIONS/HELPER FUNCTIONS FOR DISPLAY

  let firstOperand = null;
  let secondOperand = null;
  let storedOperation = null;
  let isAwaitingUpdate = null;
  
  function resetDisplay() {
    calcInterface.textContent = 0;
    firstOperand = null;
    secondOperand = null;
    storedOperation = null;
    isAwaitingUpdate = null;
    hasRecentlyComputed = null;
  }

  function sendToDisplay(value) {
    let displayValue = parseInt(value);
    calcInterface.textContent = displayValue.toLocaleString();
  }

  function grabDisplay() {
    return parseInt(calcInterface.textContent);
  }

  function updateDisplay(e) {
    let clickedButton = e.target.textContent;
    if (isNaN(parseInt(clickedButton))) {
      isAwaitingUpdate = true;
      if (clickedButton === '=') {
        if (storedOperation === null) return;
        else if (hasRecentlyComputed) {
          sendToDisplay(operate(firstOperand, secondOperand, storedOperation));
          firstOperand = grabDisplay();
          hasRecentlyComputed = true;
          return;
        }
        else {
          secondOperand = grabDisplay();
          sendToDisplay(operate(firstOperand, secondOperand, storedOperation));
          firstOperand = grabDisplay();
          hasRecentlyComputed = true;
          return;
        }
      }
      else if (storedOperation === null) {
        storedOperation = clickedButton
        firstOperand = grabDisplay();
        hasRecentlyComputed = false;
        return;
      }
      else {
        secondOperand = grabDisplay();
        sendToDisplay(operate(firstOperand, secondOperand, storedOperation));
        storedOperation = clickedButton;
        firstOperand = grabDisplay();
        hasRecentlyComputed = false;
        return;
      }
    }
    else {
      let currentDisplay = grabDisplay();
      if (currentDisplay === 0 || isAwaitingUpdate === true) {
        sendToDisplay(e.target.textContent);
        isAwaitingUpdate = false;
        return;
      }
      let valueToDisplay = parseInt((calcInterface.textContent).replaceAll(',', ''));
      valueToDisplay += e.target.textContent;
      sendToDisplay(valueToDisplay);
    }
  }

  const BUTTONS = document.querySelectorAll('div.button');
  BUTTONS.forEach((button) => {
      switch(button.textContent) {
        case 'AC':
          button.addEventListener('click', resetDisplay);
          break;
        case '±':
          button.addEventListener('click', resetDisplay);
          break;
        case '%':
          button.addEventListener('click', resetDisplay);
          break;
        case '.':
          button.addEventListener('click', resetDisplay);
          break;
        default:
          button.addEventListener('click', updateDisplay);
          break;
      }
  })



  /*
  √ ( ) ^ 
  */

  calcInterface.textContent = 0;
}

display();