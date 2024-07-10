import React, { useState } from "react";
import styles from "./New.module.css";
import { Link } from "react-router-dom";
import MBTISelect from "../components/MBTISelect";
import ColorInput from "../components/ColorInput";

function New(props) {
  const [selected, setSelected] = useState();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.headerHeading}>새 컬러 등록하기</h1>
        <Link className={styles.cancel} to="/">
          <img className={styles.cancelIcon} src="/images/x.svg" />
          {/* public 폴더 안에 있어야만 src="" 형태 가능 대신 public 폴더엔 중요한
          자료를 넣으면 안 됨 */}
        </Link>
      </header>
      <section className={styles.section}>
        <h2 className={styles.sectionHeading}>MBTI</h2>
        <MBTISelect />
      </section>
      <section className={styles.section}>
        <h2 className={styles.sectionHeading}>
          컬러
          <button className={styles.random}>
            <img className={styles.repeatIcon} src="/images/repeat.svg" />
          </button>
        </h2>
        <ColorInput />
      </section>
      <button className={styles.submit}>컬러 등록</button>
    </div>
  );
}

export default New;
