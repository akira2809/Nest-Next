import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

interface Product {
  id: number;
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
    max: 1000000
  },
  loading: false,
  error: null,
};

// Async thunk to fetch all products
export const fetchAllProducts = createAsyncThunk(
  'product/fetchAllProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:3001/product');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const productData = await response.json();
      return productData;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// Async thunk to fetch products by category
export const fetchProductsByCategory = createAsyncThunk(
  'product/fetchProductsByCategory',
  async (categoryId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:3001/category/${categoryId}/product`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const productData = await response.json();
      return productData;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// Async thunk to fetch categories
export const fetchCategories = createAsyncThunk(
  'product/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:3001/category/');
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const categoryData = await response.json();
      return categoryData;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// Async thunk to filter products based on category and price
export const filterProducts = createAsyncThunk(
  'product/filterProducts',
  async (params: FilterParams, { getState }) => {
    const { products } = (getState() as { product: ProductState }).product;
    const { category, minPrice, maxPrice } = params;
    
    return products.filter((product) => {
      const categoryMatch = category ? product.category === category : true;
      const priceMatch = product.price >= minPrice && product.price <= maxPrice;
      return categoryMatch && priceMatch;
    });
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    filterByCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
      if (action.payload) {
        state.loading = true;
        // Fetch products by category
        fetchProductsByCategory(action.payload);
      } else {
        state.loading = true;
        // Fetch all products
        fetchAllProducts();
      }
    },
    resetFilter: (state) => {
      state.selectedCategory = '';
      state.priceRange = { min: 0, max: 1000000 };
      state.filteredProducts = state.products;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch categories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.loading = false;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Fetch all products
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
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
      
      // Fetch products by category
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.products = action.payload;
        state.filteredProducts = action.payload;
        state.loading = false;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Filter products based on category and price
      .addCase(filterProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(filterProducts.fulfilled, (state, action) => {
        state.filteredProducts = action.payload;
        state.loading = false;
      })
      .addCase(filterProducts.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to apply filter';
      });
  }
});

export const { filterByCategory, resetFilter } = productSlice.actions;
export default productSlice.reducer;
