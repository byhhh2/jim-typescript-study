import React, { useState } from 'react';
import './App.css';

function App() {

  const [value, setValue] = useState([]);
  const [append, setAppend] = useState(true);
  const [result, setResult] = useState('');
  
  function reset () {
    setValue([]);
    setAppend(true);
  }

  function addValue (valueInput) {
    var newList = [...value];

    if (typeof valueInput === "number") {
      let number = valueInput;
      if(append) {
        newList.push(valueInput);
        setAppend(false);
      } else {
        number = newList[newList.length - 1];
        number = number * 10 + valueInput;
        newList[newList.length - 1] = number;
      }
      setValue(newList);
      console.log(newList);
    } else {
      setValue([...value, valueInput]);
      setAppend(true);
      console.log(newList);
    }
  }
  function calculateResult() {
    const result = value.reduce((acc, valueInput, i, array) => {
      if (typeof valueInput === "number") {
        if (i === 0) {
          return valueInput;
        } else {
          const operator = array[i - 1];
          switch (operator) {
            case "+":
              return acc + valueInput;
            case "-":
              return acc - valueInput;
            case "*":
              return acc * valueInput;
            case "/":
              return acc / valueInput;
            default:
              return acc;
          }
        }
      }
      return acc;
    }, 0);
    setResult(result);
  };
  return (
    <div>
      <div>
        <input value={value.join("")} readOnly />
        <input value={result} readOnly />
      </div>
      <div>
        <button onClick={reset} label="AC" value="clear">
          AC
        </button>
        <button onClick={() => addValue("/")} value="division">
          /
        </button>
      </div>
      <div>
        <button onClick={() => addValue(7)} value="7">
          7
        </button>
        <button onClick={() => addValue(8)} value="8">
          8
        </button>
        <button onClick={() => addValue(9)} value="9">
          9
        </button>
        <button onClick={() => addValue("*")} value="multiplication">
          *
        </button>
      </div>
      <div>
        <button onClick={() => addValue(4)} value="4">
          4
        </button>
        <button onClick={() => addValue(5)} value="5">  
          5
        </button>
        <button onClick={() => addValue(6)} value="6">
          6
        </button>
        <button onClick={() => addValue("-")} value="subtraciton">
          -
        </button>
      </div>
      <div>
        <button onClick={() => addValue(1)} value="1">
          1
        </button>
        <button onClick={() => addValue(2)} value="2">
          2
        </button>
        <button onClick={() => addValue(3)} value="3">
          3
        </button>
        <button onClick={() => addValue("+")} value="addition">
          +
        </button>
      </div>
      <div>
        <button onClick={() => addValue(0)} label="0" value="0">
          0
        </button>
        <button onClick={() => calculateResult()} label="=" value="equal">
          =
        </button>
      </div>
    </div>
  );
}
export default App;