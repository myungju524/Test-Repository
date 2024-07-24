import "./App.css";
import logoImg from "../assets/logo.png";
import searChImg from "../assets/ic-search.png";
import FoodForm from "./FoodForm";
import FoodList from "./FoodList";
import footerLogo from "../assets/logo-text.png";
import backgroundImg from "../assets/background.png";
import { useEffect, useState } from "react";
import { deleteDatas, getDatas, getDatasByOrderLimit } from "../api/firebase";

const LIMIT = 5;
let listItems;

function AppSortButton({ children, selected, onClick }) {
  return (
    <button
      className={`AppSortButton ${selected ? "selected" : ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function App() {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("createdAt");
  const [lq, setLq] = useState();
  // 더보기 버튼을 관리하기 위해 만든 state
  const [hasNext, setHasNext] = useState(true);
  const [keyword, setKeyword] = useState("");

  const handleLoad = async (options) => {
    const { resultData, lastQuery } = await getDatasByOrderLimit(
      "foods",
      options
    );
    if (!options.lq) {
      setItems(resultData);
    } else {
      setItems((prevItems) => [...prevItems, ...resultData]);
    }

    console.log(lastQuery);
    setLq(lastQuery);
    if (!lastQuery) {
      setHasNext(false);
    }
  };
  const handleNewestClick = () => setOrder("createdAt");
  const handleCalorieClick = () => setOrder("calorie");

  const handleLoadMore = async () => {
    handleLoad({ fieldName: order, limits: LIMIT, lq: lq });
  };

  const handleKeyWordChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setItems(
      listItems.filter((item) => {
        return item.title.includes(keyword);
      })
    );
  };

  // const handleDelete = async (docId, imgUrl) => {
  //   const result = await deleteDatas("foods", docId, imgUrl);
  //   if (!result) {
  //     alert("저장된 이미지 파일이 없습니다. \n관리자에게 문의하세요");
  //     return false;
  //   }
  //   setItems((prev) => prev.filter((item) => item.docId !== docId));
  // };

  useEffect(() => {
    handleLoad({ fieldName: order, limits: LIMIT, lq: undefined });
  }, [order]);

  console.log(items);
  return (
    <div className="App" style={{ backgroundImage: `url(${backgroundImg})` }}>
      <div className="App-nav">
        <img src={logoImg} />
      </div>
      <div className="App-container">
        <div className="App-FoodForm">
          <FoodForm />
        </div>
        <div className="App-filter">
          <form className="App-search" onSubmit={handleSubmit}>
            <input
              className="App-search-input"
              onChange={handleKeyWordChange}
            />
            <button className="App-search-button">
              <img src={searChImg} />
            </button>
          </form>
          <div className="App-orders">
            <AppSortButton
              selected={order === "createdAt"}
              onClick={handleNewestClick}
            >
              최신순
            </AppSortButton>
            <AppSortButton
              onClick={handleCalorieClick}
              selected={order === "calorie"}
            >
              칼로리순
            </AppSortButton>
          </div>
        </div>
        <FoodList items={items} />
        {hasNext && (
          <button className="App-load-more-button" onClick={handleLoadMore}>
            더보기
          </button>
        )}
      </div>
      <div className="App-footer">
        <div className="App-footer-container">
          <img src={footerLogo} />
          <select>
            <option>한국어</option>
            <option>English</option>
          </select>
          <div className="App-footer-menu">
            서비스 이용 약관 | 개인정보 처리방침
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
