import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NewPage from "./pages/NewPage";
import { createContext, useEffect, useReducer } from "react";
import { addItem, fetchItems, initialState, reducer } from "./api/itemReducer";
import DiaryPage from "./pages/DiaryPage";

export const DiaryStateContext = createContext();
export const DiaryDispathContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onCreate = async (values) => {
    const addObj = {
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      date: new Date(values.date).getTime(),
      content: values.content,
      emotion: values.emotion,
      userEmail: "hmj970524@gmail.com",
    };
    await addItem("diary", addObj, dispatch);
  };

  // READ useEffect안에서 함
  // UPDATE
  // DELETE

  useEffect(() => {
    fetchItems(
      "diary",
      {
        conditions: [
          { field: "userEmail", operator: "==", value: "hmj970524@gmail.com" },
        ],
        orderBys: [{ field: "date", direction: "desc" }],
      },
      dispatch
    );
  }, []);
  return (
    <DiaryStateContext.Provider value={state.items}>
      <DiaryDispathContext.Provider value={{ onCreate }}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/">
                <Route index element={<HomePage />} />
                <Route path="new" element={<NewPage />} />
                {/* <Route path="edit" /> */}
                <Route path="diary/:id" element={<DiaryPage />} />
              </Route>
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispathContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
