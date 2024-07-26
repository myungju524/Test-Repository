import React from "react";
import "./App.css";
import logoImg from "../assets/logo.png";
import FoodForm from "./FoodForm";
import searchImg from "../assets/ic-search.png";
import footerLogo from "../assets/logo-text.png";

function AppSortButton({ children, selected }) {
  return (
    <button className={`AppSortButton ${selected ? "selected" : ""}`}>
      {children}
    </button>
  );
}

function App(props) {
  return (
    <div className="App">
      <div className="App-nav">
        <img src={logoImg} />
      </div>
      <div className="App-container">
        <div className="App-FoodForm">
          <FoodForm />
        </div>
        <div className="App-filter">
          <form className="App-search">
            <input className="App-search-input" />
            <button className="App-search-button">
              <img src={searchImg} />
            </button>
          </form>
          <div className="App-orders">
            <AppSortButton>최신순</AppSortButton>
            <AppSortButton>칼로리순</AppSortButton>
          </div>
        </div>
        <button className="App-load-more">더보기</button>
      </div>
      <div className="App-footer">
        <div className="App-footer-container">
          <img src={footerLogo} />
          <select>
            <option>한국어</option>
            <option>English</option>
          </select>
          <div className="App-footer-menu">| 개인정보 처리방침</div>
        </div>
      </div>
    </div>
  );
}

export default App;
