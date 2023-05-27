import React, { useState } from "react";
import { PencilIcon, TrashIcon, EyeIcon } from "@heroicons/react/24/outline";
import ViewModal from "../../modal/ViewModal";
import DeleteModal from "../../modal/DeleteModal";
import { useAppDispatch } from "../../../store/store";
import { changeTaskStatus } from "../../../store/todoSlice";
import moment from "moment";
import { Portal } from "../../portal/Portal";
import Form from "../input/Form";

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
            aria-label="checkbox"
            type="checkbox"
            className="h-6 mr-4"
            onChange={checkHandler}
            checked={props.completed}
          />
          <PencilIcon
            aria-label="pencil-icon"
            className="h-5 mr-4"
            onClick={editHandler}
          />
          <TrashIcon className="h-5 mr-4" onClick={deleteHandler} />
          <EyeIcon
            onClick={viewHandler}
            aria-label="eye-icon"
            className="h-5 mr-4"
          />
        </td>
      </tr>
    </>
  );
};
export default TaskItem;
