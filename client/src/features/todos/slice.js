import * as api from './api';
import { createSlice } from '@reduxjs/toolkit';


export const todosSlice = createSlice({
    name: 'todos',
    initialState: {},
    reducers: {
        get: (state, action) => {
            return action.payload;
        },
        create: (state, action) => {
            state.push(action.payload);
        },
        erase: (state, action) => {
            return state.filter(todo => todo._id !== action.payload._id);
        }
    }
});

export const { get, create, erase } = todosSlice.actions;


export const createTodo = (task) => async (dispatch) => {
    try
    {
        if (task.action && task.action.length > 0)
        {
            const { data } = await api.createTodo(task);
            dispatch(create(data));
        }
        else
        {
            console.log('input field required');
        }
    }
    catch (error)
    {
        console.log(error);
    }
}

export const getTodos = () => async (dispatch) => {
    try
    {
        const { data } = await api.getTodos();
        dispatch(get(data));
    }
    catch (error)
    {
        console.log(error);
    }
}

export const eraseTodo = (id) => async (dispatch) => {
    try
    {
        const { data } = await api.deleteTodo(id);
        console.log("Erase: ", data);
        dispatch(erase(data));
    }
    catch (error)
    {
        console.log(error);
    }
}

export const selectTodos = (state) => state.todos;
export const selectTodo = (state, id) => state.todos.find(todo => todo._id === id);

export default todosSlice.reducer;

