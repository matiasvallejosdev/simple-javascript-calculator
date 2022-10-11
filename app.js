import {Calculator} from "./src/calculator.js";

const displayCurrent = document.getElementById('display');
const displayPrevious = document.getElementById('answer');

const equal = document.getElementById('equal');
const clear = document.getElementById('clear');
const del = document.getElementById('del');

const operators = document.getElementsByClassName('button--operator');
const numbers = document.getElementsByClassName('button--number');

const calculator = new Calculator();
updateDisplay();

console.log("Starting calculator application");
console.log(calculator);

function updateDisplay(){
    displayCurrent.value = calculator.currentOperand === '' ? 0 : calculator.currentOperand;
    displayPrevious.innerText =calculator.previousOperand === '' ? 0 : calculator.previousOperand;
}

del.addEventListener('click',() => {
    calculator.delete()
    updateDisplay()
})

clear.addEventListener('click',() => {
    calculator.clear()
    updateDisplay()
})

equal.addEventListener('click',() => {
    calculator.compute();
    updateDisplay();
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

//
// const renderHistory = (expression, result) => {
//     return `
//         <div className="history__elem">
//             <p className="history__text">{expression}</p>
//             <p className="history__text history__text--gray"> = </p>
//             <p className="history__text">{result}</p>
//         </div>
//     `;
// }
//
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