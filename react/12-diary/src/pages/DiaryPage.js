import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import Button from "../components/Button";
import { useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";

function DiaryPage(props) {
  const { id } = useParams();
  const diaryList = useContext(DiaryStateContext);
  const [date, setDate] = useState();

  useEffect(() => {
    // targetDiary 를 찾는 방법
    // 전체 diartList 를 확인해서 useParams로 가져온 id와 같은 diary data를 뽑아서
    // data state에 set 해준다.
    // filter, findIndex, find

    const targetDiary = diaryList.find((diary) => {
      return diary.id == id;
    });
    setDate(targetDiary);
  }, [diaryList]);
  return (
    <div className="diaryPage">
      <Header
        headText={"2024-08-01"}
        leftChild={<Button text={"< 뒤로가기"} />}
        rightChild={<Button text={"수정하기"} />}
      />
      <article>
        {/* 신문 or 뉴스 or 에쎄이 만드는 페이지에서 많이씀 */}
        <section>
          <h4>오늘의 감정</h4>
          <div className="diary_img_wrapper">
            <img src="/assets/emotion1.png" />
            <div className="emtion_description">{"완전 좋음"}</div>
          </div>
        </section>
        <section>
          <h4>오늘의 일기</h4>
          <div className="diary_content_wrapper">
            <p>{"일기 내용"}</p>
          </div>
        </section>
      </article>
    </div>
  );
}

export default DiaryPage;
