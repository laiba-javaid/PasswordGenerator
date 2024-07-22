
import { useState,useEffect,useRef } from 'react'
import './App.css'
import { useCallback } from 'react';

function App() {

  const [length,setLength]=useState(8);
  const [NumbersAllowed,setNumbersAllowed]=useState(false);
  const [charAllowed,setCharAllowed]=useState(false);
  const [password, setPassword]=useState('');

  const passwordGenerator=useCallback(()=>{
    let password='';
    let str='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let char='!@#$%^&*()_+';
    let num='0123456789';
    if(NumbersAllowed){
      str+=num;
    }
    if(charAllowed){
      str+=char;
    }
    for(let i=0;i<length;i++){
      let index=Math.floor(Math.random()*str.length);
      password+=str.charAt(index);
    }
    setPassword(password);

  }, [length,NumbersAllowed,charAllowed]);


  //useRef Hook
  const passwordRef=useRef(null)

  const copyPasswordToClipboard=useCallback(()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
    alert('Password copied to clipboard');
  },[password])
  
  useEffect(()=>{
    passwordGenerator();
  },[length,NumbersAllowed,charAllowed,passwordGenerator])

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className='text-white text-center my-3'>Password Generator</h1>
    <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordRef}
        />
        <button
        onClick={copyPasswordToClipboard}
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
        >copy</button>
        
    </div>
    <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input 
        type="range"
        min={6}
        max={100}
        value={length}
         className='cursor-pointer'
         onChange={(e) => {setLength(e.target.value)}}
          />
          <label>Length: {length}</label>
      </div>
      <div className="flex items-center gap-x-1">
      <input
          type="checkbox"
          defaultChecked={NumbersAllowed}
          id="numberInput"
          onChange={() => {
              setNumbersAllowed((prev) => !prev);
          }}
      />
      <label htmlFor="numberInput">Numbers</label>
      </div>
      <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => {
                  setCharAllowed((prev) => !prev )
              }}
          />
          <label htmlFor="characterInput">Characters</label>
      </div>
    </div>
</div>
    </>
  )
}

export default App
