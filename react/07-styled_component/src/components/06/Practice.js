import React from "react";
import Input from "./Input";
import styled from "styled-components";

const Container = styled.div`
  ${Input} {
    margin: 10px;
  }
`;

export function Practice(props) {
  return (
    <Container>
      <h3>Size</h3>
      <Input size="small" />
      <Input size="medium" />
      <Input size="large" />
      <h3>Round</h3>
      <Input $round />
      <h3>Error</h3>
      <Input $border $error />
    </Container>
  );
}
