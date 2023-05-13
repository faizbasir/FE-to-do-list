import React, { useReducer, useState } from "react";
import { PencilIcon, TrashIcon, EyeIcon } from "@heroicons/react/24/outline";
import ViewModal from "../../modal/ViewModal";
import DeleteModal from "../../modal/DeleteModal";
import { useAppDispatch } from "../../../store/store";
import { changeTaskStatus } from "../../../store/todoSlice";
import moment from "moment";
import { Portal } from "../../portal/Portal";
import Input from "../input/Input";
import formReducer from "../../../reducer/formReducer";
import { editTask } from "../../../store/todoSlice";

interface Props {
  id: number;
  summary: string;
  completed: boolean;
  dueDate: string;
}

const TaskItem = (props: Props) => {
  const appDispatch = useAppDispatch();
  const [showViewModal, setShowViewModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [taskStatus, setTaskStatus] = useState<boolean>(props.completed);
  const [onEdit, setOnEdit] = useState<boolean>(false);
  const [inputState, dispatch] = useReducer(formReducer, {
    summary: { value: props.summary, isValid: true, isTouched: false },
    date: { value: props.dueDate, isValid: true, isTouched: false },
  });

  const deleteHandler = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  const editHandler = () => {
    setOnEdit(!onEdit);
  };

  const viewHandler = () => {
    setShowViewModal(!showViewModal);
  };

  const checkHandler = () => {
    setTaskStatus(!taskStatus);
    appDispatch(changeTaskStatus(props.id));
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

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    appDispatch(
      editTask({
        summary: inputState.summary.value,
        id: props.id,
        dueDate: inputState.date.value,
      })
    );
    setOnEdit(false);
  };

  if (onEdit) {
    return (
      <>
        <tr
          className={`${
            props.completed
              ? "bg-green"
              : moment().format("YYYY-MM-DD") > props.dueDate
              ? "bg-lightred"
              : "odd:bg-gray"
          }`}
        >
          <td className="px-4 text-sm py-1">{props.id}</td>
          <td className="py-2">
            <Input
              name={"summary"}
              type={"text"}
              value={inputState.summary.value}
              id={"summary"}
              valid={false}
              blur={false}
              onChange={changeHandler}
              onBlur={blurHandler}
            />
          </td>
          <td className="py-2">
            <Input
              name={"date"}
              type={"date"}
              value={inputState.date.value}
              id={"date"}
              valid={false}
              blur={false}
              onChange={changeHandler}
              onBlur={blurHandler}
            />
          </td>
          <td className="px-4 text-sm py-1">{`${
            props.completed ? "Completed" : "Pending"
          }`}</td>
          <td>
            <button
              className={`${
                inputState.date.isValid && inputState.summary.isValid
                  ? "bg-secondary text-primary"
                  : "bg-lightgray cursor-not-allowed"
              } rounded-md py-1 px-2 text-sm`}
              disabled={
                !(inputState.date.isValid && inputState.summary.isValid)
              }
              onClick={submitHandler}
            >
              Edit Task
            </button>
            <button
              className="rounded-md py-1 px-2 text-sm bg-lightgray ml-2"
              onClick={editHandler}
            >
              Cancel
            </button>
          </td>
        </tr>
      </>
    );
  }

  return (
    <>
      {showViewModal && (
        <Portal target={"modal"}>
          <ViewModal
            header={"Review Task"}
            id={props.id}
            summary={props.summary}
            completed={props.completed}
            dueDate={props.dueDate}
            onCancel={viewHandler}
          />
        </Portal>
      )}
      {showDeleteModal && (
        <Portal target={"modal"}>
          <DeleteModal
            id={props.id}
            summary={props.summary}
            dueDate={props.dueDate}
            completed={props.completed}
            onCancel={deleteHandler}
          />
        </Portal>
      )}

      <tr
        className={`${
          props.completed
            ? "bg-green"
            : moment().format("YYYY-MM-DD") > props.dueDate
            ? "bg-lightred"
            : "odd:bg-gray"
        }`}
      >
        <td className="px-4 text-sm py-1">{props.id}</td>
        <td className="px-4 text-sm py-1">{props.summary}</td>
        <td className="px-4 text-sm py-1">{props.dueDate}</td>
        <td className="px-4 text-sm py-1">{`${
          props.completed ? "Completed" : "Pending"
        }`}</td>
        <td className="flex justify-evenly">
          <input
            type="checkbox"
            className="h-6 mr-4"
            onChange={checkHandler}
            checked={props.completed}
          />
          <PencilIcon className="h-5 mr-4" onClick={editHandler} />
          <TrashIcon className="h-5 mr-4" onClick={deleteHandler} />
          <EyeIcon onClick={viewHandler} className="h-5 mr-4" />
        </td>
      </tr>
    </>
  );
};
export default TaskItem;
