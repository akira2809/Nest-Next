import { configureStore } from "@reduxjs/toolkit";
import hotProductsReducer from "@/redux/slices/hotProductSlice";
import newProductsReducer from "@/redux/slices/newProductsSlice";

export const store = configureStore({
  reducer: {
    hotProducts: hotProductsReducer,
    newProducts: newProductsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
