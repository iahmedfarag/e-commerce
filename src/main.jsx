import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./css/Style.scss";
import { AppProvider } from "./context.jsx";
import { ToastContainer, toast } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <AppProvider>
      <ToastContainer />
      <App />
    </AppProvider>
  </>
);
