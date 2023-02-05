const calculator = document.querySelector('.calculator');//trae todo los elemnetos dentro de calculador de la HTML
const keys = calculator.querySelector('.calculator__keys');//trae los elementos con class calculador__key
const display = document.querySelector('.calculator__display');//trae los elementos del display

keys.addEventListener('click', e =>{//al hacer el click detectot de evento
    if(e.target.matches('button')){
        const key = e.target;
        const action = key.dataset.action;//toma el valor de data-action
        const keyContent = key.textContent; // numeros contenidos
        const displayedNum = display.textContent; //numeros para el display
        // Removemos .is-depressed class de todas keys
        Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'));
        //creamos las acciones de numero
        const previousKeyType = calculator.dataset.previousKeyType //vandera para remplasa los numeros del display
        if (!action) {
            if (displayedNum === '0' || previousKeyType === 'operator' || previousKeyType === 'calculate' ){
                display.textContent = keyContent
            }
            else{
                display.textContent = displayedNum + keyContent;
            }
            calculator.dataset.previousKeyType = 'number';
          }
        //creamos las aciones de operacion 
        if(action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide' ){
            let firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            let secondValue = displayedNum;
            if (firstValue && operator && previousKeyType !== 'operator' && previousKeyType !== 'calculate'){
                const calcValue = calculate(firstValue, operator, secondValue);
                display.textContent = calcValue;
                //carga el valor a fistValue
                calculator.dataset.firstValue = calcValue;
            }
            else{
                //si no hay valor set displayNum a fistValue
                calculator.dataset.firstValue = displayedNum;
            }
            key.classList.add('is-depressed');
            // Add custom attribute
            calculator.dataset.previousKeyType = 'operator'
            //almacenamos la variable que se encuentra almomento de realizar la accion
            //calculator.dataset.firstValue = displayedNum; 
            calculator.dataset.operator = action;
        }
        if (action === 'decimal') {
            if(!displayedNum.includes('.')){
                display.textContent = displayedNum + '.';
            }
            if (previousKeyType === 'operator' || previousKeyType === 'calculate'){
                display.textContent = '0.'
            }
            calculator.dataset.previousKeyType = 'decimal';
        }
        if (action === 'clear'){
            if(key.textContent === 'AC'){
                calculator.dataset.firstValue = ''
                calculator.dataset.modValue = ''
                calculator.dataset.operator = ''
                calculator.dataset.previousKeyType = ''
            }
            else{
                key.textContent = 'AC';
            }
            display.textContent = 0;
            calculator.dataset.previousKeyType = 'clear';
        }
        if (action !== 'clear'){
            //canbia el texto en la tecla AC
            const clearButton = calculator.querySelector('[data-action=clear]');
            clearButton.textContent = 'CE'
        }
        if (action === 'calculate'){
            let firstValue = calculator.dataset.firstValue;
            //almacenamos la variable que se encuentra almomento de realizar la accion
            let secondValue = displayedNum;
            const operator = calculator.dataset.operator;
            if(firstValue){
                if(previousKeyType === 'calculate'){
                    firstValue = displayedNum;
                    secondValue = calculator.dataset.modValue
                }
                display.textContent = calculate(firstValue, operator, secondValue);
            }
            //coloca modValue atrivuto el valor secondValue;
            calculator.dataset.previousKeyType = 'calculate';
            calculator.dataset.modValue = secondValue;
        }   
    }
});
//para calcular
const calculate = (n1, operator, n2) => {
    const firtNum = parseFloat(n1);
    const seconNum = parseFloat(n2);
    if (operator === 'add') {
      return (firtNum + seconNum).toFixed(4);
    }
    if (operator === 'subtract') {
        return (firtNum - seconNum).toFixed(4);
    }
    if (operator === 'multiply') {
        return (firtNum * seconNum).toFixed(4);
    }
    if (operator === 'divide') {
        return (firtNum / seconNum);
    }
}
