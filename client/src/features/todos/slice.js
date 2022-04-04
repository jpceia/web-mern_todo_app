import * as api from './api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
    const { data } = await api.getTodos();
    return data;
});

export const addTodo = createAsyncThunk('todos/addTodo', async task => {
    const { data } = await api.createTodo(task);
    return data;
});

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async id => {
    const { data } = await api.deleteTodo(id);
    return data;
});

export const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        items: [],
        status: 'loading',
        error: null,
    },
    reducers: {
    },
    extraReducers: builder => {
        builder
            .addCase(fetchTodos.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.items = action.payload;
                state.status = 'succeeded';
            })
            .addCase(addTodo.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                state.items = state.items.filter(todo => todo._id !== action.payload._id);
            })
    }
});

export const selectTodos = (state) => state.todos.items;
export const selectTodo = (state, id) => state.todos.items.find(todo => todo._id === id);
export const selectTodosStatus = (state) => state.todos.status; 

export default todosSlice.reducer;

