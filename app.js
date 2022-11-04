import {Calculator} from "./src/calculator.js";
import {updateHistory, displayHistory} from "./src/historic.js";
import {buttonPressTimeout} from "./src/buttons.js";
import {playSuccess, playClick} from "./src/audio.js";

const displayCurrent = document.getElementById('display');
const displayPrevious = document.getElementById('answer');

const equal = document.getElementById('equal');
const clear = document.getElementById('clear');
const del = document.getElementById('del');

const operators = document.getElementsByClassName('button--operator');
const numbers = document.getElementsByClassName('button--number');

export const calculator = new Calculator();
updateDisplay();

const getOperationButton = (operator) => {
    let operationFound;
    Array.from(operators).forEach((operand) => {
        if(operand.innerText === operator){
            operationFound = operand;
        }
    })
    return operationFound;
}

const getNumberButton = (num) => {
    let numberFound;
    Array.from(numbers).forEach(number =>{
        if(number.innerText === num){
            numberFound = number
        }
    })
    return numberFound;
}

function updateDisplay(){
    updateHistory(calculator.history, true)
    displayHistory(false)
    displayPrevious.innerText = calculator.previousOperand === '' ? 0 : calculator.previousOperand + ' ' + calculator.getOperation()
    displayCurrent.value = calculator.currentOperand === '' ? 0 : calculator.currentOperand;
}

del.addEventListener('click',() => {
    calculator.delete()
    updateDisplay()
    playClick()
    equal.focus()
})

clear.addEventListener('click',() => {
    calculator.clear()
    updateDisplay()
    playClick()
    equal.focus()
})

equal.addEventListener('click',() => {
    calculator.compute();
    playSuccess();
    playClick()
    updateDisplay();
    equal.focus()
})

// https://stackoverflow.com/questions/35969974/foreach-is-not-a-function-error-with-javascript-array
Array.from(numbers).forEach((elem) => {
    elem.addEventListener('click', () => {
        let number = elem.innerText;
        calculator.appendNumber(number);
        updateDisplay();
    });
});

Array.from(operators).forEach((elem) => {
    elem.addEventListener('click', () => {
        calculator.appendOperation(elem.innerHTML)
        updateDisplay();
    })
})

document.addEventListener("keyup", (event) => {
    equal.focus()
    if(event.key === "Enter"){
        buttonPressTimeout(equal)
        calculator.compute()
        updateDisplay()
    }
    if(event.key === ' ') return;
    if (event.key <= 9 || event.key === "."){
        calculator.appendNumber(event.key)
        const button = getNumberButton(event.key)
        buttonPressTimeout(button)
        updateDisplay()
        playClick()
    } else if(
        event.key === "+" ||
        event.key === "-" ||
        event.key === "*" ||
        event.key === "/" ||
        event.key === '%'
    ){
        const button = getOperationButton(event.key)
        buttonPressTimeout(button)
        calculator.appendOperation(event.key);
        updateDisplay()
        playClick()
    } else if(event.key === "Backspace"){
        buttonPressTimeout(del)
        calculator.delete()
        updateDisplay()
        playClick()
    } else if(event.key === "Delete"){
        buttonPressTimeout(clear)
        calculator.clear()
        updateDisplay()
        playClick()
    }
});


// function performHistory(result){
//     const calculated = {
//         firstOperand: calculator.firstOperand,
//         secondOperand: parseFloat(calculator.displayValue),
//         operator: calculator.operator,
//         result: result
//     }
//     return JSON.stringify(calculated);
// }
//
