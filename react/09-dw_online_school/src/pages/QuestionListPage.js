import React, { useEffect, useState } from "react";
import styles from "./QuestionListPage.module.css";
import ListPage from "../components/ListPage";
import { getDatas } from "../api/firebase";
import searchImg from "../assets/search.svg";
import QuestionItem from "../components/QuestionItem";
let listItetms;

function QuestionListPage(props) {
  const [items, setItems] = useState([]);

  const handleLoad = async () => {
    const resultData = await getDatas("questions");
    listItetms = resultData;
    console.log(resultData);
    setItems(resultData);
  };
  useEffect(() => {
    handleLoad();
  }, []);
  return (
    <ListPage variant="community">
      <form className={styles.form}>
        <input placeholder="검색으로 질문 찾기" />
        <button>
          <img src={searchImg} />
        </button>
      </form>
      <p className={styles.count}>총 {items.length}개 질문</p>
      <div className={styles.questionList}>
        {items.map((question) => {
          return <QuestionItem key={question.docId} question={question} />;
        })}
      </div>
    </ListPage>
  );
}

export default QuestionListPage;
