import { combineReducers } from "redux";

const currentNumberReducer = (state = "By: David Wisseh", action) => {
  switch (action.type) {
    case "CURRENT_NUMBER":
      return state === "By: David Wisseh"
        ? action.payload
        : state + action.payload;
    case "NEXT_NUMBER":
      return "";
    case "REMOVE":
      return state.slice(0, -1);
    case "ZERO":
      return "0";
    default:
      return state;
  }
};
const clearReducer = (state = true, action) => {
  switch (action.type) {
    case "CLEARS":
      return !state;
    default:
      return state;
  }
};

const solutionReducer = (state = false, action) => {
  switch (action.type) {
    case "SOLUTION":
      return !state;
    default:
      return state;
  }
};

const lastOperationReducer = (state = "", action) => {
  switch (action.type) {
    case "LAST_OPERATION":
      return action.payload;
    default:
      return state;
  }
};

const historyReducer = (state = "", action) => {
  switch (action.type) {
    case "HISTORY":
      return state + action.payload;
    case "CLEAR":
      return "";
    default:
      return state;
  }
};

const floatReducer = (state = false, action) => {
  switch (action.type) {
    case "FLOAT":
      return action.payload;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  currentNumber: currentNumberReducer,
  lastOperation: lastOperationReducer,
  history: historyReducer,
  isFloat: floatReducer,
  isSolution: solutionReducer,
  clear: clearReducer,
});

export default rootReducer;
