import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDatas } from "../../firebase";

const initailState = {
  order: [],
  isLoading: false,
  error: "",
};

const orderSlice = createSlice({
  name: "order",
  initailState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrder.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload;
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error - action.payload;
      });
  },
});

export const fetchOrder = createAsyncThunk(
  "order/fetchOrder",
  async ({ collectionName, queryOptions, thynkAPI }) => {
    try {
      const resultDate = await getDatas(collectionName, queryOptions);
      return resultDate;
    } catch (error) {
      console.error(error);
      return thynkAPI.rejectWithValue("Error fetch order");
    }
  }
);

export default orderSlice.reducer;
