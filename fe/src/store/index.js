import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import { inquiryApi } from './api/inquiryApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [inquiryApi.reducerPath]: inquiryApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(inquiryApi.middleware),
});

export default store;
