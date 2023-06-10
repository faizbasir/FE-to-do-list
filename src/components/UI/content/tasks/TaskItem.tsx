import React, { useState } from "react";
import ViewModal from "../../modal/Modal";
import { useAppDispatch } from "../../../store/store";
import { changeTaskStatus } from "../../../store/todoSlice";
import Form from "../input/Form";
import "./styles/TaskItem.scss";
import { Eye, Pencil, Trash } from "react-bootstrap-icons";
import moment from "moment";

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

  const deleteHandler = () => {
    setToDelete(true);
    setShowViewModal(!showViewModal);
  };

  const editHandler = () => {
    setOnEdit(!onEdit);
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

  if (onEdit) {
    return (
      <Form
        id={props.id}
        date={props.dueDate}
        summary={props.summary}
        completed={props.completed}
        onEdit={onEdit}
        onCancel={editHandler}
      />
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
        <Pencil className="icon" />
        <Trash className="icon" onClick={deleteHandler} type="button" />
      </div>
    </>
  );
};
export default TaskItem;
