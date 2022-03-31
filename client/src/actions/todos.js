import * as api from '../api/index';
import { GET, POST, DELETE } from '../constants/actionTypes';

export const createTodo = (task) => async (dispatch) => {
    try
    {
        if (task.action && task.action.length > 0)
        {
            const { data } = await api.createTodo(task);
            dispatch({ type: POST, payload: data});
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
        dispatch({ type: GET, payload: data });
    }
    catch (error)
    {
        console.log(error);
    }
}

export const deleteTodo = (id) => async (dispatch) => {
    try
    {
        const { data } = await api.deleteTodo(id);
        dispatch({ type: DELETE, payload: data });
    }
    catch (error)
    {
        console.log(error);
    }
}
