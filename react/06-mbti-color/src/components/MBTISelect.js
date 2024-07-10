import React, { useState } from "react";
import styles from "./MBTISelect.module.css";

const mbtiArr = [
  { mbti: "E", desc: "외향형", groupNum: 0 },
  { mbti: "I", desc: "내향형", groupNum: 0 },
  { mbti: "S", desc: "감각형", groupNum: 1 },
  { mbti: "N", desc: "직관형", groupNum: 1 },
  { mbti: "F", desc: "감정형", groupNum: 2 },
  { mbti: "T", desc: "사고형", groupNum: 2 },
  { mbti: "P", desc: "인식형", groupNum: 3 },
  { mbti: "J", desc: "판단형", groupNum: 3 },
];

function MBTIOption({ option, selected }) {
  const { mbti, desc } = option;

  const className = `${styles.mbtiOption} ${selected ? styles.selected : ""}`;

  return (
    <div className={className}>
      <span className={styles.mbtiChar}>{mbti}</span>
      {desc}
    </div>
  );
}

function MBTISelect({ mbtiValue, handleChange }) {
  return (
    <div className={styles.mbtiOptions}>
      {mbtiArr.map((option, idx) => {
        return (
          <MBTIOption
            key={idx}
            option={option}
            selected={mbtiValue[option.groupNum] == option.mbti}
          />
        );
      })}
    </div>
  );
}

export default MBTISelect;
