import React, { useEffect, useState } from "react";
import styles from "./QuestionListPage.module.css";
import ListPage from "../components/ListPage";
import { getDatas } from "../api/firebase";
import searchImg from "../assets/search.svg";
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
    </ListPage>
  );
}

export default QuestionListPage;
