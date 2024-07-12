import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "./Button";
import Input from "./Input";
import images from "./kakao.svg";

const Container = styled.div`
  width: 430px;
  margin: 40px auto;
  transform: translateX(50%);
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  gap: 8px;
  & p {
    text-align: center;
    color: gray;
  }
  & label {
    color: lightgray;
  }
`;

const H1 = styled.h1`
  background-image: linear-gradient(135deg, aqua, purple);
  background-clip: text;
  /* 텍스트 모양에만 배경효과를 줌 */
  color: transparent;
  margin: 0;
  text-align: center;
`;

const Linktag = styled(Link)`
  font-weight: 700;
`;

const KakaoBtn = styled(Button)`
  background-image: url(${images});
  background-size: 24px;
  background-repeat: no-repeat;
  background-position: 30% 50%;
`;

function Login(props) {
  return (
    <Container>
      <H1>DW 온라인스쿨</H1>
      <p>
        회원이 아니신가요? <Linktag>회원가입 하기</Linktag>
      </p>
      <label htmlFor="email">이메일</label>
      <Input placeholder="styled@DW.kr" id="email" />
      <label htmlFor="password">비밀번호</label>
      <Input placeholder="비밀번호" id="password" />
      <Button $fontColor $btnColor>
        로그인 하기
      </Button>
      <KakaoBtn>카카오 로그인</KakaoBtn>
    </Container>
  );
}

export default Login;
