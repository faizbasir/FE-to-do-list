import React from "react";
import { render, screen } from "../utils/testing-library-utils";
import TaskList from "../../components/UI/content/tasks/TaskList";
import userEvent from "@testing-library/user-event";

test("Create new task", async () => {
  render(<TaskList />);

  const user = userEvent.setup();

  const taskList = await screen.findAllByRole("card");
  expect(taskList).toHaveLength(3);

  const summaryInput = screen.getByLabelText(/summary/i);
  const dateInput = screen.getByLabelText(/date/i);

  await user.type(summaryInput, "Pay bills");
  await user.type(dateInput, "2023-08-09");

  await user.click(screen.getByRole("button"));

  expect(summaryInput).toHaveValue("");
  expect(dateInput).toHaveValue("");
  expect(screen.getByRole("button")).toBeDisabled();
});
