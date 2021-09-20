import React, { useState } from 'react';
import './App.css';

function changeRes(result:string):string{
  console.log(result);
  let newRes:string = result.replace('x','*');
  newRes = newRes.replace('%','/');
  console.log(newRes);
  const resultNum:number = eval(newRes)
  const resultStr:string = ''+resultNum
  return resultStr
}
function App() {
  const [result,setResult]=useState('');
  return (
    <div id='container'>
      <div id='clacBody'>
        <div id='displayBox'>
          <div id='display'>{result}</div>
        </div>
        <div id ='input'>
          <div className='col'>
            <div onClick={()=>setResult('')} style={{backgroundColor:'red'}}  className='btn'>AC</div>
            <div className='btn'>+/-</div>
            <div onClick={()=>setResult(result.slice(0,-1))} className='btn'>DEL</div>
            <div onClick={()=>setResult(changeRes(result))} className='btn'>=</div>
          </div>
          <div className='col'>
            <div onClick={()=>setResult(result+'7')} className='btn number'>7</div>
            <div onClick={()=>setResult(result+'8')} className='btn number'>8</div>
            <div onClick={()=>setResult(result+'9')} className='btn number'>9</div>
            <div onClick={()=>setResult(result+'x')} className='btn'>x</div>
            </div>
          <div className='col'>
            <div onClick={()=>setResult(result+'4')} className='btn number'>4</div>
            <div onClick={()=>setResult(result+'5')} className='btn number'>5</div>
            <div onClick={()=>setResult(result+'6')} className='btn number'>6</div>
            <div onClick={()=>setResult(result+'-')} className='btn'>-</div>
            </div>
          <div className='col'>
            <div onClick={()=>setResult(result+'1')} className='btn number'>1</div>
            <div onClick={()=>setResult(result+'2')} className='btn number'>2</div>
            <div onClick={()=>setResult(result+'3')} className='btn number'>3</div>
            <div onClick={()=>setResult(result+'+')} className='btn'>+</div>
            </div>
          <div className='col'>
            <div className='btn' style={{fontSize:'25px'}}>Made by Boo</div>
            <div onClick={()=>setResult(result+'0')} className='btn number'>0</div>
            <div onClick={()=>setResult(result+'.')}className='btn'>.</div>
            <div onClick={()=>setResult(result+'%')} className='btn'>%</div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default App;
