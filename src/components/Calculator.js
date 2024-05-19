import $ from "jquery";
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

const Calculator = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const handleClick = (e) => {
    let currentNumber = state.currentNumber;
    let last = state.currentNumber.charAt(state.currentNumber.length - 1);
    const historyLast = state.history.charAt(state.history.length - 1);
    const solution = state.isSolution;
    const isClear = state.clear;

    if (isClear && e.target.innerText !== "0") {
      last = "";
      currentNumber = "";
      dispatch({ type: "NEXT_NUMBER" });
      dispatch({ type: "CLEARS" });
    }

    switch (e.target.innerText) {
      case "C":
        dispatch({ type: "NEXT_NUMBER" });
        dispatch({ type: "CLEAR" });
        dispatch({ type: "ZERO" });
        dispatch({ type: "CLEARS" });
        return;
      case "=":
        if (!solution && currentNumber !== "") {
          if (last === ".") {
            currentNumber = currentNumber.slice(0, -1);
            dispatch({ type: "REMOVE" });
          }
          const historyFix = state.history.replace(/x/g, "*");
          console.log(historyFix + currentNumber);
          let s = "0";
          try {
            s = eval(historyFix + currentNumber);
          } catch (e) {
            console.log(e);
          }
          dispatch({ type: "HISTORY", payload: currentNumber + "=" + s });
          dispatch({ type: "NEXT_NUMBER" });
          dispatch({ type: "CURRENT_NUMBER", payload: s });
          dispatch({ type: "SOLUTION" });
          dispatch({ type: "FLOAT", payload: false });
        }
        return;
      case "+":
        if (Number(currentNumber)) {
          if (last === ".") {
            currentNumber = currentNumber.slice(0, -1);
            dispatch({ type: "REMOVE" });
          }
          if (solution) {
            dispatch({ type: "CLEAR" });
            console.log("solution");
            dispatch({ type: "SOLUTION" });
          }
          dispatch({
            type: "HISTORY",
            payload: currentNumber + "+",
          });
          dispatch({ type: "NEXT_NUMBER" });
          dispatch({ type: "FLOAT", payload: false });
        }
        return;
      case "-":
        if (Number(currentNumber)) {
          if (last === ".") {
            currentNumber = currentNumber.slice(0, -1);
            dispatch({ type: "REMOVE" });
          }
          if (solution) {
            dispatch({ type: "CLEAR" });
            console.log("solution");
            dispatch({ type: "SOLUTION" });
          }
          dispatch({
            type: "HISTORY",
            payload: state.currentNumber + "-",
          });
          dispatch({ type: "NEXT_NUMBER" });
          dispatch({ type: "FLOAT", payload: false });
        }
        return;
      case "x":
        if (Number(currentNumber)) {
          if (last === ".") {
            currentNumber = currentNumber.slice(0, -1);
            dispatch({ type: "REMOVE" });
          }
          if (solution) {
            dispatch({ type: "CLEAR" });
            console.log("solution");
            dispatch({ type: "SOLUTION" });
          }
          dispatch({
            type: "HISTORY",
            payload: state.currentNumber + "x",
          });
          dispatch({ type: "NEXT_NUMBER" });
          dispatch({ type: "FLOAT", payload: false });
        }
        return;
      case "/":
        if (Number(currentNumber)) {
          if (last === ".") {
            currentNumber = currentNumber.slice(0, -1);
            dispatch({ type: "REMOVE" });
          }
          if (solution) {
            dispatch({ type: "CLEAR" });
            console.log("solution");
            dispatch({ type: "SOLUTION" });
          }
          dispatch({
            type: "HISTORY",
            payload: state.currentNumber + "/",
          });
          dispatch({ type: "NEXT_NUMBER" });
          dispatch({ type: "FLOAT", payload: false });
        }
        return;
      case ".":
        if (!state.isFloat) {
          dispatch({ type: "FLOAT", payload: true });
          dispatch({ type: "CURRENT_NUMBER", payload: "." });
        }
        return;
      case "0":
        if (currentNumber !== "0") {
          dispatch({ type: "CURRENT_NUMBER", payload: e.target.innerText });
        }
        return;
      default:
        dispatch({ type: "CURRENT_NUMBER", payload: e.target.innerText });
    }

    return;
  };

  window.addEventListener("keydown", (e) => {
    e.stopImmediatePropagation();
    switch (e.key) {
      case "0":
        $("#zero").trigger("click");
        return;
      case "1":
        $("#one").trigger("click");
        return;
      case "2":
        $("#two").trigger("click");
        return;
      case "3":
        $("#three").trigger("click");
        return;
      case "4":
        $("#four").trigger("click");
        return;
      case "5":
        $("#five").trigger("click");
        return;
      case "6":
        $("#six").trigger("click");
        return;
      case "7":
        $("#seven").trigger("click");
        return;
      case "8":
        $("#eight").trigger("click");
        return;
      case "9":
        $("#nine").trigger("click");
        return;
      case "+":
        $("#add").trigger("click");
        return;
      case "-":
        $("#subtract").trigger("click");
        return;
      case "*":
        $("#multiply").trigger("click");
        return;
      case "/":
        $("#divide").trigger("click");
        return;
      case ".":
        $("#decimal").trigger("click");
        return;
      case "Enter":
        $("#equals").trigger("click");
        return;
      case "Backspace":
        $("#clear").trigger("click");
        return;
      default:
        return;
    }
  });

  return (
    <div className="container main">
      <div className="row">
        <div className="col">
          <div className="display-div">
            <div id="history">{state.history}</div>
            <div id="display" className="display">
              {state.currentNumber}
            </div>
          </div>
        </div>
      </div>
      <div className="container number-container">
        <div className="row">
          <div className="col-6">
            <button
              onClick={(e) => {
                handleClick(e);
              }}
              id="clear"
              className="btn btn-danger"
            >
              C
            </button>
          </div>
          <div className="col-3">
            <button
              id="divide"
              onClick={(e) => {
                handleClick(e);
              }}
              className="btn btn-secondary"
            >
              /
            </button>
          </div>
          <div className="col-3">
            <button
              id="multiply"
              onClick={(e) => {
                handleClick(e);
              }}
              className="btn btn-secondary"
            >
              x
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <button
              id="seven"
              onClick={(e) => {
                handleClick(e);
              }}
              className="btn btn-primary"
            >
              7
            </button>
          </div>
          <div className="col-3">
            <button
              id="eight"
              onClick={(e) => {
                handleClick(e);
              }}
              className="btn btn-primary"
            >
              8
            </button>
          </div>
          <div className="col-3">
            <button
              id="nine"
              onClick={(e) => {
                handleClick(e);
              }}
              className="btn btn-primary"
            >
              9
            </button>
          </div>
          <div className="col-3">
            <button
              id="add"
              onClick={(e) => {
                handleClick(e);
              }}
              className="btn btn-secondary"
            >
              +
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <button
              id="four"
              onClick={(e) => {
                handleClick(e);
              }}
              className="btn btn-primary"
            >
              4
            </button>
          </div>
          <div className="col-3">
            <button
              id="five"
              onClick={(e) => {
                handleClick(e);
              }}
              className="btn btn-primary"
            >
              5
            </button>
          </div>
          <div className="col-3">
            <button
              id="six"
              onClick={(e) => {
                handleClick(e);
              }}
              className="btn btn-primary"
            >
              6
            </button>
          </div>
          <div className="col-3">
            <button
              id="subtract"
              onClick={(e) => {
                handleClick(e);
              }}
              className="btn btn-secondary"
            >
              -
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <button
              id="one"
              onClick={(e) => {
                handleClick(e);
              }}
              className="btn btn-primary"
            >
              1
            </button>
          </div>
          <div className="col-3">
            <button
              id="two"
              onClick={(e) => {
                handleClick(e);
              }}
              className="btn btn-primary"
            >
              2
            </button>
          </div>
          <div className="col-3">
            <button
              id="three"
              onClick={(e) => {
                handleClick(e);
              }}
              className="btn btn-primary"
            >
              3
            </button>
          </div>
          <div className="col-3">
            <button
              id="equals"
              onClick={(e) => {
                handleClick(e);
              }}
              className="btn btn-warning"
            >
              =
            </button>
          </div>

          <div className="row">
            <div className="col-6">
              <button
                id="zero"
                onClick={(e) => {
                  handleClick(e);
                }}
                className="btn btn-primary"
              >
                0
              </button>
            </div>
            <div className="col-3">
              <button
                id="decimal"
                onClick={(e) => {
                  handleClick(e);
                }}
                className="btn btn-primary"
              >
                .
              </button>
            </div>
          </div>
        </div>
        <div className="row"></div>
      </div>
    </div>
  );
};

export default Calculator;
