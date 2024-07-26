import React, { useRef, useState } from "react";
import "./FileInput.css";
import placeholderImg from "../assets/preview-placeholder.png";

function FileInput(props) {
  const [preview, setPreview] = useState();
  const inputRef = useRef();

  return (
    <div className="FileInput">
      <img className={`FileInput-preview ${preview ? "selected" : ""}`} />
      <input className="FileInput-hidden-overlay" type="file" />
      <button>
        <img src={preview || placeholderImg} />
      </button>
    </div>
  );
}

export default FileInput;
