import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [click, setClick] = useState(0);
  const [inputchange, setInputChange] = useState("");

  // console.log("App 컴포넌트 렌더링");
  const handleClick = () => {
    setClick(click + 1);
  };

  const handleChange = (e) => {
    setInputChange(e.target.value);
  };
  useEffect(() => {
    console.log("나는 화면이 최초 렌더링 될 때 실행되는 uef야");
  }, []);
  // [] (디펜던시 리스트) 안에는 react 가 무엇을 지켜볼 지 작성해준다.
  useEffect(() => {
    console.log("나는 click,inputchange 가 변경될 때 실행되는 uef야");
  }, [click, inputchange]);

  // 화면을 최초 렌더링 할 때 무한루프가 되지 않게 uef 안에서 실행시킨다.
  //

  return (
    <>
      <input type="text" placeholder="Search here" onChange={handleChange} />
      <h2>입력한 값 :{inputchange} </h2>
      <h1>{click}</h1>
      <button onClick={handleClick}>Click me</button>
    </>
  );
}

export default App;
