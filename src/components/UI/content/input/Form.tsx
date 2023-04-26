import React, { useState } from "react";
import { useAppDispatch } from "../../../store/store";
import { addTask } from "../../../store/todoSlice";

const Form = () => {
  const [task, setTask] = useState<string>("");
  const [date, setDate] = useState<string>("");

  const dispatch = useAppDispatch();

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      addTask({
        id: 7,
        completed: false,
        dueDate: date,
        summary: task,
      })
    );
    setTask("");
    setDate("");
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask(e.currentTarget.value);
  };

  const dateChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.currentTarget.value);
  };

  return (
    <>
      <form
        onSubmit={submitHandler}
        className="mt-12 w-[50%] py-4 px-24 flex flex-col"
      >
        <p className=" mt-2">Task</p>
        <input
          type="text"
          className="bg-secondary px-2 py-1 rounded-lg text-primary w-[50%] mt-2 text-sm"
          onChange={changeHandler}
          value={task}
        />
        <p className=" mt-4">Due Date</p>
        <input
          type="date"
          className="bg-secondary px-2 py-1 rounded-lg text-primary w-[50%] mt-2 text-sm"
          onChange={dateChangeHandler}
          value={date}
        />
        <button
          type="submit"
          className="bg-gray px-2 py-1 rounded-lg hover:bg-darkgray w-fit mt-4 text-sm"
        >
          Create new task
        </button>
      </form>
    </>
  );
};

export default Form;
