let calcDisplay = () => {
  
  const userDisplay = document.querySelector('div.display');
  const numDisplay = document.querySelector('div.output');
  const calcGrid = document.querySelector('div.interface');

  const GRID_COLS = 5;
  const GRID_ROWS = 7;
  const PI = 3.14159265359;
  const EULER = 2.71828182846;

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

  const functionValueArray = ['2nd', '(', ')', 'del', 'clear',
    '^', 'sin', 'cos', 'tan', '÷', 'x!', 'x²', '1/x', '√', '×',
    'π', '-', 'e', '+', 'log', '<  >', 'ln', '.', '(-)', '='];
  const functionButtons = document.querySelectorAll('div.function');
  for (let i = 0; i < functionValueArray.length; i++) {
    (functionButtons.item(i)).textContent = functionValueArray[i];
  }

  const switchFuncButton = document.querySelector('div.function');
  switchFuncButton.classList.add('switch');

  let add = (a,b) => a + b;
  let subtract = (a,b) => a - b;
  let multiply = (a,b) => a * b;
  let divide = (a,b) => a / b;

  let operate = (firstOperand, secondOperand, operator) => {
    let result;
    switch (operator) {
      case '+':
        result = add(firstOperand, secondOperand);
        break;
      case '-':
        result = subtract(firstOperand, secondOperand);
        break;
      case '×':
        result = multiply(firstOperand, secondOperand);
        break;
      case '÷':
        result = divide(firstOperand, secondOperand);
        break;
    }
    return result;
  }

  let activeDisplayValue = 0;
  numDisplay.textContent = activeDisplayValue;

  let valueInMemory = null;
  let operatorInMemory = null;
  let isDisplayInactive = true;
  let isRepeatedExpression = false;
  let hasRecentlyComputed = false;

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
    activeDisplayValue = Number(value);
    let formatValue = (activeDisplayValue).toLocaleString();
    numDisplay.textContent = formatValue;
    isDisplayInactive = false;
  }

  let updateDisplay = e => {
    let buttonPressed = e.target;
    hasRecentlyComputed = isRepeatedExpression;
    if (buttonPressed.textContent !== '=') isRepeatedExpression = false;
    if (buttonPressed.classList.contains('num')) {
      let valuePressed = buttonPressed.textContent;
      let newDisplayValue = (activeDisplayValue === 0 ? String(valuePressed) : String(activeDisplayValue) + String(valuePressed));
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
        case 'clear':
          resetDisplay();
          break;
        default:
          break;
      }
    }
  }

  const allButtons = document.querySelectorAll('div.button');
  allButtons.forEach(button => {
    button.addEventListener('click', updateDisplay)
  });
}

calcDisplay();