import { useEffect, useState } from "react";
import "./App.css";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";
import logoImg from "./assets/logo.png";
import mockItems from "./mock.json";
import { getDatas, getDatasByOrder, getDatasByOrderLimit } from "./firebase";
import { limit } from "firebase/firestore";

const LIMIT = 10;
// 상수는 대문자로 변수명 지음

function AppsortButton({ children, onClick, selected }) {
  let isSelected = "";
  if (selected) isSelected = "selected";
  return (
    <button className={`AppSortButton ${isSelected}`} onClick={onClick}>
      {children}
    </button>
  );
}

function App() {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("createdAt");
  const [lq, setLq] = useState();
  const [hasNext, setHasNext] = useState(true);

  const handleLoad = async (options) => {
    const { resultData, lastQuery } = await getDatasByOrderLimit(
      "movie",
      options
    );
    console.log(resultData);
    if (!options.lq) {
      setItems(resultData);
    } else {
      setItems((prevItems) => [...prevItems, ...resultData]);
    }
    if (!lastQuery) {
      setHasNext(false);
    }
    setLq(lastQuery);
  };
  const handleNewestClick = () => setOrder("createdAt");
  const handleBestClick = () => setOrder("rating");
  const handleMoreClick = () => {
    handleLoad({ order: order, limit: LIMIT, lq: lq });
  };

  useEffect(() => {
    handleLoad({ order: order, limit: LIMIT });
    setHasNext(true);
    // 화면이 렌더링 될 때 한 번만 실행
  }, [order]);
  return (
    <div className="App">
      <nav className="App-nav">
        <div className="App-nav-container">
          <img className="App-logo" src={logoImg} />
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
        <div className="App-sorts">
          <AppsortButton
            selected={order === "createdAt"}
            onClick={handleNewestClick}
          >
            최신순
          </AppsortButton>
          <AppsortButton
            selected={order === "rating"}
            onClick={handleBestClick}
          >
            베스트순
          </AppsortButton>
        </div>
        <div className="App-ReviewList">
          <ReviewList items={items} />
          {/* {hasNext && (
            <button className="App-load-more-button" onClick={handleMoreClick}>
              더보기
            </button>
          )} */}
          <button
            className="App-load-more-button"
            onClick={handleMoreClick}
            disabled={!hasNext}
          >
            더보기
          </button>
        </div>
      </div>
      <footer className="App-footer">
        <div className="App-footer-container">| 개인정보 처리방침</div>
      </footer>
    </div>
  );
}

export default App;
