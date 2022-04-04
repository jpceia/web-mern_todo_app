import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, selectTodosStatus } from './slice';
import Input from './Input';
import ListTodo from './ListTodo';

const Todo = () => {
    const dispatch = useDispatch();
    const todosStatus = useSelector(selectTodosStatus);
    
    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    const renderTodoList = (status) => {
        switch (status) {
            case 'loading':
                return <p class="loader">Loading...</p>;
            case 'failed':
                return <p>Failed to load todos. Please try again later.</p>;
            case 'succeeded':
                return <ListTodo />;
            default:
                return null;
        }
    }

    return (
        <div>
            <h1>My Todo(s)</h1>
            <Input />
            { renderTodoList(todosStatus) }
        </div>
    );
};

export default Todo;
