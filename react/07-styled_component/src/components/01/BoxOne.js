import styled from "styled-components";

const BoxOne = styled.div`
  background-color: red;
  width: 200px;
  height: 200px;
  font-size: ${(props) => props.fontSize};
`;

export default BoxOne;
