import React from "react";
import { useAppSelector } from "../../../store/store";
import TaskItem from "./TaskItem";

const TaskList = () => {
  const taskList = useAppSelector((state) => state.todo);

  let pendingItems = taskList.filter((task) => task.completed === false);

  let completedItems = taskList.filter((task) => task.completed === true);

  return (
    <>
      <div className="p-4 w-[50%] my-12">
        <p className="mt-2">Pending Items</p>
        {pendingItems.map((task) => (
          <TaskItem
            id={task.id}
            summary={task.summary}
            completed={task.completed}
            key={task.id}
            dueDate={task.dueDate}
          />
        ))}
        <p>Completed Items</p>
        {completedItems.map((task) => (
          <TaskItem
            id={task.id}
            summary={task.summary}
            completed={task.completed}
            key={task.id}
            dueDate={task.dueDate}
          />
        ))}
      </div>
    </>
  );
};

export default TaskList;
