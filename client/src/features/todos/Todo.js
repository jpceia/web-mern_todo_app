import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchTodos } from './slice';
import Input from './Input';
import ListTodo from './ListTodo';

const Todo = () => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    return (
        <div>
            <h1>My Todo(s)</h1>
            <Input />
            <ListTodo />
        </div>
    );
};

export default Todo;
