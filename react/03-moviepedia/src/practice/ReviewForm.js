import React from "react";
import FileInput from "./FileInput";
import RatingInput from "./RatingInput";

function ReviewForm(props) {
  return (
    <form className="ReviewForm">
      <FileInput />
      <input type="text" placeholder="제목을 입력해주세요." />
      <RatingInput />
    </form>
  );
}

export default ReviewForm;
