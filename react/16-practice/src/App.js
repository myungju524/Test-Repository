import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Community from "./MJ/Pages/Community";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="/community" element={<Community />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
