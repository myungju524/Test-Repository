import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Home from "./pages/Home";
// import New from "./pages/New";
import HomePrac from "./practice/pages/HomePrac";
import NewPrac from "./practice/pages/NewPrac";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<HomePrac />} />
          <Route path="newPrac" element={<NewPrac />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
// App 컴포넌트는 라우팅 역할만 함 (페이지 전환)
export default App;
