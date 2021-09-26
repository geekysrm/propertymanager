import React from "react";
import ReactDOM from "react-dom";
import { StoreProvider } from "easy-peasy";

import reportWebVitals from "./reportWebVitals";

import App from "./App";
import { rootStore } from "./Store";

import "./index.scss";

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider store={rootStore}>
      <App />
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById("property-management-app")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();