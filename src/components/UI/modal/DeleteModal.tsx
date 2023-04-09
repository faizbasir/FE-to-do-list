import React from "react";
import { useAppDispatch } from "../../store/store";
import { deleteTask } from "../../store/todoSlice";

interface Props {
  id: string;
  summary: string;
  dueDate: string;
  completed: boolean;
  onCancel: () => void;
}

const DeleteModal = (props: Props) => {
  const dispatch = useAppDispatch();
  const deleteHandler = () => {
    dispatch(deleteTask(props.id));
  };

  return (
    <>
      <div className="fixed inset-0 backdrop-blur-md">
        <div className="w-[30%] mx-auto mt-24 bg-secondary rounded-lg py-4">
          <header className="text-center text-primary">
            Are you sure you want to delete?
          </header>
          <div className="flex flex-row justify-center mt-4">
            <div className="pr-4">
              <p className="mt-2 text-primary text-sm">ID</p>
              <p className="mt-2 text-primary text-sm">Summary</p>
              <p className="mt-2 text-primary text-sm">Due Date</p>
              <p className="mt-2 text-primary text-sm">Completed</p>
            </div>
            <div className="pl-4">
              <p className="mt-2 text-primary text-sm">{props.id}</p>
              <p className="mt-2 text-primary text-sm">{props.summary}</p>
              <p className="mt-2 text-primary text-sm">{props.dueDate}</p>
              <p className="mt-2 text-primary text-sm">
                {String(props.completed)}
              </p>
            </div>
          </div>
          <footer className="flex justify-center mt-4">
            <button
              className="mr-4 bg-red rounded-lg px-2 py-1 hover:bg-darkred text-primary"
              onClick={deleteHandler}
            >
              Delete
            </button>
            <button
              className="ml-4 bg-gray rounded-lg px-2 py-1 hover:bg-darkgray"
              onClick={props.onCancel}
            >
              Cancel
            </button>
          </footer>
        </div>
      </div>
    </>
  );
};

export default DeleteModal;
