let calcDisplay = () => {
  
  const numDisplay = document.querySelector('div.output');
  const calcGrid = document.querySelector('div.interface');

  const GRID_COLS = 5;
  const GRID_ROWS = 7;

  for (let i = 0; i < GRID_ROWS; i++) {
    for (let j = 0; j < GRID_COLS; j++) {
      const gridButton = document.createElement('div');
      if (i > 2 && i < 7) {
        switch(j) {
          case 1:
            gridButton.classList.add('num');
            break;
          case 2:
            gridButton.classList.add('num');
            break;
          case 3:
            gridButton.classList.add('num');
            break;
          default:
            break;
        }
        if (i === 6 && j > 1) gridButton.classList.remove('num');
      }
      if (!gridButton.classList.contains('num')) gridButton.classList.add('function');
      gridButton.classList.add('button');
      calcGrid.appendChild(gridButton);
    }
  }

  const numValueArray = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];
  const numButtons = document.querySelectorAll('div.num');
  for (let i = 0; i < numValueArray.length; i++) {
    (numButtons.item(i)).textContent = numValueArray[i];
  }

  const functionValueArray = ['2nd', '(', ')', '%', 'CLEAR',
    'x!', 'sin', 'cos', 'tan', '↩', '^', 'x²', '1/x', '√', '÷',
    'π', '×', 'e', '-', 'log', '+', 'ln', '.', '(-)', '='];
  const functionButtons = document.querySelectorAll('div.function');
  for (let i = 0; i < functionValueArray.length; i++) {
    (functionButtons.item(i)).textContent = functionValueArray[i];
  }
  functionButtons.forEach(button => {
    switch(button.textContent) {
      case '2nd':
        button.classList.add('switch');
        break;
      case '↩':
        button.classList.add('delete');
        break;
      case 'CLEAR':
        button.classList.add('clear');
        break;
    }
  });

  let add = (a,b) => a + b;
  let subtract = (a,b) => a - b;
  let multiply = (a,b) => a * b;
  let divide = (a,b) => a / b;
  let exponentiate = (a,b) => a**b;

  let operate = (firstOperand, secondOperand, operator) => {
    switch (operator) {
      case '+':
        return add(firstOperand, secondOperand);
      case '-':
        return subtract(firstOperand, secondOperand);
      case '×':
        return multiply(firstOperand, secondOperand);
      case '÷':
        if (secondOperand === 0) return String.fromCodePoint(129313);
        return divide(firstOperand, secondOperand);
      case '^':
        return exponentiate(firstOperand, secondOperand);
      default:
        return null;
    }
  }

  let factorial = x => {
    let convertInt = Math.floor(x);
    if (convertInt < 0) return 'Error';
    let factorialTotal = 1;
    for (let i = 1; i <= convertInt; i++) {
      factorialTotal *= i;
    }
    return factorialTotal;
  }

  let activeDisplayValue = 0;
  let valueInMemory = null;
  let operatorInMemory = null;
  let isDisplayInactive = true;
  let isRepeatedExpression = false;
  let hasRecentlyComputed = false;

  numDisplay.textContent = activeDisplayValue;

  let roundFloatValue = value => { // https://www.jacklmoore.com/notes/rounding-in-javascript/
    return Number(Math.round(value + `e` + 12) + `e-` + 12);
  }

  let manageActiveButtons = buttonRef => {
    const activeButtons = document.querySelectorAll('div.active');
    activeButtons.forEach(button => {
      button.classList.toggle('active');
    })
    if (buttonRef === undefined) return;
    buttonRef.classList.toggle('active');
  }

  let resetDisplay = () => {
    activeDisplayValue = 0;
    numDisplay.textContent = activeDisplayValue;
    valueInMemory = null;
    operatorInMemory = null;
    isDisplayInactive = true;
    isRepeatedExpression = false;
    hasRecentlyComputed = false;
  }

  let setDisplayValue = value => {
    if (value === String.fromCodePoint(129313)) {
      resetDisplay();
      numDisplay.textContent = String.fromCodePoint(129313);
      numDisplay.style.fontWeight = `500`;
      numDisplay.style.fontSize = `48px`;
      return;
    }
    else {
      numDisplay.style.fontWeight = '600';
      numDisplay.style.fontSize = `36px`;
    }
    activeDisplayValue = Number(value);
    let decimalCheck = String(value);
    if (decimalCheck.includes('.')) {
      activeDisplayValue = (decimalCheck[decimalCheck.length-1] === '.' || decimalCheck % 1 === 0 ? decimalCheck : activeDisplayValue);
      let decimalPlace = decimalCheck.indexOf('.');
      let valueAfterDecimal = (decimalCheck.substring(decimalPlace));
      if (valueAfterDecimal.length > 12) {
        activeDisplayValue = roundFloatValue(activeDisplayValue);
      }
    }
    let formatValue = (activeDisplayValue >= 1000 || activeDisplayValue <= -1000 ? (activeDisplayValue).toLocaleString() : activeDisplayValue);
    numDisplay.textContent = (decimalCheck[decimalCheck.length-1] === '.' ? decimalCheck : formatValue);
    isDisplayInactive = false;
  }

  let updateDisplay = e => {
    if (e.type === 'click') {
      let buttonPressed = e.target;
      manageActiveButtons();
      hasRecentlyComputed = isRepeatedExpression;
      if (buttonPressed.textContent !== '=') isRepeatedExpression = false;
      if (buttonPressed.classList.contains('num')) {
        let valuePressed = buttonPressed.textContent;
        let newDisplayValue = (activeDisplayValue === 0 || activeDisplayValue === String.fromCodePoint(129313) ? String(valuePressed) : String(activeDisplayValue) + String(valuePressed));
        if (isDisplayInactive) newDisplayValue = String(valuePressed);
        setDisplayValue(newDisplayValue);
      }
      else if (buttonPressed.classList.contains('function')) {
        let operationPressed = buttonPressed.textContent;
        switch(operationPressed) {
          case '+':
          case '-':
          case '×':
          case '÷':
          case '^':
            manageActiveButtons(buttonPressed);
            if (hasRecentlyComputed || ((valueInMemory === null || operatorInMemory === null))) {
              operatorInMemory = operationPressed;
              valueInMemory = activeDisplayValue;
              isDisplayInactive = true;
              break;
            }
            else {
              let chainedExpression = operate(valueInMemory, activeDisplayValue, operatorInMemory);
              setDisplayValue(chainedExpression);
              operatorInMemory = operationPressed;
              valueInMemory = activeDisplayValue;
              isDisplayInactive = true;
              break;
            }
          case '=':
            if (valueInMemory === null || operatorInMemory === null) break;
            else if (isRepeatedExpression) {
              let repeatedExpression = operate(activeDisplayValue, valueInMemory, operatorInMemory);
              setDisplayValue(repeatedExpression);
              break;
            }
            else {
              isRepeatedExpression = true;
              let expressionResult = operate(valueInMemory, activeDisplayValue, operatorInMemory);
              valueInMemory = activeDisplayValue;
              setDisplayValue(expressionResult);
              break;
            }
          case '↩':
            let stringConvert = String(activeDisplayValue);
            let priorValue = stringConvert.substring(0,stringConvert.length-1);
            setDisplayValue(priorValue);
            break;
          case 'CLEAR':
            resetDisplay();
            break;
          case '%':
            setDisplayValue(activeDisplayValue/100);
            break;
          case 'x!':
            setDisplayValue(factorial(activeDisplayValue));
            break;
          case 'x²':
            setDisplayValue(activeDisplayValue**2);
            break;
          case '1/x':
            setDisplayValue(1/activeDisplayValue);
            break;
          case '√':
            setDisplayValue(activeDisplayValue**(1/2));
            break;
          case 'π':
            setDisplayValue(Math.PI);
            break;
          case 'e':
            setDisplayValue(Math.E);
            break;
          case '(-)':
            setDisplayValue(activeDisplayValue*-1);
            break;
          case '.':
            if (Number.isInteger(activeDisplayValue)) {
              let floatConvert = String(activeDisplayValue);
              floatConvert += '.';
              setDisplayValue(floatConvert);
            }
            break;
          case 'log':
            setDisplayValue(Math.log10(activeDisplayValue));
            break;
          case 'ln':
            setDisplayValue(Math.log(activeDisplayValue));
            break;
          case 'sin':
            setDisplayValue(Math.sin(activeDisplayValue));
            break;
          case 'cos':
            setDisplayValue(Math.cos(activeDisplayValue));
            break;
          case 'tan':
            setDisplayValue(Math.tan(activeDisplayValue));
            break;
          default:
            alert('Not yet implemented');
            break;
        }
      }
    }
    else if (e.type === 'keydown') {
      if (!Number.isNaN(Number(e.key))) {
        let typedValue = Number(e.key);
        let keyedDisplayValue = (activeDisplayValue === 0 || activeDisplayValue === String.fromCodePoint(129313) ? String(typedValue) : String(activeDisplayValue) + String(typedValue));
        if (isDisplayInactive) keyedDisplayValue = String(typedValue);
        setDisplayValue(keyedDisplayValue);
      }
      else if (e.key === 'Backspace') {
        let keyedStringConvert = String(activeDisplayValue);
        let priorKeyedValue = keyedStringConvert.substring(0,keyedStringConvert.length-1);
        setDisplayValue(priorKeyedValue);
      }
      else if (e.key === 'c') {
        resetDisplay();
      }
      else if (e.key === '.') {
        if (Number.isInteger(activeDisplayValue)) {
          let typedFloatConvert = String(activeDisplayValue);
          typedFloatConvert += '.';
          setDisplayValue(typedFloatConvert);
        }
        return;
      }
      else return;
    }
  }

  const buttonInterface = document.querySelectorAll('div.button');
  buttonInterface.forEach(button => {
    button.addEventListener('click', updateDisplay)
  });

  document.addEventListener('keydown', updateDisplay);
}

calcDisplay();