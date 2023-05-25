import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Header from "../components/UI/header/Header";
import Navigation from "../components/UI/header/Navigation";
import { BrowserRouter } from "react-router-dom";
import App from "../App";
import { Provider } from "react-redux";
import { store } from "../components/store/store";

const setup = () => {
  const utils = render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const summaryInput = screen.getByLabelText("Summary");
  const dateInput = screen.getByLabelText("Date");

  return { summaryInput, dateInput, ...utils };
};

describe("rendering overview page", () => {
  test("check pages header", () => {
    render(
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    );
    expect(screen.getByText(/overview$/i)).toBeInTheDocument();
    expect(screen.getByText(/calendar$/i)).toBeInTheDocument();
  });

  test("check title", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    expect(screen.getByRole("heading")).toHaveTextContent(/To Do List/i);
  });

  test("check table rendered", () => {
    const component = setup();
    expect(component.queryAllByRole("table").length).toBe(1);
    expect(screen.getAllByRole("columnheader").length).toBe(5);
  });

  test("check form is rendered correctly", () => {
    const { summaryInput, dateInput } = setup();
    expect(summaryInput).toBeInTheDocument();
    expect(dateInput).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeDisabled();
  });
});

describe("Create new entry", () => {
  test("expect input fields to be empty initially", () => {
    const { summaryInput, dateInput } = setup();
    expect(summaryInput).toHaveValue("");
    expect(dateInput).toHaveValue("");
    expect(screen.getByRole("button")).toBeDisabled();
  });

  test("create new entry and validate", () => {
    const { summaryInput, dateInput } = setup();
    fireEvent.change(summaryInput, { target: { value: "Take out garbage" } });
    fireEvent.change(dateInput, { target: { value: "2023-05-12" } });
    expect(summaryInput).toHaveValue("Take out garbage");
    expect(dateInput).toHaveValue("2023-05-12");
    expect(screen.getByRole("button")).toBeEnabled();
    fireEvent.click(screen.getByRole("button"));
    expect(dateInput).toHaveValue("");
    expect(summaryInput).toHaveValue("");
    expect(screen.getByRole("button")).toBeDisabled();
  });
});

//continue with validate new entry
