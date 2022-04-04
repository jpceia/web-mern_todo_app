import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getTodos } from './slice';
import Input from './Input';
import ListTodo from './ListTodo';

const Todo = () => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getTodos());
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
