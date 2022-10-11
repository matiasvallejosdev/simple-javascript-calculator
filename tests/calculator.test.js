const {Calculator} = require('../src/calculator')

describe('calculator', () => {
    test('should be an object', () =>{
        const calculator = new Calculator();
        expect(typeof calculator).toBe('object');
    })
    test('should clean calculator', () =>{
        const calculator = new Calculator()
        calculator.clear()
        expect(calculator.currentOperand).toBe('')
        expect(calculator.previousOperand).toBe('')
        expect(calculator.operation).toBe(undefined)
    })
    test('should return calculation', () => {
        const calculator = new Calculator()
        expect(typeof  calculator._chooseOperation('*')).toBe('function')
        expect(typeof calculator._chooseOperation('')).toBe('undefined')
        expect(calculator._chooseOperation('*')(10, 10)).toBe(10 * 10)
        expect(calculator._chooseOperation('+')(10, 10)).toBe(10 + 10)
        expect(calculator._chooseOperation('-')(10, 10)).toBe(10 - 10)
        expect(calculator._chooseOperation('/')(10, 10)).toBe(10 / 10)
    })
    test('should delete current operand', () => {
        const calculator = new Calculator()
        calculator.currentOperand = '1010'
        calculator.delete()
        expect(calculator.currentOperand).toBe('101')
        calculator.delete()
        expect(calculator.currentOperand).toBe('10')
        calculator.delete()
        expect(calculator.currentOperand).toBe('1')
        calculator.delete()
        expect(calculator.currentOperand).toBe('')
    })
    test('should append to current number', () => {
        const calculator = new Calculator()
        calculator.appendNumber(1)
        expect(calculator.currentOperand).toBe('1')
        calculator.appendNumber(0)
        expect(calculator.currentOperand).toBe('10')
        calculator.appendNumber(1)
        expect(calculator.currentOperand).toBe('101')
    })
    test('append operation', () => {
        const calculator = new Calculator()
        calculator.appendOperation('*')
        expect(typeof calculator.operation).toBe('undefined')
        calculator.currentOperand = '10'
        calculator.appendOperation('+')
        expect(typeof calculator.operation).toBe('function')
    })
    test('compute calculation', () => {
        const calculator = new Calculator()
        expect(calculator.compute()).toBe(undefined)
        calculator.currentOperand = '10'
        expect(calculator.compute()).toBe(undefined)
        calculator.appendOperation('+')
        calculator.compute()
        expect(calculator.currentOperand).toBe('')
        expect(calculator.previousOperand).toBe('10')
        calculator.currentOperand = '10'
        let result = calculator.compute()
        expect(result).toBe("20")
        expect(calculator.currentOperand).toBe('20')
    })
    test('perform subtraction', () => {
        const calculator = new Calculator();
        calculator.appendNumber('1')
        calculator.appendNumber('0')
        calculator.appendOperation('-')
        calculator.appendNumber('5')
        let result = calculator.compute()
        expect(result).toBe('5')
    })
    test('perform addition', () => {
        const calculator = new Calculator();
        calculator.appendNumber('1')
        calculator.appendOperation('+')
        calculator.appendNumber('5')
        let result = calculator.compute()
        expect(result).toBe('6')
    })
    test('perform product', () => {
        const calculator = new Calculator();
        calculator.appendNumber('1')
        calculator.appendNumber('0')
        calculator.appendOperation('*')
        calculator.appendNumber('5')
        let result = calculator.compute()
        expect(result).toBe('50')
    })
    test('perform subtraction', () => {
        const calculator = new Calculator();
        calculator.appendNumber('1')
        calculator.appendNumber('0')
        calculator.appendOperation('/')
        calculator.appendNumber('2')
        let result = calculator.compute()
        expect(result).toBe('5')
    })
    test('decimal calculation', () => {
        const calculator = new Calculator();
        calculator.appendNumber('2')
        calculator.appendNumber('.')
        calculator.appendNumber('5')
        calculator.appendOperation('*')
        calculator.appendNumber('4')
        let result = calculator.compute()
        expect(result).toBe('10')
    })
})