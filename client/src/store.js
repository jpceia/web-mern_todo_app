import { configureStore } from '@reduxjs/toolkit';
import { expenseSlice } from './api/expenseApi';
import authReducer from './auth/authSlice';

export const store = configureStore({
    reducer: {
        [expenseSlice.reducerPath]: expenseSlice.reducer,
        auth: authReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat([
            expenseSlice.middleware
        ])
})
