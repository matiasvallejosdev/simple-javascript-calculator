
// https://stackoverflow.com/questions/19059580/client-on-node-js-uncaught-referenceerror-require-is-not-defined
// Client on Node.js: Uncaught ReferenceError: require is not defined

export class Calculator{
    constructor() {
        this.clear();
    }
    // https://stackoverflow.com/questions/51381966/how-do-i-use-a-static-variable-in-es6-class
    static calculations={
        '/': (a,b) => {
            if(a === 0 || b === 0) return 0;
            return a / b;
        },
        '*': (a,b) => a*b,
        '+': (a,b) => a+b,
        '-': (a,b) => a-b
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
        if(num === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand + num.toString();
    }
    appendOperation(operator){
        if(this.currentOperand === '') return;
        if(this.previousOperand !== ''){
            this.compute()
        }
        this.operation = this._chooseOperation(operator);
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }
    compute(){
        if(this.currentOperand === '') return;
        if(this.operation === undefined) return;
        if(this.previousOperand === '') {
            this.previousOperand = this.currentOperand;
            this.currentOperand = '';
            return;
        }
        this.currentOperand = this.operation(parseFloat(this.previousOperand), parseFloat(this.currentOperand)).toString();
        this.previousOperand = '';
        this.operation = undefined;
        return this.currentOperand;
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