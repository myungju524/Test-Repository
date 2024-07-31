import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/">
            <Route index element={<HomePage />} />
            {/* <Route path="new" />/ */}
            {/* <Route path="edit" /> */}
            {/* <Route path="diary" /> */}
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
