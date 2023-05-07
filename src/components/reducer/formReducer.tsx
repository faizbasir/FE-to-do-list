import { Reducer } from "react";
import { validatorInput } from "../validator/validator";

interface inputState {
  summary: { value: string; isValid: boolean };
  date: { value: string; isValid: boolean };
}

interface inputAction {
  type: string;
  payload: { id: string; value: string };
}

const formReducer: Reducer<inputState, inputAction> = (
  state: inputState,
  action: inputAction
) => {
  let validate = validatorInput(action.payload.id, action.payload.value);
  switch (action.type) {
    case "ON_CHANGE":
      console.log(action.payload);
      return (state = {
        ...state,
        [action.payload.id]: {
          value: action.payload.value,
          isValid: validate,
        },
      });
    case "CLEAR_FIELDS":
      return (state = {
        summary: { value: "", isValid: false },
        date: { value: "", isValid: false },
      });
    default:
      return state;
  }
};
export default formReducer;
