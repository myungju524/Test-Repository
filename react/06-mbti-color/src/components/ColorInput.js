import React, { useState } from "react";
import styles from "./ColorInput.module.css";

function ColorInput({ colorCodeValue, handleChange }) {
  const onChange = (e) => {
    handleChange(e.target.value);
  };

  const isValidColorCode = (colorCodeValue) => {
    // 컬러코드가 정확한 코드인지 확인해야함

    // 첫자리 #, 뒤에 여섯자리는 영소문자 a-f, 영대문자 A-F, 숫자 0-9
    // 정규식 슬래쉬 사이에 ^ : 시작을 알림 끝 : $
    const regxp = /^#[a-fA-F0-9]{6}$/;
    return regxp.test(colorCodeValue);
    // test()함수 정규식 쓸 때 사용
  };
  const handleBlur = () => {
    if (!isValidColorCode(colorCodeValue)) {
      // 잘못된 코드를 입력했을 때
      alert(
        "컬러코드는 '#'과 함께 영소문자 a-f, 영대문자A_F, 숫자 0-9를 조합한 일곱자리를 입력하세요."
      );
      handleChange("#000000");
    }
  };
  return (
    <div className={styles.colorInputContainer}>
      <input
        className={styles.colorInput}
        value={colorCodeValue}
        maxLength={7}
        onChange={onChange}
        onBlur={handleBlur}
      />
      <span
        className={styles.colorInputChip}
        style={{ backgroundColor: colorCodeValue }}
      ></span>
    </div>
  );
}

export default ColorInput;
