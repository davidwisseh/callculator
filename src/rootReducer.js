import { combineReducers } from "redux";

// This is a the store for a calculator app that has a display, a formula, and a result.
// It has a reducer for each of these states.
// "." cannot be clicked twice in a row.
// "0" cannot be the first character in the display.
// decimal points should be handled correctly.
// If the last character in the display is an operator, the next character cannot be an operator.
// 5 * - + 5 should result in 10.
//The expression "2 / 7" should produce an output number with at least 4 decimal places of precision
// the screen wik=ll start with 0
// the screen will display the current number

//the current formula will be displayed in the history section

// the current number will be displayed in the display section

// the current number will be updated depending on the number or operator clicked

// the history will be updated depending on the current number and the operator clicked
// operators cannot be clicked twice in a row
// if the current number is 0 and a number is clicked, the current number will be updated with that number

const initialState = {
  currentNumber: "0",
  formula: "",
  history: "",
  isDecimal: false,
  isSolution: false,
  isClear: true,
};

const historyReducer = (state = initialState.history, action) => {
  switch (action.type) {
    case "CLEAR_HISTORY":
      return "";
    case "ADD_TO_HISTORY":
      return state + action.payload;
    case "REMOVE_LAST_FROM_HISTORY":
      return state.slice(0, -1);
    case "REPLACE_LAST_IN_HISTORY":
      return state.slice(0, -1) + action.payload;
    default:
      return state;
  }
};

const formulaReducer = (state = initialState.formula, action) => {
  switch (action.type) {
    case "CLEAR_FORMULA":
      return "";
    case "ADD_TO_FORMULA":
      return state + action.payload;
    case "REMOVE_LAST_FROM_FORMULA":
      return state.slice(0, -1);
    case "REPLACE_LAST_IN_FORMULA":
      return state.slice(0, -1) + action.payload;
    default:
      return state;
  }
};

const displayReducer = (state = initialState.currentNumber, action) => {
  switch (action.type) {
    case "CLEAR_DISPLAY":
      return "0";
    case "ADD_TO_DISPLAY":
      if (state === "0") {
        return action.payload;
      }
      return state + action.payload;
    case "REMOVE_LAST_FROM_DISPLAY":
      return state.slice(0, -1);
    case "REPLACE_LAST_IN_DISPLAY":
      return state.slice(0, -1) + action.payload;
    case "SET_DISPLAY":
      return action.payload;
    default:
      return state;
  }
};

const clearReducer = (state = initialState.isClear, action) => {
  switch (action.type) {
    case "SET_CLEAR":
      return action.payload;
    default:
      return state;
  }
};

const decimalReducer = (state = initialState.isDecimal, action) => {
  switch (action.type) {
    case "SET_DECIMAL":
      return action.payload;
    default:
      return state;
  }
};

const solutionReducer = (state = initialState.isSolution, action) => {
  switch (action.type) {
    case "SET_SOLUTION":
      return action.payload;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  currentNumber: displayReducer,
  formula: formulaReducer,
  history: historyReducer,
  isClear: clearReducer,
  isDecimal: decimalReducer,
  isSolution: solutionReducer,
});

export default rootReducer;
