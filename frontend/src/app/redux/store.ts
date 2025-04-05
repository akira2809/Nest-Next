import { configureStore } from "@reduxjs/toolkit";
import hotProductsReducer from "@/redux/slices/hotProductSlice";
import newProductsReducer from "@/redux/slices/newProductsSlice";
import productReducer from "@/redux/slices/productSlice";

export const store = configureStore({
  reducer: {
    hotProducts: hotProductsReducer,
    newProducts: newProductsReducer,
    product: productReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }), // Đảm bảo hỗ trợ asyncThunk
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
