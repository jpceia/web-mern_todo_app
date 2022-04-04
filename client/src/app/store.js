import { configureStore } from '@reduxjs/toolkit';
import todosReducer from '../features/todos/slice';

export const store = configureStore({
    reducer: {
        todos: todosReducer
    },
});
