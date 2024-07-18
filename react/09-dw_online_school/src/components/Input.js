import styled from "styled-components";

const SIZES = {
  small: 16,
  medium: 20,
  large: 24,
};

const Input = styled.input`
  border: none;
  border-bottom: 2px solid #eeeeee;
  outline: none;
  padding: 16px 0;
  font-size: 16px;
  display: block;
  &:focus {
    border-color: #7760b4;
  }
  &::placeholder {
    color: lightgray;
  }
`;
export default Input;
