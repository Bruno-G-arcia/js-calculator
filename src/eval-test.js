/* eslint-disable no-eval, no-unused-vars*/

let expressionDisplay = '2+3+-6';
const endsWithOperator = /[x+-/]$/;
const precison = 1000000;



let expression = expressionDisplay;
if(endsWithOperator.test(expression)){
  expression = expression.slice(0,-1);
}
expression = expression.replace(/x/g,'*');

let answer = Math.round(precison * eval(expression)) / precison;

expressionDisplay += ' = ' + answer

console.log(expressionDisplay);

