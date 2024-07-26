import React from "react";
import "./FoodForm.css";
import FileInput from "./FileInput";

function FoodForm(props) {
  return (
    <form className="FoodForm">
      <FileInput />
      <div className="FoodForm-rows">
        <div className="FoodForm-title-calorie">
          <input
            className="FoodForm-title"
            placeholder="제목을 입력해주세요."
          />
          <input className="FoodForm-calorie" />
          <button className="FoodForm-submit-button">확인</button>
        </div>
        <textarea
          className="FoodForm-content"
          placeholder="내용을 입력해주세요."
        />
      </div>
    </form>
  );
}

export default FoodForm;
