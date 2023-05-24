import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "../components/UI/header/Header";
import Navigation from "../components/UI/header/Navigation";
import { BrowserRouter } from "react-router-dom";
import App from "../App";
import { Provider } from "react-redux";
import { store } from "../components/store/store";

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
    const component = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(component.queryAllByRole("table").length).toBe(1);
    expect(screen.getAllByRole("columnheader").length).toBe(5);
  });

  test("check form is rendered correctly", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(screen.getByLabelText("Summary")).toBeInTheDocument();
    expect(screen.getByLabelText("Date")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeDisabled();
  });
});
