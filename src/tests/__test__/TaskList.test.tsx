import React from "react";
import TaskList from "../../components/UI/content/tasks/TaskList";
import { render, screen } from "../utils/testing-library-utils";

describe("render overview", () => {
  render(<TaskList />);

  // find number of tasks being rendered
  const taskList = screen.getAllByRole("card");
  expect(taskList).toHaveLength(1);
});
