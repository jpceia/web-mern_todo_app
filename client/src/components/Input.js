import React, { useState } from 'react';
import { createTodo } from '../actions/todos';


const Input = () => {
    const [state, setState ] = useState({ action: '' });

    const onClick = (e) => {
        e.preventDefault();
        createTodo(state.action);
        setState({ action: '' });
    };

    return (
        <div>
            <input
                type="text"
                onChange={(e) => setState({ action: e.target.value })}
                value={state.action}
            />
            <button onClick={onClick}>Add</button>
        </div>
    );
}

export default Input;
