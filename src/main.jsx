import React from "react";
import ReactDOM from "react-dom/client";
import { JournalApp } from "./JournalApp";
import "./assets/css/index.css";
import { BrowserRouter } from "react-router-dom";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <JournalApp />
    </BrowserRouter>
  </React.StrictMode>
);
