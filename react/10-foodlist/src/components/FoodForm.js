import React, { useState } from "react";
import FileInput from "./FileInput";
import "./FoodForm.css";
import { addDatas } from "../api/firebase";
import useTranslate from "../hooks/useTranslate";

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
function FoodForm({
  onSubmitSuccess,
  onCancel,
  onSubmit,
  initialPreview,
  initialValues = INITIAL_VALUE,
}) {
  const [values, setValues] = useState(initialValues);
  // initialValues의 값이 없으면 INITIAL_VALUE 객체를 넣어주기로 함
  const [isSubmitting, setIsSubmitting] = useState(false);

  const t = useTranslate();

  const handleChange = (name, value) => {
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };
  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    handleChange(name, sanitize(type, value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const resultData = await onSubmit("foods", values);
    onSubmitSuccess(resultData);

    setIsSubmitting(false);
    setValues(INITIAL_VALUE);
  };
  return (
    <form className="FoodForm" onSubmit={handleSubmit}>
      <FileInput
        name="imgUrl"
        className="FoodForm-preview"
        value={values.imgUrl}
        onChange={handleChange}
        initialPreview={initialPreview}
      />
      <div className="FoodForm-rows">
        <div className="FoodForm-title-calorie">
          <input
            name="title"
            className="FoodForm-title"
            type="text"
            placeholder={t("title placeholder")}
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

          {onCancel && (
            <button
              className="FoodForm-cancel-button"
              onClick={() => onCancel(null)}
            >
              {t("cancel button")}
            </button>
            // 수정버튼 눌렀을 때만 취소 < 버튼이 나옴.
          )}
          <button
            className="FoodForm-submit-button"
            type="submit"
            disabled={isSubmitting}
          >
            {t("confirm button")}
          </button>
        </div>
        <textarea
          className="FoodForm-content"
          placeholder={t("content placeholder")}
          onChange={handleInputChange}
          name="content"
          value={values.content}
        />
      </div>
    </form>
  );
}

export default FoodForm;
