import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addDatas, deleteDatas, getDatas } from "../api/firebase";

const diarySlice = createSlice({
  name: "diary",
  initialState: {
    items: [],
    error: null,
    status: "welcome",
  },
  reducers: {},
  extraReducers: (builder) => {
    // 비동기작업은 actionCreator 를 자동으로 만들어주지 못한다.
    builder
      .addCase(fetchItems.pending, (state, action) => {
        state.status = "Loading";
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "complete";
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = "fail";
      })
      .addCase(addItems.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.status = "complete";
      })
      .addCase(deleteItems.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
        state.status = "complete";
      })
      .addCase(deleteItems.rejected, (state, action) => {
        state.status = "fail";
      });
  },
});

const fetchItems = createAsyncThunk(
  "items/fetchAllItems",
  async ({ collectionName, queryOptions }) => {
    try {
      const resultData = await getDatas(collectionName, queryOptions);
      return resultData;
    } catch (error) {
      console.log("FETCH Error ", error);
    }
  }
);
const addItems = createAsyncThunk(
  "items/addAllItems",
  async ({ collectionName, addObj }) => {
    try {
      const resultData = await addDatas(collectionName, addObj);
      return resultData;
    } catch (error) {
      console.log("ADD Error ", error);
    }
  }
);

const deleteItems = createAsyncThunk(
  "items/deleteAllItems",
  async ({ collectionName, docId }) => {
    try {
      await deleteDatas(collectionName, docId);
      return docId;
    } catch (error) {
      console.log("DELETE Error", error);
    }
  }
);

export default diarySlice;
export { fetchItems, addItems, deleteItems };
