import {Calculator} from "./src/calculator.js";

const body = document.getElementById("body");
const dark = document.getElementById("dark");
dark.addEventListener("click",(e)=>{
    const classDark = 'body__dark'
    const classLight = 'body__light'
    if(dark.classList.contains('fa-regular')){
        // Make it dark
        dark.classList.remove('fa-regular')
        dark.classList.add('fa-solid')
        body.classList.remove(classLight)
        body.classList.add(classDark)
    } else{
        dark.classList.remove('fa-solid')
        dark.classList.add('fa-regular')
        body.classList.remove(classDark)
        body.classList.add(classLight)
        // Make it light
    }
})

const history = document.getElementById('history-button');
const historyElement = document.getElementById('history-container');
const historyBody = document.getElementById('history-body');
const historyDelete = document.getElementById('history-delete');
const historyElem = (firstOperand, secondOperand, operation, result) => {
    let operated = `${firstOperand} ${operation} ${secondOperand}`
    return  `<tr class="history__elem">
                <td class="history__row">
                    <div class="history__text history__box">
                    ${operated}
                    </div>
                </td>
                <td class="history__text history__box">=</td>
                <td class="history__text history__box">${result}</td>
            </tr>`;
}

const displayCurrent = document.getElementById('display');
const displayPrevious = document.getElementById('answer');

const equal = document.getElementById('equal');
const clear = document.getElementById('clear');
const del = document.getElementById('del');

const operators = document.getElementsByClassName('button--operator');
const numbers = document.getElementsByClassName('button--number');

const calculator = new Calculator();
updateDisplay();

function updateDisplay(){
    updateHistory()
    displayHistory(true)
    displayPrevious.innerText = calculator.previousOperand === '' ? 0 : calculator.previousOperand + ' ' + calculator.getOperation()
    displayCurrent.value = calculator.currentOperand === '' ? 0 : calculator.currentOperand;
}

function updateHistory(){
    let history = calculator.history.reverse();
    historyBody.innerHTML = ''
    history.forEach((elem) => {
        historyBody.innerHTML += historyElem(elem.firstOpereand, elem.secondOperand, calculator.getOperation(elem.operation), elem.result);
    })
}

function displayHistory(isActive){
    if(isActive){
        historyElement.classList.remove('history--active')
        historyDelete.classList.add('button--hide')
    } else{
        historyDelete.classList.remove('button--hide')
        historyElement.classList.add('history--active')
    }
}

history.addEventListener('click', () => {
    displayHistory(historyElement.classList.contains('history--active'))
})

del.addEventListener('click',() => {
    calculator.delete()
    updateDisplay()
})

clear.addEventListener('click',() => {
    calculator.clear()
    updateDisplay()
    equal.focus()
})

equal.addEventListener('click',() => {
    calculator.compute();
    updateDisplay();
})

historyDelete.addEventListener('click',() => {
    calculator.history = []
    updateHistory()
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
    if(event.key === "Enter"){
        calculator.compute()
        updateDisplay()
    }
    if(event.key === ' ') return;
    if (event.key <= 9 || event.key === "."){
        calculator.appendNumber(event.key)
        // let elem =
        // elem.classList.add('button__hovered')
        // setTimeout(()=>{
        //     elem.classList.remove('button__hovered')
        // }, 250)
        updateDisplay()
    } else if(
        event.key === "+" ||
        event.key === "-" ||
        event.key === "*" ||
        event.key === "/" ||
        event.key === '%'
    ){
        calculator.appendOperation(event.key);
        updateDisplay()
    } else if(event.key === "Backspace"){
        calculator.delete()
        updateDisplay()
    } else if(event.key === "Delete"){
        calculator.clear()
        updateDisplay()
    }
});

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