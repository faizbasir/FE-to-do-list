// import { configureStore } from "@reduxjs/toolkit";
// import React from "react";
// import { Provider } from "react-redux";
// import App from "../App";
// import { render } from "@testing-library/react";
import configureStore from "redux-mock-store";
import { addTask, initialState } from "../components/store/todoSlice";
// import { initialState } from "../components/store/todoSlice";

const mockStore = configureStore();
// const renderWithProviders = () => {
//   render(
//     <Provider store={mockStore(initialState)}>
//       <App />
//     </Provider>
//   );
// };

describe("render overview", () => {
  test("test new user with no items", () => {
    const store = mockStore(initialState);
    store.dispatch(addTask);
    expect(store.getActions()).toEqual({ type: "unknown" });
  });
});
