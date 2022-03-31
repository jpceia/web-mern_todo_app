import React from 'react';
import { deleteTodo } from '../actions/todos';
import { useSelector } from 'react-redux';

const ListTodo = () => {
    const todos = useSelector(state => state.todos);

    return (
        <ul>
            {todos && todos.length > 0 ? (
                todos.map((todo) => {
                    return (
                        <li key={todo._id}>
                            {todo.action}
                            <button
                                className="delete-btn"
                                onClick={() => deleteTodo(todo._id)}
                            >X</button>
                        </li>
                    );
                })
            ) : (
                <li>No todo(s) left</li>
            )} 
        </ul>
    );
};

export default ListTodo;