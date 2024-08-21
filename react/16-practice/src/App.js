import { useEffect, useState } from "react";
import "./App.css";
import mockData from "./MJ/koreancowDate.json";

function App() {
  const [data, setData] = useState();
  useEffect(() => {
    setData(mockData);
  }, []);
  return (
    <div className="App">
      <h1>{data ? JSON.stringify(data) : "Loading..."}</h1>
    </div>
  );
}

export default App;
