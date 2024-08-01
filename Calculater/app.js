
document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    let buttons = document.getElementsByTagName('button');

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].onclick = function() {
            let input = this.innerText;
            handleInput(input);
        }
    }

    document.addEventListener('keydown', function(event) {
        let input = event.key;
        if (isValidInput(input)) {
            event.preventDefault(); // Prevent default action for Enter and other keys
            if (input === "Enter") {
                handleInput("=");
            } else if (input === "Escape") {
                handleInput("AC");
            } else if (input === "Backspace") {
                handleInput("DE");
            } else {
                handleInput(input);
            }
        }
    });

    function isValidInput(input) {
        return ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/', '%', '.', 'Enter', 'Backspace', 'Escape'].includes(input);
    }

    function handleInput(input) {
        if (input === "=") {
            calculateResult();
        } else if (input === "AC") {
            clearDisplay();
        } else if (input === "DE") {
            deleteLastChar();
        } else {
            updateDisplay(input);
        }
    }

    function updateDisplay(input) {
        let currentDisplay = display.innerText;
        let lastChar = currentDisplay[currentDisplay.length - 1];
        let isOperator = ['+', '-', '*', '/', '%', '.'].includes(lastChar);

        if (currentDisplay === "0" && !['+', '-', '*', '/', '%', '.'].includes(input)) {
            display.innerText = input;
        } else if (isOperator && ['+', '-', '*', '/', '%', '.'].includes(input)) {
            display.innerText = currentDisplay.slice(0, -1) + input; // Replace the last operator
        } else {
            display.innerText += input;
        }
    }

    function calculateResult() {
        let expression = display.innerText;
        try {
            // Evaluate the expression using Function constructor for safety
            let result = new Function('return ' + expression)();
            display.innerText = result;
        } catch (e) {
            display.innerText = "Error";
        }
    }

    function clearDisplay() {
        display.innerText = "0";
    }

    function deleteLastChar() {
        let currentDisplay = display.innerText;
        display.innerText = currentDisplay.substring(0, currentDisplay.length - 1);
        if (display.innerText === "") {
            display.innerText = "0";
        }
    }
});
