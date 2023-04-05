import React from "react";
import { useAppSelector } from "../../../store/store";
import TaskItem from "./TaskItem";

const TaskList = () => {
  const taskList = useAppSelector((state) => state.todo);

  let pendingItems = taskList.filter((task) => task.completed === false);

  let completedItems = taskList.filter((task) => task.completed === true);

  return (
    <>
      <div className="w-[70%] mx-auto my-8">
        <p>Pending Items</p>
        {pendingItems.map((task) => (
          <TaskItem
            id={task.id}
            summary={task.summary}
            completed={task.completed}
            key={task.id}
          />
        ))}
        <p>Completed Items</p>
        {completedItems.map((task) => (
          <TaskItem
            id={task.id}
            summary={task.summary}
            completed={task.completed}
            key={task.id}
          />
        ))}
      </div>
    </>
  );
};

export default TaskList;
