import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./CounterSlice";

export const store = configureStore({
  // 리듀서 필수
  reducer: counterSlice.reducer,
  // s붙이면 안 됨
});
