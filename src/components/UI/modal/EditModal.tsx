import React, { useState } from "react";
import { useAppDispatch } from "../../store/store";
import { editTask } from "../../store/todoSlice";

interface Props {
  onCancel: () => void;
  summary: string;
  dueDate: string;
  id: number;
  completed: boolean;
}

const EditModal = (props: Props) => {
  const dispatch = useAppDispatch();
  const [task, setTask] = useState<string>(props.summary);
  const [date, setDate] = useState<string>(props.dueDate);

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      editTask({
        id: props.id,
        summary: task,
        dueDate: date,
        completed: props.completed,
      })
    );
    props.onCancel();
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask(e.currentTarget.value);
  };

  const dateChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.currentTarget.value);
  };

  return (
    <>
      <div className="fixed inset-0 backdrop-blur-md">
        <div className="mt-24 w-[30%] py-4 px-24 mx-auto bg-secondary rounded-lg">
          <h1 className="w-fit mx-auto mb-4 text-primary">Update Task</h1>
          <form onSubmit={submitHandler} className="flex flex-col">
            <p className=" mt-2 w-[80%] mx-auto text-primary">Task</p>
            <input
              type="text"
              className="bg-primary px-2 py-1 rounded-lg w-[80%] mt-2 text-sm mx-auto"
              onChange={changeHandler}
              value={task}
            />
            <p className=" mt-4 w-[80%] mx-auto text-primary">Due Date</p>
            <input
              type="date"
              className="bg-primary px-2 py-1 rounded-lg w-[80%] mt-2 text-sm mx-auto"
              onChange={dateChangeHandler}
              value={date}
            />
            <div className="w-[80%] mx-auto mt-4">
              <button
                type="submit"
                className="bg-primary px-2 py-1 rounded-lg hover:bg-gray w-fit mt-4 text-sm mr-4"
              >
                Update Task
              </button>
              <button
                onClick={props.onCancel}
                className="bg-gray px-2 py-1 rounded-lg hover:bg-darkgray w-fit mt-4 text-sm mr-4"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditModal;
