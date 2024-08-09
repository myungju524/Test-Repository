import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./products/productsSlice";
import categoriesSlice from "./categories/categoriesSlice";
import productSlice from "./products/productSlice";
import cartSlice from "./cart/cartSlice";
export const store = configureStore({
  reducer: {
    productsSlice,
    productSlice,
    categoriesSlice,
    cartSlice,
  },
});
