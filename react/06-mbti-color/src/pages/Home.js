import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";
import ColorSurvey from "./../components/ColorSurvey";
import mockItem from "../lib/mock.json";
import { getAllDatas } from "../lib/firebase";

function Home(props) {
  // const colorState = useState([])
  // const color = itemState[0]
  // const setColor =  itemState[1]
  const [color, setColor] = useState([]);
  // 아직 mock 아이템이 color 안에 들어있지 않음. 넣어주어야 함. state 변수의 값을
  // 변경하기 위해서는 두번째(set)함수를 사용함.
  // setItems(mockItem) << 이렇게 사용할 경우에는 무한 렌더링으로 인해 에러가 남
  const handleLoad = async () => {
    // 파이어베이스에서 데이터 가져오기
    const resultData = await getAllDatas("mbtiColor", "id");
    // getAlldatas 호출하고 ()안에는 컬렉션명 넣어주기 두번째 값은 정렬기준
    // color state에 셋팅
    setColor(resultData);
  };

  useEffect(() => {
    handleLoad();
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <header className={styles.header}>
          <h1 className={styles.heading}>
            MBTI 별
            <br />
            <span className={styles.accent}>좋아하는 컬러</span>
          </h1>
          <div>
            <div className={styles.filter}>
              <img className={styles.removeIcon} src="/images/x.svg" />
            </div>
          </div>
        </header>
      </div>
      <main className={styles.content}>
        <Link className={styles.addItem} to="/new">
          + 새 컬러 등록하기
        </Link>
        <ul className={styles.items}>
          {color.map((item, idx) => {
            return (
              // map 함수를 이용해서 반복해서 리턴해줄 경우 고유한key값을 넣어줘야 함
              <li key={idx}>
                <ColorSurvey item={item} />
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
}

export default Home;
