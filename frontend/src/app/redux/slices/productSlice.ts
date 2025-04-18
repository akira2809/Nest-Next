// src/redux/slices/productSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosClient from '@/api/axiosClient';

interface Product {
  product_id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface Category {
  id: string;
  name: string;
}

interface FilterParams {
  category: string;
  minPrice: number;
  maxPrice: number;
}

interface ProductState {
  products: Product[];
  filteredProducts: Product[];
  categories: Category[];
  selectedCategory: string;
  priceRange: {
    min: number;
    max: number;
  };
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  filteredProducts: [],
  categories: [],
  selectedCategory: '',
  priceRange: {
    min: 0,
    max: 1000000,
  },
  loading: false,
  error: null,
};

// export const fetchColors = createAsyncThunk(
//   'product/fetchColors',
//   async () => {
//     const response = await axiosClient.get('/colors');
//     return response.data;
//   }
// );

// export const fetchSizes = createAsyncThunk(
//   'product/fetchSizes',
//   async () => {
//     const response = await axiosClient.get('/sizes');
//     return response.data;
//   }
// );

// export const fetchProductVariants = createAsyncThunk(
//   'product/fetchProductVariants',
//   async (productId: number) => {
//     const response = await axiosClient.get(`/products/${productId}/variants`);
//     return response.data;
//   }
// );

// export const addVariant = createAsyncThunk(
//   'product/addVariant',
//   async (variantData: Omit<any, 'product_variant_id'>) => {
//     const response = await axiosClient.post('/product-variants', variantData);
//     return response.data;
//   }
// );

// export const updateVariant = createAsyncThunk(
//   'product/updateVariant',
//   async (variantData: any) => {
//     const response = await axiosClient.put(`/product-variants/${variantData.product_variant_id}`, variantData);
//     return response.data;
//   }
// );

// export const deleteVariant = createAsyncThunk(
//   'product/deleteVariant',
//   async (variantId: number) => {
//     await axiosClient.delete(`/product-variants/${variantId}`);
//     return variantId;
//   }
// );
// 🧃 Fetch data
export const fetchAllProducts = createAsyncThunk('product/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const res = await axiosClient.get('/products');
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

export const fetchCategories = createAsyncThunk('product/fetchCategories', async (_, { rejectWithValue }) => {
  try {
    const res = await axiosClient.get('/categories');
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

export const filterProducts = createAsyncThunk(
  'product/filterProducts',
  async (params: FilterParams, { getState }) => {
    const { products } = (getState() as { product: ProductState }).product;
    const { category, minPrice, maxPrice } = params;

    return products.filter(
      (p) =>
        (!category || p.category === category) &&
        p.price >= minPrice &&
        p.price <= maxPrice
    );
  }
);

// 🧃 CRUD Product
export const addProduct = createAsyncThunk('product/add', async (product: Omit<Product, 'id'>, { rejectWithValue }) => {
  try {
    const res = await axiosClient.post('/products', product);
    console.log(res)
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

export const updateProduct = createAsyncThunk(
  'product/update',
  async ({ id, data }: { id: number; data: any }, { rejectWithValue }) => {
    console.log(data)
    try {
      const res = await axiosClient.patch(`/products/${id}`, data);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const deleteProduct = createAsyncThunk('product/delete', async (id: number, { rejectWithValue }) => {
  try {
    await axiosClient.delete(`/products/${id}`);
    return id;
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    resetFilter: (state) => {
      state.selectedCategory = '';
      state.priceRange = { min: 0, max: 1000000 };
      state.filteredProducts = state.products;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.filteredProducts = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })

      .addCase(filterProducts.fulfilled, (state, action) => {
        state.filteredProducts = action.payload;
      })

      // Add Product
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
        state.filteredProducts.push(action.payload);
      })

      // Update Product
      .addCase(updateProduct.fulfilled, (state, action) => {
        const updated = action.payload;
        console.log(updated);

        state.products = state.products.map((p) =>
          p.product_id === updated.product_id ? updated : p
        );

        state.filteredProducts = state.filteredProducts.map((p) =>
          p.product_id === updated.product_id ? updated : p
        );
      })

      // Delete Product
      .addCase(deleteProduct.fulfilled, (state, action) => {
        const id = action.payload;
        state.products = state.products.filter((p) => p.product_id !== id);
        state.filteredProducts = state.filteredProducts.filter((p) => p.product_id !== id);
      });
  },
});

export const { resetFilter } = productSlice.actions;
export default productSlice.reducer;
