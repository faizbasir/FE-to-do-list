import React from "react";
import TaskList from "../../components/UI/content/tasks/TaskList";
import { render, screen, within } from "../utils/testing-library-utils";

test("render overview", () => {
  render(<TaskList />);

  // find number of tasks being rendered
  const taskList = screen.queryAllByRole("card");
  expect(taskList).toHaveLength(0);
});

test("render initial task list", async () => {
  render(<TaskList />);

  // number of tasks rendered should be 2
  const taskList = await screen.findAllByRole("card");
  expect(taskList).toHaveLength(2);
});

test("check that completed task is checked", async () => {
  render(<TaskList />);

  const task = await screen.getByRole("card", { name: "1" });
  expect(within(task).getByText(/completed/i)).toBeInTheDocument();
  expect(within(task).getByRole("checkbox")).toBeChecked();
});

test("check that pending task is unchecked", async () => {
  render(<TaskList />);

  const task = await screen.findByRole("card", { name: "2" });
  expect(within(task).getByRole("checkbox")).not.toBeChecked();
  expect(within(task).getByText(/pending/i)).toBeInTheDocument();
});
