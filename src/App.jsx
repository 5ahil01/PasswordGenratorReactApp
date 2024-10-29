import { act } from "react";
import { useState, useCallback, useEffect, useRef, useReducer } from "react";
import React from "react";

function App() {
  // const [length, setLength] = useState(8);
  // const [numberAllowed, setNumberAllowed] = useState(false);
  // const [charAllowed, setCharAllowed] = useState(false);
  // const [password, setPassword] = useState("");
  const passwordRef = useRef(null);

  const initalPara = {
    length: 8,
    numberAllowed: false,
    charAllowed: false,
    password: "",
  };

  function reducer(state, action) {
    switch (action.type) {
      case "SET_LENGTH":
        return {
          ...state,
          length: action.payload,
        };
      case "ALLOW_NUM":
        return {
          ...state,
          numberAllowed: !state.numberAllowed,
        };
      case "ALLOW_CHAR":
        return {
          ...state,
          charAllowed: !state.charAllowed,
        };
      case "SET_PASS":
        return {
          ...state,
          password: action.payload,
        };
      default:
        return state;
    }
  }

  const [parameters, dispatch] = useReducer(reducer, initalPara);
  const { length, numberAllowed, charAllowed, password } = parameters;

  //Password Generator Method
  const passwordGenrator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*{}[]()~`";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    dispatch({ type: "SET_PASS", payload: pass });
  }, [length, numberAllowed, charAllowed]);

  useEffect(() => {
    passwordGenrator();
  }, [length, numberAllowed, charAllowed, passwordGenrator]);

  //Password Copy Method
  const passwordCopy = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <>
      <div
        className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 px-4 my-8 
        border-2
        "
      >
        <h1 className="text-center my-3 ">Password Genrator</h1>

        {/* Input and all those things */}
        <div className=" flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-80 py-1 px-3 border-2 rounded-l mb-5"
            placeholder="password will appear hear"
            readOnly
          />
          <button
            className="bg-green-300 rounded-r p-1 shrink-0"
            onClick={passwordCopy}
          >
            Copy
          </button>
        </div>

        {/* Length Numbers Characters */}
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            {/* Length */}
            <input
              type="range"
              min={6}
              max={50}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                // setLength(e.target.value);
                dispatch({
                  type: "SET_LENGTH",
                  payload: parseInt(e.target.value),
                });
              }}
            />
            <label>Length: {length}</label>

            {/* Numbers */}
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                defaultChecked={numberAllowed}
                id="numberInput"
                onChange={() => dispatch({ type: "ALLOW_NUM" })}
              />
              <label htmlFor="numberInput">Numbers</label>
            </div>

            {/* Characters */}
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                defaultChecked={charAllowed}
                id="characterInput"
                onChange={() => dispatch({ type: "ALLOW_CHAR" })}
              />
              <label htmlFor="characterInput">Characters</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
