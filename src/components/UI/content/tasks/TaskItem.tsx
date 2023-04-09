import React, { useState } from "react";
import { PencilIcon, TrashIcon, EyeIcon } from "@heroicons/react/24/outline";
import ViewModal from "../../modal/ViewModal";
import EditModal from "../../modal/EditModal";
import DeleteModal from "../../modal/DeleteModal";

interface Props {
  id: string;
  summary: string;
  completed: boolean;
  dueDate: string;
}

const TaskItem = (props: Props) => {
  const [showViewModal, setShowViewModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const deleteHandler = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  const editHandler = () => {
    setShowEditModal(!showEditModal);
  };

  const viewHandler = () => {
    setShowViewModal(!showViewModal);
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
      <div className="flex flex-row justify-between my-6 border border-1 border-gray rounded-lg p-4">
        <p className="text-sm">{props.summary}</p>
        <div className="flex flex-row items-center">
          {props.completed === false && (
            <>
              <input type="checkbox" className="h-6 mr-4" />

              <PencilIcon
                className="h-6 mr-4 cursor-pointer"
                onClick={editHandler}
              />
            </>
          )}
          <EyeIcon className="h-6 mr-4 cursor-pointer" onClick={viewHandler} />
          <TrashIcon
            className="h-6 mr-4 cursor-pointer"
            onClick={deleteHandler}
          />
        </div>
      </div>
    </>
  );
};
export default TaskItem;
