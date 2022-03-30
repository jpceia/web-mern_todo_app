import React, { useState } from 'react';
import * as api from '../api/index';
import Input from './Input';
import ListTodo from './ListTodo';

const Todo = props => {
    const [todos, setTodos] = useState([]);

    const getTodos = () => {
        api.getTodos()
            .then((response) => {
                if (response.data)
                    setTodos(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const deleteTodo = (id) => {
        api.deleteTodo(id)
            .then((response) => {
                setTodos(todos.filter(todo => todo._id !== id));
            })
            .catch((error) => {
                console.log(error);
            });
    };

    React.useEffect(getTodos, []);

    return (
        <div>
            <h1>My Todo(s)</h1>
            <Input getTodos={getTodos} />
            <ListTodo todos={todos} deleteTodo={deleteTodo} />
        </div>
    );
};

export default Todo;
