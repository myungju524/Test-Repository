import React from "react";
import Card from "./Card";
import CourseIcon from "./CourseIcon";
import { Link } from "react-router-dom";
import styles from "./CourseItem.module.css";

function CourseItem({ item }) {
  return (
    <Card className={styles.courseItem}>
      <div className={styles.thumb}>
        <CourseIcon />
      </div>
      <div className={styles.content}>
        <h2 className={styles.title}>
          <Link>{item.title}</Link>
        </h2>
        <p className={styles.description}>{item.summary}</p>
        <div>
          <ul className={styles.tags}>
            <li>{item.language}</li>
            <li>{item.difficulty}</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

export default CourseItem;
