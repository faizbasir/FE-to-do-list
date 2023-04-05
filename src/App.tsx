import React from "react";
import "./index.css";
import Header from "./components/UI/header/Header";
import Form from "./components/UI/content/input/Form";
import TaskList from "./components/UI/content/tasks/TaskList";

const App = () => {
  return (
    <>
      <Header />
      <Form />
      <TaskList />
    </>
  );
};

export default App;
