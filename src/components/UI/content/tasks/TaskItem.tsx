import React, { useState } from "react";
import { PencilIcon, TrashIcon, EyeIcon } from "@heroicons/react/24/outline";
import { useAppDispatch } from "../../../store/store";
import { deleteTask } from "../../../store/todoSlice";
import ViewModal from "../../modal/ViewModal";

interface Props {
  id: string;
  summary: string;
  completed: boolean;
  dueDate: string;
}

const TaskItem = (props: Props) => {
  const dispatch = useAppDispatch();
  const [showViewModal, setShowViewModal] = useState(false);

  const deleteHandler = () => {
    dispatch(deleteTask(props.id));
  };

  const editHandler = () => {};

  const viewHandler = () => {
    setShowViewModal(!showViewModal);
  };

  return (
    <>
      {showViewModal && (
        <ViewModal
          header={"Header here"}
          id={props.id}
          summary={props.summary}
          completed={props.completed}
          dueDate={props.dueDate}
          onCancel={viewHandler}
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
