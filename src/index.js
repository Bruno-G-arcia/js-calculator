/* eslint-disable no-eval, no-unused-vars*/

import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const endsWithSingleOperator = /\d[x+-/]$/,
  endsWithDoubleOperator = /[x/+-]-$/,
  endsWithMinus = /-$/,
  endsWithOperator = /[x/+-]$/,
  precison = 1000000,
  clearStyle = { background: '#ac3939' },
  operatorStyle = { background: '#666666' },
  equalsStyle = {
    background: '#004466',
    position: 'absolute',
    height: 130,
    bottom: 5    
  };


function Calculator () {
  const 
    [currentVal, setCurrentVal] = useState("0"),
    [preVal, setPreVal] = useState("0"),
    [expressionDisplay, setExpressionDisplay] = useState("0"),    
    [evaluated, setEvaluated] = useState(false)
  ;

  const maxDigitWarning = () => {
    let body = document.body;
    setPreVal(currentVal)
    setCurrentVal('Digit Limit Met');
    body.style.pointerEvents = 'none';   
    
    setTimeout(() => {
      setCurrentVal(preVal);
      body.style.pointerEvents = 'auto';
    }, 1000);   
  }

  const handleEvaluate = () => {
    let expression = expressionDisplay;
    if(endsWithSingleOperator.test(expression)){
      expression = expression.slice(0,-1);
    }
    else if(endsWithDoubleOperator.test(expression)){
      expression = expression.slice(0,-2);
    }

    expression = expression.replace(/x/g,'*');

    let answer = Math.round(precison * eval(expression)) / precison;

    setCurrentVal(answer);
    setExpressionDisplay(expressionDisplay+' = ' + answer);
    setEvaluated(true);
  }

  const handleOperators = (e) =>{
    let value = e.target.value; 
    
    if(expressionDisplay === '0'){
      if(value==='-'){
        setExpressionDisplay('-');
        setCurrentVal('-');
      }
      else{
        setExpressionDisplay(expressionDisplay+value);
        setCurrentVal(value);
      }      
    }

    else if(evaluated){      
      setExpressionDisplay(currentVal+value);
      setCurrentVal(value);
      setEvaluated(false);
    }       
      
    else if(endsWithSingleOperator.test(expressionDisplay)){
      if(value === '-'){
        setExpressionDisplay(expressionDisplay+'-');
        setCurrentVal('-');
      }
      else{
        setExpressionDisplay(expressionDisplay.slice(0,-1)+value);
        setCurrentVal(value);
      }
    }
    
    else if(endsWithDoubleOperator.test(expressionDisplay) && value !== '-'){
      setExpressionDisplay(expressionDisplay.slice(0,-2)+value);
      setCurrentVal(value);
    }

    else{
      setExpressionDisplay(expressionDisplay+value);
      setCurrentVal(value);
    }
  }

  const handleNumbers = (e) =>{
    const value = e.target.value;

    if(currentVal.toString().length>19){
      maxDigitWarning();
    }
         
    else if(currentVal === '0'){    
      if(value !== '0'){
        setCurrentVal(value);
        setExpressionDisplay(value);        
      }     
    }
    
    else if(evaluated){
      setCurrentVal(value);
      setExpressionDisplay(value);
      setEvaluated(false);
    }

    else if(endsWithOperator.test(expressionDisplay)){
      setCurrentVal(value);
      setExpressionDisplay(expressionDisplay+value);      
    }
    else{
      setCurrentVal(currentVal+value);
      setExpressionDisplay(expressionDisplay+value);
    }
  }

  const handleDecimal = (e) =>{
    const value = e.target.value;
    if(evaluated){
      setCurrentVal('0.');
      setExpressionDisplay('0.');
      setEvaluated(false);
    }

    else if(!currentVal.includes('.')){      
      if(endsWithOperator.test(expressionDisplay)){
        setCurrentVal('0.');
        setExpressionDisplay(expressionDisplay+'0.');      
      }
      else{
        setCurrentVal(currentVal+value);
        setExpressionDisplay(expressionDisplay+value);
      }
    }
  }

  const handleInitialize = () =>{
    setExpressionDisplay('0');
    setCurrentVal('0');
    setEvaluated(false);
  }

  return(
    <div>
      <div className="calculator">
        <Formula formula = {expressionDisplay} />
        <Output currentVal = {currentVal} />
        <Buttons
          decimal = {handleDecimal}
          evaluate = {handleEvaluate}
          initialize={handleInitialize}
          numbers={handleNumbers}
          operators={handleOperators}
        />
      </div>
      <div className="author">          
          <br/>
          <a href="https://github.com/Bruno-G-arcia" target="_blank" rel="noreferrer">
            garciaBruno
          </a>
      </div>
    </div>
  )
}

const Buttons = (props) => {
  return(

    <div className="buttonsContainer">
      <button 
        className="jumbo"
        id="clear"
        onClick={props.initialize}
        style={clearStyle}
        value="AC"
      >
        AC
      </button>
      <button
        id="divide"
        onClick={props.operators}
        style={operatorStyle}
        value="/"
      >
        /
      </button>
      <button
        id="multiply"
        onClick={props.operators}
        style={operatorStyle}
        value="x"
      >
        x
      </button>

      <button id="seven" onClick={props.numbers} value="7">
        7
      </button>
      <button id="eight" onClick={props.numbers} value="8">
        8
      </button>
      <button id="nine" onClick={props.numbers} value="9">
        9
      </button>
      <button
        id="subtract"
        onClick={props.operators}
        style={operatorStyle}
        value="-"
      >
        -
      </button>

      <button id="four" onClick={props.numbers} value="4">
        4
      </button>
      <button id="five" onClick={props.numbers} value="5">
        5
      </button>
      <button id="six" onClick={props.numbers} value="6">
        6
      </button>

      <button
        id="add"
        onClick={props.operators}
        style={operatorStyle}
        value="+"
      >
        +
      </button>
      <button id="one" onClick={props.numbers} value="1">
        1
      </button>
      <button id="two" onClick={props.numbers} value="2">
        2
      </button>
      <button id="three" onClick={props.numbers} value="3">
        3
      </button>
      <button 
        className="jumbo"
        id="zero"
        onClick={props.numbers}        
        value="0"
      >
        0
      </button>
      <button id="decimal" onClick={props.decimal} value=".">
        .
      </button>
      <button
        id="equals"
        onClick={props.evaluate}
        style={equalsStyle}
        value="="
      >
        =
      </button>      

    </div>

  );
}

const Output = (props) =>{
  return(
    <div className="outputScreen" id="display">
      <span>{props.currentVal}</span>      
    </div>
  )
}

const Formula = (props) =>{
  return(
    <div className="formulaScreen" id="formulaDisplay">
      <span>{props.formula}</span>      
      </div>
  );
}

ReactDOM.render(<Calculator />, document.getElementById('root'));







