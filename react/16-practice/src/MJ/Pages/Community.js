import React from "react";
import styles from "./Community.module.scss";

function Community() {
  return (
    <div className={styles.container}>
      <h1>FarmFore 게시판</h1>
      <ul>
        <li>공지 숨기기</li>
        <li>새글 구독</li>
        <li>새글 구독</li>
      </ul>
    </div>
  );
}

export default Community;
