import React, { useEffect, useState } from "react";
import Container from "../components/Container";
import CourseIcon from "../components/CourseIcon";
import Button from "../components/Button";
import Card from "../components/Card";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import getCourseColor from "../utils/getCourseColor";
import { getData } from "../api/firebase";
import styles from "./CoursePage.module.css";

function CoursePage() {
  //   간단한 정보는useLocation 으로한다.
  const props = useLocation();
  console.log(props);
  const { pathname } = props;
  const { courseSlug } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState();

  // undefinded.code
  // 옵셔널 체이닝 ? 쓰면 undefinded code 까지 안 가고 그냥 끝
  const courseColor = getCourseColor(course?.code);

  //   옵셔널 체이닝 :  ? 앞에있는 값이 undefinded 나 null 이면 undefinded 를 반환
  //   const headerStyle = {
  //     borderColor: courseColor,
  //   };

  const handleLoad = async () => {
    const resultData = await getData("courses", {
      field: "slug",
      condition: "==",
      value: courseSlug,
    });
    setCourse(resultData);
  };

  const handleAddWishListClick = () => {
    const member = JSON.parse(localStorage.getItem("member"));
    if (member) {
    } else {
      alert("로그인을 해주세요.");
      navigate("/login", { state: pathname });
      //   /슬래쉬가 있을 때 절대경로를 설정해 주는 것 라우팅 해 준 곳을 잘 확인하고 써야함
    }
  };
  useEffect(() => {
    handleLoad();
  }, []);
  return (
    <>
      <div className={styles.header} style={{ borderColor: courseColor }}>
        <Container className={styles.content}>
          <CourseIcon photoUrl={course?.photoUrl} />
          <h1 className={styles.title}>{course?.title}</h1>
          <Button variant="round" onClick={handleAddWishListClick}>
            {" "}
            + 코스 담기
          </Button>
          <p className={styles.summary}>{course?.summary}</p>
        </Container>
      </div>
      <Container className={styles.topics}>
        {course?.topics.map(({ topic }) => {
          return (
            <Card className={styles.topic} key={topic.slug}>
              <h3 className={styles.title}>{topic.title}</h3>
              <p className={styles.summary}>{topic.summary}</p>
            </Card>
          );
        })}
      </Container>
    </>
  );
}

export default CoursePage;
