import React, { useReducer, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { addTask } from "../../../store/todoSlice";
import Input from "./Input";
import formReducer from "../../../reducer/formReducer";

const Form = () => {
  const [inputState, dispatch] = useReducer(formReducer, {
    summary: { value: "", isValid: false },
    date: { value: "", isValid: false },
  });
  const [summaryBlur, setSummaryBlur] = useState(false);
  const [dateBlur, setDateBlur] = useState(false);

  const appDispatch = useAppDispatch();
  const taskList = useAppSelector((state) => state.todo);

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    appDispatch(
      addTask({
        id: taskList.length + 1,
        completed: false,
        dueDate: inputState.date.value,
        summary: inputState.summary.value,
      })
    );
    dispatch({
      type: "CLEAR_FIELDS",
      payload: { id: "", value: "" },
    });
    setDateBlur(false);
    setSummaryBlur(false);
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "ON_CHANGE",
      payload: { id: e.currentTarget.id, value: e.currentTarget.value },
    });
  };

  const blurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.currentTarget.id === "summary") {
      setSummaryBlur(true);
    } else {
      setDateBlur(true);
    }
  };

  return (
    <>
      <tr className="bg-gray">
        <td></td>
        <td className="py-2">
          <Input
            type={"text"}
            value={inputState.summary.value}
            onChange={changeHandler}
            name={"summary"}
            id={"summary"}
            valid={inputState.summary.isValid}
            blur={summaryBlur}
            onBlur={blurHandler}
          />
        </td>
        <td>
          <Input
            type={"date"}
            value={inputState.date.value}
            onChange={changeHandler}
            name={"date"}
            id={"date"}
            valid={inputState.date.isValid}
            blur={dateBlur}
            onBlur={blurHandler}
          />
        </td>
        <td></td>
        <td>
          <button
            onClick={submitHandler}
            className={`${
              inputState.date.isValid && inputState.summary.isValid
                ? "bg-secondary text-primary"
                : "bg-lightgray cursor-not-allowed"
            } rounded-md py-1 px-2 text-sm`}
            disabled={!(inputState.date.isValid && inputState.summary.isValid)}
          >
            Submit
          </button>
        </td>
      </tr>
    </>
  );
};

export default Form;
