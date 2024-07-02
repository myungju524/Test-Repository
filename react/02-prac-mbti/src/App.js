import "./App.css";
import xImages from "./assets/x.svg";

function App() {
  return (
    <div className="App">
      <div className="App-header-container">
        <div className="Header">
          <h1>
            MBTI 별 <br /> <span className="Accent">좋아하는 컬러</span>
          </h1>
        </div>
        <div>
          <span className="filter">
            ESTP <img className="remove-icon" src={xImages} />
          </span>
        </div>
      </div>
      <div className="App-content">
        <a className="add-item" href="#">
          + 새 컬러 등록하기
        </a>
        ;
      </div>
    </div>
  );
}

export default App;
