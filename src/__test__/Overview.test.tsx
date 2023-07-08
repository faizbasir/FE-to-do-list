import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Header from "../components/UI/header/Header";
import Navigation from "../components/UI/header/Navigation";
import { BrowserRouter } from "react-router-dom";
// import App from "../App";
// import { Provider } from "react-redux";
// import { store } from "../components/store/store";

// const setup = () => {
//   const utils = render(
//     <Provider store={store}>
//       <App />
//     </Provider>
//   );
//   const summaryInput = screen.getByLabelText("Summary");
//   const dateInput = screen.getByLabelText("Date");

//   return { summaryInput, dateInput, ...utils };
// };

const convertHexToRGBA = (hexCode: string) => {
  let hex = hexCode.replace("#", "");

  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return { r, g, b };
};

describe("rendering header", () => {
  test("check title", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    expect(screen.getByRole("navigation")).toHaveStyle({
      backgroundColor: convertHexToRGBA("#0d6efd"),
    });
    expect(screen.getByRole("heading")).toHaveTextContent(/To Do List/i);
  });

  test("check pages header", () => {
    render(
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    );
    expect(screen.getByText(/overview$/i)).toBeInTheDocument();
    expect(screen.getByText(/overview$/i)).toHaveStyle({
      color: convertHexToRGBA("#f5f5f5"),
    });
    expect(screen.getByText(/calendar$/i)).toBeInTheDocument();
    expect(screen.getByText(/calendar$/i)).toHaveStyle({
      color: convertHexToRGBA("#f5f5f5"),
    });
  });

  test("check active link styles", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    const overviewLink = screen.getByText(/overview$/i);
    fireEvent.click(overviewLink);
    expect(screen.getByText(/overview$/i)).toHaveStyle({
      color: convertHexToRGBA("#0d6efd"),
      backgroundColor: convertHexToRGBA("#f5f5f5"),
    });
    const calendarLink = screen.getByText(/overview$/i);
    fireEvent.click(calendarLink);
    expect(screen.getByText(/calendar$/i)).toHaveStyle({
      color: convertHexToRGBA("#0d6efd"),
      backgroundColor: convertHexToRGBA("#f5f5f5"),
    });
  });
});
