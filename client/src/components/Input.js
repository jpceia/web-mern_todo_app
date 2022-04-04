import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTodo } from '../features/todos/slice';


const Input = () => {
    const dispatch = useDispatch();
    const [todo, setTodo ] = useState('');

    const onClick = (e) => {
        e.preventDefault();
        console.log("Creating todo: ", todo);
        dispatch(createTodo({'action': todo}));
        setTodo('');
    };

    return (
        <div>
            <input
                type="text"
                onChange={(e) => setTodo(e.target.value)}
                value={todo}
            />
            <button onClick={onClick}>Add</button>
        </div>
    );
}

export default Input;
