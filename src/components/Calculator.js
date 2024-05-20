import $ from "jquery";
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

const Calculator = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const handleClick = (e) => {
    const value = e.target.innerText;
    switch (value) {
      case "+":
        if (Number(state.currentNumber)) {
          if (state.isSolution) {
            dispatch({ type: "CLEAR_HISTORY" });
            dispatch({ type: "SET_SOLUTION", payload: false });
          }

          dispatch({
            type: "ADD_TO_HISTORY",
            payload: state.currentNumber + value,
          });
          dispatch({
            type: "ADD_TO_FORMULA",
            payload: state.currentNumber + value,
          });
          dispatch({ type: "CLEAR_DISPLAY" });
          dispatch({ type: "SET_DECIMAL", payload: false });
          dispatch({ type: "SET_SOLUTION", payload: false });
        } else {
          dispatch({
            type: "REPLACE_LAST_IN_FORMULA",
            payload: value,
          });
          dispatch({ type: "REPLACE_LAST_IN_HISTORY", payload: value });
          dispatch({ type: "CLEAR_DISPLAY" });
        }

        return;
      case "-":
        if (!Number(state.currentNumber)) {
          dispatch({ type: "SET_DISPLAY", payload: value });
        } else {
          if (state.currentNumber !== "-") {
            if (state.isSolution) {
              dispatch({ type: "CLEAR_HISTORY" });
              dispatch({ type: "SET_SOLUTION", payload: false });
            }
            dispatch({
              type: "ADD_TO_HISTORY",
              payload: state.currentNumber + value,
            });
          }
          dispatch({
            type: "ADD_TO_FORMULA",
            payload: state.currentNumber + value,
          });
          dispatch({ type: "CLEAR_DISPLAY" });
          dispatch({ type: "SET_DECIMAL", payload: false });
          dispatch({ type: "SET_SOLUTION", payload: false });
        }
        return;
      case "x":
        if (Number(state.currentNumber)) {
          if (state.isSolution) {
            dispatch({ type: "CLEAR_HISTORY" });
            dispatch({ type: "SET_SOLUTION", payload: false });
          }
          dispatch({
            type: "ADD_TO_HISTORY",
            payload: state.currentNumber + "x",
          });
          dispatch({
            type: "ADD_TO_FORMULA",
            payload: state.currentNumber + "*",
          });

          dispatch({ type: "CLEAR_DISPLAY" });
          dispatch({ type: "SET_DECIMAL", payload: false });
          dispatch({ type: "SET_SOLUTION", payload: false });
        } else {
          dispatch({
            type: "REPLACE_LAST_IN_FORMULA",
            payload: value,
          });
          dispatch({ type: "REPLACE_LAST_IN_HISTORY", payload: value });
        }
        return;
      case "/":
        if (Number(state.currentNumber)) {
          if (state.isSolution) {
            dispatch({ type: "CLEAR_HISTORY" });
            dispatch({ type: "SET_SOLUTION", payload: false });
          }
          dispatch({
            type: "ADD_TO_HISTORY",
            payload: state.currentNumber + "/",
          });
          dispatch({
            type: "ADD_TO_FORMULA",
            payload: state.currentNumber + "/",
          });
          dispatch({ type: "CLEAR_DISPLAY" });
          dispatch({ type: "SET_DECIMAL", payload: false });
          dispatch({ type: "SET_SOLUTION", payload: false });
        } else {
          dispatch({
            type: "REPLACE_LAST_IN_FORMULA",
            payload: value,
          });
          dispatch({ type: "REPLACE_LAST_IN_HISTORY", payload: value });
        }
        return;
      case "=":
        if (!state.isSolution && Number(state.currentNumber)) {
          const ans = eval(state.formula + state.currentNumber);
          dispatch({ type: "SET_DISPLAY", payload: ans });
          dispatch({
            type: "ADD_TO_HISTORY",
            payload: state.currentNumber + "=" + ans,
          });
          dispatch({ type: "CLEAR_FORMULA" });
          dispatch({ type: "SET_SOLUTION", payload: true });
          dispatch({ type: "SET_DECIMAL", payload: false });
        }
        return;
      case ".":
        if (!state.isDecimal) {
          dispatch({ type: "ADD_TO_DISPLAY", payload: value });
          dispatch({ type: "SET_DECIMAL", payload: true });
        }
        return;
      case "C":
        dispatch({ type: "CLEAR_DISPLAY" });
        dispatch({ type: "CLEAR_FORMULA" });
        dispatch({ type: "CLEAR_HISTORY" });
        dispatch({ type: "SET_DECIMAL", payload: false });
        dispatch({ type: "SET_SOLUTION", payload: false });
        return;
      default:
        if (state.isSolution) {
          dispatch({ type: "SET_SOLUTION", payload: false });
          dispatch({ type: "CLEAR_HISTORY" });
          dispatch({ type: "SET_DISPLAY", payload: "" });
        }

        dispatch({ type: "ADD_TO_DISPLAY", payload: value });
        dispatch({ type: "SET_CLEAR", payload: false });
        dispatch({ type: "SET_SOLUTION", payload: false });

        return;
    }
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
