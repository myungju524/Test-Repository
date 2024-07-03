import React from "react";
import logoImg from "../assets/logo.png";
import "./App.css";
import ReviewForm from "./ReviewForm";

function App(props) {
  return (
    <div className="App">
      <nav className="App-nav">
        <div className="App-nav-container">
          <img src={logoImg} />
          <select>
            <option>한국어</option>
            <option>English</option>
          </select>
        </div>
      </nav>
      <div className="App-container">
        <div className="App-ReviewForm">
          <ReviewForm />
        </div>
      </div>
      <footer className="App-footer">
        <div className="App-footer-container">| 개인정보 처리방침</div>
      </footer>
    </div>
  );
}

export default App;
