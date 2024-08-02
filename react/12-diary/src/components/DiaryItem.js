import React from "react";
import Button from "./Button";
import "./DiaryItem.css";
import { useNavigate } from "react-router-dom";

function DiaryItem({ date, content, emotion, id }) {
  const navigate = useNavigate();
  const goDetail = () => {
    navigate(`/diary/${id}`);
  };
  return (
    <div className="diaryItem">
      <div
        className={`emotion_img_wrapper emotion_img_wrapper_${emotion}`}
        onClick={goDetail}
      >
        <img src={`assets/emotion${emotion}.png`} />
      </div>
      <div className="info_wrapper" onClick={goDetail}>
        <div className="diary_date">{new Date(date).toLocaleDateString()}</div>
        <div className="diary_content_preview">
          {`${content.slice(0, 25)}...`}{" "}
        </div>
      </div>
      <div className="btn_wrapper">
        <Button text={"수정하기"} />
      </div>
    </div>
  );
}

export default DiaryItem;
