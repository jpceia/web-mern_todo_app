import React from 'react';
import { 
    selectTodos,
    eraseTodo
} from './slice';
import { useDispatch, useSelector } from 'react-redux';

const ListTodo = () => {
    const dispatch = useDispatch();
    const todos = useSelector(selectTodos);

    return (
        <ul>
            {todos && todos.length > 0 ? (
                todos.map((todo) => {
                    return (
                        <li key={todo._id}>
                            {todo.action}
                            <button
                                className="delete-btn"
                                onClick={() => dispatch(eraseTodo(todo._id))}
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