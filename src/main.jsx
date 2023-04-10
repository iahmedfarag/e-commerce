import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "./css/Style.scss";
import { AppProvider } from "./context.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <AppProvider>
      <App />
    </AppProvider>
  </>
);
