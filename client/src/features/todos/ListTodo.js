import React from 'react';
import { 
    selectTodos,
    deleteTodo
} from './slice';
import { useDispatch, useSelector } from 'react-redux';

const ListTodo = () => {
    const dispatch = useDispatch();
    const todos = useSelector(selectTodos);

    if (!(todos && todos.length) > 0)
        return (
            <>
                <br />
                <p>You finish all your tasks. Enjoy your free time 😁</p>
            </>
        );

    return (
        <ul>
            { todos.map((todo) => {
                return (
                    <li key={todo._id}>
                        {todo.action}
                        <button
                            className="delete-btn"
                            onClick={() => dispatch(deleteTodo(todo._id))}
                        >❌</button>
                    </li>
                );
            }) }
        </ul>
    );
};

export default ListTodo;