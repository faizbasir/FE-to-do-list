import React, { useReducer } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { addTask, editTask } from "../../../store/todoSlice";
import Input from "./Input";
import formReducer from "../../../reducer/formReducer";
import moment from "moment";

interface formProps {
  id?: number;
  summary?: string;
  date?: string;
  completed?: boolean;
  onEdit?: boolean;
  onCancel?: () => void;
}

const Form = (props: formProps) => {
  const [inputState, dispatch] = useReducer(formReducer, {
    summary: {
      value: props.summary || "",
      isValid: props.onEdit || false,
      isTouched: false,
    },
    date: {
      value: props.date || "",
      isValid: props.onEdit || false,
      isTouched: false,
    },
  });

  const appDispatch = useAppDispatch();
  const taskList = useAppSelector((state) => state.todo);

  let maxId: number[] = [];
  taskList.map((task) => maxId.push(task.id));

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (props.onEdit && props.id && props.onCancel) {
      appDispatch(
        editTask({
          summary: inputState.summary.value,
          dueDate: inputState.date.value,
          id: props.id,
        })
      );
      props.onCancel();
    } else {
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
    }
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
      <tr
        className={
          props.onEdit && props.date
            ? `${
                props.completed
                  ? "bg-green"
                  : moment().format("YYYY-MM-DD") > props.date
                  ? "bg-lightred"
                  : "odd:bg-gray"
              }`
            : "bg-gray"
        }
      >
        {props.onEdit ? (
          <td className="px-4 text-sm py-1">{props.id}</td>
        ) : (
          <td></td>
        )}
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
        {props.onEdit ? (
          <td className="text-sm px-4 py-1">{`${
            props.completed ? "Completed" : "Pending"
          }`}</td>
        ) : (
          <td></td>
        )}
        <td className="flex justify-evenly py-2">
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
          {props.onEdit && (
            <button
              className="bg-lightgray rounded-md py-1 px-2 text-sm"
              onClick={props.onCancel}
            >
              Cancel
            </button>
          )}
        </td>
      </tr>
    </>
  );
};

export default Form;
