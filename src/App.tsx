import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Header from "./components/UI/header/Header";
import TaskList from "./components/UI/content/tasks/TaskList";

const App = () => {
  const routes = (
    <Routes>
      <Route path="/" element={<TaskList />} />
      <Route path="/overview" element={<TaskList />} />
    </Routes>
  );

  return (
    <>
      <BrowserRouter>
        <Header />
        <main>{routes}</main>
      </BrowserRouter>
    </>
  );
};

export default App;
