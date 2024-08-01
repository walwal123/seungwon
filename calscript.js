document.addEventListener('DOMContentLoaded', () => {
    const numberDisplay = document.getElementById('number');
    let currentInput = '';
    let calculationString = '';
    let result = '';

    function updateDisplay(value) {
        numberDisplay.textContent = value || '0';
    }

    function handleButtonClick(event) {
        const button = event.target;
        if (button.tagName === 'BUTTON') {
            const action = button.getAttribute('data-action');
            const number = button.getAttribute('data-number');

            if (number) {
                if (currentInput === '0' && number !== '.') {
                    currentInput = number;
                } else {
                    currentInput += number;
                }
                calculationString += number;
                updateDisplay(calculationString);
            } else if (action) {
                switch (action) {
                    case 'equals':
                        try {
                            result = eval(calculationString).toString();
                            updateDisplay(result);
                            
                            currentInput = '';
                            calculationString = result;
                        } catch (error) {
                            updateDisplay('Error');
                            currentInput = '';
                            calculationString = '';
                        }
                        break;
                    case 'ce':
                        currentInput = '';
                        calculationString = '';
                        updateDisplay('0');
                        break;
                    case 'c':
                        currentInput = '';
                        calculationString = '';
                        updateDisplay('0');
                        break;
                    case 'del':
                        currentInput = currentInput.slice(0, -1) || '0';
                        calculationString = calculationString.slice(0, -1) || '0';
                        updateDisplay(calculationString);
                        break;
                    default:
                        if (['+', '-', '*', '/'].includes(action)) {
                            if (currentInput) {
                                calculationString += action;
                                currentInput = '';
                            } else if (calculationString) {
                                calculationString = calculationString.slice(0, -1) + action;
                            }
                            updateDisplay(calculationString);
                        } else if (action === 'percent') {
                            try {
                                result = (parseFloat(calculationString) / 100).toString();
                                updateDisplay(result);
                                calculationString = result;
                            } catch (error) {
                                updateDisplay('Error');
                                calculationString = '';
                            }
                            currentInput = '';
                        }
                        break;
                }
            }
        }
    }

    document.querySelector('.calculator').addEventListener('click', handleButtonClick);
});