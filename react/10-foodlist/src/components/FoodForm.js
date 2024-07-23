import React, { useState } from "react";
import FileInput from "./FileInput";
import "./FoodForm.css";
import { addDatas } from "../api/firebase";

const INITIAL_VALUE = {
  title: "",
  calorie: 0,
  content: "",
  imgUrl: null,
};

function sanitize(type, value) {
  switch (type) {
    case "number":
      return Number(value) || 0;
    default:
      return value;
  }
}
function FoodForm(props) {
  const [values, setValues] = useState(INITIAL_VALUE);
  const [isSubmitting, setisSubmitting] = useState(false);

  const handleChange = (name, value) => {
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };
  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    handleChange(name, sanitize(type, value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setisSubmitting(true);
    const resultData = await addDatas("foods", values);
  };
  return (
    <form className="FoodForm" onSubmit={handleSubmit}>
      <FileInput
        name="imgUrl"
        className="FoodForm-preview"
        value={values.imgUrl}
        onChange={handleChange}
      />
      <div className="FoodForm-rows">
        <div className="FoodForm-title-calorie">
          <input
            name="title"
            className="FoodForm-title"
            type="text"
            placeholder="이름을 입력해주세요."
            onChange={handleInputChange}
            value={values.title}
          />
          <input
            name="calorie"
            className="FoodForm-calorie"
            type="number"
            value={values.calorie}
            onChange={handleInputChange}
          />

          <button
            className="FoodForm-submit-button"
            type="submit"
            disabled={isSubmitting}
          >
            확인
          </button>
        </div>
        <textarea
          className="FoodForm-content"
          placeholder="내용을 작성해 주세요."
          onChange={handleInputChange}
          name="content"
          value={values.content}
        />
      </div>
    </form>
  );
}

export default FoodForm;
