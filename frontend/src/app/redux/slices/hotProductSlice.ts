import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";

interface Product {
    product_id: number;
    name: string;
    base_price: string;
    sale_price?: string;
    main_image: string;
    slug: string;
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

// Gọi API lấy sản phẩm HOT
export const fetchHotProducts = createAsyncThunk("products/fetchHot", async () => {
    const response = await fetch("http://localhost:3001/product/hot/hot");
    if (!response.ok) throw new Error("Lỗi khi lấy sản phẩm HOT");
    return (await response.json()) as Product[];
});

const hotProductSlice = createSlice({
    name: "hotProduct",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHotProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchHotProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchHotProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Có lỗi xảy ra";
            });
    },
});

export default hotProductSlice.reducer;
export const selectHotProducts = (state: RootState) => state.hotProducts.products;
export const selectHotProductsLoading = (state: RootState) => state.hotProducts.loading;
export const selectHotProductsError = (state: RootState) => state.hotProducts.error;

