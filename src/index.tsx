import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";

import { createAppStore } from "./store";
import { App } from "./App";

import "./index.css";

const store = createAppStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
