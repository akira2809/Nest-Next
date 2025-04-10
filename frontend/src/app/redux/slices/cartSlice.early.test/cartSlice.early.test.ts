
import { addToCart, clearCart, removeFromCart, updateQuantity } from '../cartSlice';


// cartSlice.test.ts
describe('cartSlice() cartSlice method', () => {
  let initialState: any;

  beforeEach(() => {
    // Mock sessionStorage
    const mockSessionStorage: { [key: string]: string } = {};
    jest.spyOn(window.sessionStorage, 'getItem').mockImplementation((key: string) => mockSessionStorage[key] || null);
    jest.spyOn(window.sessionStorage, 'setItem').mockImplementation((key: string, value: string) => {
      mockSessionStorage[key] = value;
    });
    jest.spyOn(window.sessionStorage, 'removeItem').mockImplementation((key: string) => {
      delete mockSessionStorage[key];
    });

    initialState = {
      items: [],
    };
  });

  describe('Happy Paths', () => {
    it('should add a new product to the cart', () => {
      const product = { product_id: 1, name: 'Product 1', base_price: '10', main_image: 'image1.jpg', slug: 'product-1' };
      const action = addToCart(product);
      const state = cartReducer(initialState, action);

      expect(state.items).toHaveLength(1);
      expect(state.items[0]).toEqual({ ...product, quantity: 1 });
    });

    it('should increase the quantity of an existing product in the cart', () => {
      const product = { product_id: 1, name: 'Product 1', base_price: '10', main_image: 'image1.jpg', slug: 'product-1' };
      const stateWithProduct = { items: [{ ...product, quantity: 1 }] };
      const action = addToCart(product);
      const state = cartReducer(stateWithProduct, action);

      expect(state.items).toHaveLength(1);
      expect(state.items[0].quantity).toBe(2);
    });

    it('should remove a product from the cart', () => {
      const product = { product_id: 1, name: 'Product 1', base_price: '10', main_image: 'image1.jpg', slug: 'product-1', quantity: 1 };
      const stateWithProduct = { items: [product] };
      const action = removeFromCart(1);
      const state = cartReducer(stateWithProduct, action);

      expect(state.items).toHaveLength(0);
    });

    it('should update the quantity of a product in the cart', () => {
      const product = { product_id: 1, name: 'Product 1', base_price: '10', main_image: 'image1.jpg', slug: 'product-1', quantity: 1 };
      const stateWithProduct = { items: [product] };
      const action = updateQuantity({ productId: 1, quantity: 5 });
      const state = cartReducer(stateWithProduct, action);

      expect(state.items[0].quantity).toBe(5);
    });

    it('should clear the cart', () => {
      const product = { product_id: 1, name: 'Product 1', base_price: '10', main_image: 'image1.jpg', slug: 'product-1', quantity: 1 };
      const stateWithProduct = { items: [product] };
      const action = clearCart();
      const state = cartReducer(stateWithProduct, action);

      expect(state.items).toHaveLength(0);
    });
  });

  describe('Edge Cases', () => {
    it('should not add a product with zero quantity', () => {
      const product = { product_id: 1, name: 'Product 1', base_price: '10', main_image: 'image1.jpg', slug: 'product-1', quantity: 0 };
      const action = addToCart(product);
      const state = cartReducer(initialState, action);

      expect(state.items).toHaveLength(1);
      expect(state.items[0].quantity).toBe(1); // Default to 1
    });

    it('should remove a product if updated quantity is zero', () => {
      const product = { product_id: 1, name: 'Product 1', base_price: '10', main_image: 'image1.jpg', slug: 'product-1', quantity: 1 };
      const stateWithProduct = { items: [product] };
      const action = updateQuantity({ productId: 1, quantity: 0 });
      const state = cartReducer(stateWithProduct, action);

      expect(state.items).toHaveLength(0);
    });

    it('should handle removing a non-existent product gracefully', () => {
      const product = { product_id: 1, name: 'Product 1', base_price: '10', main_image: 'image1.jpg', slug: 'product-1', quantity: 1 };
      const stateWithProduct = { items: [product] };
      const action = removeFromCart(2);
      const state = cartReducer(stateWithProduct, action);

      expect(state.items).toHaveLength(1);
    });

    it('should handle updating quantity of a non-existent product gracefully', () => {
      const product = { product_id: 1, name: 'Product 1', base_price: '10', main_image: 'image1.jpg', slug: 'product-1', quantity: 1 };
      const stateWithProduct = { items: [product] };
      const action = updateQuantity({ productId: 2, quantity: 5 });
      const state = cartReducer(stateWithProduct, action);

      expect(state.items).toHaveLength(1);
      expect(state.items[0].quantity).toBe(1);
    });
  });
});