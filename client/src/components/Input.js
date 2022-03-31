import React, { useState } from 'react';
import { createTodo } from '../actions/todos';


const Input = () => {
    const [state, setState ] = useState({ action: '' });

    return (
        <div>
            <input
                type="text"
                onChange={(e) => setState({ action: e.target.value })}
                value={state.action}
            />
            <button onClick={createTodo}>Add</button>
        </div>
    );
}

export default Input;
