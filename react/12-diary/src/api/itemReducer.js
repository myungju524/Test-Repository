import { addDatas, getDatas } from "./firebase";

// action types
const FETCH_ITEMS = "FETCH_ITEMS";
const ADD_ITEM = "ADD_ITEM";
const UPDATE_ITEM = "UPDATE_ITEM";
const DELETE_ITEM = "DELETE_ITEM";
const SET_ERROR = "SET_ERROR";

// Initial State
export const initialState = {
  items: [],
  error: null,
};

export function reducer(state, action) {
  // state는 우리가 dispatch 함수를 호출할 때 명시적으로 건네주지 않아도
  // 리듀서가 알아서 관리를 하고 있다.
  // dispatch 함수를 호출할 때 넣어주는 객체가 action으로 들어온다.

  switch (action.type) {
    case FETCH_ITEMS:
      return { ...state, items: action.payload, error: null };
    //   return 에는 다음 상태의 값을 넣어준다.
    case ADD_ITEM:
      return { ...state, items: [...state.items, action.payload], error: null };
    // 구조분해 해서 state를 가져오면 초기에 items, error , etc... 등등 담겨있다.
    // items와 error는 원하는 값으로 변경해주고 나머지는 그대로 가져온다.
    case UPDATE_ITEM:
      return;
    case DELETE_ITEM:
      return;
    case SET_ERROR:
      return { ...state, error: action.payload };

    default:
      return state;
  }
}

// Actions(실제 reducer가 state를 변경하기 전에 수행해야 할 작업들)
export const fetchItems = async (collectionName, queryOptions, dispatch) => {
  const resultData = await getDatas(collectionName, queryOptions);
  if (!resultData) {
    dispatch({ type: SET_ERROR, payload: "FETCH Datas 에러!!!" });
  } else {
    dispatch({ type: FETCH_ITEMS, payload: resultData });
  }
};
export const addItem = async (collectionName, addObj, dispatch) => {
  // dispatch 할 변경된 state 값을 만들어야 한다.
  const resultData = await addDatas(collectionName, addObj);
  if (!resultData) {
    dispatch({ type: SET_ERROR, payload: "ADD Datas 에러!!!" });
  } else {
    // dispatch 실행 시 reducer 함수로 간다.
    dispatch({ type: ADD_ITEM, payload: resultData });
  }
};
export const updateItem = () => {};
export const deleteItem = () => {};
