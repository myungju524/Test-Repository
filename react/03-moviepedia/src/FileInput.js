import React, { useEffect, useRef, useState } from "react";
import placeholderImg from "./assets/preview-placeholder.png";
import "./FileInput.css";
import resetImg from "./assets/ic-reset.png";

function FileInput({ InputName, setFile, value, initialPreivew }) {
  const [preview, setPreview] = useState(initialPreivew);
  const inputRef = useRef();
  // DOM 에 직접적으로 접근할 수 있는 훅 (document.@@)처럼 가져올 수 있음
  const handleFileChange = (e) => {
    const nextFile = e.target.files[0];
    setFile(InputName, nextFile);
  };
  const handleClearClick = () => {
    const inputNode = inputRef;
    console.log(inputNode);
    // inputNode.current.value = "";
    setFile(InputName, null);
  };
  useEffect(() => {
    // value 값이 없을 수도 있기 때문에 useEffect 를 종료해준다.
    if (!value) return;

    // objectURL 객체를 사용하여 미리보기 기능을 구현할 수 있다.
    // objectURL을 만들면 웹 브라우저에 메모리를 할당한다.
    // 할당을 한 이후에는 해제를 해줘야한다. ==> 메모리 낭비를 방지 해야 하기 때문이다.
    // 해제를 하는 시점은 useEffect에서 제공하는 사이드 이펙트를 정리하는 시점에 한다.
    // useEffect에서 return 을 해줄 때 정리하는 함수를 리턴해주면 사이드 이펙트를 제거할 수 있다.

    const nextPreview = URL.createObjectURL(value);
    setPreview(nextPreview);

    // 디펜던시 리스트에 있는 값이 바뀌면 다시 함수를 실행하는데 이 전에 리액트는
    // 앞에서 리턴한 정리 함수 (clean-up 함수)를 실행해서 사이드 이펙트를 정리한다.
    // 재렌더링 => useEffect 함수 실행 => 그 안에 있는 return 함수 기억
    // => 사용자 파일이 변경되면 value 값 변경으로 인한 useEffect 함수 실행
    // => 앞에서 기억해뒀던 return 함수 실행
    return () => {
      setPreview();
      URL.revokeObjectURL(nextPreview);
    };
  }, [value]);
  // ReviewForm 렌더링 => FileInput 렌더링되면서 useEffect 실행
  // useEffect 내부 코드가 실행되고 사진 변경
  // => ReviewForm 재 랜더링 => FileInput 도 재 렌더링
  // = 이때에는 useEffect 내부 코드가 실행되는 게 아니다.

  // useEffect 실행 시점
  // 1. 최초 렌더링시
  // 2. 디펜던시 리스트에 들어있는 값이 변경될 때
  // 3. 컴포넌트가 unmount 될 때

  return (
    <div className="FileInput">
      <img
        className={`FileInput-preview ${preview ? "selected" : ""}`}
        src={preview || placeholderImg}
      />
      <input
        ref={inputRef}
        className="FileInput-hidden-overlay"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
      {value && (
        <button className="FileInput-clear-button" onClick={handleClearClick}>
          <img src={resetImg} />
        </button>
      )}
    </div>
  );
}

export default FileInput;
