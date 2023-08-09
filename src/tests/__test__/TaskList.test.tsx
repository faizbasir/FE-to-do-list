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
  expect(taskList).toHaveLength(3);
});

// Completed task should be checked
test("check that completed task is checked", async () => {
  render(<TaskList />);

  const task = await screen.findByRole("card", { name: "1" });

  // Check that task os showing completed status
  expect(within(task).getByText(/completed/i)).toBeInTheDocument();

  // Checkbox should be checked if completed
  expect(within(task).getByRole("checkbox")).toBeChecked();
});

// pending task should be unchecked and date is not later than current date
test("check details of pending task", async () => {
  render(<TaskList />);

  const task = await screen.findByRole("card", { name: "2" });

  // Check due date of pending task
  expect(Date.parse(within(task).getByText(/2023/i).innerHTML)).toBeGreaterThan(
    Date.now()
  );

  // Pending task should be unchecked
  expect(within(task).getByRole("checkbox")).not.toBeChecked();

  // Check that task is having pending status
  expect(within(task).getByText(/pending/i)).toBeInTheDocument();
});

// Check details of overdue task
test("check that overdue task is not checked", async () => {
  render(<TaskList />);

  const task = await screen.findByRole("card", { name: "3" });

  // Task should have overdue date lesser than current date
  expect(Date.parse(within(task).getByText(/2023/i).innerHTML)).toBeLessThan(
    Date.now()
  );

  // Check that task is showing overdue status
  expect(within(task).getByText(/overdue/i)).toBeInTheDocument();

  // Checkbox should not be checked
  expect(within(task).getByRole("checkbox")).not.toBeChecked();
});
