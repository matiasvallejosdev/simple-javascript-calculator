
// https://stackoverflow.com/questions/19059580/client-on-node-js-uncaught-referenceerror-require-is-not-defined
// Client on Node.js: Uncaught ReferenceError: require is not defined

export class Calculator{
    constructor() {
        this.clear();
        this.history = [];
    }
    // https://stackoverflow.com/questions/51381966/how-do-i-use-a-static-variable-in-es6-class
    static calculations={
        '/': (a,b) => {
            if(a === 0 || b === 0) return '';
            return a / b;
        },
        '*': (a,b) => a*b,
        '+': (a,b) => a+b,
        '-': (a,b) => a-b,
        '%': (a,b) => {
            if(a === 0 || b === 0) return '';
            return a % b;
        }
    }
    clear(){
        this.previousOperand = '';
        this.operation = undefined;
        this.currentOperand = '';
    }
    delete(){
        // https://masteringjs.io/tutorials/fundamentals/remove-last-character
        this.currentOperand = this.currentOperand.slice(0, -1);
    }
    appendNumber(num){
        if(this.currentOperand === '0') this.currentOperand = '';
        if(num === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand += num.toString();
    }
    appendOperation(operator){
        if(this.currentOperand === '') return;
        if(this.previousOperand !== ''){
            this.operation = this._chooseOperation(operator)
            this.compute()
            return;
        }
        this.operation = this._chooseOperation(operator);
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }
    compute(){
        if(this.currentOperand === '') return;
        if(this.operation === undefined) return;
        let result = this.operation(parseFloat(this.previousOperand), parseFloat(this.currentOperand)).toString();
        this._saveHistory(result)
        this.currentOperand = result;
        this.operation = undefined;
        this.previousOperand = '';
        return this.currentOperand;
    }


    getOperation(operation){
        let currentOperation = undefined;
        if(operation !== undefined) {
            currentOperation = operation;
        } else {
            if(this.operation === undefined) return;
            currentOperation = this.operation
        }
        for (let key in Calculator.calculations) {
            if(Calculator.calculations[key] === currentOperation) return key;
        }
    }
    _saveHistory(result){
        this.history.push(this._formatHistory(result))
        console.log(this.history)
    }
    _formatHistory(result){
        return{
            'firstOpereand': this.previousOperand,
            'secondOperand': this.currentOperand,
            'operation': this.operation,
            'result': result
        }
    }
    _chooseOperation(operator){
        // https://www.geeksforgeeks.org/how-to-check-a-key-exists-in-javascript-object/
        if(!Calculator.calculations.hasOwnProperty(operator)) return;
        return Calculator.calculations[operator];
    }
}

// module.exports = {
//     Calculator
// }