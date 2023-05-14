import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "../components/UI/header/Header";
import { BrowserRouter } from "react-router-dom";

describe("rendering overview page", () => {
  test("check title", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    expect(screen.getByRole("heading")).toHaveTextContent(/To Do List/i);
  });
});
