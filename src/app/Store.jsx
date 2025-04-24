import { configureStore } from '@reduxjs/toolkit';
import cryptoReducer from '../crypto/cryptoSlice';

export const store = configureStore({
  reducer: {
    crypto: cryptoReducer,
  },
});