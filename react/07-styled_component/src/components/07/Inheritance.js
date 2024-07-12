import React from "react";
import TermsOfservice from "./TermsOfservice";
import Button from "./Button";
import styled from "styled-components";

const StyledTermsOfService = styled(TermsOfservice)`
  background-color: #dededd;
  padding: 16px;
  width: 400px;
  border-radius: 8px;
  margin: 40px auto;
`;
const SubmitButton = styled(Button)`
  background-color: #de117d;
  width: 200px;
  margin: 0 auto;
  display: block;
  &:hover {
    background-color: #f5070f;
  }
`;

function Inheritance(props) {
  return (
    <div>
      <StyledTermsOfService />
      <SubmitButton>계속하기</SubmitButton>
    </div>
  );
}

export default Inheritance;
