import * as api from '../api/expenseApi';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const fetchExpenses = createAsyncThunk('expenses/fetch', async () => {
    await sleep(1000);
    const { data } = await api.getExpenses();
    return data;
});

export const addExpense = createAsyncThunk('expenses/add', async item => {
    const { data } = await api.createExpense(item);
    return data;
});

export const deleteExpense = createAsyncThunk('expenses/delete', async id => {
    await api.deleteExpense(id);
    const data = { id };
    return data;
});

export const expenseSlice = createSlice({
    name: 'expenses',
    initialState: {
        items: [],
        status: 'loading',
        error: null,
    },
    reducers: {
    },
    extraReducers: builder => {
        builder
            .addCase(fetchExpenses.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchExpenses.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchExpenses.fulfilled, (state, action) => {
                state.items = action.payload;
                state.status = 'succeeded';
            })
            .addCase(addExpense.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(deleteExpense.fulfilled, (state, action) => {
                state.items = state.items.filter(expense => expense.id !== action.payload.id);
            })
    }
});

export const selectExpenses = (state) => state.expenses.items;
export const selectExpense = (state, id) => state.expenses.items.find(expense => expense.id === id);
export const selectExpensesStatus = (state) => state.expenses.status; 

export default expenseSlice.reducer;

