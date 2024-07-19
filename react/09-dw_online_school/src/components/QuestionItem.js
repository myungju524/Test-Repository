import React from "react";
import Card from "./Card";
import styles from "./QuestionItem.module.css";
import userImg from "../assets/person.png";

function QuestionItem({ question }) {
  const { title, createdAt, answer } = question;

  return (
    <Card>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>

        <p className={styles.createdAt}>{createdAt}</p>
      </div>
    </Card>
  );
}

export default QuestionItem;
