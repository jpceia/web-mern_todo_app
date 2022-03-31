import React, { useEffect } from 'react';
import { getTodos } from '../api';
import Input from './Input';
import ListTodo from './ListTodo';

const Todo = () => {
    useEffect(getTodos, []);

    return (
        <div>
            <h1>My Todo(s)</h1>
            <Input />
            <ListTodo />
        </div>
    );
};

export default Todo;
