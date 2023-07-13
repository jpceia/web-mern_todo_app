import { configureStore } from '@reduxjs/toolkit';
import expensesReducer from './reducers/expensesReducer';

export const store = configureStore({
    reducer: {
        expenses: expensesReducer
    },
});
