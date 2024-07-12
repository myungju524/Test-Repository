import styled from "styled-components";

const SIZES = {
  small: 16,
  medium: 20,
  large: 24,
};

const Input = styled.input`
  border: 2px solid ${({ $error }) => ($error ? "#f44336" : "#eeeeee")};
  border-radius: 4px;
  outline: none;
  padding: 16px;
  font-size: ${({ size }) => SIZES[size] ?? SIZES["medium"]}px;
  &:focus {
    border-color: ${({ $error }) => ($error ? "#f44336" : "#7760b4")};
  }
  border-radius: ${({ $round }) => ($round ? "9999px" : "4px")};
`;

export default Input;
