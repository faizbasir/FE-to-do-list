import React from "react";
import { useAppSelector } from "../../../store/store";
import TaskItem from "./TaskItem";

const TaskList = () => {
  const taskList = useAppSelector((state) => state.todo);

  return (
    <>
      <div className="p-4 w-[70%] my-12 mx-auto">
        <table className="table-fixed w-full [&>tbody*:nth-child(even)]:bg-gray">
          <thead>
            <tr className="bg-secondary text-primary">
              <th className="text-left px-4 py-2">ID</th>
              <th className="text-left px-4 py-2">Summary</th>
              <th className="text-left px-4 py-2">Due Date</th>
              <th className="text-left px-4 py-2">Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {taskList.map((task) => (
              <TaskItem
                key={task.id}
                id={task.id}
                summary={task.summary}
                completed={task.completed}
                dueDate={task.dueDate}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TaskList;
