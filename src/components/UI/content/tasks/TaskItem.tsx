import React, { useState } from "react";
import { PencilIcon, TrashIcon, EyeIcon } from "@heroicons/react/24/outline";
import ViewModal from "../../modal/ViewModal";
import EditModal from "../../modal/EditModal";
import DeleteModal from "../../modal/DeleteModal";
import { useAppDispatch } from "../../../store/store";
import { changeTaskStatus } from "../../../store/todoSlice";

interface Props {
  id: number;
  summary: string;
  completed: boolean;
  dueDate: string;
}

const TaskItem = (props: Props) => {
  const dispatch = useAppDispatch();
  const [showViewModal, setShowViewModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [taskStatus, setTaskStatus] = useState<boolean>(props.completed);

  const deleteHandler = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  const editHandler = () => {
    setShowEditModal(!showEditModal);
  };

  const viewHandler = () => {
    setShowViewModal(!showViewModal);
  };

  const checkHandler = () => {
    setTaskStatus(!taskStatus);
    dispatch(changeTaskStatus(props.id));
  };

  return (
    <>
      {showViewModal && (
        <ViewModal
          header={"Review Task"}
          id={props.id}
          summary={props.summary}
          completed={props.completed}
          dueDate={props.dueDate}
          onCancel={viewHandler}
        />
      )}
      {showEditModal && (
        <EditModal
          onCancel={editHandler}
          summary={props.summary}
          dueDate={props.dueDate}
          id={props.id}
          completed={props.completed}
        />
      )}
      {showDeleteModal && (
        <DeleteModal
          id={props.id}
          summary={props.summary}
          dueDate={props.dueDate}
          completed={props.completed}
          onCancel={deleteHandler}
        />
      )}
      <tr className={`${props.completed ? "bg-green" : "even:bg-gray"}`}>
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
          <PencilIcon className="h-5 mr-4" />
          <TrashIcon className="h-5 mr-4" onClick={deleteHandler} />
          <EyeIcon onClick={viewHandler} className="h-5 mr-4" />
        </td>
      </tr>
    </>
  );
};
export default TaskItem;
