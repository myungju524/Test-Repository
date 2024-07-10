import React from "react";
import styles from "./ColorSurvey.module.css";

function ColorSurvey({ item }) {
  // {}를 안 쓰고 쓰면 원래 (props) 일 때
  // const item =props.item
  // const {item} = props
  const { id, mbti, colorCode } = item;
  return (
    <div className={styles.colorSurvey}>
      <div className={styles.id}>{id}</div>
      <div className={styles.mbti}>{mbti}</div>
      <div className={styles.arrow}>
        <img className={styles.arrowIcon} src="/images/arrow.svg" />
      </div>
      <div
        className={styles.colorChip}
        style={{ backgroundColor: colorCode }}
      ></div>
      <div className={styles.colorCode}>{colorCode}</div>
    </div>
  );
}

export default ColorSurvey;
