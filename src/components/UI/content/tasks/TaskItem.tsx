import React from "react";
import { PencilIcon, TrashIcon, EyeIcon } from "@heroicons/react/24/outline";

interface Props {
  id: string;
  summary: string;
  completed: boolean;
}

const TaskItem = (props: Props) => {
  return (
    <>
      <div className="flex flex-row justify-between my-6 border border-1 border-gray rounded-lg p-4">
        <div className="flex flex-row">
          <div className="mr-4">
            <p className="text-sm">ID</p>
            <p className="text-sm">Summary</p>
          </div>
          <div>
            <p className="text-sm">{props.id}</p>
            <p className="text-sm">{props.summary}</p>
          </div>
        </div>
        <div className="flex flex-row items-center">
          {props.completed === false && (
            <>
              <input type="checkbox" className="h-6 mr-4" />
              <EyeIcon className="h-6 mr-4" />
              <PencilIcon className="h-6 mr-4" />
            </>
          )}
          <TrashIcon className="h-6 mr-4" />
        </div>
      </div>
    </>
  );
};
export default TaskItem;
