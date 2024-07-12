import styled from "styled-components";

const SIZES = {
  large: 24,
  medium: 20,
  small: 16,
};

const Button = styled.button`
  background-color: #6750a4;
  border: none;
  color: #fff;
  padding: 16px;
  border-radius: ${({ $round }) => ($round ? `9999px` : `3px`)};
  font-size: ${({ size }) => SIZES[size] ?? SIZES["medium"]}px;
  /* ?? : ?? 앞에가 false 면 ?? 뒤에 실행 반대도 마찬가지*/
  /* 구조분해 해서 쓸 수 있음 */
  &:hover {
    background-color: #463770;
  }
`;

export default Button;
