import React from "react";

function App(props) {
  return (
    <div className="App">
      <div className="App-nav">
        <img />
      </div>
      <div className="App-container">
        <div className="App-FoodForm"></div>
        <div className="App-filter">
          <form className="App-search">
            <input />
            <button>
              <img />
            </button>
          </form>
          <div className="App-orders"></div>
        </div>
      </div>
      <div className="App-footer">
        <div className="App-footer-container">
          <img />
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
