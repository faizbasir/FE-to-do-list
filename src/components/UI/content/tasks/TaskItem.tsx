import React, { useReducer, useState } from "react";
import ViewModal from "../../modal/Modal";
import { useAppDispatch } from "../../../store/store";
import { changeTaskStatus, editTask } from "../../../store/todoSlice";
import "./styles/TaskItem.scss";
import { Eye, Pencil, Trash } from "react-bootstrap-icons";
import moment from "moment";
import { Button } from "react-bootstrap";
import formReducer from "../../../reducer/formReducer";

interface Props {
  id: number;
  summary: string;
  completed: boolean;
  dueDate: string;
}

const TaskItem = (props: Props) => {
  const appDispatch = useAppDispatch();
  const [taskStatus, setTaskStatus] = useState<boolean>(props.completed);
  const [showViewModal, setShowViewModal] = useState<boolean>(false);
  const [toDelete, setToDelete] = useState<boolean>(false);
  const [onEdit, setOnEdit] = useState<boolean>(false);
  const [inputState, dispatch] = useReducer(formReducer, {
    summary: { value: props.summary, isValid: true, isTouched: true },
    date: { value: props.dueDate, isValid: true, isTouched: true },
  });

  const deleteHandler = () => {
    setToDelete(true);
    setShowViewModal(!showViewModal);
  };

  const editHandler = () => {
    setOnEdit(!onEdit);
    console.log(inputState);
  };

  const viewHandler = () => {
    setShowViewModal(!showViewModal);
    if (toDelete === true) {
      setToDelete(false);
    }
  };

  const checkHandler = () => {
    setTaskStatus(!taskStatus);
    appDispatch(changeTaskStatus(props.id));
  };

  const editEntryHandler = () => {
    appDispatch(
      editTask({
        id: props.id,
        summary: inputState.summary.value,
        dueDate: inputState.date.value,
      })
    );
    editHandler();
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value);
    dispatch({
      type: "ON_CHANGE",
      payload: { id: e.currentTarget.id, value: e.currentTarget.value },
    });
  };

  if (onEdit) {
    return (
      <>
        <div className="card d-flex flex-row">
          <div className="card-body id-column">{props.id}</div>
          <div className="card-body">
            <input
              className="form-control"
              type="text"
              id="summary"
              value={inputState.summary.value}
              onChange={changeHandler}
            />
          </div>
          <div className="card-body">
            <input
              className="form-control"
              type="date"
              id="date"
              value={inputState.date.value}
              onChange={changeHandler}
            />
          </div>
          <div className="card-body">
            {`${
              props.completed
                ? "Completed"
                : moment().format("YYYY-MM-DD") > props.dueDate
                ? "Overdue"
                : "Pending"
            }`}
          </div>
          <div className="card-body">
            <Button
              variant="primary"
              style={{ marginRight: "0.5rem" }}
              onClick={editEntryHandler}
            >
              Edit
            </Button>
            <Button variant="secondary" onClick={editHandler}>
              Cancel
            </Button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <ViewModal
        header={toDelete ? "Delete Task?" : "Review Task"}
        id={props.id}
        summary={props.summary}
        completed={props.completed}
        dueDate={props.dueDate}
        show={showViewModal}
        toDelete={toDelete}
        onDelete={deleteHandler}
        onCancel={viewHandler}
      />
      <div
        className={`card d-flex flex-row ${
          props.completed
            ? "success"
            : moment().format("YYYY-MM-DD") > props.dueDate
            ? "danger"
            : ""
        }`}
      >
        <div className="card-body id-column">{props.id}</div>
        <div className="card-body">{props.summary}</div>
        <div className="card-body">{props.dueDate}</div>
        <div className="card-body">{`${
          props.completed
            ? "Completed"
            : moment().format("YYYY-MM-DD") > props.dueDate
            ? "Overdue"
            : "Pending"
        }`}</div>
        <input
          type="checkbox"
          className="checkbox"
          onChange={checkHandler}
          checked={props.completed}
        />
        <Eye className="icon" onClick={viewHandler} type="button" />
        <Pencil className="icon" onClick={editHandler} />
        <Trash className="icon" onClick={deleteHandler} type="button" />
      </div>
    </>
  );
};
export default TaskItem;
