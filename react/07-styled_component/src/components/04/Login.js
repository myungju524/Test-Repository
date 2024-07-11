import styled from "styled-components";

const Input1 = styled.input.attrs({ placeholder: "hmj7070@naver.com" })`
  display: block;
  border: 2px solid #eee;
  border-radius: 4px;
  outline: none;
  padding: 16px;
  width: 100%;
  margin-top: 5px;

  &:focus {
    border-color: #7760b4;
  }
`;

const Input2 = styled.input.attrs({ placeholder: "비밀번호" })`
  display: block;
  border: 2px solid #eee;
  border-radius: 4px;
  outline: none;
  padding: 16px;
  width: 100%;
  margin-top: 5px;

  &:focus {
    border-color: #7760b4;
  }
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: center;
  width: 300px;
  height: 300px;
`;
function Login() {
  return (
    <Div>
      <h1>로그인</h1>
      <label>
        Email
        <Input1 />
      </label>
      <label>
        password
        <Input2 />
      </label>
    </Div>
  );
}

export default Login;
