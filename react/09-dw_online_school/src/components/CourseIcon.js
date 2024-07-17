import React from "react";
import styles from "./CourseIcon.module.css";
import cn from "classnames";
import pythonImg from "../assets/icon--python.svg";
import algorithmImg from "../assets/icon--algorithm.svg";
import automationImg from "../assets/icon--automation.svg";
import computerArchitectureImg from "../assets/icon--computer-architecture.svg";
import dataScience from "../assets/icon--data-science.svg";
import deepLearning from "../assets/icon--deep-learning.svg";
import defaultImg from "../assets/icon--default.svg";
import dsImg from "../assets/icon--ds.svg";
import djangoImg from "../assets/icon--django.svg";
import fourthRevolutionImg from "../assets/icon--fourth-revolution.svg";
import gitImg from "../assets/icon--git.svg";
import introToComputerImg from "../assets/icon--intro-to-computer.svg";
import javaImg from "../assets/icon--java.svg";
import jqueryImg from "../assets/icon--jquery.svg";
import jsImg from "../assets/icon--js.svg";
import machineLearningImg from "../assets/icon--machine-learning.svg";
import nodeJsimg from "../assets/icon--node-js.svg";
import oopImg from "../assets/icon--oop.svg";
import reactImg from "../assets/icon--react.svg";
import sqlImg from "../assets/icon--sql.svg";
import unixImg from "../assets/icon--unix.svg";
import webPublishingImg from "../assets/icon--web-publishing.svg";

const COURSE_IMAGES = [
  pythonImg,
  algorithmImg,
  automationImg,
  computerArchitectureImg,
  dataScience,
  deepLearning,
  defaultImg,
  dsImg,
  djangoImg,
  fourthRevolutionImg,
  gitImg,
  introToComputerImg,
  javaImg,
  jqueryImg,
  jsImg,
  machineLearningImg,
  nodeJsimg,
  oopImg,
  reactImg,
  sqlImg,
  unixImg,
  webPublishingImg,
];

function CourseIcon({ className, photoUrl }) {
  COURSE_IMAGES.map((img) => {
    photoUrl = img;
  });
  return <img className={cn(styles.courseIcon, className)} src={photoUrl} />;
}

export default CourseIcon;
