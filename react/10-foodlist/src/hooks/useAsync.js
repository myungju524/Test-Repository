import { useState } from "react";

function useAsync(asyncFunction) {
  // asyncFunction 에 들어오는 것 : await 걸어서 쓰는 함수들
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);

  const wrappedFunction = async (...args) => {
    // 위에서의 ...args : 함수 선언부에서 쓴 ...은 스프레드 연산자가 아니고 문법.(나머지 파라미터를 다 받을 수 있는 문법)
    try {
      setError(null);
      setPending(true);
      return await asyncFunction(...args);
      // 함수 호출부에서 쓴 ...은 스프레드 연산자가 될 수 있음
      //   argumenst 객체에는 나머지 파라미터가 배열로 들어옴
    } catch (error) {
      setError(error);
      return;
    } finally {
      setPending(false);
    }
  };
  return [pending, error, wrappedFunction];
}
export default useAsync;
