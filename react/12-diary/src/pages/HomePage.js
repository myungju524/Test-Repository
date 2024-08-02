import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import Button from "../components/Button";
import DiaryList from "../components/DiaryList";
import { DiaryStateContext } from "../App";

function HomePage(props) {
  const diaryList = useContext(DiaryStateContext);
  const [curDate, setCurDate] = useState(new Date());
  const [sortedItem, setSortedItem] = useState([]);
  // 정렬하고 나온 아이템을 배열로 담으려고 만든 state.

  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;

  const increaseMonth = () => {
    setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() + 1));
  };

  const decreaseMonth = () => {
    setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() - 1));
  };
  useEffect(() => {
    // 날짜 월에 맞는 데이터들만 가져오게 하기
    // 1. curDate 를 활용하여 firstDay와 lastDay를 만들어준다.
    // new Date(2024,8 ,1 ,시 ,분);
    // 2. firstDay와 lastDay를 밀리세컨즈 형태로 변환.
    const firstDay = new Date(
      curDate.getFullYear(),
      curDate.getMonth(),
      1
    ).getTime();
    const lastDay = new Date(
      curDate.getFullYear(),
      curDate.getMonth() + 1,
      0,
      23,
      59,
      59
    );
    // diaryList 에서 date 필드가 firstDay와 lastDay 사이에 있는 원소들만 뽑아서
    // 새로운 배열을 만든다.
    const newItem = diaryList.filter(
      (diary) => diary.date >= firstDay && diary.date <= lastDay
    );
    // sertSortedItem 함수 사용
    setSortedItem(newItem);
  }, [curDate, diaryList]);

  return (
    <div>
      <Header
        headText={headText}
        leftChild={<Button onClick={decreaseMonth} text={"<"} />}
        rightChild={<Button onClick={increaseMonth} text={">"} />}
      />
      <DiaryList diaryList={sortedItem} />
    </div>
  );
}

export default HomePage;
