import React, { useState } from "react";
import Container from "./Container";
import styles from "./ListPage.module.css";
import catalogImg from "../assets/catalog.svg";
import cn from "classnames";

function ListPage(props) {
  const className = `${styles.bg} ${
    styles.catalog ? styles.catalog : styles.community
  }`;

  return (
    <>
      <div className={className}>
        <img className={styles.icon} src={catalogImg} />
        <div className={styles.texts}>
          <h1 className={styles.heading}>모든코스</h1>
          <p className={styles.description}>
            자체 제작된 코스들로 기초를 쌓으세요.
          </p>
        </div>
      </div>
      <Container className={styles.container}></Container>
    </>
  );
}

export default ListPage;
