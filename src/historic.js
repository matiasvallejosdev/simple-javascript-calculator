import { calculator } from "../app.js";

const history = document.getElementById('history-button');
const historyElement = document.getElementById('history-container');
const historyBody = document.getElementById('history-body');
const historyDelete = document.getElementById('history-delete');

history.addEventListener('click', () => {
    displayHistory(historyElement.classList.contains('history--active'))
})

historyDelete.addEventListener('click',() => {
    calculator.history = []
    updateHistory([], false)
})

history.addEventListener('click', () => {
    let display = !(historyElement.classList.contains('history--active'))
    displayHistory(display)
})

const historyRender = (firstOperand, secondOperand, operation, result) => {
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

function updateHistory(history, reverse){
    if(reverse) history.reverse()
    historyBody.innerHTML = ''
    history.forEach((elem) => {
        historyBody.innerHTML += historyRender(elem.firstOpereand, elem.secondOperand, calculator.getOperation(elem.operation), elem.result);
    })
}

function displayHistory(display){
    if(display){
        historyDelete.classList.remove('button--hide')
        historyElement.classList.add('history--active')
    } else{
        historyDelete.classList.add('button--hide')
        historyElement.classList.remove('history--active')
    }
}

export { updateHistory, displayHistory }