import React, { useState, useRef, useEffect } from "react";
import placeholderImg from "../assets/preview-placeholder.png";
import resetImg from "../assets/ic-reset-white.png";
import "./FileInput.css";

function FileInput({ name, onChange, value, initialPreview }) {
  const [preview, setPreview] = useState(initialPreview);

  const inputRef = useRef();
  const handleFileChange = (e) => {
    const nextValue = e.target.files[0];
    onChange(name, nextValue);
  };
  const handleClearClick = () => {
    onChange(name, null);
  };
  useEffect(() => {
    if (!value) return;
    const nextPreview = URL.createObjectURL(value);
    // value에는 미디어 소스, 혹은 블롭 타입이 들어가야 함
    setPreview(nextPreview);

    return () => {
      setPreview(null);
      URL.revokeObjectURL(nextPreview);
    };
  }, [value]);
  return (
    <div className="FileInput">
      <img
        className={`FileInput-preview ${preview ? "selected" : ""} `}
        src={preview || placeholderImg}
      />
      <input
        ref={inputRef}
        className="FileInput-hidden-overlay"
        type="file"
        onChange={handleFileChange}
        // multiple < 파일 여러 개 선택할 때 사용
      />
      {value && (
        <button
          className="FileInput-clear-button"
          onClick={handleClearClick}
          type="button"
        >
          <img src={resetImg} />
        </button>
      )}
    </div>
  );
}

export default FileInput;
