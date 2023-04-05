import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { store } from "./components/store/store";
import { Provider } from "react-redux";

const rootElement = document.querySelector("#root");

if (!rootElement) {
  throw new Error("cannot find element with that id");
}

const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
