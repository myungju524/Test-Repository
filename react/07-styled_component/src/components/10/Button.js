import styled from "styled-components";

const Button = styled.button`
  background-color: ${({ $btnColor }) => ($btnColor ? "#6500c3" : "yellow")};
  border: none;
  color: ${({ $fontColor }) => ($fontColor ? "#fff" : "#000000")};
  padding: 16px;
  border-radius: ${({ $round }) => ($round ? `9999px` : `8px`)};
  font-size: 18px;
  cursor: pointer;
  &:hover {
    background-color: #7760b4;
  }
`;

export default Button;
