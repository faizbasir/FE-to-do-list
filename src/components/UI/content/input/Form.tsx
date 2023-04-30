import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { addTask } from "../../../store/todoSlice";
import Input from "./Input";

const Form = () => {
  const [task, setTask] = useState<string>("");
  const [date, setDate] = useState<string>("");

  const dispatch = useAppDispatch();
  const taskList = useAppSelector((state) => state.todo);

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      addTask({
        id: taskList.length + 1,
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
      <tr className="bg-gray">
        <td></td>
        <td className="py-2">
          <Input
            type={"text"}
            value={task}
            onChange={changeHandler}
            name={"summary"}
          />
        </td>
        <td>
          <Input
            type={"date"}
            value={date}
            onChange={dateChangeHandler}
            name={"date"}
          />
        </td>
        <td></td>
        <td>
          <button
            onClick={submitHandler}
            className="bg-secondary rounded-md text-primary py-1 px-2 text-sm"
          >
            Submit
          </button>
        </td>
      </tr>
    </>
  );
};

export default Form;
