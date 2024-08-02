import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import Button from "../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import { emotionList } from "../util/emotionList";
import "./DiaryPage.css";
import { changeTitle } from "../util/chageTitle";

function DiaryPage(props) {
  const { id } = useParams();
  const diaryList = useContext(DiaryStateContext);
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    changeTitle(`감정 일기장 - ${id}번 일기`);
  }, []);

  useEffect(() => {
    if (diaryList.length > 0) {
      // targetDiary 를 찾는 방법
      // 전체 diaryList 를 확인해서 useParams 로 가져온 id와 같은 diary data를 뽑아서
      // data state 에 set 해준다.
      // filter, findIndex, find
      const targetDiary = diaryList.find((diary) => diary.id == id);

      if (targetDiary) {
        setData(targetDiary);
      } else {
        alert("없는 일기입니다.");
        navigate("/", { replace: true });
      }
    }
  }, [diaryList]);
  if (!data) {
    return <div className="diaryPage">로딩중입니다...</div>;
  } else {
    const emotionData = emotionList.find(
      (emotion) => emotion.emotion_id == data.emotion
    );

    return (
      <div className="diaryPage">
        <Header
          headText={`${new Date(data.date).toISOString().split("T")[0]} 기록`}
          leftChild={
            <Button text={"< 뒤로가기"} onClick={() => navigate(-1)} />
          }
          rightChild={
            <Button text={"수정하기"} onClick={() => navigate(`/edit/${id}`)} />
          }
        />
        <article>
          {/* 신문 or 뉴스 or 에쎄이 만드는 페이지에서 많이씀 */}
          <section>
            <h4>오늘의 감정</h4>
            <div
              className={`diary_img_wrapper diary_img_wrapper_${data.emotion} `}
            >
              <img src={`/assets/emotion${data.emotion}.png`} />
              <div className="emotion_description">
                {emotionData.emotion_description}
              </div>
            </div>
          </section>
          <section>
            <h4>오늘의 일기</h4>
            <div className="diary_content_wrapper">
              <p>{data.content}</p>
            </div>
          </section>
        </article>
      </div>
    );
  }
}

export default DiaryPage;
