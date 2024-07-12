import React from "react";
import Wrapper from "./Wrapper";
import Login from "./Login";
import styled from "styled-components";
import Input from "./Input";

const Container = styled.div`
  width: 400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

function Practice2(props) {
  return (
    <Container>
      <h1>로그인</h1>
      <label htmlFor="email">Email</label>
      <Input placeholder="styled@example.com" />
      <label>password</label>
      <Input placeholder="password" />
    </Container>
  );
}

export default Practice2;
