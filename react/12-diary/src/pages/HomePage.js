import React, { useState } from "react";
import Header from "../components/Header";
import Button from "../components/Button";
import DiaryList from "../components/DiaryList";

function HomePage(props) {
  const [curDate, setCurDate] = useState(new Date());
  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;

  const increaseMonth = () => {
    setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() + 1));
  };

  const decreaseMonth = () => {
    setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() - 1));
  };
  return (
    <div>
      <Header
        headText={headText}
        leftChild={<Button onClick={decreaseMonth} text={"<"} />}
        rightChild={<Button onClick={increaseMonth} text={">"} />}
      />
      <DiaryList />
    </div>
  );
}

export default HomePage;
