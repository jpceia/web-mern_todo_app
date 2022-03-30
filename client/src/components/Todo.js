import React, { useState } from 'react';
import axios from 'axios';
import Input from './Input';
import ListTodo from './ListTodo';

const Todo = props => {
    const [todos, setTodos] = useState([]);

    const getTodos = () => {
        axios.get('/api/todos')
            .then((response) => {
                if (response.data)
                    setTodos(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const deleteTodo = (id) => {
        axios.delete(`/api/todos/${id}`)
            .then((response) => {
                if (response.data)
                    getTodos();
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
