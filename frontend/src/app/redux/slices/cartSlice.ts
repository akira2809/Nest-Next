// redux/slices/cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Kiểm tra sessionStorage xem có cart cũ không
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
  quantity?: number; // Thêm trường số lượng
}

interface CartItem extends Product {
  quantity: number;
}

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: loadCartFromSession(),
  },
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const product = action.payload;

      // Kiểm tra xem sản phẩm đã có trong giỏ chưa
      const existingItemIndex = state.items.findIndex(
        (item: CartItem) => item.product_id === product.product_id
      );

      // Nếu đã có trong giỏ, tăng số lượng lên 1
      if (existingItemIndex !== -1) {
        state.items[existingItemIndex].quantity += 1;
      } else {
        // Nếu chưa có thì thêm sản phẩm vào giỏ hàng với số lượng là 1
        state.items.push({ ...product, quantity: 1 });
      }

      // Lưu lại vào sessionStorage mỗi lần thêm
      sessionStorage.setItem("cart", JSON.stringify(state.items));
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        (item: CartItem) => item.product_id !== action.payload
      );
      sessionStorage.setItem("cart", JSON.stringify(state.items));
    },

    updateQuantity: (state, action: PayloadAction<{productId: number, quantity: number}>) => {
      const { productId, quantity } = action.payload;
      const itemIndex = state.items.findIndex(
        (item: CartItem) => item.product_id === productId
      );
      
      if (itemIndex !== -1) {
        if (quantity <= 0) {
          // Nếu số lượng <= 0, xóa sản phẩm khỏi giỏ hàng
          state.items = state.items.filter(
            (item: CartItem) => item.product_id !== productId
          );
        } else {
          // Cập nhật số lượng
          state.items[itemIndex].quantity = quantity;
        }
        
        sessionStorage.setItem("cart", JSON.stringify(state.items));
      }
    },

    clearCart: (state) => {
      state.items = [];
      sessionStorage.removeItem("cart");
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;