import React, { useContext, useReducer } from "react";
import { getNumber, getRandomInt } from "../utils";

// Setting default theme values
const AppContext = React.createContext({});

export const useAppContext = () => useContext(AppContext);

const initialState = {
  addition: [],
  subtraction: [],
  multiplication: [],
  total: 0,
  points: 0,
  config: {
    addition: {
      digits: 2,
    },
    subtraction: {
      digits: 2,
    },
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_NEXT":
      return {
        ...state,
        addition: [...state.addition, action.payload],
      };

    case "ADD_SUBMIT": {
      const last = state.addition[state.addition.length - 1];

      if (last && last.answer !== undefined) {
        return state;
      }

      const result = action.payload.answer === last.number1 + last.number2;

      return {
        ...state,
        addition: [
          ...state.addition,
          {
            ...last,
            answer: action.payload.answer,
            result,
          },
        ],
        total: state.total + 1,
        points: state.points + (result ? 1 : 0),
      };
    }

    case "SUB_NEXT":
      return {
        ...state,
        subtraction: [...state.subtraction, action.payload],
      };

    case "SUB_SUBMIT": {
      const last = state.subtraction[state.subtraction.length - 1];

      if (last && last.answer !== undefined) {
        return state;
      }

      const result = action.payload.answer === last.number1 - last.number2;

      return {
        ...state,
        subtraction: [
          ...state.subtraction,
          {
            ...last,
            answer: action.payload.answer,
            result,
          },
        ],
        total: state.total + 1,
        points: state.points + (result ? 1 : 0),
      };
    }

    case "MUL_NEXT":
      return {
        ...state,
        multiplication: [...state.multiplication, action.payload],
      };

    case "MUL_SUBMIT": {
      const last = state.multiplication[state.multiplication.length - 1];

      if (last && last.answer !== undefined) {
        return state;
      }

      const result = action.payload.answer === last.number1 * last.number2;

      return {
        ...state,
        multiplication: [
          ...state.multiplication,
          {
            ...last,
            answer: action.payload.answer,
            result,
          },
        ],
        total: state.total + 1,
        points: state.points + (result ? 1 : 0),
      };
    }

    default:
      return state;
  }
};

export const addNext = () => {
  const number1 = getNumber();
  const number2 = getNumber();
  return { type: "ADD_NEXT", payload: { number1, number2 } };
};

export const substractNext = () => {
  const number1 = getNumber();
  const number2 = getRandomInt(10, number1);
  return { type: "SUB_NEXT", payload: { number1, number2 } };
};

export const multiplyNext = () => {
  const number1 = getNumber();
  const number2 = getRandomInt(1, 10);
  return { type: "MUL_NEXT", payload: { number1, number2 } };
};

export const addSubmit = (answer) => {
  return { type: "ADD_SUBMIT", payload: { answer } };
};

export const substractSubmit = (answer) => {
  return { type: "SUB_SUBMIT", payload: { answer } };
};

export const multiplySubmit = (answer) => {
  return { type: "MUL_SUBMIT", payload: { answer } };
};

export const AppStore = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
