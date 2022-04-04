import React from 'react';
import { 
    selectTodos,
    deleteTodo
} from './slice';
import TodoItem from './TodoItem';
import { useDispatch, useSelector } from 'react-redux';

const ListTodo = () => {
    const dispatch = useDispatch();
    const todos = useSelector(selectTodos);

    if (!todos || todos.length === 0)
    {
        return (
            <>
                <br />
                <p>You finish all your tasks. Enjoy your free time 😁</p>
            </>
        );
    }

    return (
        <ul> {
            todos.map((todo) => {
                return <TodoItem
                    todo={todo}
                    key={todo.id}
                    onDelete = {() => dispatch(deleteTodo(todo._id))}
                />
            })}
        </ul>
    );
};

export default ListTodo;