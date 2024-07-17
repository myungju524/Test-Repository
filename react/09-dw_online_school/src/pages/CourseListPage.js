import React, { useEffect, useState } from "react";
import ListPage from "../components/ListPage";
import searchImg from "../assets/search.svg";
import styles from "./CourseListPage.module.css";
import CourseItem from "../components/CourseItem";
import { getDatas } from "../api/firebase";

function CourseListPage(props) {
  const [items, setItems] = useState([]);
  // map 함수를 쓸 땐 초기값을 배열로 선언해줘야 함

  const handleLoad = async () => {
    // 파이어베이스의 courses 컬렉션의 데이터를 가져온다.
    const resultData = await getDatas("courses");

    //가져온 데이터 콘솔로 확인
    console.log(resultData);
    // items state에 set 해준다.
    setItems(resultData);
  };
  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <ListPage variant="catalog">
      <form className={styles.form}>
        <input />
        <button>
          <img src={searchImg} />
        </button>
      </form>

      <p className={styles.count}>총 {items.length}개 코스</p>

      <div className={styles.courseList}>
        {items.map((item, idx) => {
          return <CourseItem item={item} key={idx} />;
        })}
      </div>
    </ListPage>
  );
}

export default CourseListPage;
