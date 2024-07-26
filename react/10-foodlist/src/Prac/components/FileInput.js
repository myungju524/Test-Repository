import React, { useState } from "react";
import "./FileInput.css";
import resetImg from "../assets/ic-reset-white.png";

function FileInput(props) {
  const [preview, setPreview] = useState();
  return (
    <div className="FileInput">
      <img className="FileInput-preview" />
      <input className="FileInput-hidden-overlay" type="file" />
      <button>
        <img src={resetImg} />
      </button>
    </div>
  );
}

export default FileInput;
