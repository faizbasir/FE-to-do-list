import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../../store/store";
import TaskItem from "./TaskItem";
import "./styles/TaskList.scss";
import EntryForm from "../input/EntryForm";
import { fetchTasks } from "../../../store/todoSlice";

const TaskList = () => {
  const taskList = useAppSelector((state) => state.todo.tasks);
  const appDispatch = useAppDispatch();

  useEffect(() => {
    appDispatch(fetchTasks());
  }, []);

  const content = taskList.map((item) => (
    <TaskItem
      key={item.id}
      id={item.id}
      summary={item.summary}
      dueDate={item.dueDate}
      completed={item.completed}
    />
  ));

  return (
    <>
      <div className="form">
        <EntryForm />
      </div>
      <div className="card d-flex flex-row">
        <div className="card-body id-column">ID</div>
        <div className="card-body">Summary</div>
        <div className="card-body">Due Date</div>
        <div className="card-body">Status</div>
        <div className="card-body"></div>
      </div>
      {content}
    </>
  );
};

export default TaskList;
