import { createSlice } from "@reduxjs/toolkit";

const initialCart = JSON.parse(localStorage.getItem("cart")) || [];

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCart,
  reducers: {
    addToCart(state, action) {
      const { product, quantity } = action.payload;
      const existingItem = state.find(
        (item) => item.productId === product.productId
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.push({ ...product, quantity });
      }
    },
    removeFromCart(state, action) {
      const { productId } = action.payload;
      return state.filter((item) => item.productId !== productId);
    },
    clearCart() {
      return [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

export const selectCartItems = (state) => state.cart;

export const selectTotalQuantity = (state) =>
  Array.isArray(state.cart)
    ? state.cart.reduce((acc, item) => acc + item.quantity, 0)
    : 0;

export const selectTotalPrice = (state) =>
  Array.isArray(state.cart)
    ? state.cart.reduce((acc, item) => acc + item.quantity * item.price, 0)
    : 0;