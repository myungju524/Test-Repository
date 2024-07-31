import React from "react";
import "./Button.css";

function Button({ text, onClick, type }) {
  const btnClass = ["positive", "negative"].includes(type) ? type : "default";
  return (
    <button onClick={onClick} className={`btn btn_${btnClass}`}>
      {text}
    </button>
  );
}

export default Button;
