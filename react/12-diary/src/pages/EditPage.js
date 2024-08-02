import React, { useContext, useEffect, useState } from "react";
import DiaryEditor from "../components/DiaryEditor";
import { DiaryStateContext } from "../App";
import { useNavigate, useParams } from "react-router-dom";
import { changeTitle } from "../util/chageTitle";

function EditPage(props) {
  const { id } = useParams();
  const diaryList = useContext(DiaryStateContext);
  const [list, setList] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    changeTitle(`감정 일기장 = ${id}번 일기 수정`);
  }, []);
  useEffect(() => {
    if (diaryList.length > 0) {
      const targetDiary = diaryList.find((diary) => {
        return diary.id == id;
      });
      if (targetDiary) {
        setList(targetDiary);
      } else {
        alert("잘못된 접근입니다.");
        navigate("/", { replace: true });
      }
    }
  }, [diaryList]);
  if (!list) {
    return <div className="diaryPage">로딩중입니다...</div>;
  }
  return <div>{list && <DiaryEditor originData={list} isEdit={true} />}</div>;
}

export default EditPage;
