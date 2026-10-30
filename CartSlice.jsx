import { createSlice } from '@reduxjs/toolkit';

/**
 * CartSlice.jsx
 * Redux slice for the Paradise Nursery shopping cart.
 *
 * State shape:
 *   items: [{ id, name, image, price, quantity }]
 */

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    /**
     * addItem – Adds a plant to the cart.
     * If the item already exists, increments its quantity.
     */
    addItem(state, action) {
      const incoming = action.payload;
      const existing = state.items.find((item) => item.id === incoming.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...incoming, quantity: 1 });
      }
    },

    /**
     * removeItem – Removes a plant from the cart entirely by id.
     */
    removeItem(state, action) {
      const idToRemove = action.payload;
      state.items = state.items.filter((item) => item.id !== idToRemove);
    },

    /**
     * updateQuantity – Sets the quantity of a specific cart item.
     * If the resulting quantity is 0 or less, the item is removed.
     */
    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        const item = state.items.find((item) => item.id === id);
        if (item) {
          item.quantity = quantity;
        }
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = cartSlice.actions;

/* Selectors */
export const selectCartItems = (state) => state.cart.items;

export const selectCartTotalQuantity = (state) =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);

export const selectCartTotalCost = (state) =>
  state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

export default cartSlice.reducer;
