import { render } from "@testing-library/react";
import React, { PropsWithChildren } from "react";
import { store } from "../../components/store/store";
import { Provider } from "react-redux";

function wrappedRender(ui: React.ReactElement) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }

  render(ui, { wrapper: Wrapper });
}

// re-export everything
export * from "@testing-library/react";
// override render method
export { wrappedRender as render };
