import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./css/Style.scss";
import { AppProvider } from "./context.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <AppProvider>
      <App />
    </AppProvider>
  </>
);
