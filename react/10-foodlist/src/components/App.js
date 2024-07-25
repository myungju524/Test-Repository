import "./App.css";
import logoImg from "../assets/logo.png";
import searChImg from "../assets/ic-search.png";
import FoodForm from "./FoodForm";
import FoodList from "./FoodList";
import footerLogo from "../assets/logo-text.png";
import backgroundImg from "../assets/background.png";
import { useEffect, useState, useTransition } from "react";
import {
  addDatas,
  deleteDatas,
  getDatas,
  getDatasByOrderLimit,
  updateDatas,
} from "../api/firebase";
import LocaleSelect from "./LocaleSelect";
import useTranslate from "../hooks/useTranslate";

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
  // const t = useTranslate();

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
    listItems = resultData;
  };
  const handleNewestClick = () => setOrder("createdAt");
  const handleCalorieClick = () => setOrder("calorie");

  const handleLoadMore = async () => {
    handleLoad({ fieldName: order, limits: LIMIT, lq: lq });
  };
  const handleDelete = async (docId, imgUrl) => {
    // items 에서 docId를 받아온다.
    // db에서 데이터 삭제(스토리지에 있는 사진파일 삭제, database에 있는 데이터 삭제.
    // 두 가지를 같이 해야함)
    const { result, message } = await deleteDatas("foods", docId, imgUrl);
    if (!result) {
      alert(message);
      return false;
    }
    // 삭제 성공시 화면에 그 결과를 반영한다.(필터 사용)
    setItems((prevItems) =>
      // prevItems == > 현재 state 값 (items 값 : 화면에 뿌려진 배열15개)
      // 배열 안에 객체{} 가지고 있고 {...docId} 도 가지고 있음
      // 삭제버튼을 누른 {docId 객체와} 가지고 있는 배열 중 docId 배열이 같으면 삭제한다.
      // 그래서 삭제한 docId와 다른 docId들을 화면에 다시 출력한다.
      prevItems.filter(function (item) {
        return item.docId !== docId;
      })
    );
  };

  const handleAddsuccess = (resultData) => {
    setItems((prevItems) => [resultData, ...prevItems]);
  };

  const handleUpdateSuccess = (result) => {
    setItems((prevItems) => {
      // 수정된 item의 index 찾기
      const splitIdx = prevItems.findIndex((item) => item.id === result.id);

      const beforeArr = prevItems.slice(0, splitIdx);
      // splitIdx 0부터 직전까지
      const afterArr = prevItems.slice(splitIdx + 1);
      //
      // return [...beforeArr, result, ...afterArr];
      // result = 새로운 아이템 수정된 아이템
      return [
        ...prevItems.slice(0, splitIdx),
        result,
        ...prevItems.slice(splitIdx + 1),
      ];
    });
  };

  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // const searchItems = listItems.filter(function (item) {
    //   return item.title.includes(keyword);
    // });
    // setItems(searchItems);
    setItems(listItems.filter((item) => item.title.includes(keyword)));
  };

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
          <FoodForm onSubmitSuccess={handleAddsuccess} onSubmit={addDatas} />
        </div>
        <div className="App-filter">
          <form className="App-search" onSubmit={handleSubmit}>
            <input
              className="App-search-input"
              onChange={handleKeywordChange}
              value={keyword}
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
        <FoodList
          items={items}
          onDelete={handleDelete}
          onUpdate={updateDatas}
          onUpdateSuccess={handleUpdateSuccess}
        />
        {hasNext && (
          <button className="App-load-more-button" onClick={handleLoadMore}>
            더보기
          </button>
        )}
      </div>
      <div className="App-footer">
        <div className="App-footer-container">
          <img src={footerLogo} />
          {/* <LocaleSelect /> */}
          <div className="App-footer-menu">
            서비스 이용 약관 | 개인정보 처리방침
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
