import React from "react";
import "./index.css";
import * as serviceWorker from "./serviceWorker";

import { render } from "react-dom";
import { Provider } from "react-redux";

import { createStore } from "redux";
import tableReducer from "./redux/reducers/tableReducer";
import App from "./App";

const store = createStore(tableReducer);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
