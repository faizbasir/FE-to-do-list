import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/UI/header/Header";
import TaskList from "./components/UI/content/tasks/TaskList";
import CalendarList from "./components/UI/content/calendar/CalendarList";
import "./App.scss";
import { useAppDispatch } from "./components/store/store";

const App = () => {
  const routes = (
    <Routes>
      <Route path="/" element={<TaskList />} />
      <Route path="/overview" element={<TaskList />} />
      <Route path="/calendar" element={<CalendarList />} />
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
