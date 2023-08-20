import React from "react";
import { fireEvent, render, screen } from "../utils/testing-library-utils";
import EntryForm from "../../components/UI/content/input/EntryForm";
import userEvent from "@testing-library/user-event";
import { c } from "msw/lib/glossary-de6278a9";

test("Form should be rendered with button disabled", () => {
  render(<EntryForm />);

  const summaryInput = screen.getByLabelText(/summary/i);
  const dateInput = screen.getByLabelText(/date/i);

  expect(summaryInput).toBeInTheDocument();
  expect(summaryInput).toHaveValue("");

  expect(dateInput).toBeInTheDocument();
  expect(dateInput).toHaveValue("");
  expect(screen.getByRole("button")).toBeDisabled();
});

test("Enter input and values should persist", async () => {
  render(<EntryForm />);
  const user = userEvent.setup();

  const summaryInput = screen.getByLabelText(/summary/i);
  const dateInput = screen.getByLabelText(/date/i);

  await user.type(summaryInput, "Pay bills");
  await user.type(dateInput, "2023-08-09");

  expect(summaryInput).toHaveValue("Pay bills");
  expect(dateInput).toHaveValue("2023-08-09");
  expect(screen.getByRole("button")).not.toBeDisabled();
});

test("summary error messages", async () => {
  render(<EntryForm />);

  const user = userEvent.setup();

  const summaryInput = screen.getByLabelText(/summary/i);

  await user.type(summaryInput, "Pay");
  fireEvent.blur(summaryInput);

  expect(screen.getByText("Please enter a valid summary")).toBeInTheDocument();
  expect(screen.getByRole("button")).toBeDisabled();
});

test("date input error messages", async () => {
  render(<EntryForm />);

  const user = userEvent.setup();

  const dateInput = screen.getByLabelText(/date/i);

  await user.type(dateInput, "2023-09-09");
  await user.clear(dateInput);

  fireEvent.blur(dateInput);

  expect(screen.getByText("Please enter a valid date"));
  expect(screen.getByRole("button")).toBeDisabled();
});

test("Form should be empty after submitting", async () => {
  render(<EntryForm />);

  const user = userEvent.setup();

  const summaryInput = screen.getByLabelText(/summary/i);
  const dateInput = screen.getByLabelText(/date/i);

  await user.type(summaryInput, "Pay bills");
  await user.type(dateInput, "2023-08-09");

  await user.click(screen.getByRole("button"));

  expect(summaryInput).toHaveValue("");
  expect(dateInput).toHaveValue("");
  expect(screen.getByRole("button")).toBeDisabled();
});
