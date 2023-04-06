import React from "react";
import "./index.css";
import Header from "./components/UI/header/Header";
import Form from "./components/UI/content/input/Form";
import TaskList from "./components/UI/content/tasks/TaskList";

const App = () => {
  return (
    <>
      <Header />
      <div className="flex flex-row px-4">
        <Form />
        <TaskList />
      </div>
    </>
  );
};

export default App;
