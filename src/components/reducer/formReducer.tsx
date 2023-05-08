import { Reducer } from "react";
import { validatorInput } from "../validator/validator";

interface inputState {
  summary: { value: string; isValid: boolean; isTouched: boolean };
  date: { value: string; isValid: boolean; isTouched: boolean };
}

interface inputAction {
  type: string;
  payload: { id: string; value: string };
}

const formReducer: Reducer<inputState, inputAction> = (
  state: inputState,
  action: inputAction
) => {
  const { type, payload } = action;
  let validate = validatorInput(payload);
  switch (type) {
    case "ON_CHANGE":
      return (state = {
        ...state,
        [payload.id]: {
          value: payload.value,
          isValid: validate,
          isTouched: state[payload.id as keyof typeof state].isTouched,
        },
      });
    case "CLEAR_FIELDS":
      return (state = {
        summary: { value: "", isValid: false, isTouched: false },
        date: { value: "", isValid: false, isTouched: false },
      });
    case "ON_TOUCH":
      return (state = {
        ...state,
        [payload.id]: {
          value: state[payload.id as keyof typeof state].value,
          isValid: state[payload.id as keyof typeof state].isValid,
          isTouched: true,
        },
      });
    default:
      return state;
  }
};
export default formReducer;
