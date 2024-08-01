import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";

import { LocaleProvider } from "./contexts/LocaleContext";
// import App from "./Prac/components/App"

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <LocaleProvider defaultValue="ko">
    <App />
  </LocaleProvider>
);