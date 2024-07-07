import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './bookSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
  }
});

export default store;
