import React from "react";
import ReactDOM from "react-dom";
import { StoreProvider } from "easy-peasy";

import App from "./App";
import { rootStore } from "./store";

import "./index.scss";

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider store={rootStore}>
      <App />
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById("property-management-app")
);
