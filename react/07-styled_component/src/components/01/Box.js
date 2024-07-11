import styled from "styled-components";

const Box = styled.div`
  background-color: ${(props) => props.bgColor};
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    background-color: black;
    /* 여기서 쓰는 &는 span을 말한다. */
    &:hover {
      background-color: white;
    }
  }
  &:hover {
    background-color: yellow;
    transform: scale(1.5);
    transition: all 3s;
  }
`;

export default Box;
