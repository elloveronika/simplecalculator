class Calculator{
    constructor(previousOperandTextElement , currentOperandTextElement){// this will take all the inputs and constructors
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }//now we will create functions that will run when given each command, it will clear out our variables
    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0,-1) //we wanna go, this will take all the different number and will save in this variable
    }
    appendNumber(number) { //this passes the numder thru the function
        if(number === "." && this.currentOperand.includes('.')) return // we are going to hvae to stop decimals from printing out , the return stops it from functioning
        this.currentOperand = this.currentOperand.toString() + number.toString() //we wanna convert it into a string this way we can add something to the end,, th reason why would be bacause javascript will want to add each number instead of appending them ..concatinate them we want 1+1 = 11 instead of 1+1 =2 here
    }
    chooseOperation(operation) {
        if(this.currentOperand === '') return // again this stops the funtion
        if(this.previousOperand !== ''){
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''

    }
    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)//this will be the number version of our nubers
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return // if there is no prev operand or current one we want to cancel the function 
        switch(this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '/':
                computation = prev / current
                break
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''

    }
    getDisplayNumber(number){
        const stringNumber = number.toString()
        const integerDigits =parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        if (isNaN(integerDigits)){
            integerDisplay = ''
        } else {
         integerDisplay = integerDigits.toLocaleString('en', {
            maximumFractionDigits:0 })
        }
        if(decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`
        }else{
            return integerDisplay
        }
    }
        // const floatNumber = parseFloat(number)
        // if(isNaN(floatNumber)) return ''
        // return number.toLocaleString('en')
    updateDisplay() { //this will update the display
        this.currentOperandTextElement.innerText = this.currentOperand //this current operand is being called  in append number and is being updated here?
        if(this.operation != null){
        this.previousOperandTextElement.innerText = 
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = ''
        }
    //this updates anytime a button is pressed
}
}
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-equals]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement) //whenever you are calling a class you want to use new

numberButtons.forEach(button => {// loop over all different buttons one of these buttons we wanna add an eventlistener
    button.addEventListener('click', () => { //this will get triggered everytime you click on a button
        calculator.appendNumber(button.innerText)//this grabs the number thst is given
        calculator.updateDisplay()//this will be constantly updating
    })
})
operationButtons.forEach(button => {// loop over all different buttons one of these buttons we wanna add an eventlistener
    button.addEventListener('click', () => { //this will get triggered everytime you click on a button
        calculator.chooseOperation(button.innerText)//this grabs the number thst is given
        calculator.updateDisplay()//this will be constantly updating
    })
})
equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})
allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})
deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})