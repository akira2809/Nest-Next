import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { RootState } from "@/redux/store";

interface Product {
  product_id: number;
  name: string;
  base_price: string;
  sale_price?: string;
  main_image: string;
  slug: string;
  created_at: string;
}

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

// Fetch sản phẩm mới từ API
export const fetchNewProducts = createAsyncThunk("products/fetchNew", async () => {
  const response = await fetch("http://localhost:3001/product/new/new");
  if (!response.ok) throw new Error("Lỗi khi lấy sản phẩm mới");
  return (await response.json()) as Product[];
});

const newProductsSlice = createSlice({
  name: "newProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNewProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchNewProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Có lỗi xảy ra";
      });
  },
});

export default newProductsSlice.reducer;
