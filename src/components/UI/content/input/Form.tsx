import React, { useReducer } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { addTask } from "../../../store/todoSlice";
import Input from "./Input";
import formReducer from "../../../reducer/formReducer";

const Form = () => {
  const [inputState, dispatch] = useReducer(formReducer, {
    summary: { value: "", isValid: false, isTouched: false },
    date: { value: "", isValid: false, isTouched: false },
  });

  const appDispatch = useAppDispatch();
  const taskList = useAppSelector((state) => state.todo);

  let maxId: number[] = [];
  taskList.map((task) => maxId.push(task.id));

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    appDispatch(
      addTask({
        id: Math.max(...maxId) + 1,
        completed: false,
        dueDate: inputState.date.value,
        summary: inputState.summary.value,
      })
    );
    dispatch({
      type: "CLEAR_FIELDS",
      payload: { id: "", value: "" },
    });
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "ON_CHANGE",
      payload: { id: e.currentTarget.id, value: e.currentTarget.value },
    });
  };

  const blurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    dispatch({
      type: "ON_TOUCH",
      payload: { id: e.currentTarget.id, value: "" },
    });
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
            blur={inputState.summary.isTouched}
            onBlur={blurHandler}
          />
        </td>
        <td className="py-2">
          <Input
            type={"date"}
            value={inputState.date.value}
            onChange={changeHandler}
            name={"date"}
            id={"date"}
            valid={inputState.date.isValid}
            blur={inputState.date.isTouched}
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
