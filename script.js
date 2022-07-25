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

  let storedValue = null;
  let storedOperation = null;
  let shouldResetDisplay = null;
  let hasRecentlyComputed = null;
  let staticOperand = null;

  let resetDisplay = () => {
    calcInterface.textContent = 0;
    storedValue = null;
    storedOperation = null;
    shouldResetDisplay = null;
    hasRecentlyComputed = null;
    staticOperand = null;
  }

  let getDisplayValue = () => {
    let numConvert = ((calcInterface.textContent).toLocaleString()).replaceAll(',', '');
    if ((calcInterface.textContent).includes('.')) {
      return numConvert;
    }
    return Number(numConvert);
  }

  let setDisplayValue = value => {
    let displayCoerced = value.toString();
    if (displayCoerced.includes('.')) {
      calcInterface.textContent = displayCoerced;
      return;
    }
    let stringConvert = Number(value).toLocaleString();
    calcInterface.textContent = stringConvert;
  }

  let checkFloatStatus = () => {
    let isValueFloating = (calcInterface.textContent).toString();
    if (isValueFloating.includes('.')) {
      isValueFloating = true;
    }
    else isValueFloating = false;
    return isValueFloating;
  }

  let updateDisplay = e => {
    pressedButton = e.target.textContent;
    let isNumberButton = Number(pressedButton);
    if (Number.isNaN(isNumberButton)) { // IF BUTTON IS NOT NUMERIC
      if (pressedButton === '=') {
        if (storedOperation === null) return;
        if (shouldResetDisplay) return;
        if (hasRecentlyComputed) {
          let repeatedComputation = operate(storedValue, staticOperand, storedOperation);
          storedValue = repeatedComputation;
          setDisplayValue(repeatedComputation);
          return;
        }
        staticOperand = getDisplayValue();
        let computedResult = operate(storedValue, getDisplayValue(), storedOperation);
        storedValue = computedResult;
        setDisplayValue(computedResult);
        hasRecentlyComputed = true;
      }
      else if (pressedButton === '±') {
        setDisplayValue(getDisplayValue() * -1);
      }
      else if (pressedButton === '%') {
        setDisplayValue(getDisplayValue() / 100);
      }
      else if (pressedButton === '.') {
        if (checkFloatStatus()) return;
        let appendDecimal = (getDisplayValue()).toLocaleString();
        appendDecimal += '.';
        setDisplayValue(appendDecimal);
      }
      else if (storedValue === null || hasRecentlyComputed) {
        storedValue = getDisplayValue();
        storedOperation = (pressedButton === '=' ? null : pressedButton);
        shouldResetDisplay = true;
        hasRecentlyComputed = false;
        return;
      }
      else if (storedValue !== null && storedValue !== 0) {
        let computedResult = operate(storedValue, getDisplayValue(), storedOperation);
        storedValue = computedResult;
        storedOperation = (pressedButton === '=' ? null : pressedButton);
        shouldResetDisplay = true;
        hasRecentlyComputed = false;
        setDisplayValue(computedResult);
        return;
      }
    }
    else if (!Number.isNaN(isNumberButton)) { // IF BUTTON IS NUMERIC
      let currentDisplay = getDisplayValue();
      let updatedValue = ((currentDisplay === 0) || (shouldResetDisplay ===
            true) ? pressedButton : currentDisplay += pressedButton);
      shouldResetDisplay = false;
      hasRecentlyComputed = false;
      setDisplayValue(updatedValue);
    }
  }

  const BUTTONS = document.querySelectorAll('div.button');
  BUTTONS.forEach((button) => {
      switch(button.textContent) {
        case 'AC':
          button.addEventListener('click', resetDisplay);
          break;
        case '±':
          button.addEventListener('click', updateDisplay);
          break;
        case '%':
          button.addEventListener('click', updateDisplay);
          break;
        case '.':
          button.addEventListener('click', updateDisplay);
          break;
        default:
          button.addEventListener('click', updateDisplay);
          break;
      }
  })



  /*
  √ ( ) ^ backspace
  */

  calcInterface.textContent = 0;
}

display();