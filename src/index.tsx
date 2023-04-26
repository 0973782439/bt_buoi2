import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
import "../src/i18n/i18n";
const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <ToastContainer />
      <App />
    </BrowserRouter>
  </Provider>
  // </React.StrictMode>
);
reportWebVitals();
