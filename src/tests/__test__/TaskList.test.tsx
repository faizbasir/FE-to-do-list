import React from "react";
import TaskList from "../../components/UI/content/tasks/TaskList";
import { render, screen } from "../utils/testing-library-utils";

test("render overview", () => {
  render(<TaskList />);

  // find number of tasks being rendered
  const taskList = screen.queryAllByRole("card");
  expect(taskList).toHaveLength(0);
});
