import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../reducers/todoReducer';


const Input = () => {
    const dispatch = useDispatch();
    const [todo, setTodo ] = useState('');

    const onClick = (e) => {
        e.preventDefault();
        console.log("Creating todo: ", todo);
        dispatch(addTodo({'action': todo}));
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
