import React, {useContext, useReducer} from "react";
import { getNumber } from "../utils";

// Setting default theme values
const AppContext = React.createContext({});

export const useAppContext = () => useContext(AppContext);

const initialState = { 
    addition: [],
    total: 0,
    points: 0
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_NEXT":
      return {
        ...state,
        addition: [
            ...state.addition,
            action.payload
        ]
      };

    case "ADD_SUBMIT": {
        const last = state.addition[state.addition.length - 1];
        const result = action.payload.answer === last.number1 + last.number2;

        return {
            ...state,
            addition: [
                ...state.addition,
                {
                    ...last,
                    answer: action.payload.answer,
                    result
                }
            ],
            total: state.total + 1,
            points: state.points + (result ? 1 : 0)
        }
    }

    default:
      return state;
  }
};

export const addNext = () => {
    const number1 = getNumber();
    const number2 = getNumber();
    return{ type: "ADD_NEXT", payload: { number1, number2 } };
}

export const addSubmit = (answer) => {
    return{ type: "ADD_SUBMIT", payload: { answer } };
}

export const AppStore = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
