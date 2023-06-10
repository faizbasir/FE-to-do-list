import React from "react";
import { useAppSelector } from "../../../store/store";
import TaskItem from "./TaskItem";
import "./styles/TaskList.scss";

const TaskList = () => {
  const taskList = useAppSelector((state) => state.todo);

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
        <form action="" className="row row-cols-lg-auto g-3 align-items-center">
          <div className="col-12">
            <input
              type="text"
              className="form-control"
              placeholder="Summary"
              aria-label="Summary"
            />
          </div>
          <div className="col-12">
            <input
              type="date"
              className="form-control"
              placeholder="Date"
              aria-label="Date"
            />
          </div>
          <div className="col-12">
            <button className="btn btn-primary" type="submit">
              +
            </button>
          </div>
        </form>
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
