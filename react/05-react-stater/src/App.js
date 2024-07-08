import { useState } from "react";
import "./App.css";

function App() {
  const [click, setClick] = useState(0);

  const handleClick = () => {
    setClick(click + 1);
  };

  return (
    <>
      <h1>{click}</h1>
      <button onClick={handleClick}>Click me</button>
    </>
  );
}

export default App;
