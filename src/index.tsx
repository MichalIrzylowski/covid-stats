import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { createAppStore } from "./store";
import { App } from "./App";

import "./index.css";

const store = createAppStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
