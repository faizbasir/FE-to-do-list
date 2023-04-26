import React from "react";
import "./index.css";
import Header from "./components/UI/header/Header";
import TaskList from "./components/UI/content/tasks/TaskList";

const App = () => {
  return (
    <>
      <Header />
      <TaskList />
    </>
  );
};

export default App;
