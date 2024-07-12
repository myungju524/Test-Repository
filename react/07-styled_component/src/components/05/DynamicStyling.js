import React from "react";
import Button from "./Button";
import styled from "styled-components";

const Container = styled.div`
  ${Button} {
    margin: 10px;
  }
  /* 버튼 컴포넌트에서 바로 마진을 주지않고 따로 하는 이유는 
  마진의 상황에 따라 바뀔수도 있기 때문이다. Container 변수 안에 있을 때의 버튼에만
  마진을 주고 싶음
  */
`;

function DynamicStyling(props) {
  return (
    <Container>
      <h1>기본 버튼</h1>
      <Button size="small">small </Button>
      <Button size="medium">medium </Button>
      <Button size="large">large </Button>
      <h1>둥근 버튼</h1>
      <Button size="small" $round>
        round small{" "}
      </Button>
      <Button size="medium" $round>
        round medium{" "}
      </Button>
      <Button size="large" $round>
        round large{" "}
        {/* props 앞에 $ 를 붙여주면 비표준속성 오류를 막을 수 있다. 대신 props을 전달한
        컴포넌트 에서도 $를 붙여줘야 함
         */}
      </Button>
    </Container>
  );
}

export default DynamicStyling;
