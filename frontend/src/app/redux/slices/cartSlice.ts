import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const loadCartFromSession = () => {
  if (typeof window !== "undefined") {
    const storedCart = sessionStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  }
  return [];
};

interface Product {
  product_id: number;
  name: string;
  base_price: string;
  sale_price?: string;
  main_image: string;
  slug: string;
  is_hot?: boolean;
  quantity?: number;
  color_id?: number;
  color_name?: string;
  size_id?: number;
  size_name?: string;
}

interface CartItem extends Product {
  quantity: number;
  color_id: number;
  size_id: number;
  variant_id: number;
  color_name?: string;  // Đảm bảo color_name luôn được bao gồm 
  size_name?: string;   // Đảm bảo size_name luôn được bao gồm
}

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

// Hàm tính toán tổng số lượng và tổng giá
const calculateCartTotals = (items: CartItem[]) => {
  let totalItems = 0;
  let totalPrice = 0;

  items.forEach(item => {
    totalItems += item.quantity;
    // Sử dụng sale_price nếu có, nếu không thì dùng base_price
    const price = item.sale_price ? parseFloat(item.sale_price) : parseFloat(item.base_price);
    totalPrice += price * item.quantity;
  });

  return { totalItems, totalPrice };
};

// Khởi tạo state với các tính toán tổng số lượng và giá
const initialItems = loadCartFromSession();
const initialTotals = calculateCartTotals(initialItems);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: initialItems,
    totalItems: initialTotals.totalItems,
    totalPrice: initialTotals.totalPrice
  } as CartState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const product = action.payload;

      // Check if the product with the same color and size already exists
      const existingItemIndex = state.items.findIndex(
        (item) =>
          item.product_id === product.product_id &&
          item.color_id === product.color_id &&
          item.size_id === product.size_id
      );

      if (existingItemIndex !== -1) {
        // If exists, update quantity
        state.items[existingItemIndex].quantity += product.quantity;
      } else {
        // Ensure color_name and size_name are included
        const newProduct = {
          ...product,
          color_name: product.color_name || "Mặc định",
          size_name: product.size_name || "Mặc định"
        };
        // Else, add the new product to cart
        state.items.push(newProduct);
      }

      // Cập nhật tổng số lượng và tổng giá
      const totals = calculateCartTotals(state.items);
      state.totalItems = totals.totalItems;
      state.totalPrice = totals.totalPrice;

      sessionStorage.setItem("cart", JSON.stringify(state.items));
    },

    removeFromCart: (state, action: PayloadAction<{ product_id: number; color_id?: number; size_id?: number }>) => {
      const { product_id, color_id, size_id } = action.payload;

      // Remove item based on product_id, color_id, and size_id
      state.items = state.items.filter(
        (item) =>
          item.product_id !== product_id ||
          item.color_id !== color_id ||
          item.size_id !== size_id
      );

      // Cập nhật tổng số lượng và tổng giá
      const totals = calculateCartTotals(state.items);
      state.totalItems = totals.totalItems;
      state.totalPrice = totals.totalPrice;

      sessionStorage.setItem("cart", JSON.stringify(state.items));
    },

    updateQuantity: (
      state,
      action: PayloadAction<{
        product_id: number;
        color_id?: number;
        size_id?: number;
        quantity: number;
      }>
    ) => {
      const { product_id, color_id, size_id, quantity } = action.payload;

      const itemIndex = state.items.findIndex(
        (item) =>
          item.product_id === product_id &&
          item.color_id === color_id &&
          item.size_id === size_id
      );

      if (itemIndex !== -1) {
        if (quantity <= 0) {
          // Remove item if quantity is less than or equal to 0
          state.items.splice(itemIndex, 1);
        } else {
          // Otherwise, update the quantity
          state.items[itemIndex].quantity = quantity;
        }

        // Cập nhật tổng số lượng và tổng giá
        const totals = calculateCartTotals(state.items);
        state.totalItems = totals.totalItems;
        state.totalPrice = totals.totalPrice;

        sessionStorage.setItem("cart", JSON.stringify(state.items));
      }
    },

    // Thêm action mới để tăng số lượng
    increaseQuantity: (
      state,
      action: PayloadAction<{
        product_id: number;
        color_id?: number;
        size_id?: number;
      }>
    ) => {
      const { product_id, color_id, size_id } = action.payload;

      const itemIndex = state.items.findIndex(
        (item) =>
          item.product_id === product_id &&
          item.color_id === color_id &&
          item.size_id === size_id
      );

      if (itemIndex !== -1) {
        // Tăng số lượng lên 1
        state.items[itemIndex].quantity += 1;

        // Cập nhật tổng số lượng và tổng giá
        const totals = calculateCartTotals(state.items);
        state.totalItems = totals.totalItems;
        state.totalPrice = totals.totalPrice;

        sessionStorage.setItem("cart", JSON.stringify(state.items));
      }
    },

    // Thêm action mới để giảm số lượng
    decreaseQuantity: (
      state,
      action: PayloadAction<{
        product_id: number;
        color_id?: number;
        size_id?: number;
      }>
    ) => {
      const { product_id, color_id, size_id } = action.payload;

      const itemIndex = state.items.findIndex(
        (item) =>
          item.product_id === product_id &&
          item.color_id === color_id &&
          item.size_id === size_id
      );

      if (itemIndex !== -1) {
        if (state.items[itemIndex].quantity <= 1) {
          // Xóa item nếu số lượng giảm xuống 0
          state.items.splice(itemIndex, 1);
        } else {
          // Giảm số lượng đi 1
          state.items[itemIndex].quantity -= 1;
        }

        // Cập nhật tổng số lượng và tổng giá
        const totals = calculateCartTotals(state.items);
        state.totalItems = totals.totalItems;
        state.totalPrice = totals.totalPrice;

        sessionStorage.setItem("cart", JSON.stringify(state.items));
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
      sessionStorage.removeItem("cart");
    },
  },
});

export const { 
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  increaseQuantity, 
  decreaseQuantity, 
  clearCart 
} = cartSlice.actions;

export default cartSlice.reducer;