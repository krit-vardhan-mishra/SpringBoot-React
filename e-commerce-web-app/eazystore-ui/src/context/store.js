import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cart-slice';
import authReducer from './auth-slice';

const store = configureStore({
    reducer: {
        cart: cartReducer,
        auth: authReducer,
    }
})

store.subscribe(() => {
    try {
        const state = store.getState();
        localStorage.setItem('cart', JSON.stringify(state.cart));
    } catch (error) {
        console.error("Error saving cart to localStorage:", error);
    }
});

export default store;