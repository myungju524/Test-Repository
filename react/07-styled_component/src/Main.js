import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./components/App";
import HelloStyled from "./components/01/HelloStyled";

function Main(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="01" element={<HelloStyled />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
